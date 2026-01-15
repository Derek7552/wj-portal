/**
 * 安全资讯详情页 V3 交互逻辑
 * 三栏布局：左侧文章列表 | 中间阅读区 | 右侧日期+分类筛选
 */

// ================================
// DOM 元素
// ================================
const articleListContent = document.getElementById('articleListContent');
const articleCount = document.getElementById('articleCount');
const articleListTitle = document.getElementById('articleListTitle');
const dateList = document.getElementById('dateList');
const collectBtn = document.getElementById('collectBtn');
const filterPanelToggle = document.getElementById('filterPanelToggle');
const filterNavPanel = document.querySelector('.filter-nav-panel');

// ================================
// 全局状态
// ================================
let currentDate = null;
let currentCategory = '全部';
let allArticles = [];
let filteredArticles = [];

// ================================
// 模拟数据生成
// ================================

/**
 * 生成模拟数据（15天）
 */
function generateMockData() {
    const data = [];
    const today = new Date();

    // 分类列表
    const categories = [
        { id: 'all', name: '全部', icon: '📑' },
        { id: 'tech', name: '技术研究', icon: '🔬' },
        { id: 'threat', name: '安全威胁', icon: '⚠️' },
        { id: 'activity', name: '重要活动', icon: '📅' },
        { id: 'policy', name: '政策法规', icon: '📜' },
        { id: 'industry', name: '行业动态', icon: '📊' },
        { id: 'vulnerability', name: '漏洞通告', icon: '🔓' },
        { id: 'product', name: '产品方案', icon: '📦' },
        { id: 'analysis', name: '深度分析', icon: '🔍' },
        { id: 'news', name: '安全快讯', icon: '📰' }
    ];

    // 文章标题池（按分类）
    const articlesByCategory = {
        tech: [
            '零信任架构在云安全中的应用实践',
            'AI驱动的安全运营中心（SOC）建设指南',
            '云原生安全：容器与Kubernetes安全指南',
            '密码学在区块链安全中的应用',
            'Web应用防火墙(WAF)配置优化指南'
        ],
        threat: [
            '2024年第一季度网络安全威胁报告：APT攻击趋势分析',
            '新型勒索软件LockBit 3.0技术分析及防护建议',
            '全球最大数据泄露事件：影响超过5亿用户',
            '2024年网络钓鱼攻击趋势与防护策略',
            '移动端恶意软件分析与检测技术'
        ],
        activity: [
            '2024网络安全大会即将召开',
            'RSA 2024大会精彩回顾',
            '国家网络安全宣传周活动启动',
            '第十届互联网安全大会（ISC）议程发布'
        ],
        vulnerability: [
            'CVE-2024-1234漏洞详情及修复方案',
            '物联网设备安全漏洞挖掘方法',
            'Apache Struts2高危漏洞预警',
            'Windows最新安全补丁发布'
        ],
        industry: [
            '工业控制系统安全防护最佳实践',
            '供应链攻击案例分析与防范措施',
            '威胁情报共享平台建设与运营',
            '数据加密技术选型与实施方案'
        ],
        analysis: [
            '红队演练：模拟APT攻击的实战技巧',
            '安全事件响应流程与工具推荐',
            '渗透测试报告撰写规范与模板',
            'SIEM系统建设与运营指南'
        ],
        news: [
            '某知名企业遭受DDoS攻击',
            '新型钓鱼网站大量出现',
            '国际黑客组织被成功打击',
            '金融行业安全事件通报'
        ]
    };

    // 为每一天生成文章
    for (let i = 0; i < 15; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = formatDate(date);

        data.push({
            date: dateStr,
            displayDate: formatDisplayDate(date, i === 0),
            isToday: i === 0
        });
    }

    // 生成文章列表（每天约50+篇）
    const articles = [];
    let articleId = 1;

    for (let i = 0; i < 15; i++) {
        const dateStr = data[i].date;
        const articlesPerDay = Math.floor(Math.random() * 15) + 50;

        for (let j = 0; j < articlesPerDay; j++) {
            const categoryKeys = Object.keys(articlesByCategory);
            const randomCatKey = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
            const categoryTitles = articlesByCategory[randomCatKey];
            const randomTitle = categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
            const category = categories.find(c => c.id === randomCatKey);

            articles.push({
                id: articleId++,
                title: randomTitle,
                date: dateStr,
                time: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                category: category.name,
                categoryId: category.id,
                categoryIcon: category.icon,
                source: ['FreeBuf', '安全牛', '安全客', '奇安信', '360安全'][Math.floor(Math.random() * 5)]
            });
        }
    }

    return { dates: data, categories, articles };
}

const mockData = generateMockData();
allArticles = mockData.articles;

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
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ================================
// 渲染函数
// ================================

/**
 * 渲染日期列表（含内嵌分类）
 */
function renderDateList() {
    if (!dateList) return;

    let html = '';

    mockData.dates.forEach((dateData) => {
        const articlesInDate = allArticles.filter(a => a.date === dateData.date);
        const isActive = currentDate === dateData.date;
        const isExpanded = currentDate === dateData.date;

        let categoryHtml = '';
        mockData.categories.forEach(category => {
            let count = 0;
            if (category.id === 'all') {
                count = articlesInDate.length;
            } else {
                count = articlesInDate.filter(a => a.categoryId === category.id).length;
            }
            const isCatActive = currentCategory === category.name && isActive;

            categoryHtml += `
                <div class="date-category-item ${isCatActive ? 'active' : ''}"
                     data-category="${category.name}"
                     onclick="selectCategory('${category.name}', event)">
                    <span class="date-category-item-icon">${category.icon}</span>
                    <span class="date-category-item-text">${category.name}</span>
                    <span class="date-category-item-count">${count}</span>
                </div>
            `;
        });

        html += `
            <div class="date-item-wrapper ${isExpanded ? 'expanded' : ''}" data-date="${dateData.date}">
                <div class="date-item ${isActive ? 'active' : ''}" onclick="selectDate('${dateData.date}')">
                    <span class="date-item-expand">▶</span>
                    <span class="date-item-text">${dateData.displayDate}</span>
                    <div>
                        ${dateData.isToday ? '<span class="date-item-today">今</span>' : ''}
                        <span class="date-item-badge">${articlesInDate.length}</span>
                    </div>
                </div>
                <div class="date-category-list">
                    ${categoryHtml}
                </div>
            </div>
        `;
    });

    dateList.innerHTML = html;
}

/**
 * 渲染文章列表
 */
function renderArticleList() {
    if (!articleListContent) return;

    filteredArticles = allArticles.filter(article => {
        let matchDate = true;
        let matchCategory = true;

        if (currentDate) {
            matchDate = article.date === currentDate;
        }

        if (currentCategory !== '全部') {
            matchCategory = article.category === currentCategory;
        }

        return matchDate && matchCategory;
    });

    if (articleCount) {
        articleCount.textContent = `${filteredArticles.length}篇`;
    }

    if (filteredArticles.length === 0) {
        articleListContent.innerHTML = `
            <div style="padding: 40px 20px; text-align: center; color: #8c8c8c;">
                <div style="font-size: 48px; margin-bottom: 12px;">📭</div>
                <div>暂无文章</div>
            </div>
        `;
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const currentArticleId = parseInt(urlParams.get('id')) || filteredArticles[0]?.id;

    let html = '';

    filteredArticles.forEach(article => {
        const isActive = article.id === currentArticleId;

        html += `
            <a href="?id=${article.id}" class="article-item ${isActive ? 'active' : ''}" data-id="${article.id}" onclick="selectArticle(event, ${article.id})">
                <div class="article-item-title">${article.title}</div>
                <div class="article-item-meta">
                    <span class="article-item-time">🕒 ${article.time}</span>
                    <span class="article-item-category">${article.categoryIcon} ${article.category}</span>
                </div>
            </a>
        `;
    });

    articleListContent.innerHTML = html;
}

// ================================
// 交互函数
// ================================

/**
 * 更新左栏标题（根据选中日期）
 */
function updateArticleListTitle() {
    if (!articleListTitle) return;

    if (!currentDate) {
        articleListTitle.textContent = '全部';
        return;
    }

    const dateData = mockData.dates.find(d => d.date === currentDate);
    if (dateData) {
        articleListTitle.textContent = dateData.displayDate;
    } else {
        articleListTitle.textContent = currentDate;
    }
}

/**
 * 选择日期（展开/收起分类）
 */
function selectDate(date) {
    if (currentDate === date) {
        currentDate = null;
        currentCategory = '全部';
    } else {
        currentDate = date;
        currentCategory = '全部';
    }

    updateArticleListTitle();
    renderDateList();
    renderArticleList();

    showToast(`已筛选：${currentDate || '全部日期'}`);
}

/**
 * 选择分类
 */
function selectCategory(category, event) {
    if (event) {
        event.stopPropagation();
    }

    currentCategory = category;

    renderDateList();
    renderArticleList();

    showToast(`已切换到：${category}`);
}

/**
 * 选择文章
 */
function selectArticle(event, articleId) {
    event.preventDefault();

    const newUrl = `${window.location.pathname}?id=${articleId}`;
    history.pushState({ articleId }, '', newUrl);

    const article = allArticles.find(a => a.id === articleId);
    if (!article) return;

    document.querySelectorAll('.article-item').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.article-item[data-id="${articleId}"]`)?.classList.add('active');

    document.getElementById('articleTitle').textContent = article.title;

    document.querySelector('#articleDate span:last-child').textContent = `${article.date} ${article.time}`;
    document.querySelector('#articleSource span:last-child').textContent = article.source;
    document.querySelector('#articleCategory .detail-tag').textContent = article.category;

    document.querySelector('.detail-content-main')?.scrollTo(0, 0);

    showToast('已切换到: ' + article.title.substring(0, 20) + '...');
}

/**
 * 收藏功能
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

/**
 * 分享资讯
 */
function shareNews() {
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
    const title = document.getElementById('articleTitle').textContent;
    const article = document.getElementById('articleContent').innerText;
    const content = `${title}\n\n${article}`;

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

/**
 * 切换右侧筛选面板
 */
function toggleFilterPanel() {
    filterNavPanel.classList.toggle('collapsed');

    const isCollapsed = filterNavPanel.classList.contains('collapsed');
    filterPanelToggle.title = isCollapsed ? '展开面板' : '收起面板';
}

/**
 * 显示提示信息
 */
function showToast(message, duration = 2000) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

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

collectBtn?.addEventListener('click', toggleCollect);
filterPanelToggle?.addEventListener('click', toggleFilterPanel);

// ================================
// 页面加载
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('安全资讯详情页 V3 加载完成');

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));

    if (articleId) {
        const article = allArticles.find(a => a.id === articleId);
        if (article) {
            currentDate = article.date;
        }
    } else {
        currentDate = null;
    }

    updateArticleListTitle();
    renderDateList();
    renderArticleList();

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

window.selectDate = selectDate;
window.selectCategory = selectCategory;
window.selectArticle = selectArticle;
window.toggleCollect = toggleCollect;
window.shareNews = shareNews;
window.exportNews = exportNews;
window.toggleFilterPanel = toggleFilterPanel;
