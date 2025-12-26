/* ==========================================
   用户数据 Mock
   ========================================== */

export const currentUser = {
    id: 1,
    username: 'test_user',
    displayName: '测试用户',
    email: 'test@clouditera.com',
    avatar: 'T',
    role: 'admin',
    permissions: [
        'agent:view',
        'agent:create',
        'agent:edit',
        'agent:delete',
        'task:view',
        'task:create',
        'task:edit',
        'task:delete'
    ],
    preferences: {
        theme: 'light',
        language: 'zh-CN',
        notifications: true
    },
    statistics: {
        totalTasks: 45,
        completedTasks: 38,
        favoriteAgents: 3
    },
    createdAt: '2024-01-15 10:00:00',
    lastLoginAt: '2024-12-24 09:00:00'
};

export const users = [
    {
        id: 1,
        username: 'test_user',
        displayName: '测试用户',
        email: 'test@clouditera.com',
        role: 'admin',
        status: 'active'
    },
    {
        id: 2,
        username: 'security_analyst',
        displayName: '安全分析师',
        email: 'analyst@clouditera.com',
        role: 'analyst',
        status: 'active'
    },
    {
        id: 3,
        username: 'guest_user',
        displayName: '访客',
        email: 'guest@clouditera.com',
        role: 'guest',
        status: 'active'
    }
];

export const userRoles = [
    {
        id: 'admin',
        name: '管理员',
        permissions: ['*']
    },
    {
        id: 'analyst',
        name: '分析师',
        permissions: ['agent:view', 'task:view', 'task:create']
    },
    {
        id: 'guest',
        name: '访客',
        permissions: ['agent:view', 'task:view']
    }
];
