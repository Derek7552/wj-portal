/* ==========================================
   Mock 主入口文件
   ========================================== */

import { mockConfig } from './config/index.js';
import * as agentAPI from './api/agent-api.js';
import * as taskAPI from './api/task-api.js';
import * as userAPI from './api/user-api.js';

// 统一导出所有 API
export const MockAPI = {
    agent: agentAPI,
    task: taskAPI,
    user: userAPI
};

// Mock 日志工具
const logger = {
    debug: (...args) => {
        if (mockConfig.logging && mockConfig.logLevel === 'debug') {
            console.log('[Mock Debug]', ...args);
        }
    },
    info: (...args) => {
        if (mockConfig.logging && ['debug', 'info'].includes(mockConfig.logLevel)) {
            console.log('[Mock Info]', ...args);
        }
    },
    warn: (...args) => {
        if (mockConfig.logging && ['debug', 'info', 'warn'].includes(mockConfig.logLevel)) {
            console.warn('[Mock Warn]', ...args);
        }
    },
    error: (...args) => {
        if (mockConfig.logging) {
            console.error('[Mock Error]', ...args);
        }
    }
};

// 初始化 Mock
export function initMock(config = {}) {
    Object.assign(mockConfig, config);

    logger.info('Mock 已初始化', {
        enabled: mockConfig.enabled,
        baseURL: mockConfig.baseURL,
        defaultDelay: mockConfig.defaultDelay
    });

    return mockConfig;
}

// 启用/禁用 Mock
export function setMockEnabled(enabled) {
    mockConfig.enabled = enabled;
    logger.info(`Mock ${enabled ? '已启用' : '已禁用'}`);
}

// 检查 Mock 是否启用
export function isMockEnabled() {
    return mockConfig.enabled;
}

// 获取 Mock 配置
export function getMockConfig() {
    return { ...mockConfig };
}

// 默认导出
export default {
    API: MockAPI,
    init: initMock,
    setEnabled: setMockEnabled,
    isEnabled: isMockEnabled,
    getConfig: getMockConfig,
    logger
};
