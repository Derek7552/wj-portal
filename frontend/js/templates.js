/**
 * 模板展示页面交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // 模板分类筛选
    const navBtns = document.querySelectorAll('.template-nav-btn');
    const templateCards = document.querySelectorAll('.template-card');

    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;

            // 更新按钮激活状态
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 筛选模板卡片
            templateCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = '';
                    // 重新触发动画
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 添加卡片点击统计（可选）
    templateCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的不是预览按钮，则记录卡片点击
            if (!e.target.closest('.template-overlay')) {
                const templateTitle = this.querySelector('.template-title').textContent;
                console.log('Template card clicked:', templateTitle);
                // 这里可以添加统计代码
            }
        });
    });

    // 预览按钮点击事件
    const previewBtns = document.querySelectorAll('.template-overlay .btn');
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const templateTitle = this.closest('.template-card').querySelector('.template-title').textContent;
            console.log('Preview template:', templateTitle);
            // 统计预览点击
        });
    });
});
