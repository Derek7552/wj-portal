/* ==========================================
   智能体 API Mock
   ========================================== */

import { agents, agentCategories, agentLevels } from '../data/agents.js';

// 模拟网络延迟
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟随机成功/失败
const randomSuccess = (successRate = 0.95) => Math.random() < successRate;

/**
 * 获取智能体列表
 * @param {Object} params - 查询参数
 * @param {string} params.category - 分类筛选
 * @param {string} params.level - 等级筛选
 * @param {string} params.keyword - 关键词搜索
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export async function getAgentList(params = {}) {
    await delay();

    let filteredAgents = [...agents];

    // 分类筛选
    if (params.category && params.category !== 'all') {
        filteredAgents = filteredAgents.filter(a => a.category === params.category);
    }

    // 等级筛选
    if (params.level) {
        filteredAgents = filteredAgents.filter(a => a.level === params.level);
    }

    // 关键词搜索
    if (params.keyword) {
        const keyword = params.keyword.toLowerCase();
        filteredAgents = filteredAgents.filter(a =>
            a.name.toLowerCase().includes(keyword) ||
            a.description.toLowerCase().includes(keyword)
        );
    }

    // 分页
    const page = params.page || 1;
    const pageSize = params.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
        success: true,
        code: 200,
        message: 'success',
        data: {
            list: filteredAgents.slice(start, end),
            total: filteredAgents.length,
            page,
            pageSize
        }
    };
}

/**
 * 获取智能体详情
 * @param {number|string} id - 智能体ID
 */
export async function getAgentDetail(id) {
    await delay();

    const agent = agents.find(a => a.id === Number(id));

    if (!agent) {
        return {
            success: false,
            code: 404,
            message: '智能体不存在',
            data: null
        };
    }

    return {
        success: true,
        code: 200,
        message: 'success',
        data: agent
    };
}

/**
 * 收藏/取消收藏智能体
 * @param {number|string} id - 智能体ID
 * @param {boolean} favorite - 是否收藏
 */
export async function toggleAgentFavorite(id, favorite) {
    await delay(200);

    const agent = agents.find(a => a.id === Number(id));

    if (!agent) {
        return {
            success: false,
            code: 404,
            message: '智能体不存在',
            data: null
        };
    }

    agent.favorite = favorite;

    return {
        success: true,
        code: 200,
        message: favorite ? '收藏成功' : '取消收藏成功',
        data: { id, favorite }
    };
}

/**
 * 获取智能体分类列表
 */
export async function getAgentCategories() {
    await delay(100);

    return {
        success: true,
        code: 200,
        message: 'success',
        data: agentCategories
    };
}

/**
 * 获取智能体等级列表
 */
export async function getAgentLevels() {
    await delay(100);

    return {
        success: true,
        code: 200,
        message: 'success',
        data: agentLevels
    };
}

/**
 * 获取用户收藏的智能体列表
 */
export async function getFavoriteAgents() {
    await delay();

    const favoriteAgents = agents.filter(a => a.favorite);

    return {
        success: true,
        code: 200,
        message: 'success',
        data: favoriteAgents
    };
}
