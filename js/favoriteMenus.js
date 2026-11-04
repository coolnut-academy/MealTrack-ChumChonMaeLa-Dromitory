/**
 * Popular / Favorite Menus (Recipe Book) Manager & Modal Controller
 * Synchronizes with Google Sheets as primary storage, using LocalStorage as cache.
 */

const DEFAULT_FAVORITE_MENUS = [
    {
        "id": "fav_1786336209080",
        "name": "ต้มข่าไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ไก่สับ",
                "qty": 10,
                "price": 90,
                "total": 900
            },
            {
                "item": "ข่า+ตระไคร้",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "กะทิ",
                "qty": 4,
                "price": 90,
                "total": 360
            },
            {
                "item": "มะเขือเทศ",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 2,
                "price": 20,
                "total": 40
            },
            {
                "item": "หอมหัวใหญ่",
                "qty": 3,
                "price": 60,
                "total": 180
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 5,
                "price": 5,
                "total": 25
            },
            {
                "item": "เลือดไก่",
                "qty": 8,
                "price": 15,
                "total": 120
            },
            {
                "item": "แตงโม",
                "qty": 10,
                "price": 35,
                "total": 350
            }
        ],
        "total_cost": 2605,
        "updated_at": "2026-08-24T14:14:18.655Z",
        "use_count": 13
    },
    {
        "id": "fav_1786336216515",
        "name": "น้ำพริกอ่อง",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูบด",
                "qty": 6,
                "price": 165,
                "total": 990
            },
            {
                "item": "ปลากระป๋อง",
                "qty": 15,
                "price": 25,
                "total": 375
            },
            {
                "item": "หอมแดง",
                "qty": 3,
                "price": 50,
                "total": 150
            },
            {
                "item": "มะเขือเทศ",
                "qty": 3,
                "price": 50,
                "total": 150
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 1,
                "price": 5,
                "total": 5
            }
        ],
        "total_cost": 2150,
        "updated_at": "2026-08-17T09:08:55.297Z",
        "use_count": 9
    },
    {
        "id": "fav_1786336233483",
        "name": "ผัดกระเพราหมูสับ",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 5,
                "price": 40,
                "total": 200
            },
            {
                "item": "หมูบด",
                "qty": 3,
                "price": 180,
                "total": 540
            },
            {
                "item": "กะเพรา",
                "qty": 5,
                "price": 5,
                "total": 25
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 0,
                "price": 120,
                "total": 0
            },
            {
                "item": "กระเทียม",
                "qty": 0,
                "price": 100,
                "total": 0
            },
            {
                "item": "ซอสหอยนางรม",
                "qty": 0,
                "price": 60,
                "total": 0
            },
            {
                "item": "กะเพรา",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "พริกสด",
                "qty": 0,
                "price": 60,
                "total": 0
            }
        ],
        "total_cost": 885,
        "updated_at": "2026-08-25T06:20:24.088Z",
        "use_count": 14
    },
    {
        "id": "fav_1786342144565",
        "name": "ผัดผักกาดขาว",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ผักกาดขาว",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูแดง",
                "qty": 7,
                "price": 165,
                "total": 1155
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            }
        ],
        "total_cost": 2380,
        "updated_at": "2026-08-15T02:56:14.707Z",
        "use_count": 4
    },
    {
        "id": "fav_1786345915000",
        "name": "แกงเผ็ดลูกชิ้น",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ลูกชิ้นหมู",
                "qty": 10,
                "price": 95,
                "total": 950
            },
            {
                "item": "มะเขือเปราะ",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "พริกแกง",
                "qty": 2,
                "price": 80,
                "total": 160
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "โหระพา",
                "qty": 7,
                "price": 5,
                "total": 35
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-31T14:41:22.835Z",
        "use_count": 12
    },
    {
        "id": "fav_1786380463367",
        "name": "ไข่พะโล้",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 6,
                "price": 40,
                "total": 240
            },
            {
                "item": "ไข่ไก่",
                "qty": 1.5,
                "price": 140,
                "total": 210
            },
            {
                "item": "หมูแดง",
                "qty": 2,
                "price": 165,
                "total": 330
            },
            {
                "item": "น้ำมันพืช",
                "qty": 0,
                "price": 70,
                "total": 0
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "ผงพะโล้",
                "qty": 3,
                "price": 20,
                "total": 60
            },
            {
                "item": "น้ำตาลปิ๊บ",
                "qty": 0,
                "price": 40,
                "total": 0
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 0,
                "price": 60,
                "total": 0
            },
            {
                "item": "ซีอิ๊วดำ",
                "qty": 0,
                "price": 50,
                "total": 0
            }
        ],
        "total_cost": 940,
        "updated_at": "2026-08-17T09:06:10.090Z",
        "use_count": 10
    },
    {
        "id": "fav_1786380751603",
        "name": "ผัดผักรวม",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "แครอท",
                "qty": 2,
                "price": 60,
                "total": 120
            },
            {
                "item": "กะหล่ำดอก",
                "qty": 3,
                "price": 60,
                "total": 180
            },
            {
                "item": "กระหล่ำปลี",
                "qty": 4,
                "price": 40,
                "total": 160
            },
            {
                "item": "หมูแดง",
                "qty": 5,
                "price": 165,
                "total": 825
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "แตงโม",
                "qty": 10,
                "price": 35,
                "total": 350
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            }
        ],
        "total_cost": 2430,
        "updated_at": "2026-08-24T14:01:04.825Z",
        "use_count": 10
    },
    {
        "id": "fav_1786380972579",
        "name": "ผัดมะระหวาน",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 4,
                "price": 40,
                "total": 160
            },
            {
                "item": "มะระหวาน",
                "qty": 5,
                "price": 40,
                "total": 200
            },
            {
                "item": "หมูแดง",
                "qty": 1.5,
                "price": 165,
                "total": 247.5
            },
            {
                "item": "ซอสหอยนางรม",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            }
        ],
        "total_cost": 897.5,
        "updated_at": "2026-08-10T16:56:12.577Z",
        "use_count": 1
    },
    {
        "id": "fav_1786381356409",
        "name": "ต้มจืดผักกาดขาว",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ผักกาดขาว",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "หมูบด",
                "qty": 6,
                "price": 165,
                "total": 990
            },
            {
                "item": "แครอท",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 0,
                "price": 60,
                "total": 0
            },
            {
                "item": "คืนฉ่าย",
                "qty": 5,
                "price": 5,
                "total": 25
            },
            {
                "item": "น้ำปลา",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "พริกไทยป่น",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "แตงโม",
                "qty": 10,
                "price": 35,
                "total": 350
            }
        ],
        "total_cost": 2585,
        "updated_at": "2026-08-24T14:33:04.582Z",
        "use_count": 15
    },
    {
        "id": "fav_1786439686130",
        "name": "ขนมจีน",
        "items": [
            {
                "item": "เส้นขนมจีน",
                "qty": 25,
                "price": 35,
                "total": 875
            },
            {
                "item": "พริกแกง",
                "qty": 2,
                "price": 80,
                "total": 160
            },
            {
                "item": "หมูบด",
                "qty": 5,
                "price": 165,
                "total": 825
            },
            {
                "item": "หอมแดง",
                "qty": 3,
                "price": 50,
                "total": 150
            },
            {
                "item": "มะเขือเทศ",
                "qty": 5,
                "price": 50,
                "total": 250
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 5,
                "price": 20,
                "total": 100
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "กระหล่ำปลี",
                "qty": 3,
                "price": 40,
                "total": 120
            },
            {
                "item": "มะนาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "กระเทียม",
                "qty": 0.5,
                "price": 100,
                "total": 50
            }
        ],
        "total_cost": 2710,
        "updated_at": "2026-08-17T09:03:32.901Z",
        "use_count": 8
    },
    {
        "id": "fav_1786439971278",
        "name": "มัสมั่นไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ไก่สับ",
                "qty": 10,
                "price": 95,
                "total": 950
            },
            {
                "item": "พริกแกง",
                "qty": 2,
                "price": 80,
                "total": 160
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "มันฝรั่ง",
                "qty": 10,
                "price": 50,
                "total": 500
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 0,
                "price": 35,
                "total": 0
            },
            {
                "item": "น้ำปลา",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 0,
                "price": 120,
                "total": 0
            },
            {
                "item": "หอมหัวใหญ่",
                "qty": 2,
                "price": 60,
                "total": 120
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 2,
                "price": 5,
                "total": 10
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-31T11:58:52.440Z",
        "use_count": 12
    },
    {
        "id": "fav_1786440178134",
        "name": "ต้มผักกาดดอง",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ผักกาดดอง",
                "qty": 2,
                "price": 350,
                "total": 700
            },
            {
                "item": "กระดูกหมู",
                "qty": 12,
                "price": 80,
                "total": 960
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 3,
                "price": 20,
                "total": 60
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 5,
                "price": 5,
                "total": 25
            }
        ],
        "total_cost": 2325,
        "updated_at": "2026-08-11T09:22:58.132Z",
        "use_count": 1
    },
    {
        "id": "fav_1786627678896",
        "name": "แกงแตงกวาใส่ไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "แตงกวา",
                "qty": 15,
                "price": 35,
                "total": 525
            },
            {
                "item": "เนื้อไก่",
                "qty": 8,
                "price": 90,
                "total": 720
            },
            {
                "item": "หอมแดง",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "กะปิ",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "มะเขือเทศ",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "เงาะ",
                "qty": 13,
                "price": 35,
                "total": 455
            }
        ],
        "total_cost": 2410,
        "updated_at": "2026-08-17T09:10:48.049Z",
        "use_count": 7
    },
    {
        "id": "fav_1786627719661",
        "name": "ผัดกระหล่ำปลีวุ้นเส้นใส่หมู",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "กระหล่ำปลี",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "หมูแดง",
                "qty": 6,
                "price": 180,
                "total": 1080
            },
            {
                "item": "วุ้นเส้นสด",
                "qty": 6,
                "price": 30,
                "total": 180
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 2,
                "price": 35,
                "total": 70
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 4,
                "price": 5,
                "total": 20
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-25T06:28:11.514Z",
        "use_count": 8
    },
    {
        "id": "fav_1786628034784",
        "name": "ผัดแตงกวาไส่ไข่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 5,
                "price": 40,
                "total": 200
            },
            {
                "item": "แตงกวา",
                "qty": 5,
                "price": 35,
                "total": 175
            },
            {
                "item": "หมูบด",
                "qty": 1,
                "price": 165,
                "total": 165
            },
            {
                "item": "ไข่ไก่",
                "qty": 1,
                "price": 140,
                "total": 140
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กระเทียม",
                "qty": 0,
                "price": 100,
                "total": 0
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 0,
                "price": 60,
                "total": 0
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 0,
                "price": 35,
                "total": 0
            }
        ],
        "total_cost": 750,
        "updated_at": "2026-08-24T14:04:23.207Z",
        "use_count": 6
    },
    {
        "id": "fav_1786629323703",
        "name": "ผัดถั่วพู",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ถั่วพู",
                "qty": 60,
                "price": 10,
                "total": 600
            },
            {
                "item": "น้ำมันพืช",
                "qty": 2,
                "price": 70,
                "total": 140
            },
            {
                "item": "หมูบด",
                "qty": 5,
                "price": 165,
                "total": 825
            },
            {
                "item": "มะเขือเทศ",
                "qty": 3,
                "price": 50,
                "total": 150
            },
            {
                "item": "หอมแดง",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 10,
                "price": 5,
                "total": 50
            }
        ],
        "total_cost": 2345,
        "updated_at": "2026-08-24T14:19:59.891Z",
        "use_count": 4
    },
    {
        "id": "fav_1786629670446",
        "name": "แกงเขียวหวาน",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูแดง",
                "qty": 5,
                "price": 180,
                "total": 900
            },
            {
                "item": "มะเขือเปราะ",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "พริกแกง",
                "qty": 1,
                "price": 80,
                "total": 80
            },
            {
                "item": "โหระพา",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "พริกหยวก",
                "qty": 1,
                "price": 50,
                "total": 50
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำปลา",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "มะเขือยาว",
                "qty": 5,
                "price": 40,
                "total": 200
            },
            {
                "item": "โหระพา",
                "qty": 5,
                "price": 5,
                "total": 25
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-25T06:24:02.224Z",
        "use_count": 16
    },
    {
        "id": "fav_1786630229852",
        "name": "ข้าวต้มหมู + ไข่ต้ม",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 8,
                "price": 40,
                "total": 320
            },
            {
                "item": "หมูบด",
                "qty": 5,
                "price": 180,
                "total": 900
            },
            {
                "item": "กระเทียม",
                "qty": 0,
                "price": 100,
                "total": 0
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 4,
                "price": 20,
                "total": 80
            },
            {
                "item": "กระดูกหมู",
                "qty": 5,
                "price": 80,
                "total": 400
            },
            {
                "item": "ไข่ไก่",
                "qty": 5,
                "price": 140,
                "total": 700
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 10,
                "price": 5,
                "total": 50
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-25T06:29:02.120Z",
        "use_count": 8
    },
    {
        "id": "fav_1786630653216",
        "name": "พะแนงหมู",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "พริกแกง",
                "qty": 2,
                "price": 80,
                "total": 160
            },
            {
                "item": "หมูแดง",
                "qty": 7,
                "price": 165,
                "total": 1155
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 2,
                "price": 35,
                "total": 70
            },
            {
                "item": "เกลือ",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "เงาะ",
                "qty": 10,
                "price": 35,
                "total": 350
            }
        ],
        "total_cost": 2515,
        "updated_at": "2026-08-29T14:02:56.766Z",
        "use_count": 6
    },
    {
        "id": "fav_1786631157520",
        "name": "มะเขืออุ๊บ",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูแดง",
                "qty": 5,
                "price": 165,
                "total": 825
            },
            {
                "item": "มะเขือยาว",
                "qty": 15,
                "price": 40,
                "total": 600
            },
            {
                "item": "หอมแดง",
                "qty": 3,
                "price": 50,
                "total": 150
            },
            {
                "item": "กะปิ",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "พริกสด",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "มะเขือเทศ",
                "qty": 3,
                "price": 50,
                "total": 150
            }
        ],
        "total_cost": 2495,
        "updated_at": "2026-08-24T14:28:25.631Z",
        "use_count": 4
    },
    {
        "id": "fav_1786631272301",
        "name": "ผัดถั่วฝักยาวหมูสับ",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ถั่วฝักยาว",
                "qty": 8,
                "price": 55,
                "total": 440
            },
            {
                "item": "หมูบด",
                "qty": 6,
                "price": 180,
                "total": 1080
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "ซอสหอยนางรม",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "พริกสด",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 3,
                "price": 5,
                "total": 15
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-31T12:02:55.785Z",
        "use_count": 16
    },
    {
        "id": "fav_1786631404433",
        "name": "ต้มจืดไข่น้ำ",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ไข่ไก่",
                "qty": 5,
                "price": 140,
                "total": 700
            },
            {
                "item": "หมูบด",
                "qty": 4,
                "price": 180,
                "total": 720
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 4,
                "price": 20,
                "total": 80
            },
            {
                "item": "แตงโม",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "คืนฉ่าย",
                "qty": 6,
                "price": 5,
                "total": 30
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-29T14:30:44.063Z",
        "use_count": 10
    },
    {
        "id": "fav_1786631586268",
        "name": "แกงเผ็ดหมู",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูแดง",
                "qty": 7,
                "price": 165,
                "total": 1155
            },
            {
                "item": "มะเขือเปราะ",
                "qty": 10,
                "price": 40,
                "total": 400
            },
            {
                "item": "พริกแกง",
                "qty": 2,
                "price": 80,
                "total": 160
            },
            {
                "item": "พริกหยวก",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 0,
                "price": 120,
                "total": 0
            },
            {
                "item": "โหระพา",
                "qty": 10,
                "price": 5,
                "total": 50
            }
        ],
        "total_cost": 2650,
        "updated_at": "2026-08-17T09:19:00.891Z",
        "use_count": 6
    },
    {
        "id": "fav_1786631810663",
        "name": "แกงเผ็ดหน่อไม้",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หน่อไม้",
                "qty": 10,
                "price": 65,
                "total": 650
            },
            {
                "item": "ไก่สับ",
                "qty": 10,
                "price": 95,
                "total": 950
            },
            {
                "item": "พริกแกง",
                "qty": 1,
                "price": 80,
                "total": 80
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำปลา",
                "qty": 0,
                "price": 30,
                "total": 0
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 1,
                "price": 20,
                "total": 20
            },
            {
                "item": "โหระพา",
                "qty": 7,
                "price": 5,
                "total": 35
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-31T12:07:39.244Z",
        "use_count": 13
    },
    {
        "id": "fav_1786632275591",
        "name": "สุกี้น้ำ",
        "items": [
            {
                "item": "วุ้นเส้นสด",
                "qty": 10,
                "price": 30,
                "total": 300
            },
            {
                "item": "ลูกชิ้นหมู",
                "qty": 4,
                "price": 95,
                "total": 380
            },
            {
                "item": "หมูบด",
                "qty": 3,
                "price": 165,
                "total": 495
            },
            {
                "item": "ผักกาดขาว",
                "qty": 3,
                "price": 40,
                "total": 120
            },
            {
                "item": "ผักบุ้ง",
                "qty": 3,
                "price": 30,
                "total": 90
            },
            {
                "item": "ไส้กรอก",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 5,
                "price": 5,
                "total": 25
            },
            {
                "item": "ไข่ไก่",
                "qty": 3,
                "price": 140,
                "total": 420
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 2,
                "price": 20,
                "total": 40
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "มะนาว",
                "qty": 2,
                "price": 60,
                "total": 120
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "พริกสด",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำปลา",
                "qty": 1,
                "price": 30,
                "total": 30
            }
        ],
        "total_cost": 2555,
        "updated_at": "2026-08-13T14:44:35.591Z",
        "use_count": 1
    },
    {
        "id": "fav_1786632849579",
        "name": "ผัดฟักทองใส่ไข่ + กล้วยบวชชี",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "หมูบด",
                "qty": 3,
                "price": 165,
                "total": 495
            },
            {
                "item": "ไข่ไก่",
                "qty": 3,
                "price": 140,
                "total": 420
            },
            {
                "item": "ฟักทอง",
                "qty": 15,
                "price": 40,
                "total": 600
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 4,
                "price": 35,
                "total": 140
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กล้วยน้ำว้า",
                "qty": 10,
                "price": 20,
                "total": 200
            },
            {
                "item": "กะทิ",
                "qty": 3,
                "price": 90,
                "total": 270
            },
            {
                "item": "เกลือ",
                "qty": 1,
                "price": 30,
                "total": 30
            }
        ],
        "total_cost": 2705,
        "updated_at": "2026-08-13T14:54:09.578Z",
        "use_count": 1
    },
    {
        "id": "fav_1786634175975",
        "name": "แกงผักกาดใส่ไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ไก่สับ",
                "qty": 10,
                "price": 95,
                "total": 950
            },
            {
                "item": "ผักกวางตุ้ง",
                "qty": 10,
                "price": 35,
                "total": 350
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "หอมแดง",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "กะปิ",
                "qty": 1,
                "price": 30,
                "total": 30
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 3,
                "price": 20,
                "total": 60
            },
            {
                "item": "แตงโม",
                "qty": 8,
                "price": 40,
                "total": 320
            },
            {
                "item": "พริกสด",
                "qty": 1,
                "price": 60,
                "total": 60
            }
        ],
        "total_cost": 2520,
        "updated_at": "2026-08-26T09:01:13.562Z",
        "use_count": 7
    },
    {
        "id": "fav_1786701718091",
        "name": "ผัดคะน้าหมู",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 6,
                "price": 40,
                "total": 240
            },
            {
                "item": "คะน้า",
                "qty": 5,
                "price": 0,
                "total": 0
            },
            {
                "item": "หมูแดง",
                "qty": 1,
                "price": 165,
                "total": 165
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            }
        ],
        "total_cost": 635,
        "updated_at": "2026-08-15T02:30:08.709Z",
        "use_count": 2
    },
    {
        "id": "fav_1786704089528",
        "name": "ผัดหน่อไม้",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 6,
                "price": 40,
                "total": 240
            },
            {
                "item": "หน่อไม้",
                "qty": 5,
                "price": 60,
                "total": 300
            },
            {
                "item": "หมูบด",
                "qty": 2,
                "price": 165,
                "total": 330
            },
            {
                "item": "น้ำมันพืช",
                "qty": 0,
                "price": 70,
                "total": 0
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 0,
                "price": 35,
                "total": 0
            },
            {
                "item": "กระเทียม",
                "qty": 0,
                "price": 100,
                "total": 0
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 0,
                "price": 60,
                "total": 0
            }
        ],
        "total_cost": 870,
        "updated_at": "2026-08-14T10:41:29.528Z",
        "use_count": 1
    },
    {
        "id": "fav_1786704455261",
        "name": "ผัดบวบ",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "บวบ",
                "qty": 12,
                "price": 50,
                "total": 600
            },
            {
                "item": "หมูบด",
                "qty": 5,
                "price": 165,
                "total": 825
            },
            {
                "item": "ไข่ไก่",
                "qty": 5,
                "price": 140,
                "total": 700
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "น้ำมันพืช",
                "qty": 1,
                "price": 70,
                "total": 70
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 1,
                "price": 60,
                "total": 60
            },
            {
                "item": "ซอสหอยนางรม",
                "qty": 1,
                "price": 60,
                "total": 60
            }
        ],
        "total_cost": 2830,
        "updated_at": "2026-08-14T10:47:35.260Z",
        "use_count": 1
    },
    {
        "id": "fav_1786799489366",
        "name": "ข้าวมันไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "เนื้อไก่",
                "qty": 15,
                "price": 90,
                "total": 1350
            },
            {
                "item": "แตงกวา",
                "qty": 5,
                "price": 35,
                "total": 175
            },
            {
                "item": "ขิง",
                "qty": 2,
                "price": 50,
                "total": 100
            },
            {
                "item": "ซุปไก่ก้อน",
                "qty": 5,
                "price": 20,
                "total": 100
            },
            {
                "item": "เต้าเจี๊ยว",
                "qty": 2,
                "price": 0,
                "total": 0
            },
            {
                "item": "น้ำส้มสายชู",
                "qty": 2,
                "price": 30,
                "total": 60
            },
            {
                "item": "น้ำตาลทราย",
                "qty": 1,
                "price": 35,
                "total": 35
            },
            {
                "item": "พริดสด",
                "qty": 1,
                "price": 0,
                "total": 0
            },
            {
                "item": "ต้นหอม/ผักชี",
                "qty": 10,
                "price": 5,
                "total": 50
            },
            {
                "item": "รสดี (ใหญ่)",
                "qty": 1,
                "price": 120,
                "total": 120
            }
        ],
        "total_cost": 2470,
        "updated_at": "2026-08-15T13:12:38.936Z",
        "use_count": 3
    },
    {
        "id": "fav_1787645684547",
        "name": "ต้มยำไก่",
        "items": [
            {
                "item": "ข้าวสาร",
                "qty": 12,
                "price": 40,
                "total": 480
            },
            {
                "item": "ไข่ไก่",
                "qty": 6,
                "price": 140,
                "total": 840
            },
            {
                "item": "หมูแดง",
                "qty": 3,
                "price": 180,
                "total": 540
            },
            {
                "item": "น้ำมันพืช",
                "qty": 0,
                "price": 70,
                "total": 0
            },
            {
                "item": "กระเทียม",
                "qty": 1,
                "price": 100,
                "total": 100
            },
            {
                "item": "ผงพะโล้",
                "qty": 3,
                "price": 20,
                "total": 60
            },
            {
                "item": "น้ำตาลปิ๊บ",
                "qty": 0,
                "price": 40,
                "total": 0
            },
            {
                "item": "ซีอิ๊วขาว",
                "qty": 0,
                "price": 60,
                "total": 0
            },
            {
                "item": "ซีอิ๊วดำ",
                "qty": 1,
                "price": 50,
                "total": 50
            }
        ],
        "total_cost": 2070,
        "updated_at": "2026-08-25T08:14:44.532Z",
        "use_count": 1
    }
];

const FAVORITE_MENUS_CACHE_KEY = "meal_favorite_menus_cache";

const FavoriteMenus = {
    cache: [],

    _loadFromCache() {
        try {
            const raw = localStorage.getItem(FAVORITE_MENUS_CACHE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    this.cache = parsed;
                    return parsed;
                }
            }
        } catch (_) {}
        this.cache = JSON.parse(JSON.stringify(DEFAULT_FAVORITE_MENUS));
        return this.cache;
    },

    _saveToCache(data) {
        this.cache = data || [];
        try {
            localStorage.setItem(FAVORITE_MENUS_CACHE_KEY, JSON.stringify(this.cache));
        } catch (_) {}
    },

    getAll() {
        if (!this.cache || this.cache.length === 0) {
            this._loadFromCache();
        }
        return this.cache;
    },

    async fetchAll() {
        this._loadFromCache();
        try {
            const res = await API.getFavoriteMenus();
            if (res && res.success && Array.isArray(res.data)) {
                this._saveToCache(res.data);
                return res.data;
            }
        } catch (err) {
            console.warn("Using cached favorite menus:", err);
        }
        return this.getAll();
    },

    search(keyword) {
        if (!keyword || !keyword.trim()) return [];
        const clean = keyword.trim().toLowerCase();
        const all = this.getAll();
        const results = [];

        all.forEach(menu => {
            const nameLower = (menu.name || "").toLowerCase();
            if (nameLower.includes(clean)) {
                let score = 0;
                if (nameLower === clean) score = 100;
                else if (nameLower.startsWith(clean)) score = 80;
                else score = 50;

                results.push({
                    ...menu,
                    _score: score
                });
            }
        });

        results.sort((a, b) => (b.use_count || 0) - (a.use_count || 0) || b._score - a._score);
        return results;
    },

    async save(menuData) {
        if (!menuData || !menuData.name) return { success: false, message: "ไม่มีชื่อเมนู" };

        const nameTrimmed = menuData.name.trim();
        const current = this.getAll();
        const existingIdx = current.findIndex(m => m.name.trim().toLowerCase() === nameTrimmed.toLowerCase());

        const payload = {
            id: menuData.id || (existingIdx >= 0 ? current[existingIdx].id : null),
            name: nameTrimmed,
            items: menuData.items || [],
            total_cost: Number(menuData.total_cost) || 0
        };

        // Optimistic cache update
        if (existingIdx >= 0) {
            current[existingIdx] = {
                ...current[existingIdx],
                items: payload.items,
                total_cost: payload.total_cost,
                updated_at: new Date().toISOString(),
                use_count: (Number(current[existingIdx].use_count) || 0) + 1
            };
        } else {
            current.push({
                id: payload.id || ("fav_" + Date.now()),
                name: payload.name,
                items: payload.items,
                total_cost: payload.total_cost,
                updated_at: new Date().toISOString(),
                use_count: 1
            });
        }
        this._saveToCache(current);

        // Sync with Google Sheets
        try {
            const res = await API.saveFavoriteMenu(payload);
            if (res && res.success) {
                // Refresh full list from remote to keep IDs and use_count in sync
                await this.fetchAll();
                return res;
            }
        } catch (err) {
            console.warn("Failed to sync favorite menu to Google Sheets:", err);
            UI.showToast("บันทึกสูตรในเครื่องแล้ว (ไม่สามารถส่งไป Google Sheets ได้)", "warning");
        }
        return { success: true };
    },

    async delete(id) {
        if (!id) return;
        let current = this.getAll();
        current = current.filter(m => m.id !== id);
        this._saveToCache(current);

        try {
            await API.deleteFavoriteMenu(id);
            await this.fetchAll();
        } catch (err) {
            console.warn("Failed to delete favorite menu from Google Sheets:", err);
        }
    }
};

/**
 * Favorite Menus Modal UI Controller
 */
const FavoriteMenusModal = {
    searchFilter: "",
    expandedCards: new Set(),
    editingMenuId: null,

    open() {
        this.searchFilter = "";
        const searchInput = document.getElementById('favMenuSearchInput');
        if (searchInput) searchInput.value = "";
        
        UI.openModal('favoriteMenusModal');
        this.render();

        // Fetch fresh from Google Sheets in background
        FavoriteMenus.fetchAll().then(() => {
            this.render();
        });
    },

    close() {
        UI.closeModal('favoriteMenusModal');
    },

    setSearchFilter(val) {
        this.searchFilter = (val || "").trim().toLowerCase();
        this.render();
    },

    toggleExpand(id) {
        if (this.expandedCards.has(id)) {
            this.expandedCards.delete(id);
        } else {
            this.expandedCards.add(id);
        }
        this.render();
    },

    render() {
        const container = document.getElementById('favMenuListContainer');
        const countBadge = document.getElementById('favMenuTotalCountBadge');
        if (!container) return;

        let menus = FavoriteMenus.getAll();

        if (this.searchFilter) {
            menus = menus.filter(m => (m.name || "").toLowerCase().includes(this.searchFilter));
        }

        // Sort by use_count descending, then by name
        menus.sort((a, b) => (Number(b.use_count) || 0) - (Number(a.use_count) || 0) || (a.name || "").localeCompare(b.name || "", 'th'));

        if (countBadge) countBadge.innerText = `${menus.length} รายการ`;

        if (menus.length === 0) {
            container.innerHTML = `
                <div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-slate-400">
                    <i class="fa-solid fa-utensils text-3xl mb-2 text-slate-300"></i>
                    <p class="text-xs font-bold text-slate-600">ยังไม่มีข้อมูลเมนูยอดฮิต</p>
                    <p class="text-[11px] text-slate-400 mt-1">เมนูจะถูกบันทึกอัตโนมัติเมื่อผู้ใช้บันทึกรายการอาหารมื้อเช้า/เที่ยง/เย็น หรือเพิ่มเมนูใหม่ด้วยตนเอง</p>
                </div>
            `;
            return;
        }

        let html = '';
        menus.forEach((menu, idx) => {
            const isExpanded = this.expandedCards.has(menu.id);
            const items = menu.items || [];
            const useCount = Number(menu.use_count) || 1;
            const totalCost = Number(menu.total_cost) || 0;

            let itemsPreview = items.map(it => `${escapeHtml(it.item || '')} (${it.qty || 1})`).join(', ');
            if (!itemsPreview) itemsPreview = "ไม่มีรายละเอียดวัตถุดิบ";

            let itemsTableRows = '';
            items.forEach((it, iIdx) => {
                const q = Number(it.qty) || 0;
                const p = Number(it.price) || 0;
                const tot = Number(it.total) || (q * p);
                itemsTableRows += `
                    <tr class="border-b border-slate-100 hover:bg-slate-50/60 text-xs">
                        <td class="py-1.5 px-3 text-center text-slate-400 font-medium">${iIdx + 1}</td>
                        <td class="py-1.5 px-3 font-semibold text-slate-800">${escapeHtml(it.item || '')}</td>
                        <td class="py-1.5 px-3 text-center text-slate-700 font-bold">${q}</td>
                        <td class="py-1.5 px-3 text-right text-emerald-800 font-bold">${p.toLocaleString('th-TH')} ฿</td>
                        <td class="py-1.5 px-3 text-right text-slate-800 font-bold">${tot.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿</td>
                    </tr>
                `;
            });

            html += `
                <div class="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition overflow-hidden">
                    <div class="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none bg-gradient-to-r from-white via-white to-emerald-50/30"
                        onclick="FavoriteMenusModal.toggleExpand('${menu.id}')">
                        <div class="flex items-center gap-3 min-w-0 flex-1">
                            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-850 border border-emerald-200/60 flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-xs">
                                <i class="fa-solid fa-utensils"></i>
                            </div>
                            <div class="min-w-0 flex-1">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <h4 class="font-bold text-sm sm:text-base text-slate-800 truncate">${escapeHtml(menu.name)}</h4>
                                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                                        <i class="fa-solid fa-fire-flame-curved text-amber-500"></i> บันทึกแล้ว ${useCount} ครั้ง
                                    </span>
                                </div>
                                <p class="text-xs text-slate-500 truncate mt-0.5">${itemsPreview}</p>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 shrink-0">
                            <div class="text-right hidden sm:block">
                                <span class="text-[10px] text-slate-400 font-medium block">ประมาณการมื้อนี้</span>
                                <span class="text-sm font-bold text-emerald-850">${totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿</span>
                            </div>

                            <button type="button" onclick="event.stopPropagation(); FavoriteMenusModal.openEditModal('${menu.id}')"
                                class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-850 transition flex items-center justify-center text-xs"
                                title="แก้ไขสูตรเมนูนี้">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button type="button" onclick="event.stopPropagation(); FavoriteMenusModal.deleteMenu('${menu.id}', '${escapeHtml(menu.name)}')"
                                class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-400 hover:text-red-600 transition flex items-center justify-center text-xs"
                                title="ลบเมนูนี้ออกจากสูตรยอดฮิต">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <div class="w-6 h-6 flex items-center justify-center text-slate-400">
                                <i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-xs"></i>
                            </div>
                        </div>
                    </div>

                    ${isExpanded ? `
                        <div class="border-t border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 space-y-3 animate-fade-in">
                            <div class="flex items-center justify-between text-xs">
                                <span class="font-bold text-slate-700 flex items-center gap-1.5">
                                    <i class="fa-solid fa-list-check text-emerald-700"></i> ส่วนประกอบและปริมาณในสูตร (${items.length} รายการ)
                                </span>
                                <span class="font-bold text-emerald-850 sm:hidden">รวมเป็นเงิน: ${totalCost.toLocaleString('th-TH', { minimumFractionDigits: 2 })} ฿</span>
                            </div>

                            <div class="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                                <table class="w-full text-left border-collapse">
                                    <thead class="bg-slate-100 text-slate-600 text-[11px] font-bold uppercase">
                                        <tr>
                                            <th class="py-2 px-3 text-center w-10">ที่</th>
                                            <th class="py-2 px-3">วัตถุดิบ / เครื่องปรุง</th>
                                            <th class="py-2 px-3 text-center w-20">จำนวน</th>
                                            <th class="py-2 px-3 text-right w-24">หน่วยละ</th>
                                            <th class="py-2 px-3 text-right w-28">รวมเป็นเงิน</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-slate-100">
                                        ${itemsTableRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        container.innerHTML = html;
    },

    openAddModal() {
        this.editingMenuId = null;
        const titleEl = document.getElementById('favMenuFormTitle');
        if (titleEl) titleEl.innerText = "เพิ่มสูตรเมนูยอดฮิตใหม่";

        const nameInput = document.getElementById('favMenuFormNameInput');
        if (nameInput) nameInput.value = "";

        this.editingItems = [
            { item: "", qty: 1, price: 0, total: 0 }
        ];

        this.renderFormItemsRows();
        UI.openModal('favMenuFormModal');
    },

    openEditModal(id) {
        const menus = FavoriteMenus.getAll();
        const target = menus.find(m => m.id === id);
        if (!target) return;

        this.editingMenuId = id;
        const titleEl = document.getElementById('favMenuFormTitle');
        if (titleEl) titleEl.innerText = `แก้ไขสูตรเมนู "${target.name}"`;

        const nameInput = document.getElementById('favMenuFormNameInput');
        if (nameInput) nameInput.value = target.name || "";

        this.editingItems = JSON.parse(JSON.stringify(target.items || []));
        if (this.editingItems.length === 0) {
            this.editingItems.push({ item: "", qty: 1, price: 0, total: 0 });
        }

        this.renderFormItemsRows();
        UI.openModal('favMenuFormModal');
    },

    closeFormModal() {
        UI.closeModal('favMenuFormModal');
    },

    editingItems: [],

    renderFormItemsRows() {
        const tbody = document.getElementById('favMenuFormItemsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.editingItems.forEach((row, idx) => {
            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-100';
            tr.innerHTML = `
                <td class="py-2 px-3 text-center text-slate-400 text-xs font-medium">${idx + 1}</td>
                <td class="py-1.5 px-2">
                    <input type="text" value="${escapeHtml(row.item || '')}" 
                        onchange="FavoriteMenusModal.updateFormItem(${idx}, 'item', this.value)"
                        placeholder="ชื่อวัตถุดิบ (เช่น หมูบด)" 
                        class="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-none">
                </td>
                <td class="py-1.5 px-2">
                    <input type="number" step="any" min="0" value="${row.qty !== undefined ? row.qty : 1}" 
                        onchange="FavoriteMenusModal.updateFormItem(${idx}, 'qty', this.value)"
                        class="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold">
                </td>
                <td class="py-1.5 px-2">
                    <input type="number" step="any" min="0" value="${row.price !== undefined ? row.price : 0}" 
                        onchange="FavoriteMenusModal.updateFormItem(${idx}, 'price', this.value)"
                        class="w-full px-2 py-1.5 rounded-lg border border-slate-200 text-xs text-center font-bold text-emerald-850">
                </td>
                <td class="py-1.5 px-3 text-right font-bold text-slate-700 text-xs">
                    ${(Number(row.total) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿
                </td>
                <td class="py-1.5 px-2 text-center">
                    <button type="button" onclick="FavoriteMenusModal.removeFormItemRow(${idx})" class="text-slate-300 hover:text-red-600 transition p-1">
                        <i class="fa-solid fa-trash-can text-xs"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        this.calculateFormTotalCost();
    },

    updateFormItem(index, field, val) {
        if (!this.editingItems[index]) return;
        if (field === 'qty' || field === 'price') {
            this.editingItems[index][field] = parseFloat(val) || 0;
        } else {
            this.editingItems[index][field] = val.trim();
        }
        const q = Number(this.editingItems[index].qty) || 0;
        const p = Number(this.editingItems[index].price) || 0;
        this.editingItems[index].total = q * p;

        this.renderFormItemsRows();
    },

    addFormItemRow() {
        this.editingItems.push({ item: "", qty: 1, price: 0, total: 0 });
        this.renderFormItemsRows();
    },

    removeFormItemRow(index) {
        if (this.editingItems.length > index) {
            this.editingItems.splice(index, 1);
            this.renderFormItemsRows();
        }
    },

    calculateFormTotalCost() {
        const grand = this.editingItems.reduce((sum, row) => sum + (Number(row.total) || 0), 0);
        const display = document.getElementById('favMenuFormTotalCostDisplay');
        if (display) display.innerText = grand.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    async saveFormMenu(e) {
        if (e) e.preventDefault();

        const nameInput = document.getElementById('favMenuFormNameInput');
        const name = nameInput ? nameInput.value.trim() : "";

        if (!name) {
            UI.showToast("กรุณาระบุชื่อเมนู", "warning");
            return;
        }

        const validItems = this.editingItems.filter(it => (it.item || "").trim() !== "");
        if (validItems.length === 0) {
            UI.showToast("กรุณาเพิ่มส่วนประกอบอย่างน้อย 1 รายการ", "warning");
            return;
        }

        const totalCost = validItems.reduce((sum, row) => sum + (Number(row.total) || 0), 0);

        const menuData = {
            id: this.editingMenuId,
            name: name,
            items: validItems,
            total_cost: totalCost
        };

        this.closeFormModal();
        UI.showToast("กำลังบันทึกสูตรเมนูยอดฮิต...", "info");

        const res = await FavoriteMenus.save(menuData);
        if (res && res.success) {
            UI.showToast(`บันทึกสูตรเมนู "${name}" เรียบร้อยแล้ว`, "success");
            this.render();
        }
    },

    async deleteMenu(id, name) {
        if (confirm(`คุณต้องการลบเมนู "${name}" ออกจากสูตรยอดฮิตใช่หรือไม่?`)) {
            await FavoriteMenus.delete(id);
            UI.showToast(`ลบเมนู "${name}" เรียบร้อยแล้ว`, "info");
            this.render();
        }
    }
};
