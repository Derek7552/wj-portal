/**
 * Agent Sidebar Component
 * 智能体侧边栏组件 - 轻量级实现
 * 某些页面有自己的事件绑定逻辑,此组件提供最小化支持
 */

function initAgentSidebar(options) {
    console.log('[Agent Sidebar] 初始化侧边栏组件');

    if (!options) {
        console.warn('[Agent Sidebar] 缺少配置参数');
        return createStubInstance();
    }

    const {
        tasks = [],
        maxTasks = 10,
        onNewTask,
        onTaskClick,
        onViewAll
    } = options;

    // 获取DOM元素
    const recentTasksList = document.querySelector('.recent-tasks-list');
    const btnNewChat = document.querySelector('.btn-new-chat');
    const viewAllBtn = document.querySelector('.nav-view-all, .view-all-tasks');

    if (!recentTasksList) {
        console.warn('[Agent Sidebar] 未找到任务列表容器，返回stub实例');
        return createStubInstance();
    }

    // 检查是否已有静态HTML内容
    const existingItems = recentTasksList.querySelectorAll('.recent-task-item');
    const hasStaticContent = existingItems.length > 0;

    if (hasStaticContent) {
        console.log('[Agent Sidebar] 检测到静态内容，跳过渲染');
        // 只更新data-task-id属性，不重新渲染
        existingItems.forEach((item, index) => {
            const task = tasks[index];
            if (task && !item.dataset.taskId) {
                item.dataset.taskId = task.id;
            }
        });
    } else {
        // 动态渲染任务列表
        renderTasks(tasks, recentTasksList, maxTasks);
    }

    // 绑定新任务按钮（只有在没有其他绑定时）
    if (btnNewChat && onNewTask && !btnNewChat.dataset.bound) {
        btnNewChat.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[Agent Sidebar] 新任务按钮点击');
            onNewTask();
        });
        btnNewChat.dataset.bound = 'true';
    }

    // 绑定查看全部按钮
    if (viewAllBtn && onViewAll && !viewAllBtn.dataset.bound) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('[Agent Sidebar] 查看全部按钮点击');
            onViewAll();
        });
        viewAllBtn.dataset.bound = 'true';
    }

    // 注意：任务项点击事件由页面自己处理，这里不绑定
    console.log('[Agent Sidebar] 初始化完成（任务点击由页面处理）');

    return {
        updateTasks: function(newTasks) {
            if (hasStaticContent) {
                console.log('[Agent Sidebar] 静态内容模式，跳过更新');
                return;
            }
            renderTasks(newTasks, recentTasksList, maxTasks);
        },
        setActiveTask: function(taskId) {
            const items = document.querySelectorAll('.recent-task-item');
            items.forEach(item => {
                if (item.dataset.taskId === taskId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    };
}

// 渲染任务列表（仅在动态模式下使用）
function renderTasks(tasks, container, maxTasks) {
    const displayTasks = tasks.slice(0, maxTasks);
    const statusIcons = {
        'completed': '✅',
        'error': '❌',
        'failed': '❌',
        'running': '⏳',
        'terminated': '⏹️',
        'pending': '⏸️'
    };

    container.innerHTML = displayTasks.map(task => {
        const icon = statusIcons[task.status] || '⏸️';
        const activeClass = task.active ? 'active' : '';
        return `
            <a href="#" class="recent-task-item ${activeClass}" data-task-id="${task.id}">
                <span class="task-status-icon ${task.status}">${icon}</span>
                <div class="task-name">${task.name}</div>
            </a>
        `;
    }).join('');
}

// 创建stub实例（当找不到必要元素时）
function createStubInstance() {
    return {
        updateTasks: function() {
            console.log('[Agent Sidebar] Stub: updateTasks called');
        },
        setActiveTask: function() {
            console.log('[Agent Sidebar] Stub: setActiveTask called');
        }
    };
}

// 导出到全局
if (typeof window !== 'undefined') {
    window.initAgentSidebar = initAgentSidebar;
}
