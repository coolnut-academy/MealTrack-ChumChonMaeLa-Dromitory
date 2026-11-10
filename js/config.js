/**
 * Global Configuration & Constants
 */
const CONFIG = {
    API_URL: "https://script.google.com/macros/s/AKfycbwaLit4Xb-t-LEsctl0eZWcnKQGxJiPSOOQA1NP7sTXF05oeh6XDr2uA4f9B_RpArbr/exec",
    THAI_MONTHS: [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ],
    THAI_DAYS_SHORT: ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],
    // งบประมาณจัดสรรประจำวัน (บาท/วัน) — อ่านจากหน้าตั้งค่างบประมาณ (js/budgetSettings.js)
    // ถ้าเลือก "คำนวณอัตโนมัติ" = Σ(จำนวนนักเรียนแต่ละระดับชั้น × อัตราค่าอาหาร)
    // ถ้าเลือก "กำหนดเอง" = ยอดที่ผู้ใช้ระบุ
    get DAILY_BUDGET_RATE() {
        return (typeof BudgetSettings !== 'undefined') ? BudgetSettings.getDailyBudget() : 0;
    },
    STORAGE_AUTH_KEY: "meal_tracker_auth"
};
