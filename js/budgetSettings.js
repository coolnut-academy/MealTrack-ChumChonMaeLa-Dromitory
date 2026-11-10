/**
 * Budget Settings (ตั้งค่าจำนวนนักเรียน อัตราค่าอาหาร และงบประมาณจัดสรรประจำวัน)
 * - เก็บแคชใน localStorage (ใช้งานได้ทันที / ออฟไลน์)
 * - ซิงค์กับ Google Sheets (ชีต "Settings") ผ่าน GAS action: get_settings / save_settings
 */
const BudgetSettings = {
    STORAGE_KEY: "meal_tracker_budget_settings",
    REMOTE_KEY: "budget_settings",

    DEFAULTS: {
        groups: [
            { name: "อนุบาล", students: 0, rate: 0 },
            { name: "ประถม", students: 0, rate: 0 },
            { name: "ม.ต้น", students: 86, rate: 40 }
        ],
        useCustomBudget: false, // true = ใช้งบที่กำหนดเอง แทนค่าที่คำนวณจากจำนวนนักเรียน
        customBudget: 0,
        updated_at: ""
    },

    _cache: null,

    /** ทำความสะอาดข้อมูลให้อยู่ในรูปแบบที่ถูกต้องเสมอ */
    normalize(raw) {
        const d = JSON.parse(JSON.stringify(this.DEFAULTS));
        if (!raw || typeof raw !== 'object') return d;

        if (Array.isArray(raw.groups)) {
            d.groups = raw.groups
                .map(g => ({
                    name: String((g && g.name) || '').trim(),
                    students: Math.max(0, Math.floor(Number(g && g.students) || 0)),
                    rate: Math.max(0, Number(g && g.rate) || 0)
                }))
                .filter(g => g.name);
        }
        d.useCustomBudget = Boolean(raw.useCustomBudget);
        d.customBudget = Math.max(0, Number(raw.customBudget) || 0);
        d.updated_at = raw.updated_at || "";
        return d;
    },

    get() {
        if (!this._cache) {
            let raw = null;
            try { raw = JSON.parse(localStorage.getItem(this.STORAGE_KEY)); } catch (_) {}
            this._cache = this.normalize(raw);
        }
        return this._cache;
    },

    /** งบที่คำนวณจาก Σ(จำนวนนักเรียน × อัตรา) */
    getCalculatedBudget(s = this.get()) {
        return s.groups.reduce((sum, g) => sum + g.students * g.rate, 0);
    },

    getTotalStudents(s = this.get()) {
        return s.groups.reduce((sum, g) => sum + g.students, 0);
    },

    /** งบประมาณจัดสรรประจำวันที่ใช้จริง (กำหนดเอง หรือ คำนวณ) */
    getDailyBudget(s = this.get()) {
        return s.useCustomBudget ? s.customBudget : this.getCalculatedBudget(s);
    },

    /** ข้อมูลสรุปสำหรับรายงาน */
    getSummary() {
        const s = this.get();
        const activeGroups = s.groups.filter(g => g.students > 0);
        return {
            groups: s.groups,
            activeGroups,
            totalStudents: this.getTotalStudents(s),
            calculatedBudget: this.getCalculatedBudget(s),
            dailyBudget: this.getDailyBudget(s),
            isCustom: s.useCustomBudget
        };
    },

    async save(settings) {
        const data = this.normalize(settings);
        data.updated_at = new Date().toISOString();
        this._cache = data;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));

        try {
            const res = await API.call('save_settings', { key: this.REMOTE_KEY, value: JSON.stringify(data) });
            return { success: Boolean(res && res.success), remote: Boolean(res && res.success) };
        } catch (_) {
            return { success: true, remote: false };
        }
    },

    /** โหลดค่าล่าสุดจาก Google Sheets (ถ้าใหม่กว่าในเครื่องจะทับแคช) */
    async syncFromRemote() {
        try {
            const res = await API.call('get_settings', { key: this.REMOTE_KEY });
            if (!res || !res.success || !res.data) return false;
            const raw = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            const remote = this.normalize(raw);
            const local = this.get();
            if (!local.updated_at || (remote.updated_at && remote.updated_at >= local.updated_at)) {
                this._cache = remote;
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(remote));
            }
            return true;
        } catch (_) {
            return false;
        }
    }
};


/**
 * Budget Settings Modal (UI)
 */
const BudgetSettingsModal = {
    draft: null,

    fmt(n, dec = 2) {
        return Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: dec, maximumFractionDigits: dec });
    },

    async open() {
        this.draft = JSON.parse(JSON.stringify(BudgetSettings.get()));
        this.render();
        UI.openModal('budgetSettingsModal');

        // ดึงค่าล่าสุดจากเซิร์ฟเวอร์เบื้องหลัง
        const before = JSON.stringify(BudgetSettings.get());
        if (await BudgetSettings.syncFromRemote()) {
            const after = JSON.stringify(BudgetSettings.get());
            const modal = document.getElementById('budgetSettingsModal');
            if (before !== after && modal && !modal.classList.contains('hidden')) {
                this.draft = JSON.parse(after);
                this.render();
            }
        }
    },

    close() {
        UI.closeModal('budgetSettingsModal');
        // หากเปิดซ้อนจากหน้าส่งออก PDF ให้คงสถานะ modal เดิมและรีเฟรชพรีวิว
        const exportModal = document.getElementById('dailyExportModal');
        if (exportModal && !exportModal.classList.contains('hidden')) {
            document.body.classList.add('overflow-hidden');
            if (typeof DailyExport !== 'undefined') DailyExport.updateSelectorPreview();
        }
    },

    updateGroup(idx, field, value) {
        const g = this.draft.groups[idx];
        if (!g) return;
        if (field === 'name') g.name = value;
        else if (field === 'students') g.students = Math.max(0, Math.floor(Number(value) || 0));
        else if (field === 'rate') g.rate = Math.max(0, Number(value) || 0);
        this.renderSummary();
    },

    addGroup() {
        this.draft.groups.push({ name: "", students: 0, rate: 0 });
        this.render();
        const inputs = document.querySelectorAll('#budgetGroupsBody input[data-field="name"]');
        if (inputs.length) inputs[inputs.length - 1].focus();
    },

    removeGroup(idx) {
        this.draft.groups.splice(idx, 1);
        this.render();
    },

    setCustomMode(useCustom) {
        this.draft.useCustomBudget = Boolean(useCustom);
        if (useCustom && !this.draft.customBudget) {
            this.draft.customBudget = BudgetSettings.getCalculatedBudget(BudgetSettings.normalize(this.draft));
        }
        this.render();
    },

    setCustomBudget(value) {
        this.draft.customBudget = Math.max(0, Number(value) || 0);
        this.renderSummary();
    },

    render() {
        const body = document.getElementById('budgetGroupsBody');
        if (body) {
            body.innerHTML = this.draft.groups.map((g, i) => `
                <tr class="border-b border-slate-100">
                    <td class="py-2 px-2">
                        <input type="text" data-field="name" value="${escapeHtml(g.name)}" placeholder="เช่น อนุบาล"
                            oninput="BudgetSettingsModal.updateGroup(${i}, 'name', this.value)"
                            class="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-emerald-700 focus:outline-none">
                    </td>
                    <td class="py-2 px-2">
                        <input type="number" min="0" step="1" value="${g.students}"
                            oninput="BudgetSettingsModal.updateGroup(${i}, 'students', this.value)"
                            class="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-right font-bold focus:ring-2 focus:ring-emerald-700 focus:outline-none">
                    </td>
                    <td class="py-2 px-2">
                        <input type="number" min="0" step="any" value="${g.rate}"
                            oninput="BudgetSettingsModal.updateGroup(${i}, 'rate', this.value)"
                            class="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-right font-bold focus:ring-2 focus:ring-emerald-700 focus:outline-none">
                    </td>
                    <td class="py-2 px-2 text-right font-mono text-xs text-slate-700" data-subtotal="${i}">
                        ${this.fmt(g.students * g.rate)}
                    </td>
                    <td class="py-2 px-1 text-center">
                        <button type="button" onclick="BudgetSettingsModal.removeGroup(${i})" title="ลบกลุ่มนี้"
                            class="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition">
                            <i class="fa-solid fa-trash-can text-xs"></i>
                        </button>
                    </td>
                </tr>
            `).join('') || `
                <tr><td colspan="5" class="py-4 text-center text-xs text-slate-400 italic">ยังไม่มีกลุ่มนักเรียน กด "เพิ่มกลุ่ม/ระดับชั้น"</td></tr>
            `;
        }

        const autoRadio = document.getElementById('budgetModeAuto');
        const customRadio = document.getElementById('budgetModeCustom');
        const customInput = document.getElementById('budgetCustomInput');
        if (autoRadio) autoRadio.checked = !this.draft.useCustomBudget;
        if (customRadio) customRadio.checked = this.draft.useCustomBudget;
        if (customInput) {
            customInput.disabled = !this.draft.useCustomBudget;
            customInput.value = this.draft.useCustomBudget ? this.draft.customBudget : '';
        }

        this.renderSummary();
    },

    renderSummary() {
        const s = BudgetSettings.normalize(this.draft);
        const calc = BudgetSettings.getCalculatedBudget(s);
        const total = BudgetSettings.getTotalStudents(s);
        const finalBudget = BudgetSettings.getDailyBudget(s);

        this.draft.groups.forEach((g, i) => {
            const el = document.querySelector(`[data-subtotal="${i}"]`);
            if (el) el.textContent = this.fmt(g.students * g.rate);
        });

        const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
        set('budgetTotalStudents', total.toLocaleString('th-TH'));
        set('budgetCalculated', this.fmt(calc));
        set('budgetFinal', this.fmt(finalBudget));

        const diffEl = document.getElementById('budgetCustomDiff');
        if (diffEl) {
            if (s.useCustomBudget) {
                const diff = s.customBudget - calc;
                const sign = diff > 0 ? '+' : '';
                diffEl.className = `text-[11px] font-semibold ${diff > 0 ? 'text-emerald-700' : diff < 0 ? 'text-red-600' : 'text-slate-500'}`;
                diffEl.textContent = diff === 0
                    ? 'เท่ากับยอดที่คำนวณจากจำนวนนักเรียน'
                    : `${diff > 0 ? 'มากกว่า' : 'น้อยกว่า'}ยอดคำนวณ ${sign}${this.fmt(diff)} บาท`;
            } else {
                diffEl.textContent = '';
            }
        }
    },

    async save() {
        const s = BudgetSettings.normalize(this.draft);
        if (this.draft.groups.some(g => !String(g.name || '').trim())) {
            UI.showToast("กรุณาระบุชื่อกลุ่ม/ระดับชั้นให้ครบ", "warning");
            return;
        }
        if (s.useCustomBudget && s.customBudget <= 0) {
            UI.showToast("กรุณาระบุงบประมาณที่กำหนดเองให้มากกว่า 0", "warning");
            return;
        }

        const btn = document.getElementById('budgetSaveBtn');
        if (btn) { btn.disabled = true; btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>กำลังบันทึก...</span>`; }

        const res = await BudgetSettings.save(s);

        if (btn) { btn.disabled = false; btn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i> <span>บันทึกการตั้งค่า</span>`; }

        if (res.remote) {
            UI.showToast("บันทึกการตั้งค่างบประมาณเรียบร้อยแล้ว", "success");
        } else {
            UI.showToast("บันทึกในเครื่องนี้แล้ว แต่ซิงค์ Google Sheets ไม่สำเร็จ (ตรวจสอบการ Deploy GAS)", "warning");
        }
        this.close();
    }
};

// โหลดค่าจากเซิร์ฟเวอร์เบื้องหลังตอนเปิดแอป
document.addEventListener('DOMContentLoaded', () => {
    BudgetSettings.syncFromRemote();
});

