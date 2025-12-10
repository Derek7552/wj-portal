/* ==========================================
   自规划模式智能体 - 交互逻辑
   ========================================== */

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initTaskList();
    initTabs();
    initSidebarTabs();
    initMessageInput();
    initTaskControls();
    initFileUpload();
    initViewAllTasks();
});

/* ==========================================
   任务列表
   ========================================== */

function initTaskList() {
    const taskItems = document.querySelectorAll('.recent-task-item');

    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他任务的active状态
            taskItems.forEach(t => t.classList.remove('active'));

            // 添加当前任务的active状态
            this.classList.add('active');

            // 加载任务详情
            const taskId = this.dataset.taskId;
            const taskName = this.dataset.taskName;
            const taskStatus = this.dataset.taskStatus;

            loadTaskDetails(taskId, taskName, taskStatus);
        });
    });

    // 新任务按钮
    const btnNewTask = document.getElementById('btnNewTask');
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function() {
            showEmptyState();
        });
    }

    // 创建任务按钮
    const createTaskBtn = document.getElementById('createTaskBtn');
    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', function() {
            createNewTaskFromInput();
        });
    }

    // 新任务输入框的键盘事件
    const newTaskInput = document.getElementById('newTaskInput');
    if (newTaskInput) {
        newTaskInput.addEventListener('keydown', function(e) {
            // Shift+Enter 发送
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                createNewTaskFromInput();
            }
        });
    }
}

function loadTaskDetails(taskId, taskName, taskStatus) {
    // 显示任务详情容器
    showTaskDetails();

    // 更新任务头部
    const taskTitle = document.querySelector('.task-title');
    if (taskTitle) {
        taskTitle.textContent = taskName;
    }

    // 这里可以调用API加载任务详情
    console.log(`加载任务详情: ID=${taskId}, 名称=${taskName}, 状态=${taskStatus}`);

    // 模拟加载消息
    // 实际应该调用API获取任务的对话记录
}

function createNewTask() {
    const taskName = prompt('请输入新任务名称：');
    if (!taskName) return;

    // 这里应该调用API创建新任务
    console.log('创建新任务:', taskName);

    showToast('任务创建成功！');

    // 模拟添加到任务列表
    const tasksList = document.querySelector('.recent-tasks-list');
    const newTaskHtml = `
        <a href="#" class="recent-task-item active"
           data-task-id="new-${Date.now()}"
           data-task-name="${taskName}"
           data-task-status="running">
            <span class="task-status-icon running">⏳</span>
            <div class="task-name">${taskName}</div>
        </a>
    `;

    // 移除其他任务的active状态
    document.querySelectorAll('.recent-task-item').forEach(item => {
        item.classList.remove('active');
    });

    tasksList.insertAdjacentHTML('afterbegin', newTaskHtml);

    // 重新初始化任务列表
    initTaskList();
}

// 显示空状态（新任务输入界面）
function showEmptyState() {
    const emptyStateContainer = document.getElementById('emptyStateContainer');
    const taskDetailsContainer = document.getElementById('taskDetailsContainer');
    const newTaskInput = document.getElementById('newTaskInput');

    if (emptyStateContainer && taskDetailsContainer) {
        // 移除所有任务的active状态
        document.querySelectorAll('.recent-task-item').forEach(item => {
            item.classList.remove('active');
        });

        // 显示空状态，隐藏任务详情
        emptyStateContainer.style.display = 'flex';
        taskDetailsContainer.style.display = 'none';

        // 清空输入框并聚焦
        if (newTaskInput) {
            newTaskInput.value = '';
            // 延迟聚焦，确保显示动画完成
            setTimeout(() => {
                newTaskInput.focus();
            }, 100);
        }
    }
}

// 显示任务详情
function showTaskDetails() {
    const emptyStateContainer = document.getElementById('emptyStateContainer');
    const taskDetailsContainer = document.getElementById('taskDetailsContainer');

    if (emptyStateContainer && taskDetailsContainer) {
        emptyStateContainer.style.display = 'none';
        taskDetailsContainer.style.display = 'flex';
    }
}

// 从输入框创建新任务
function createNewTaskFromInput() {
    const newTaskInput = document.getElementById('newTaskInput');
    if (!newTaskInput) return;

    const taskDescription = newTaskInput.value.trim();

    if (!taskDescription) {
        showToast('请输入任务描述');
        return;
    }

    // 生成任务名称（取前30个字符作为标题）
    const taskName = taskDescription.length > 30
        ? taskDescription.substring(0, 30) + '...'
        : taskDescription;

    const taskId = `task-${Date.now()}`;

    // 这里应该调用API创建新任务
    console.log('创建新任务:', {
        id: taskId,
        name: taskName,
        description: taskDescription
    });

    showToast('任务创建成功！开始执行...');

    // 添加到任务列表
    const tasksList = document.querySelector('.recent-tasks-list');
    const newTaskHtml = `
        <a href="#" class="recent-task-item active"
           data-task-id="${taskId}"
           data-task-name="${taskName}"
           data-task-status="running">
            <span class="task-status-icon running">⏳</span>
            <div class="task-name">${taskName}</div>
        </a>
    `;

    // 移除其他任务的active状态
    document.querySelectorAll('.recent-task-item').forEach(item => {
        item.classList.remove('active');
    });

    tasksList.insertAdjacentHTML('afterbegin', newTaskHtml);

    // 更新任务头部
    const taskTitle = document.querySelector('.task-title');
    if (taskTitle) {
        taskTitle.textContent = taskName;
    }

    // 显示任务详情
    showTaskDetails();

    // 重新初始化任务列表
    initTaskList();

    // 模拟添加系统消息
    setTimeout(() => {
        addSystemMessage(`任务已创建：${taskName}`);
        addSystemMessage('我已为您自动规划执行步骤，现在开始执行...');
    }, 500);
}


/* ==========================================
   查看全部任务
   ========================================== */

function initViewAllTasks() {
    const viewAllBtn = document.getElementById('viewAllTasks');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // 这里应该跳转到全部任务列表页面或打开弹窗
            showToast('跳转到全部任务列表页面...');
            console.log('打开全部任务列表');
            // 实际实现可能是：
            // window.location.href = 'task-list.html';
            // 或者打开一个模态框显示所有任务
        });
    }
}


/* ==========================================
   Tab切换
   ========================================== */

function initTabs() {
    const tabs = document.querySelectorAll('.task-tab');
    const dialogArea = document.getElementById('dialogArea');
    const logsArea = document.getElementById('logsArea');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active状态
            tabs.forEach(t => t.classList.remove('active'));

            // 添加当前tab的active状态
            this.classList.add('active');

            // 切换内容区域
            const tabName = this.dataset.tab;

            if (tabName === 'dialog') {
                dialogArea.style.display = 'flex';
                logsArea.style.display = 'none';
            } else if (tabName === 'logs') {
                dialogArea.style.display = 'none';
                logsArea.style.display = 'flex';
            }
        });
    });
}

function initSidebarTabs() {
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    const filesTab = document.getElementById('filesTab');
    const outputsTab = document.getElementById('outputsTab');

    sidebarTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active状态
            sidebarTabs.forEach(t => t.classList.remove('active'));

            // 添加当前tab的active状态
            this.classList.add('active');

            // 切换内容区域
            const tabName = this.dataset.sidebarTab;

            if (tabName === 'files') {
                filesTab.style.display = 'block';
                outputsTab.style.display = 'none';
            } else if (tabName === 'outputs') {
                filesTab.style.display = 'none';
                outputsTab.style.display = 'block';
            }
        });
    });
}

/* ==========================================
   消息输入
   ========================================== */

function initMessageInput() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');

    if (messageInput) {
        // Enter发送，Shift+Enter换行
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    // 添加用户消息到界面
    addUserMessage(message);

    // 清空输入框
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // 模拟AI回复
    setTimeout(() => {
        addAIMessage('好的，我已收到您的反馈，正在调整执行方案...');
    }, 1000);
}

function addUserMessage(text) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageHtml = `
        <div class="message message-user">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-time">${getCurrentDateTime()}</div>
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
            </div>
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom(messagesContainer);
}

function addAIMessage(text) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageHtml = `
        <div class="message message-ai">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-time">${getCurrentDateTime()}</div>
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
            </div>
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom(messagesContainer);
}

function addSystemMessage(text) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageHtml = `
        <div class="message message-system">
            <div class="message-avatar">🎯</div>
            <div class="message-content">
                <div class="message-time">${getCurrentDateTime()}</div>
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
            </div>
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom(messagesContainer);
}

/* ==========================================
   任务控制
   ========================================== */

function initTaskControls() {
    const btnPauseTask = document.getElementById('btnPauseTask');
    const btnStopTask = document.getElementById('btnStopTask');

    if (btnPauseTask) {
        btnPauseTask.addEventListener('click', function() {
            const isPaused = this.textContent.includes('暂停');

            if (isPaused) {
                this.innerHTML = '<span>▶️</span><span>继续</span>';
                showToast('任务已暂停');
                addSystemMessage('任务已暂停，点击"继续"按钮恢复执行');
            } else {
                this.innerHTML = '<span>⏸️</span><span>暂停</span>';
                showToast('任务已继续');
                addSystemMessage('任务已继续执行');
            }
        });
    }

    if (btnStopTask) {
        btnStopTask.addEventListener('click', function() {
            if (confirm('确定要停止当前任务吗？')) {
                showToast('任务已停止');
                addSystemMessage('任务已停止执行');
                // 这里应该调用API停止任务
            }
        });
    }
}

/* ==========================================
   文件上传
   ========================================== */

function initFileUpload() {
    const btnUpload = document.getElementById('btnUpload');
    const fileInput = document.getElementById('fileInput');

    if (btnUpload && fileInput) {
        btnUpload.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            if (files.length === 0) return;

            // 处理文件上传
            Array.from(files).forEach(file => {
                uploadFile(file);
            });

            // 清空input
            fileInput.value = '';
        });
    }

    // 文件操作按钮
    const fileActions = document.querySelectorAll('.btn-file-action');
    fileActions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const fileName = this.closest('.file-item').querySelector('.file-name').textContent;
            showToast(`下载文件: ${fileName}`);
            // 这里应该调用API下载文件
        });
    });

    // 产物操作按钮
    const outputActions = document.querySelectorAll('.btn-output-action');
    outputActions.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.title;
            const outputName = this.closest('.output-item').querySelector('.output-name').textContent;

            if (action === '查看') {
                showToast(`查看产物: ${outputName}`);
                // 打开代码查看器
            } else if (action === '复制') {
                showToast(`已复制到剪贴板`);
                // 复制到剪贴板
            } else if (action === '下载') {
                showToast(`下载产物: ${outputName}`);
                // 下载文件
            }
        });
    });
}

function uploadFile(file) {
    showToast(`正在上传: ${file.name}`);

    // 这里应该调用API上传文件
    // 模拟上传
    setTimeout(() => {
        showToast(`上传成功: ${file.name}`);

        // 添加到文件列表
        const fileList = document.querySelector('.file-list');
        const fileHtml = `
            <div class="file-item">
                <div class="file-icon">📄</div>
                <div class="file-info">
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">${formatFileSize(file.size)} · ${getCurrentDate()}</div>
                </div>
                <button class="btn-file-action" title="下载">⬇️</button>
            </div>
        `;
        fileList.insertAdjacentHTML('beforeend', fileHtml);

        // 重新初始化文件上传
        initFileUpload();
    }, 1500);
}

/* ==========================================
   工具函数
   ========================================== */

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom(element) {
    if (element) {
        element.scrollTop = element.scrollHeight;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function showToast(message) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: #262626;
        color: white;
        border-radius: 6px;
        z-index: 10000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
