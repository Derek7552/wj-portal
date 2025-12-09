// Tab 切换功能
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 资源搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const resetBtn = document.getElementById('resetBtn');

    // 更新重置按钮显示状态
    function updateResetButton() {
        if (resetBtn && searchInput) {
            if (searchInput.value.trim()) {
                resetBtn.style.display = 'block';
            } else {
                resetBtn.style.display = 'none';
            }
        }
    }

    // 重置搜索
    function resetSearch() {
        if (searchInput) {
            searchInput.value = '';
            performSearch();
            updateResetButton();
        }
    }

    // Tab 切换
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // 如果搜索框有内容，在切换tab后自动应用搜索条件
                if (searchInput && searchInput.value.trim()) {
                    // 使用 setTimeout 确保 DOM 更新后再执行搜索
                    setTimeout(() => {
                        performSearch();
                    }, 0);
                }
            }
        });
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeTabContent = document.querySelector('.tab-content.active');
        
        if (!activeTabContent) return;
        
        const resourceCards = activeTabContent.querySelectorAll('.resource-card');
        const subsectionTitles = activeTabContent.querySelectorAll('.subsection-title');
        
        if (!searchTerm) {
            // 如果搜索为空，显示所有资源和子分类标题
            resourceCards.forEach(card => {
                card.style.display = 'flex';
            });
            subsectionTitles.forEach(title => {
                const grid = title.nextElementSibling;
                if (grid && grid.classList.contains('resources-grid')) {
                    title.style.display = 'block';
                    grid.style.display = 'grid';
                }
            });
            return;
        }

        // 搜索资源标题和描述（仅在当前激活的tab中搜索）
        resourceCards.forEach(card => {
            const title = card.querySelector('.resource-title').textContent.toLowerCase();
            const desc = card.querySelector('.resource-desc').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // 检查每个子分类，如果该分类下所有卡片都被隐藏，则隐藏该分类标题和网格
        subsectionTitles.forEach(title => {
            const grid = title.nextElementSibling;
            if (grid && grid.classList.contains('resources-grid')) {
                const cardsInGrid = grid.querySelectorAll('.resource-card');
                const visibleCards = Array.from(cardsInGrid).filter(card => 
                    card.style.display !== 'none'
                );
                
                if (visibleCards.length === 0) {
                    // 该分类下没有可见的卡片，隐藏标题和网格
                    title.style.display = 'none';
                    grid.style.display = 'none';
                } else {
                    // 该分类下有可见的卡片，显示标题和网格
                    title.style.display = 'block';
                    grid.style.display = 'grid';
                }
            }
        });
        
        // 更新重置按钮显示状态
        updateResetButton();
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetSearch);
    }

    if (searchInput) {
        // 实时搜索：输入时自动触发
        searchInput.addEventListener('input', function() {
            performSearch();
            updateResetButton();
        });
        
        // 回车键也可以触发搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
                updateResetButton();
            }
        });
    }

    // 初始化时检查重置按钮状态
    updateResetButton();
});

