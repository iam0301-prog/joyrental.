// 主要應用程式邏輯
let currentUser = null;
let currentProperties = [];
let selectedTags = [];

// 初始化應用程式
function initApp() {
    console.log('JoyRental 啟動中...');
    
    // 檢查登入狀態
    checkLoginStatus();
    
    // 載入主題設定
    loadThemeSettings();
    
    // 渲染頁面內容
    renderHomePage();
    renderServices();
    renderProperties();
    
    // 載入城市選項
    loadCities();
    
    // 載入房源資料
    currentProperties = [...PROPERTY_DATA];
    displayProperties();
    
    // 隱藏載入畫面
    setTimeout(() => {
        const splash = document.getElementById('splashScreen');
        if (splash) {
            splash.style.display = 'none';
        }
    }, 2500);
}

// 渲染首頁
function renderHomePage() {
    const homeHTML = `
        <section class="hero" id="home">
            <div class="hero-content">
                <h1>🌟 平安喜樂 找到心靈的家</h1>
                <p>AI智能配對 × 360°環景看房 × 社群互動評價</p>
                
                <div class="search-filter-container">
                    <div class="search-box">
                        <input type="text" class="search-input" id="searchInput" placeholder="輸入地區、社區或關鍵字...">
                        <button class="search-btn" onclick="searchProperties()">🔍 智能搜尋</button>
                    </div>
                    
                    <div class="filter-section">
                        <div class="filter-group">
                            <label class="filter-label">地區</label>
                            <select class="filter-select" id="areaFilter" onchange="filterProperties()">
                                <option value="">所有地區</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">租金範圍</label>
                            <select class="filter-select" id="priceFilter" onchange="filterProperties()">
                                <option value="">不限</option>
                                <option value="0-10000">10,000以下</option>
                                <option value="10000-20000">10,000-20,000</option>
                                <option value="20000-30000">20,000-30,000</option>
                                <option value="30000-999999">30,000以上</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="filter-label">房型</label>
                            <select class="filter-select" id="typeFilter" onchange="filterProperties()">
                                <option value="">不限</option>
                                <option value="套房">套房</option>
                                <option value="雅房">雅房</option>
                                <option value="1房">1房</option>
                                <option value="2房">2房</option>
                                <option value="3房">3房</option>
                                <option value="整層">整層</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = homeHTML;
    }
}

// 渲染房源區
function renderProperties() {
    const propertiesHTML = `
        <section class="properties" id="properties">
            <h2 class="section-title">精選房源</h2>
            <div class="property-grid" id="propertyGrid"></div>
        </section>
    `;
    
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML += propertiesHTML;
    }
}

// 載入城市選項
function loadCities() {
    const areaFilter = document.getElementById('areaFilter');
    if (!areaFilter) return;
    
    // 載入所有城市的區域
    Object.entries(CONFIG.cities).forEach(([city, districts]) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = city;
        
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            optgroup.appendChild(option);
        });
        
        areaFilter.appendChild(optgroup);
    });
}

// 顯示房源
function displayProperties(propertiesToShow = currentProperties) {
    const grid = document.getElementById('propertyGrid');
    if (!grid) return;
    
    if (propertiesToShow.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;">沒有符合條件的房源</div>';
        return;
    }
    
    grid.innerHTML = propertiesToShow.map(property => `
        <div class="property-card" onclick="viewPropertyDetail(${property.id})">
            <div class="property-image" style="background-image: url('${property.image}')">
                <span class="property-badge">${property.badge}</span>
                <span class="view-360" onclick="event.stopPropagation(); open360View(${property.id})">
                    📷 360°
                </span>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">📍 ${property.location}</div>
                <div class="property-features">
                    ${property.features.slice(0, 3).map(f => 
                        `<span class="feature-tag">${f}</span>`
                    ).join('')}
                </div>
                <div class="property-footer">
                    <span class="property-price">$${property.price.toLocaleString()}/月</span>
                    <button class="view-btn">查看詳情</button>
                </div>
            </div>
        </div>
    `).join('');
}

// 搜尋房源
function searchProperties() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        displayProperties(PROPERTY_DATA);
        return;
    }
    
    const filtered = PROPERTY_DATA.filter(p => 
        p.title.toLowerCase().includes(searchTerm) ||
        p.location.toLowerCase().includes(searchTerm) ||
        p.features.some(f => f.toLowerCase().includes(searchTerm))
    );
    
    displayProperties(filtered);
    showNotification(`找到 ${filtered.length} 個符合的房源`);
}

// 篩選房源
function filterProperties() {
    let filtered = [...PROPERTY_DATA];
    
    const area = document.getElementById('areaFilter').value;
    if (area) {
        filtered = filtered.filter(p => p.area === area);
    }
    
    const priceRange = document.getElementById('priceFilter').value;
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }
    
    const type = document.getElementById('typeFilter').value;
    if (type) {
        filtered = filtered.filter(p => p.type === type);
    }
    
    displayProperties(filtered);
}

// 查看房源詳情
function viewPropertyDetail(id) {
    const property = PROPERTY_DATA.find(p => p.id === id);
    if (!property) return;
    
    showNotification(`載入 ${property.title} 詳情中...`);
    // 這裡可以開發詳細頁面
}

// 開啟360度視圖
function open360View(id) {
    const property = PROPERTY_DATA.find(p => p.id === id);
    if (!property) return;
    
    showNotification('360度環景功能開發中...');
}

// 載入主題設定
function loadThemeSettings() {
    const savedTheme = localStorage.getItem('theme') || CONFIG.defaultTheme;
    setTheme(savedTheme);
}

// 設定主題
function setTheme(theme) {
    document.body.className = `theme-${theme} font-normal`;
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.theme-btn.${theme}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    localStorage.setItem('theme', theme);
}

// 顯示通知
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// DOM載入完成後執行
document.addEventListener('DOMContentLoaded', initApp);