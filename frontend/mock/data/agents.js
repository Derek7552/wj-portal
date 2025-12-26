/* ==========================================
   智能体数据 Mock
   ========================================== */

export const agents = [
    {
        id: 1,
        name: '安全资讯',
        icon: '📰',
        category: 'info',
        level: 'basic',
        version: 'v1.1.0',
        description: '实时聚合安全行业动态资讯，智能推荐相关内容，帮助用户及时了解安全领域最新动态',
        link: 'agents/pages/security-news.html',
        favorite: false,
        statistics: {
            totalArticles: 1234,
            todayArticles: 23,
            totalViews: 45678
        }
    },
    {
        id: 2,
        name: '安全智库',
        icon: '🧠',
        category: 'info',
        level: 'basic',
        version: 'v1.0.3',
        description: '安全知识库与最佳实践指南，沉淀行业经验，分享安全防护知识和实战经验',
        link: 'agents/pages/security-knowledge.html',
        favorite: false,
        statistics: {
            totalKnowledge: 567,
            categories: 12,
            totalDownloads: 8901
        }
    }
];

export const agentCategories = [
    { id: 'all', name: '全部', icon: '📋' },
    { id: 'security', name: '安全类', icon: '🔒' },
    { id: 'automation', name: '自动化类', icon: '⚙️' },
    { id: 'info', name: '信息类', icon: 'ℹ️' }
];

export const agentLevels = [
    { id: 'basic', name: '基础类', color: '#10B981' },
    { id: 'advanced', name: '高级类', color: '#F59E0B' },
    { id: 'expert', name: '专家类', color: '#EF4444' }
];
