/* ==========================================
   Mock 配置文件
   ========================================== */

export const mockConfig = {
    // 是否启用 Mock
    enabled: true,

    // 默认网络延迟（毫秒）
    defaultDelay: 300,

    // 是否启用随机延迟
    randomDelay: true,

    // 随机延迟范围
    delayRange: [200, 800],

    // 默认成功率（0-1）
    successRate: 0.95,

    // API 基础路径
    baseURL: '/api',

    // 超时时间
    timeout: 10000,

    // 是否打印日志
    logging: true,

    // 日志级别: 'debug' | 'info' | 'warn' | 'error'
    logLevel: 'info'
};

// API 路径映射
export const apiRoutes = {
    // 智能体相关
    agents: {
        list: '/agents',
        detail: '/agents/:id',
        favorite: '/agents/:id/favorite',
        categories: '/agents/categories',
        levels: '/agents/levels'
    },

    // 任务相关
    tasks: {
        list: '/tasks',
        detail: '/tasks/:id',
        create: '/tasks',
        restart: '/tasks/:id/restart',
        continue: '/tasks/:id/continue',
        delete: '/tasks/:id',
        statistics: '/tasks/statistics'
    },

    // 用户相关
    user: {
        login: '/auth/login',
        logout: '/auth/logout',
        current: '/user/current',
        update: '/user/profile',
        changePassword: '/user/password',
        list: '/users',
        roles: '/user/roles'
    }
};

// 响应格式配置
export const responseConfig = {
    // 成功响应格式
    success: {
        success: true,
        code: 200,
        message: 'success',
        data: null
    },

    // 错误响应格式
    error: {
        success: false,
        code: 500,
        message: 'Internal Server Error',
        data: null
    }
};

// 常见错误码
export const errorCodes = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable'
};
