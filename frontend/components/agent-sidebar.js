/* ==========================================
   智能体侧导航组件 - JavaScript
   ========================================== */

/**
 * 初始化智能体侧导航组件
 * @param {Object} options - 配置选项
 * @param {string} options.selector - 组件选择器，默认 '.agent-sidebar'
 * @param {Array} options.tasks - 任务列表数据
 * @param {number} options.maxTasks - 显示的最大任务数，默认 10
 * @param {Function} options.onNewTask - 新任务按钮点击回调
 * @param {Function} options.onTaskClick - 任务项点击回调
 * @param {Function} options.onViewAll - 查看全部按钮点击回调
 */
function initAgentSidebar(options = {}) {
    const {
        selector = '.agent-sidebar',
        tasks = [],
        maxTasks = 10,
        onNewTask = null,
        onTaskClick = null,
        onViewAll = null
    } = options;

    // 查找组件容器
    const sidebar = document.querySelector(selector);
    if (!sidebar) {
        console.warn(`智能体侧导航组件未找到: ${selector}`);
        return null;
    }

    // 获取子元素
    const btnNewTask = sidebar.querySelector('#btnNewTask, .btn-new-chat');
    const tasksList = sidebar.querySelector('#recentTasksList, .recent-tasks-list');
    const viewAllBtn = sidebar.querySelector('#viewAllTasks, .view-all-tasks');

    if (!btnNewTask || !tasksList) {
        console.warn('智能体侧导航组件缺少必要的子元素');
        return null;
    }

    // 新任务按钮点击事件
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击新任务按钮');
            if (onNewTask && typeof onNewTask === 'function') {
                onNewTask();
            }
        });
    }

    // 查看全部按钮点击事件
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击查看全部任务');
            if (onViewAll && typeof onViewAll === 'function') {
                onViewAll();
            }
        });
    }

    // 渲染任务列表
    function renderTasks(taskData) {
        if (!tasksList) return;

        // 限制显示数量
        const displayTasks = taskData.slice(0, maxTasks);

        // 生成任务列表 HTML
        const tasksHTML = displayTasks.map(task => {
            const statusConfig = getTaskStatusConfig(task.status);
            const activeClass = task.active ? ' active' : '';

            return `
                <a href="#" class="recent-task-item${activeClass}" data-task-id="${task.id}">
                    <span class="task-status-icon ${task.status}">${statusConfig.icon}</span>
                    <div class="task-name">${task.name}</div>
                </a>
            `;
        }).join('');

        tasksList.innerHTML = tasksHTML;

        // 绑定任务项点击事件
        tasksList.querySelectorAll('.recent-task-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const taskId = this.dataset.taskId;

                // 移除所有 active 状态
                tasksList.querySelectorAll('.recent-task-item').forEach(t => {
                    t.classList.remove('active');
                });

                // 添加当前 active 状态
                this.classList.add('active');

                console.log('点击任务项:', taskId);

                // 从任务列表中找到对应的任务对象
                const taskData = displayTasks.find(t => t.id === taskId);

                if (onTaskClick && typeof onTaskClick === 'function') {
                    onTaskClick(taskId, taskData);
                }
            });
        });
    }

    // 获取任务状态配置
    function getTaskStatusConfig(status) {
        const configs = {
            'running': { icon: '⏳', text: '进行中' },
            'completed': { icon: '✅', text: '已完成' },
            'failed': { icon: '❌', text: '失败' },
            'pending': { icon: '⏸️', text: '待处理' }
        };
        return configs[status] || { icon: '⏸️', text: '未知' };
    }

    // 初始化时渲染任务列表
    if (tasks && tasks.length > 0) {
        renderTasks(tasks);
    }

    // 返回组件实例，提供公共方法
    return {
        element: sidebar,
        tasksList: tasksList,

        // 更新任务列表
        updateTasks: function(newTasks) {
            renderTasks(newTasks);
        },

        // 添加单个任务
        addTask: function(task) {
            const currentTasks = this.getTasks();
            currentTasks.unshift(task); // 添加到开头
            renderTasks(currentTasks);
        },

        // 移除任务
        removeTask: function(taskId) {
            const currentTasks = this.getTasks();
            const filteredTasks = currentTasks.filter(t => t.id !== taskId);
            renderTasks(filteredTasks);
        },

        // 设置活动任务
        setActiveTask: function(taskId) {
            tasksList.querySelectorAll('.recent-task-item').forEach(item => {
                if (item.dataset.taskId === taskId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        },

        // 获取当前任务列表
        getTasks: function() {
            const taskItems = tasksList.querySelectorAll('.recent-task-item');
            return Array.from(taskItems).map(item => ({
                id: item.dataset.taskId,
                name: item.querySelector('.task-name')?.textContent || '',
                status: item.querySelector('.task-status-icon')?.classList[1] || 'pending',
                active: item.classList.contains('active')
            }));
        },

        // 清空任务列表
        clearTasks: function() {
            if (tasksList) {
                tasksList.innerHTML = '<div class="empty-tasks">暂无任务</div>';
            }
        },

        // 销毁组件
        destroy: function() {
            console.log('智能体侧导航组件已销毁');
        }
    };
}

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAgentSidebar };
}
