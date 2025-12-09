// Dashboard 页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化用户信息
    initUserInfo();
    
    // 初始化收藏功能
    initFavorites();
    
    // 初始化公告滚动
    initAnnouncementScroll();
    
    // 初始化退出登录
    initLogout();
    
    // 初始化侧边栏展开/收起功能
    initSidebarToggle();
    
    // 初始化首页菜单位置
    initHomeMenuPosition();
});

// 初始化侧边栏展开/收起功能
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    
    if (!sidebar || !toggleBtn) return;
    
    // 从localStorage读取状态
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
    }
    
    // 点击切换按钮
    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        // 保存状态到localStorage
        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
    });
}

// 初始化用户信息
function initUserInfo() {
    const userEmail = localStorage.getItem('userEmail') || 'test@seccortex.com';
    const userName = localStorage.getItem('userName') || getUserNameFromEmail(userEmail);
    
    // 更新用户名
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    // 更新头像（显示用户名首字母）
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        const firstChar = userName.charAt(0).toUpperCase();
        userAvatar.textContent = firstChar;
    }
}

// 从邮箱获取用户名（如果没有设置用户名）
function getUserNameFromEmail(email) {
    if (!email) return '用户';
    const name = email.split('@')[0];
    // 将邮箱前缀转换为友好的用户名
    return name.charAt(0).toUpperCase() + name.slice(1) + '用户';
}

// 初始化公告滚动
function initAnnouncementScroll() {
    const content = document.getElementById('announcementContent');
    if (!content) return;
    
    const items = content.querySelectorAll('.announcement-item');
    if (items.length < 2) return;
    
    // 计算单个项目高度（包括间距）
    const firstItem = items[0];
    const itemHeight = firstItem.offsetHeight + 12; // 12px 是 gap
    const totalItems = items.length;
    const realItems = totalItems - 1; // 减去重复的最后一项
    
    // 计算需要滚动的距离（滚动到倒数第二项，然后无缝跳回）
    const scrollDistance = itemHeight * realItems;
    
    // 创建动画样式
    const styleId = 'announcement-scroll-style';
    let style = document.getElementById(styleId);
    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }
    
    // 设置动画，每个项目显示4秒
    const duration = realItems * 4;
    const keyframePercent = (realItems / totalItems) * 100;
    
    style.textContent = `
        @keyframes scrollAnnouncements {
            0% {
                transform: translateY(0);
            }
            ${keyframePercent}% {
                transform: translateY(-${scrollDistance}px);
            }
            100% {
                transform: translateY(-${scrollDistance}px);
            }
        }
        .announcement-content {
            animation: scrollAnnouncements ${duration}s linear infinite;
        }
        .announcement-content:hover {
            animation-play-state: paused;
        }
    `;
}

// 初始化退出登录
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // 清除登录状态
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('favorites');
            localStorage.removeItem('favoriteData');
            
            // 跳转到 portal 首页
            window.location.href = 'index.html';
        });
    }
}

// 收藏功能
function initFavorites() {
    // 从 localStorage 读取收藏列表
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // 更新所有卡片的收藏状态
    document.querySelectorAll('.agent-card').forEach(card => {
        const cardId = card.dataset.id;
        const favoriteBtn = card.querySelector('.card-favorite');
        if (!favoriteBtn) return;
        
        const isFavorite = favorites.includes(cardId);
        
        if (isFavorite) {
            favoriteBtn.classList.add('active');
            favoriteBtn.dataset.favorite = 'true';
        } else {
            favoriteBtn.classList.remove('active');
            favoriteBtn.dataset.favorite = 'false';
        }
    });
    
    // 更新"我的收藏"列表
    updateFavoritesList();
    
    // 更新首页菜单中的收藏列表
    updateHomeMenuFavorites();
    
    // 使用事件委托绑定收藏按钮点击事件（在容器级别）
    const agentsGrid = document.getElementById('agentsGrid');
    if (agentsGrid) {
        agentsGrid.addEventListener('click', function(e) {
            // 检查是否点击的是收藏按钮或其子元素
            const favoriteBtn = e.target.closest('.card-favorite');
            if (favoriteBtn) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                toggleFavorite(favoriteBtn);
                return false;
            }
        }, true); // 使用捕获阶段，确保优先处理
    }
}

function toggleFavorite(btn) {
    if (!btn) return;
    
    const card = btn.closest('.agent-card');
    if (!card) return;
    
    const cardId = card.dataset.id;
    const cardName = card.dataset.name;
    const cardIconEl = card.querySelector('.card-icon');
    
    if (!cardId || !cardName || !cardIconEl) return;
    
    const cardIcon = cardIconEl.textContent.trim();
    const isFavorite = btn.dataset.favorite === 'true';
    
    // 获取收藏列表
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let favoriteData = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    
    if (isFavorite) {
        // 取消收藏
        favorites = favorites.filter(id => id !== cardId);
        delete favoriteData[cardId];
        btn.classList.remove('active');
        btn.dataset.favorite = 'false';
    } else {
        // 添加收藏
        if (!favorites.includes(cardId)) {
            favorites.push(cardId);
        }
        favoriteData[cardId] = {
            name: cardName,
            icon: cardIcon
        };
        btn.classList.add('active');
        btn.dataset.favorite = 'true';
    }
    
    // 保存到 localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('favoriteData', JSON.stringify(favoriteData));
    
    // 更新"我的收藏"列表
    updateFavoritesList();
    
    // 更新首页菜单中的收藏列表
    updateHomeMenuFavorites();
}

function updateFavoritesList() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteData = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    const favoritesItems = document.getElementById('favoritesItems');
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    
    if (favorites.length === 0) {
        if (favoritesItems) favoritesItems.innerHTML = '';
        if (favoritesEmpty) favoritesEmpty.style.display = 'block';
    } else {
        if (favoritesEmpty) favoritesEmpty.style.display = 'none';
        if (favoritesItems) {
            favoritesItems.innerHTML = favorites.map(cardId => {
                const data = favoriteData[cardId];
                if (!data) return '';
                return `
                    <div class="favorite-item" data-id="${cardId}">
                        <span class="favorite-item-icon">${data.icon}</span>
                        <span class="favorite-item-name">${data.name}</span>
                    </div>
                `;
            }).join('');
            
            // 绑定点击事件
            favoritesItems.querySelectorAll('.favorite-item').forEach(item => {
                item.addEventListener('click', function() {
                    const cardId = this.dataset.id;
                    const card = document.querySelector(`.agent-card[data-id="${cardId}"]`);
                    if (card) {
                        const useBtn = card.querySelector('.btn-primary');
                        if (useBtn) {
                            useBtn.click();
                        }
                    }
                });
            });
        }
    }
    
    // 更新首页菜单中的收藏列表
    updateHomeMenuFavorites();
}

// 更新首页菜单中的收藏列表
function updateHomeMenuFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteData = JSON.parse(localStorage.getItem('favoriteData') || '{}');
    const homeMenuFavoritesList = document.getElementById('homeMenuFavoritesList');
    const homeMenuFavoritesEmpty = document.getElementById('homeMenuFavoritesEmpty');
    
    if (!homeMenuFavoritesList || !homeMenuFavoritesEmpty) return;
    
    if (favorites.length === 0) {
        homeMenuFavoritesList.innerHTML = '';
        homeMenuFavoritesEmpty.style.display = 'block';
    } else {
        homeMenuFavoritesEmpty.style.display = 'none';
        homeMenuFavoritesList.innerHTML = favorites.map(cardId => {
            const data = favoriteData[cardId];
            if (!data) return '';
            const url = getAgentUrl(cardId);
            return `
                <a href="${url}" class="home-menu-favorite-item" data-id="${cardId}">
                    <span class="home-menu-favorite-icon">${data.icon}</span>
                    <span class="home-menu-favorite-name">${data.name}</span>
                </a>
            `;
        }).join('');
    }
}

// 获取智能体URL
function getAgentUrl(cardId) {
    const urlMap = {
        '1': 'dashboard.html', // AI漏洞猎人
        '2': 'dashboard.html', // 安全论文检索
        '3': 'agent-news.html', // 安全资讯
        '4': 'agent-knowledge.html', // 安全智库
        '5': 'agent-defect.html', // 缺陷研判
        '6': 'dashboard.html' // 论文翻译
    };
    return urlMap[cardId] || 'dashboard.html';
}

// 初始化首页菜单位置
function initHomeMenuPosition() {
    const homeWrapper = document.querySelector('.nav-item-home-wrapper');
    const homeMenu = document.getElementById('homeMenu');
    const homeNavItem = document.querySelector('.nav-item-home');
    
    if (!homeWrapper || !homeMenu || !homeNavItem) return;
    
    // 监听侧边栏收起/展开
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const updateMenuPosition = () => {
            if (sidebar.classList.contains('collapsed')) {
                const navItemRect = homeNavItem.getBoundingClientRect();
                homeMenu.style.position = 'fixed';
                homeMenu.style.left = '64px';
                homeMenu.style.top = navItemRect.top + 'px';
            } else {
                homeMenu.style.position = '';
                homeMenu.style.left = '';
                homeMenu.style.top = '';
            }
        };
        
        // 监听侧边栏状态变化
        const observer = new MutationObserver(updateMenuPosition);
        observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
        
        // 监听窗口大小变化
        window.addEventListener('resize', updateMenuPosition);
        
        // 监听hover事件，更新菜单位置
        homeWrapper.addEventListener('mouseenter', updateMenuPosition);
        
        // 初始更新
        updateMenuPosition();
    }
}


