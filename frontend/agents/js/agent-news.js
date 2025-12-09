// 安全资讯智能体页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化左侧分类导航
    initCategoryNav();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化侧边栏展开/收起功能
    initSidebarToggle();
    
    // 初始化收藏功能（使用dashboard.js中的函数）
    if (typeof window.initFavorites === 'function') {
        window.initFavorites();
    }
    
    // 初始化首页菜单位置（使用dashboard.js中的函数）
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }
});

// 初始化侧边栏展开/收起功能（安全资讯页：默认收起且不支持展开）
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    
    if (!sidebar) return;
    
    // 安全资讯页：强制收起，不允许展开
    sidebar.classList.add('collapsed');
    
    // 移除展开/收起按钮（如果存在）
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
        toggleBtn.style.display = 'none';
    }
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('newsSearchInput');
    const resetBtn = document.getElementById('newsSearchReset');
    
    if (!searchInput) return;
    
    // 实时搜索
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        performSearch(searchTerm);
        toggleResetButton(searchTerm);
    });
    
    // 重置按钮
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            searchInput.value = '';
            performSearch('');
            toggleResetButton('');
        });
    }
}

// 执行搜索（结合分类和来源筛选）
function performSearch(searchTerm) {
    applyFilters();
}

// 切换重置按钮显示
function toggleResetButton(searchTerm) {
    const resetBtn = document.getElementById('newsSearchReset');
    if (resetBtn) {
        resetBtn.style.display = searchTerm ? 'block' : 'none';
    }
}

// 初始化左侧分类导航
function initCategoryNav() {
    const categoryItems = document.querySelectorAll('.category-item[data-category]');
    const sourceItems = document.querySelectorAll('.category-item[data-source]');
    
    // 资讯专题分类
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            categoryItems.forEach(i => i.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // 应用综合筛选（分类 + 来源 + 搜索）
            applyFilters();
        });
    });
    
    // 资讯来源分类（父级分类，可展开）
    const sourceParents = document.querySelectorAll('.category-item-parent[data-source-type]');
    sourceParents.forEach(parent => {
        const parentItem = parent.querySelector('.category-item');
        const subItems = parent.querySelectorAll('.category-sub-item');
        
        // 点击父级分类，展开/收起子分类
        parentItem.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 切换展开状态
            parent.classList.toggle('expanded');
            
            // 如果点击的是父级，选中父级并筛选
            if (!parent.classList.contains('expanded')) {
                // 收起时，移除所有活动状态
                sourceItems.forEach(i => i.classList.remove('active'));
                subItems.forEach(i => i.classList.remove('active'));
                // 选中父级
                this.classList.add('active');
                
                // 应用综合筛选
                applyFilters();
            }
        });
        
        // 点击子分类
        subItems.forEach(subItem => {
            subItem.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 移除所有活动状态
                sourceItems.forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.category-sub-item').forEach(i => i.classList.remove('active'));
                
                // 添加当前活动状态
                this.classList.add('active');
                parentItem.classList.add('active');
                
                // 确保父级展开
                parent.classList.add('expanded');
                
                applyFilters();
            });
        });
    });
    
    // 全部来源
    const allSourceItem = document.querySelector('.category-item[data-source="all"]');
    if (allSourceItem) {
        allSourceItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            sourceItems.forEach(i => i.classList.remove('active'));
            document.querySelectorAll('.category-sub-item').forEach(i => i.classList.remove('active'));
            sourceParents.forEach(p => p.classList.remove('expanded'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            applyFilters();
        });
    }
}

// 同步左侧导航状态
function syncCategoryNav(filter, type) {
    if (type === 'category') {
        const categoryItems = document.querySelectorAll('.category-item[data-category]');
        categoryItems.forEach(item => {
            if (item.dataset.category === filter) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// 应用分类和来源筛选（结合搜索）
function applyFilters() {
    const activeCategory = document.querySelector('.category-item[data-category].active')?.dataset.category || 'all';
    const activeSource = document.querySelector('.category-item[data-source].active, .category-sub-item.active')?.dataset.source || 'all';
    const searchTerm = document.getElementById('newsSearchInput')?.value.trim().toLowerCase() || '';
    
    const newsCards = document.querySelectorAll('.news-card');
    let visibleCount = 0;
    
    newsCards.forEach(card => {
        // 分类筛选
        const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
        
        // 来源筛选
        const sourceMatch = activeSource === 'all' || card.dataset.source === activeSource;
        
        // 搜索筛选
        const title = card.querySelector('.news-title')?.textContent?.toLowerCase() || '';
        const summary = card.querySelector('.news-summary')?.textContent?.toLowerCase() || '';
        const tag = card.querySelector('.news-tag')?.textContent?.toLowerCase() || '';
        const searchMatch = searchTerm === '' || 
            title.includes(searchTerm) || 
            summary.includes(searchTerm) || 
            tag.includes(searchTerm);
        
        if (categoryMatch && sourceMatch && searchMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 显示/隐藏无结果提示
    const newsList = document.querySelector('.news-list');
    if (newsList) {
        let noResults = newsList.querySelector('.no-results');
        if (visibleCount === 0 && (activeCategory !== 'all' || activeSource !== 'all' || searchTerm !== '')) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<p>未找到相关资讯</p><p style="font-size: 14px; color: var(--text-secondary); margin-top: 8px;">请尝试调整筛选条件</p>';
                newsList.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }
}

