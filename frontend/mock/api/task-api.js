/* ==========================================
   任务 API Mock
   ========================================== */

import { tasks, taskStatuses } from '../data/tasks.js';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取任务列表
 * @param {Object} params - 查询参数
 * @param {number} params.agentId - 智能体ID
 * @param {string} params.status - 任务状态
 * @param {number} params.page - 页码
 * @param {number} params.pageSize - 每页数量
 */
export async function getTaskList(params = {}) {
    await delay();

    // 根据智能体类型获取任务
    let taskList = [];
    if (params.agentId === 1) {
        taskList = tasks.vulnerability;
    } else if (params.agentId === 2) {
        taskList = tasks.planning;
    } else {
        // 返回所有任务
        taskList = [...tasks.vulnerability, ...tasks.planning];
    }

    // 状态筛选
    if (params.status) {
        taskList = taskList.filter(t => t.status === params.status);
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
            list: taskList.slice(start, end),
            total: taskList.length,
            page,
            pageSize
        }
    };
}

/**
 * 获取任务详情
 * @param {string} taskId - 任务ID
 */
export async function getTaskDetail(taskId) {
    await delay();

    // 在所有任务类型中查找
    let task = null;
    for (const category in tasks) {
        task = tasks[category].find(t => t.id === taskId);
        if (task) break;
    }

    if (!task) {
        return {
            success: false,
            code: 404,
            message: '任务不存在',
            data: null
        };
    }

    return {
        success: true,
        code: 200,
        message: 'success',
        data: task
    };
}

/**
 * 创建新任务
 * @param {Object} taskData - 任务数据
 * @param {number} taskData.agentId - 智能体ID
 * @param {string} taskData.name - 任务名称
 * @param {Object} taskData.config - 任务配置
 */
export async function createTask(taskData) {
    await delay(500);

    const newTask = {
        id: `task-${Date.now()}`,
        agentId: taskData.agentId,
        name: taskData.name,
        status: 'pending',
        createTime: new Date().toISOString(),
        config: taskData.config || {},
        phases: []
    };

    // 根据智能体类型添加到对应的任务列表
    if (taskData.agentId === 1) {
        tasks.vulnerability.unshift(newTask);
    } else if (taskData.agentId === 2) {
        tasks.planning.unshift(newTask);
    }

    return {
        success: true,
        code: 200,
        message: '任务创建成功',
        data: newTask
    };
}

/**
 * 重新执行任务
 * @param {string} taskId - 任务ID
 */
export async function restartTask(taskId) {
    await delay(500);

    let task = null;
    for (const category in tasks) {
        task = tasks[category].find(t => t.id === taskId);
        if (task) break;
    }

    if (!task) {
        return {
            success: false,
            code: 404,
            message: '任务不存在',
            data: null
        };
    }

    // 重置任务状态
    task.status = 'running';
    task.restartTime = new Date().toISOString();

    return {
        success: true,
        code: 200,
        message: '任务已重新启动',
        data: task
    };
}

/**
 * 继续执行任务（从断点继续）
 * @param {string} taskId - 任务ID
 */
export async function continueTask(taskId) {
    await delay(500);

    let task = null;
    for (const category in tasks) {
        task = tasks[category].find(t => t.id === taskId);
        if (task) break;
    }

    if (!task) {
        return {
            success: false,
            code: 404,
            message: '任务不存在',
            data: null
        };
    }

    task.status = 'running';
    task.continueTime = new Date().toISOString();

    return {
        success: true,
        code: 200,
        message: '任务已继续执行',
        data: task
    };
}

/**
 * 删除任务
 * @param {string} taskId - 任务ID
 */
export async function deleteTask(taskId) {
    await delay(300);

    for (const category in tasks) {
        const index = tasks[category].findIndex(t => t.id === taskId);
        if (index !== -1) {
            tasks[category].splice(index, 1);
            return {
                success: true,
                code: 200,
                message: '任务删除成功',
                data: { id: taskId }
            };
        }
    }

    return {
        success: false,
        code: 404,
        message: '任务不存在',
        data: null
    };
}

/**
 * 获取任务统计信息
 * @param {number} agentId - 智能体ID
 */
export async function getTaskStatistics(agentId) {
    await delay();

    let taskList = [];
    if (agentId === 1) {
        taskList = tasks.vulnerability;
    } else if (agentId === 2) {
        taskList = tasks.planning;
    } else {
        taskList = [...tasks.vulnerability, ...tasks.planning];
    }

    const statistics = {
        total: taskList.length,
        pending: taskList.filter(t => t.status === 'pending').length,
        running: taskList.filter(t => t.status === 'running').length,
        completed: taskList.filter(t => t.status === 'completed').length,
        failed: taskList.filter(t => t.status === 'failed').length
    };

    return {
        success: true,
        code: 200,
        message: 'success',
        data: statistics
    };
}
