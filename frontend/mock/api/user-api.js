/* ==========================================
   用户 API Mock
   ========================================== */

import { currentUser, users, userRoles } from '../data/users.js';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 用户登录
 * @param {Object} credentials - 登录凭证
 * @param {string} credentials.username - 用户名
 * @param {string} credentials.password - 密码
 */
export async function login(credentials) {
    await delay(500);

    // 简单的模拟登录验证
    if (credentials.username === 'test_user' && credentials.password === '123456') {
        const token = 'mock_token_' + Date.now();

        // 保存 token 到 localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_info', JSON.stringify(currentUser));

        return {
            success: true,
            code: 200,
            message: '登录成功',
            data: {
                token,
                user: currentUser
            }
        };
    }

    return {
        success: false,
        code: 401,
        message: '用户名或密码错误',
        data: null
    };
}

/**
 * 用户登出
 */
export async function logout() {
    await delay(200);

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');

    return {
        success: true,
        code: 200,
        message: '登出成功',
        data: null
    };
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
    await delay();

    const token = localStorage.getItem('auth_token');

    if (!token) {
        return {
            success: false,
            code: 401,
            message: '未登录',
            data: null
        };
    }

    return {
        success: true,
        code: 200,
        message: 'success',
        data: currentUser
    };
}

/**
 * 更新用户信息
 * @param {Object} updates - 要更新的字段
 */
export async function updateUserProfile(updates) {
    await delay(300);

    Object.assign(currentUser, updates);
    localStorage.setItem('user_info', JSON.stringify(currentUser));

    return {
        success: true,
        code: 200,
        message: '更新成功',
        data: currentUser
    };
}

/**
 * 修改密码
 * @param {Object} passwordData - 密码数据
 * @param {string} passwordData.oldPassword - 旧密码
 * @param {string} passwordData.newPassword - 新密码
 */
export async function changePassword(passwordData) {
    await delay(500);

    // 模拟密码验证
    if (passwordData.oldPassword !== '123456') {
        return {
            success: false,
            code: 400,
            message: '旧密码错误',
            data: null
        };
    }

    return {
        success: true,
        code: 200,
        message: '密码修改成功',
        data: null
    };
}

/**
 * 获取用户列表（管理员功能）
 * @param {Object} params - 查询参数
 */
export async function getUserList(params = {}) {
    await delay();

    let userList = [...users];

    // 角色筛选
    if (params.role) {
        userList = userList.filter(u => u.role === params.role);
    }

    // 状态筛选
    if (params.status) {
        userList = userList.filter(u => u.status === params.status);
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
            list: userList.slice(start, end),
            total: userList.length,
            page,
            pageSize
        }
    };
}

/**
 * 获取用户角色列表
 */
export async function getUserRoles() {
    await delay(100);

    return {
        success: true,
        code: 200,
        message: 'success',
        data: userRoles
    };
}
