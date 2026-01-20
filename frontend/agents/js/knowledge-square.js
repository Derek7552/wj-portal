/**
 * 知识库广场页面交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化收藏功能
    if (typeof window.initFavorites === 'function') {
        window.initFavorites();
    }

    // 初始化首页菜单位置
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }

    // 初始化知识库广场
    initKnowledgeSquare();
});

// ==========================================
// 模拟数据
// ==========================================

// 行业知识库数据（30条）
const industryKnowledgeBases = [
    { id: 'ind-1', name: '金融行业安全规范', description: '涵盖银行、证券、保险等金融机构的网络安全标准与实践指南', docs: 156, type: 'industry', icon: '🏦', createdAt: '2024-01-15' },
    { id: 'ind-2', name: '医疗健康数据保护', description: '医疗机构患者数据隐私保护、HIPAA合规与电子病历安全管理', docs: 234, type: 'industry', icon: '🏥', createdAt: '2024-02-20' },
    { id: 'ind-3', name: '电商平台安全防护', description: '电子商务平台支付安全、用户隐私保护与反欺诈技术实践', docs: 189, type: 'industry', icon: '🛒', createdAt: '2024-03-10' },
    { id: 'ind-4', name: '制造业工控安全', description: '工业控制系统安全、智能制造网络防护与供应链安全管理', docs: 178, type: 'industry', icon: '🏭', createdAt: '2024-01-25' },
    { id: 'ind-5', name: '能源行业网络安全', description: '电力、石油、天然气等能源关键基础设施安全防护体系', docs: 201, type: 'industry', icon: '⚡', createdAt: '2024-02-14' },
    { id: 'ind-6', name: '教育信息安全管理', description: '高校与K12教育机构信息系统安全、学生数据保护与在线教育安全', docs: 167, type: 'industry', icon: '🎓', createdAt: '2024-03-05' },
    { id: 'ind-7', name: '政务云安全体系', description: '政府机构云平台安全架构、电子政务安全标准与合规要求', docs: 245, type: 'industry', icon: '🏛️', createdAt: '2024-01-30' },
    { id: 'ind-8', name: '交通运输安全防护', description: '智能交通系统安全、车联网安全与物流信息保护技术', docs: 134, type: 'industry', icon: '🚆', createdAt: '2024-02-18' },
    { id: 'ind-9', name: '通信行业安全标准', description: '电信运营商网络安全、5G安全架构与通信数据保护规范', docs: 298, type: 'industry', icon: '📡', createdAt: '2024-03-12' },
    { id: 'ind-10', name: '零售业数据安全', description: '连锁零售企业会员数据管理、POS系统安全与供应链数字化安全', docs: 142, type: 'industry', icon: '🏪', createdAt: '2024-01-22' },
    { id: 'ind-11', name: '房地产信息安全', description: '房地产企业客户信息保护、智慧社区安全与物业管理系统安全', docs: 128, type: 'industry', icon: '🏘️', createdAt: '2024-02-28' },
    { id: 'ind-12', name: '娱乐传媒内容安全', description: '视频平台内容审核、版权保护、用户隐私与反盗版技术实践', docs: 176, type: 'industry', icon: '🎬', createdAt: '2024-03-15' },
    { id: 'ind-13', name: '航空航天安全标准', description: '航空公司信息系统安全、飞行数据保护与空管系统安全规范', docs: 156, type: 'industry', icon: '✈️', createdAt: '2024-01-28' },
    { id: 'ind-14', name: '酒店旅游行业安全', description: '酒店管理系统安全、客户信息保护与在线旅游平台安全防护', docs: 145, type: 'industry', icon: '🏨', createdAt: '2024-02-25' },
    { id: 'ind-15', name: '农业信息化安全', description: '智慧农业平台安全、农业大数据保护与农村电商安全管理', docs: 112, type: 'industry', icon: '🌾', createdAt: '2024-03-08' },
    { id: 'ind-16', name: '保险业数据合规', description: '保险公司数据安全管理、客户隐私保护与保险科技安全实践', docs: 198, type: 'industry', icon: '🛡️', createdAt: '2024-01-18' },
    { id: 'ind-17', name: '物流快递信息安全', description: '快递物流企业数据保护、配送信息安全与智能仓储系统安全', docs: 167, type: 'industry', icon: '📦', createdAt: '2024-02-22' },
    { id: 'ind-18', name: '法律服务信息保护', description: '律所案件信息保密、电子证据安全与法律科技平台安全管理', docs: 134, type: 'industry', icon: '⚖️', createdAt: '2024-03-18' },
    { id: 'ind-19', name: '环保行业数据安全', description: '环境监测数据保护、环保物联网安全与碳排放数据管理安全', docs: 123, type: 'industry', icon: '♻️', createdAt: '2024-01-20' },
    { id: 'ind-20', name: '化工行业安全管理', description: '化工企业信息系统安全、危险品管理数据保护与应急响应体系', docs: 145, type: 'industry', icon: '🧪', createdAt: '2024-02-15' },
    { id: 'ind-21', name: '建筑工程信息安全', description: 'BIM系统安全、工程项目数据保护与智慧工地信息安全管理', docs: 156, type: 'industry', icon: '🏗️', createdAt: '2024-03-20' },
    { id: 'ind-22', name: '出版印刷版权保护', description: '数字出版平台安全、版权管理系统与电子书DRM技术应用', docs: 98, type: 'industry', icon: '📚', createdAt: '2024-01-12' },
    { id: 'ind-23', name: '体育行业数据安全', description: '体育赛事数据保护、运动员隐私管理与体育场馆智能化安全', docs: 87, type: 'industry', icon: '⚽', createdAt: '2024-02-08' },
    { id: 'ind-24', name: '矿业资源信息安全', description: '矿产资源数据管理、矿山安全监测系统与地质勘探数据保护', docs: 109, type: 'industry', icon: '⛏️', createdAt: '2024-03-02' },
    { id: 'ind-25', name: '纺织服装业安全', description: '服装供应链数据保护、智能制造安全与电商平台信息安全', docs: 92, type: 'industry', icon: '👔', createdAt: '2024-01-08' },
    { id: 'ind-26', name: '食品饮料行业安全', description: '食品溯源系统安全、质量检测数据保护与供应链信息安全', docs: 134, type: 'industry', icon: '🍔', createdAt: '2024-02-12' },
    { id: 'ind-27', name: '美容美发行业安全', description: '美业SaaS系统安全、客户信息保护与预约管理平台安全', docs: 76, type: 'industry', icon: '💇', createdAt: '2024-03-25' },
    { id: 'ind-28', name: '宠物行业数据保护', description: '宠物医疗数据安全、宠物电商平台与智能设备信息安全', docs: 68, type: 'industry', icon: '🐶', createdAt: '2024-01-05' },
    { id: 'ind-29', name: '家居装修信息安全', description: '家装设计平台安全、客户信息保护与供应链管理系统安全', docs: 95, type: 'industry', icon: '🛋️', createdAt: '2024-02-19' },
    { id: 'ind-30', name: '婚庆行业隐私保护', description: '婚庆服务平台安全、客户隐私管理与婚礼数据保护实践', docs: 54, type: 'industry', icon: '💒', createdAt: '2024-03-22' }
];

// 企业知识库数据（30条）
const enterpriseKnowledgeBases = [
    { id: 'ent-1', name: '阿里云安全最佳实践', description: '云计算平台安全架构、容器安全、DevSecOps与云原生安全解决方案', docs: 312, type: 'enterprise', icon: '☁️', createdAt: '2024-01-10' },
    { id: 'ent-2', name: '腾讯安全应急响应', description: '大型互联网企业安全事件响应流程、漏洞管理与威胁情报应用', docs: 276, type: 'enterprise', icon: '🔒', createdAt: '2024-02-05' },
    { id: 'ent-3', name: '华为网络安全体系', description: '企业级网络安全架构、零信任网络、SD-WAN安全与边界防护', docs: 298, type: 'enterprise', icon: '🌐', createdAt: '2024-03-01' },
    { id: 'ent-4', name: '字节跳动数据治理', description: '海量数据安全管理、隐私计算、数据分类分级与合规审计实践', docs: 245, type: 'enterprise', icon: '📊', createdAt: '2024-01-15' },
    { id: 'ent-5', name: '美团业务安全防护', description: 'O2O平台反欺诈、风控系统、支付安全与账号安全防护体系', docs: 234, type: 'enterprise', icon: '🛡️', createdAt: '2024-02-20' },
    { id: 'ent-6', name: '京东供应链安全', description: '电商供应链安全管理、物流信息保护与第三方风险管理', docs: 267, type: 'enterprise', icon: '📦', createdAt: '2024-03-10' },
    { id: 'ent-7', name: '百度AI安全实践', description: '人工智能系统安全、算法安全、模型保护与AI伦理规范', docs: 198, type: 'enterprise', icon: '🤖', createdAt: '2024-01-25' },
    { id: 'ent-8', name: '小米IoT安全防护', description: '智能家居设备安全、物联网平台防护与固件安全更新机制', docs: 187, type: 'enterprise', icon: '📱', createdAt: '2024-02-15' },
    { id: 'ent-9', name: '网易游戏安全对抗', description: '游戏反外挂技术、账号保护、支付安全与反作弊系统实践', docs: 223, type: 'enterprise', icon: '🎮', createdAt: '2024-03-05' },
    { id: 'ent-10', name: '滴滴出行隐私保护', description: '出行平台用户隐私保护、位置数据安全与合规管理实践', docs: 201, type: 'enterprise', icon: '🚗', createdAt: '2024-01-20' },
    { id: 'ent-11', name: '携程旅游数据安全', description: '旅游平台客户数据保护、支付安全与第三方接入安全管理', docs: 178, type: 'enterprise', icon: '✈️', createdAt: '2024-02-25' },
    { id: 'ent-12', name: '拼多多风控体系', description: '社交电商风控系统、反欺诈技术、商家安全管理与用户保护', docs: 256, type: 'enterprise', icon: '🛒', createdAt: '2024-03-15' },
    { id: 'ent-13', name: '快手内容安全审核', description: '短视频平台内容审核、AI识别、用户举报处理与版权保护', docs: 189, type: 'enterprise', icon: '📹', createdAt: '2024-01-12' },
    { id: 'ent-14', name: '哔哩哔哩社区安全', description: '视频社区安全管理、弹幕审核、用户行为分析与风险预警', docs: 167, type: 'enterprise', icon: '📺', createdAt: '2024-02-18' },
    { id: 'ent-15', name: '陌陌社交安全防护', description: '社交平台安全架构、实名认证、内容监管与反诈骗机制', docs: 145, type: 'enterprise', icon: '💬', createdAt: '2024-03-08' },
    { id: 'ent-16', name: '招商银行金融安全', description: '商业银行网络安全体系、移动银行安全、反洗钱与合规管理', docs: 289, type: 'enterprise', icon: '🏦', createdAt: '2024-01-18' },
    { id: 'ent-17', name: '平安保险数据保护', description: '保险公司数据安全架构、客户隐私保护与保险科技安全', docs: 234, type: 'enterprise', icon: '🛡️', createdAt: '2024-02-22' },
    { id: 'ent-18', name: '中国移动网络安全', description: '电信运营商网络安全防护、5G安全、基站安全与用户隐私', docs: 312, type: 'enterprise', icon: '📡', createdAt: '2024-03-12' },
    { id: 'ent-19', name: '国家电网信息安全', description: '电力企业信息安全管理、工控系统防护与智能电网安全', docs: 267, type: 'enterprise', icon: '⚡', createdAt: '2024-01-08' },
    { id: 'ent-20', name: '顺丰物流信息保护', description: '物流企业数据安全、快递信息保护与智能仓储系统安全', docs: 198, type: 'enterprise', icon: '📮', createdAt: '2024-02-12' },
    { id: 'ent-21', name: '万科智慧社区安全', description: '房地产企业智慧社区安全、物业管理系统与客户信息保护', docs: 156, type: 'enterprise', icon: '🏘️', createdAt: '2024-03-18' },
    { id: 'ent-22', name: '海尔智能家居安全', description: '智能家电安全防护、IoT平台安全与用户隐私保护实践', docs: 178, type: 'enterprise', icon: '🏠', createdAt: '2024-01-22' },
    { id: 'ent-23', name: '比亚迪车联网安全', description: '新能源汽车信息安全、车联网防护与智能驾驶系统安全', docs: 201, type: 'enterprise', icon: '🚙', createdAt: '2024-02-28' },
    { id: 'ent-24', name: '中石化工控安全', description: '石化企业工业控制系统安全、生产网络防护与应急响应', docs: 189, type: 'enterprise', icon: '🏭', createdAt: '2024-03-20' },
    { id: 'ent-25', name: '三一重工智能制造', description: '工程机械行业智能制造安全、远程控制安全与数据保护', docs: 167, type: 'enterprise', icon: '🚜', createdAt: '2024-01-15' },
    { id: 'ent-26', name: '东方航空信息安全', description: '航空公司信息系统安全、旅客数据保护与航班运营安全', docs: 145, type: 'enterprise', icon: '🛫', createdAt: '2024-02-08' },
    { id: 'ent-27', name: '海底捞数字化安全', description: '餐饮企业数字化转型安全、供应链管理与客户数据保护', docs: 123, type: 'enterprise', icon: '🍲', createdAt: '2024-03-02' },
    { id: 'ent-28', name: '链家房产信息安全', description: '房产中介平台安全、客户信息保护与交易数据安全管理', docs: 134, type: 'enterprise', icon: '🏡', createdAt: '2024-01-28' },
    { id: 'ent-29', name: '新东方教育数据保护', description: '教育培训机构学员信息保护、在线教育平台安全与合规', docs: 156, type: 'enterprise', icon: '📖', createdAt: '2024-02-19' },
    { id: 'ent-30', name: '丁香医生健康数据', description: '互联网医疗平台患者隐私保护、医疗数据安全与合规管理', docs: 198, type: 'enterprise', icon: '💊', createdAt: '2024-03-25' }
];

// 当前激活的Tab
let currentTab = 'industry';

// 收藏状态（从localStorage加载）
let favoriteIds = JSON.parse(localStorage.getItem('favoriteKnowledgeBases') || '[]');

// ==========================================
// 初始化知识库广场
// ==========================================

function initKnowledgeSquare() {
    // 初始化Tab切换
    initTabs();

    // 渲染知识库卡片
    renderKnowledgeBases();
}

// ==========================================
// Tab切换功能
// ==========================================

function initTabs() {
    const tabItems = document.querySelectorAll('.tab-item');

    tabItems.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 移除所有active状态
            tabItems.forEach(function(t) {
                t.classList.remove('active');
            });

            // 添加当前active状态
            this.classList.add('active');

            // 更新当前Tab
            currentTab = this.getAttribute('data-tab');

            // 重新渲染知识库
            renderKnowledgeBases();
        });
    });
}

// ==========================================
// 渲染知识库卡片
// ==========================================

function renderKnowledgeBases() {
    const grid = document.getElementById('kbGrid');
    if (!grid) return;

    let knowledgeBases = [];

    // 根据当前Tab获取数据
    if (currentTab === 'industry') {
        knowledgeBases = industryKnowledgeBases;
    } else if (currentTab === 'enterprise') {
        knowledgeBases = enterpriseKnowledgeBases;
    } else if (currentTab === 'favorites') {
        // 已收藏：合并所有知识库，筛选出已收藏的
        knowledgeBases = [...industryKnowledgeBases, ...enterpriseKnowledgeBases]
            .filter(function(kb) {
                return favoriteIds.includes(kb.id);
            });
    }

    // 清空网格
    grid.innerHTML = '';

    // 如果没有数据，显示空状态
    if (knowledgeBases.length === 0) {
        grid.innerHTML = `
            <div class="kb-empty" style="grid-column: 1 / -1;">
                <div class="kb-empty-icon">⭐</div>
                <p class="kb-empty-text">暂无收藏的知识库，快去收藏吧~</p>
            </div>
        `;
        return;
    }

    // 渲染卡片
    knowledgeBases.forEach(function(kb) {
        const isFavorited = favoriteIds.includes(kb.id);
        const card = createKnowledgeBaseCard(kb, isFavorited);
        grid.appendChild(card);
    });
}

// ==========================================
// 创建知识库卡片
// ==========================================

function createKnowledgeBaseCard(kb, isFavorited) {
    const card = document.createElement('div');
    card.className = 'kb-card';
    card.setAttribute('data-kb-id', kb.id);

    card.innerHTML = `
        <div class="kb-card-header">
            <div class="kb-card-icon ${kb.type}">
                ${kb.icon}
            </div>
            <div class="kb-card-main">
                <h3 class="kb-card-title">${kb.name}</h3>
                <div class="kb-card-meta">
                    <span class="kb-card-meta-item">
                        <span>📄</span>
                        <span>${kb.docs} 篇文档</span>
                    </span>
                </div>
            </div>
        </div>
        <p class="kb-card-description">${kb.description}</p>
        <div class="kb-card-footer">
            <span class="kb-card-time">创建于 ${kb.createdAt}</span>
            <button class="btn-favorite ${isFavorited ? 'favorited' : ''}" data-kb-id="${kb.id}" title="${isFavorited ? '取消收藏' : '收藏'}">
                <span class="icon-favorite">⭐</span>
            </button>
        </div>
    `;

    // 卡片点击事件
    card.addEventListener('click', function(e) {
        // 如果点击的是收藏按钮，不触发卡片点击
        if (e.target.closest('.btn-favorite')) {
            return;
        }
        console.log('点击知识库:', kb.name);
        // 这里可以跳转到知识库详情页
    });

    // 收藏按钮点击事件
    const favoriteBtn = card.querySelector('.btn-favorite');
    favoriteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleFavorite(kb.id);
    });

    return card;
}

// ==========================================
// 收藏/取消收藏
// ==========================================

function toggleFavorite(kbId) {
    const index = favoriteIds.indexOf(kbId);

    // 获取知识库完整信息
    const allKbs = [...industryKnowledgeBases, ...enterpriseKnowledgeBases];
    const kb = allKbs.find(function(k) { return k.id === kbId; });

    // 获取已存储的完整收藏数据
    let favoriteKbsData = JSON.parse(localStorage.getItem('favoriteKnowledgeBasesData') || '[]');

    if (index > -1) {
        // 已收藏，取消收藏
        favoriteIds.splice(index, 1);
        favoriteKbsData = favoriteKbsData.filter(function(k) { return k.id !== kbId; });
    } else {
        // 未收藏，添加收藏
        favoriteIds.push(kbId);
        if (kb) {
            favoriteKbsData.push({
                id: kb.id,
                name: kb.name,
                description: kb.description,
                createdAt: kb.createdAt
            });
        }
    }

    // 保存到localStorage
    localStorage.setItem('favoriteKnowledgeBases', JSON.stringify(favoriteIds));
    localStorage.setItem('favoriteKnowledgeBasesData', JSON.stringify(favoriteKbsData));

    // 重新渲染
    renderKnowledgeBases();
}
