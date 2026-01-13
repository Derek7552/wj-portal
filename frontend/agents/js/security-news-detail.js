/**
 * 安全资讯详情页交互逻辑
 * 包括：日期导航、收藏功能、分享导出等
 */

// ================================
// DOM 元素
// ================================
const dateNavList = document.getElementById('dateNavList');
const collectBtn = document.getElementById('collectBtn');

// ================================
// 模拟数据：15天的资讯数据
// ================================
const mockNewsData = generateMockData();

/**
 * 生成模拟数据（15天）
 */
function generateMockData() {
    const data = [];
    const today = new Date();

    // 文章标题池
    const titles = [
        '2024年第一季度网络安全威胁报告：APT攻击趋势分析',
        '新型勒索软件LockBit 3.0技术分析及防护建议',
        '零信任架构在云安全中的应用实践',
        'CVE-2024-1234漏洞详情及修复方案',
        'AI驱动的安全运营中心（SOC）建设指南',
        '全球最大数据泄露事件：影响超过5亿用户',
        '2024年网络钓鱼攻击趋势与防护策略',
        '工业控制系统安全防护最佳实践',
        '云原生安全：容器与Kubernetes安全指南',
        '移动端恶意软件分析与检测技术',
        '供应链攻击案例分析与防范措施',
        '密码学在区块链安全中的应用',
        '红队演练：模拟APT攻击的实战技巧',
        '安全意识培训：企业员工防护指南',
        '物联网设备安全漏洞挖掘方法',
        '威胁情报共享平台建设与运营',
        'Web应用防火墙(WAF)配置优化指南',
        '数据加密技术选型与实施方案',
        '安全事件响应流程与工具推荐',
        '渗透测试报告撰写规范与模板',
    ];

    // 为每一天生成随机数量的文章
    for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        const dateStr = formatDate(date);
        const articleCount = Math.floor(Math.random() * 5) + 1; // 1-5篇文章
        const articles = [];

        for (let j = 0; j < articleCount; j++) {
            const titleIndex = Math.floor(Math.random() * titles.length);
            articles.push({
                id: `${dateStr}-${j + 1}`,
                title: titles[titleIndex],
                time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`
            });
        }

        data.push({
            date: dateStr,
            displayDate: formatDisplayDate(date, i === 0),
            isToday: i === 0,
            articles: articles
        });
    }

    return data;
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 格式化显示日期
 */
function formatDisplayDate(date, isToday) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];

    if (isToday) {
        return `${month}月${day}日 ${weekday}`;
    }
    return `${month}月${day}日 ${weekday}`;
}

// ================================
// 日期导航功能
// ================================

/**
 * 渲染日期导航列表
 */
function renderDateNavigation() {
    if (!dateNavList) return;

    // 获取当前文章ID（从URL参数或默认第一篇）
    const urlParams = new URLSearchParams(window.location.search);
    const currentArticleId = urlParams.get('id') || mockNewsData[0]?.articles[0]?.id;

    let html = '';

    mockNewsData.forEach((dayData, index) => {
        // 检查当前文章是否在这一天
        const hasCurrentArticle = dayData.articles.some(a => a.id === currentArticleId);
        const isExpanded = hasCurrentArticle || index === 0; // 包含当前文章或第一天默认展开

        html += `
            <div class="date-nav-item ${isExpanded ? 'expanded' : ''}" data-date="${dayData.date}">
                <div class="date-nav-date ${isExpanded ? 'expanded' : ''} ${dayData.isToday ? 'today' : ''}" onclick="toggleDateExpand(this)">
                    <div class="date-nav-date-left">
                        <span class="date-nav-arrow">›</span>
                        <span class="date-nav-date-text">${dayData.displayDate}</span>
                    </div>
                    <div class="date-nav-date-right">
                        <span class="date-nav-count">${dayData.articles.length}篇</span>
                        ${dayData.isToday ? '<span class="date-nav-today-badge">今天</span>' : ''}
                    </div>
                </div>
                <div class="date-nav-articles">
                    ${dayData.articles.map(article => `
                        <a href="?id=${article.id}"
                           class="date-nav-article ${article.id === currentArticleId ? 'active' : ''}"
                           data-id="${article.id}"
                           onclick="selectArticle(event, '${article.id}')">
                            <span class="date-nav-article-indicator"></span>
                            <span class="date-nav-article-title">${article.title}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    });

    dateNavList.innerHTML = html;
}

/**
 * 切换日期展开/折叠
 */
function toggleDateExpand(element) {
    const dateItem = element.closest('.date-nav-item');
    const isExpanded = dateItem.classList.contains('expanded');

    if (isExpanded) {
        dateItem.classList.remove('expanded');
        element.classList.remove('expanded');
    } else {
        dateItem.classList.add('expanded');
        element.classList.add('expanded');
    }
}

/**
 * 选择文章
 */
function selectArticle(event, articleId) {
    event.preventDefault();

    // 更新URL（不刷新页面）
    const newUrl = `${window.location.pathname}?id=${articleId}`;
    history.pushState({ articleId }, '', newUrl);

    // 更新选中状态
    document.querySelectorAll('.date-nav-article').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.date-nav-article[data-id="${articleId}"]`)?.classList.add('active');

    // 加载文章内容（这里是模拟，实际应该是API调用）
    loadArticleContent(articleId);

    // 更新页面标题
    const article = findArticleById(articleId);
    if (article) {
        document.querySelector('.detail-title-main').textContent = article.title;
    }
}

/**
 * 根据ID查找文章
 */
function findArticleById(articleId) {
    for (const dayData of mockNewsData) {
        const article = dayData.articles.find(a => a.id === articleId);
        if (article) return article;
    }
    return null;
}

/**
 * 加载文章内容（模拟）
 */
function loadArticleContent(articleId) {
    // 实际应该是API调用，这里只是更新标题
    const article = findArticleById(articleId);
    if (article) {
        // 滚动到顶部
        document.querySelector('.detail-content')?.scrollTo(0, 0);

        showToast('已切换到: ' + article.title.substring(0, 20) + '...');
    }
}

// ================================
// 收藏功能
// ================================

/**
 * 切换收藏状态
 */
function toggleCollect() {
    if (collectBtn.classList.contains('active')) {
        collectBtn.classList.remove('active');
        collectBtn.querySelector('span:last-child').textContent = '收藏';
        showToast('已取消收藏');
    } else {
        collectBtn.classList.add('active');
        collectBtn.querySelector('span:last-child').textContent = '已收藏';
        showToast('收藏成功');
    }
}

// ================================
// 分享和导出
// ================================

/**
 * 分享资讯
 */
function shareNews() {
    // 复制链接到剪贴板
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('链接已复制，可以分享给好友了');
    }).catch(() => {
        showToast('复制失败，请重试');
    });
}

/**
 * 导出资讯
 */
function exportNews() {
    // 获取文章内容
    const title = document.querySelector('.detail-title').textContent;
    const article = document.querySelector('.detail-article').innerText;

    // 创建文本内容
    const content = `${title}\n\n${article}`;

    // 创建并下载文件
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('导出成功');
}

// ================================
// 工具函数
// ================================

/**
 * 显示提示信息
 */
function showToast(message, duration = 2000) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// ================================
// 事件监听
// ================================

// 收藏按钮
collectBtn?.addEventListener('click', toggleCollect);

// 分享和导出按钮（通过事件委托）
document.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const buttonText = target.textContent.trim();

    if (buttonText.includes('分享')) {
        shareNews();
    } else if (buttonText.includes('导出')) {
        exportNews();
    }
});

// ================================
// 页面加载完成
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('安全资讯详情页加载完成');

    // 渲染日期导航
    renderDateNavigation();

    // 添加toast样式（如果不存在）
    if (!document.querySelector('style[data-toast-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-toast-style', 'true');
        style.textContent = `
            .toast {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                padding: 12px 24px;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});

// ================================
// 导出函数供HTML调用
// ================================

window.toggleDateExpand = toggleDateExpand;
window.selectArticle = selectArticle;
window.toggleCollect = toggleCollect;
window.shareNews = shareNews;
window.exportNews = exportNews;

