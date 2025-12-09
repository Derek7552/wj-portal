/**
 * 信息查看/检索模式 - 交互逻辑
 */

(function() {
    'use strict';

    // DOM元素
    const searchInput = document.getElementById('searchInput');
    const searchReset = document.getElementById('searchReset');
    const sortSelect = document.getElementById('sortSelect');
    const categoryItems = document.querySelectorAll('.category-item');
    const expandableItems = document.querySelectorAll('.category-item-expandable');
    const collectBtns = document.querySelectorAll('.btn-collect');

    // 搜索功能
    if (searchInput && searchReset) {
        // 输入变化时显示/隐藏清除按钮
        searchInput.addEventListener('input', function() {
            if (this.value.trim()) {
                searchReset.style.display = 'block';
            } else {
                searchReset.style.display = 'none';
            }
        });

        // 清除搜索
        searchReset.addEventListener('click', function() {
            searchInput.value = '';
            searchReset.style.display = 'none';
            searchInput.focus();
            // 这里可以触发搜索重置
            console.log('搜索已清除');
        });

        // 搜索提交（回车）
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const keyword = this.value.trim();
                if (keyword) {
                    console.log('搜索关键词:', keyword);
                    // 这里可以调用搜索API
                }
            }
        });
    }

    // 排序功能
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            console.log('排序方式:', sortType);
            // 这里可以调用排序API
        });
    }

    // 分类筛选
    categoryItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 如果是可展开项，切换展开状态
            if (this.classList.contains('category-item-expandable')) {
                const parent = this.closest('.category-item-parent');
                parent.classList.toggle('expanded');
                return;
            }

            // 移除同组的其他激活状态
            const group = this.closest('.category-list');
            if (group) {
                group.querySelectorAll('.category-item').forEach(function(other) {
                    other.classList.remove('active');
                });
            }

            // 激活当前项
            this.classList.add('active');

            // 获取分类信息
            const category = this.dataset.category || this.dataset.source;
            console.log('选择分类:', category);
            // 这里可以调用筛选API
        });
    });

    // 子分类筛选
    const subItems = document.querySelectorAll('.category-sub-item');
    subItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // 移除同组的其他激活状态
            const parent = this.closest('.category-sub-list');
            if (parent) {
                parent.querySelectorAll('.category-sub-item').forEach(function(other) {
                    other.classList.remove('active');
                });
            }

            // 激活当前项
            this.classList.add('active');

            // 获取来源信息
            const source = this.dataset.source;
            console.log('选择来源:', source);
            // 这里可以调用筛选API
        });
    });

    // 收藏功能
    collectBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡到卡片

            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                console.log('已收藏');
                // 这里可以调用收藏API
            } else {
                console.log('取消收藏');
                // 这里可以调用取消收藏API
            }
        });
    });

    // 结果卡片点击
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // 查找卡片内的链接
            const link = this.querySelector('.result-title a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });

    // 分页功能
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const paginationPages = document.querySelectorAll('.pagination-page');

    paginationBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (this.disabled) return;

            const text = this.textContent.trim();
            console.log('分页按钮:', text);
            // 这里可以调用分页API
        });
    });

    paginationPages.forEach(function(page) {
        page.addEventListener('click', function() {
            // 移除所有激活状态
            paginationPages.forEach(function(p) {
                p.classList.remove('active');
            });

            // 激活当前页
            this.classList.add('active');

            const pageNum = this.textContent.trim();
            console.log('跳转到第', pageNum, '页');
            // 这里可以调用分页API
        });
    });

    // 初始化：展开第一个可展开分类（可选）
    // const firstExpandable = document.querySelector('.category-item-parent');
    // if (firstExpandable) {
    //     firstExpandable.classList.add('expanded');
    // }

})();
