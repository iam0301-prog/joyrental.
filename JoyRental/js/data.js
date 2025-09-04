// 房源資料庫
const PROPERTY_DATA = [
    {
        id: 1,
        title: "陽光療癒套房",
        location: "板橋區 幸福社區",
        area: "板橋區",
        mrt: "板橋站",
        price: 15000,
        size: 12,
        type: "套房",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        panorama: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000",
        features: ["近捷運", "可養寵物", "陽台", "管理室", "新裝潢"],
        badge: "熱門",
        description: "溫馨舒適的套房，採光良好，生活機能便利",
        landlord: {
            name: "王先生",
            phone: "0912-345-678",
            rating: 4.8
        }
    },
    {
        id: 2,
        title: "極簡風格公寓",
        location: "信義區 都心首選",
        area: "信義區",
        mrt: "市政府站",
        price: 28000,
        size: 25,
        type: "2房",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        panorama: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=2000",
        features: ["新裝潢", "健身房", "停車位", "電梯", "垃圾代收"],
        badge: "推薦",
        description: "現代簡約設計，高樓層視野佳",
        landlord: {
            name: "李小姐",
            phone: "0923-456-789",
            rating: 4.9
        }
    },
    {
        id: 3,
        title: "文青小屋",
        location: "大安區 靜巷雅居",
        area: "大安區",
        mrt: "古亭站",
        price: 12000,
        size: 8,
        type: "雅房",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
        panorama: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000",
        features: ["採光佳", "近咖啡廳", "安靜", "可開伙"],
        badge: "新上架",
        description: "適合單身或學生，周邊文藝氣息濃厚",
        landlord: {
            name: "張太太",
            phone: "0934-567-890",
            rating: 4.7
        }
    },
    {
        id: 4,
        title: "現代簡約一房",
        location: "中正區 市中心",
        area: "中正區",
        mrt: "台北車站",
        price: 22000,
        size: 18,
        type: "1房",
        image: "https://images.unsplash.com/photo-1522444690501-8c1f28b5e0b0?w=800",
        panorama: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000",
        features: ["電梯", "管理室", "近捷運5分鐘", "洗衣機"],
        badge: "優選",
        description: "交通極為便利，生活機能完善",
        landlord: {
            name: "陳先生",
            phone: "0945-678-901",
            rating: 4.6
        }
    },
    {
        id: 5,
        title: "溫馨三房家庭",
        location: "新店區 學區住宅",
        area: "新店區",
        mrt: "",
        price: 35000,
        size: 35,
        type: "3房",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        panorama: "https://images.unsplash.com/photo-1600607688066-890987f18a86?w=2000",
        features: ["近學校", "含車位", "陽台", "可養寵物", "含水電"],
        badge: "家庭首選",
        description: "適合小家庭，鄰近明星學區",
        landlord: {
            name: "林太太",
            phone: "0956-789-012",
            rating: 4.9
        }
    }
];

// 一站式服務資料
const SERVICE_DATA = {
    accounting: {
        title: '💰 自動對帳系統',
        features: [
            '每月房租收支自動記錄',
            '銀行帳戶智能對帳',
            '押金管理與退還追蹤',
            '水電費分攤計算',
            '月結年結財務報表',
            '異常提醒即時通知'
        ],
        highlight: '每月節省10小時記帳時間！'
    },
    reminder: {
        title: '⏰ 智能繳租提醒',
        features: [
            'LINE官方帳號整合',
            '繳租前7天、3天、1天提醒',
            '可設定提醒時間',
            '自動發送催繳通知',
            '房東確認收款通知',
            '完整繳費歷史查詢'
        ],
        highlight: '0逾期繳租，維持良好信用！'
    },
    subsidy: {
        title: '🏛️ 政府租屋補助申請',
        features: [
            '300億租金補貼：單身最高$4,000/月',
            '新婚家庭：最高$5,000/月',
            '育兒家庭：最高$8,000/月',
            '青年補助：18-35歲專案優惠',
            '快速檢查申請資格',
            '一鍵準備所需文件',
            '申請進度即時查詢'
        ],
        highlight: '平均每戶年省$36,000！'
    },
    tax: {
        title: '📋 自動報稅服務',
        features: [
            '房東租金收入自動計算',
            '房客租金支出列舉扣除',
            '每年12萬租金扣除額',
            '電子發票自動整理',
            '預估應繳稅額',
            'Step by step教學'
        ],
        highlight: '合法節稅，年省數千元！'
    }
};