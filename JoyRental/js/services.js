// 一站式服務功能
function renderServices() {
    const servicesHTML = `
        <section class="services" id="services">
            <div class="services-container">
                <h2 class="section-title">🏆 革命性一站式服務</h2>
                <p class="section-subtitle">從找房到入住，從繳租到報稅，全程為您服務</p>
                <div class="service-grid" id="serviceGrid"></div>
            </div>
        </section>
    `;
    
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML += servicesHTML;
        loadServiceCards();
    }
}

function loadServiceCards() {
    const serviceGrid = document.getElementById('serviceGrid');
    if (!serviceGrid) return;
    
    const services = [
        { key: 'accounting', icon: '💰', title: '自動對帳', desc: '房租收支管理', badge: '省時90%' },
        { key: 'reminder', icon: '⏰', title: '繳租提醒', desc: 'LINE自動通知', badge: '0逾期' },
        { key: 'subsidy', icon: '🏛️', title: '租屋補助', desc: '一鍵申請', badge: '最高$8000' },
        { key: 'tax', icon: '📋', title: '自動報稅', desc: '租金扣除', badge: '合法節稅' },
        { key: 'contract', icon: '📄', title: '線上簽約', desc: '電子合約', badge: '安全' },
        { key: 'invoice', icon: '🧾', title: '電子發票', desc: '自動開立', badge: '便利' },
        { key: 'repair', icon: '🔧', title: '維修媒合', desc: '24H服務', badge: '快速' },
        { key: 'moving', icon: '📦', title: '搬家優惠', desc: '會員專屬', badge: '省錢' }
    ];
    
    serviceGrid.innerHTML = services.map(service => `
        <div class="service-card" onclick="openServiceDetail('${service.key}')">
            <span class="service-icon">${service.icon}</span>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-desc">${service.desc}</p>
            <span class="service-badge">${service.badge}</span>
        </div>
    `).join('');
}

function openServiceDetail(serviceKey) {
    const service = SERVICE_DATA[serviceKey];
    if (!service) {
        showNotification('服務資訊載入中...');
        return;
    }
    
    // 建立詳細說明視窗
    const modalHTML = `
        <div class="modal active" id="serviceDetailModal">
            <div class="modal-content" style="max-width: 600px;">
                <button class="close-modal" onclick="closeServiceDetail()">×</button>
                <div style="background: white; border-radius: 20px; padding: 40px;">
                    <h3>${service.title}</h3>
                    <ul style="margin: 20px 0;">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <p style="color: var(--accent); font-weight: bold; margin: 20px 0;">
                        ${service.highlight}
                    </p>
                    <button onclick="startService('${serviceKey}')" style="
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 25px;
                        font-size: 16px;
                        cursor: pointer;
                        width: 100%;
                    ">立即使用此服務</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeServiceDetail() {
    const modal = document.getElementById('serviceDetailModal');
    if (modal) {
        modal.remove();
    }
}

function startService(serviceKey) {
    closeServiceDetail();
    showNotification(`${serviceKey} 功能開發中，敬請期待！`);
}