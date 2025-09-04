// 用戶認證系統
const users = JSON.parse(localStorage.getItem('users')) || [];

// 檢查登入狀態
function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedIn();
    }
}

// 顯示登入模態框
function showLoginModal() {
    console.log('顯示登入視窗');
    // 實際的模態框邏輯
}

// 登入功能
function login(type) {
    console.log(`使用 ${type} 登入`);
    // 登入邏輯
}

// 登出
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedOut();
    showNotification('已安全登出');
}

// 更新UI - 已登入
function updateUIForLoggedIn() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
}

// 更新UI - 未登入
function updateUIForLoggedOut() {
    const loginBtn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
}