/* ==========================================
   自规划模式智能体 - 交互逻辑
   ========================================== */

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initTaskList();
    initSidebarTabs();
    initMessageInput();
    initTaskControls();
    initFileUpload();
    initViewAllTasks();
    initLogPanel();
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

    // 更新任务名称和时间（参考快速对话助手示例）
    const taskNameText = document.querySelector('.task-name-text');
    const taskTime = document.querySelector('.task-time');
    
    if (taskNameText) {
        taskNameText.textContent = taskName;
    }
    
    if (taskTime) {
        // 这里应该从任务数据中获取创建时间
        // 暂时使用当前时间作为示例
        const now = new Date();
        const timeStr = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        taskTime.textContent = timeStr;
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
    const taskSidebar = document.querySelector('.task-sidebar');
    const contentContainer = document.querySelector('.content-container');
    const newTaskInput = document.getElementById('newTaskInput');

    if (emptyStateContainer && taskDetailsContainer) {
        // 移除所有任务的active状态
        document.querySelectorAll('.recent-task-item').forEach(item => {
            item.classList.remove('active');
        });

        // 显示空状态，隐藏任务详情
        emptyStateContainer.style.display = 'flex';
        taskDetailsContainer.style.display = 'none';

        // 隐藏右侧面板（文件、产物）
        if (taskSidebar) {
            taskSidebar.style.display = 'none';
        }

        // 调整布局为两列（隐藏右侧面板时）
        if (contentContainer) {
            contentContainer.classList.add('hide-sidebar');
        }

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
    const taskSidebar = document.querySelector('.task-sidebar');
    const contentContainer = document.querySelector('.content-container');

    if (emptyStateContainer && taskDetailsContainer) {
        emptyStateContainer.style.display = 'none';
        taskDetailsContainer.style.display = 'flex';

        // 显示右侧面板（文件、产物）
        if (taskSidebar) {
            taskSidebar.style.display = '';
        }

        // 恢复三列布局（显示右侧面板时）
        if (contentContainer) {
            contentContainer.classList.remove('hide-sidebar');
        }
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

    // 更新任务名称和时间（参考快速对话助手示例）
    const taskNameText = document.querySelector('.task-name-text');
    const taskTime = document.querySelector('.task-time');
    
    if (taskNameText) {
        taskNameText.textContent = taskName;
    }
    
    if (taskTime) {
        const now = new Date();
        const timeStr = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        taskTime.textContent = timeStr;
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
   Tab切换（已移除，仅保留对话记录）
   ========================================== */

function initSidebarTabs() {
    const sidebarTabs = document.querySelectorAll('.sidebar-tab');
    const filesTab = document.getElementById('filesTab');
    const logsTab = document.getElementById('logsTab');
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
                logsTab.style.display = 'none';
                outputsTab.style.display = 'none';
            } else if (tabName === 'logs') {
                filesTab.style.display = 'none';
                logsTab.style.display = 'block';
                outputsTab.style.display = 'none';
            } else if (tabName === 'outputs') {
                filesTab.style.display = 'none';
                logsTab.style.display = 'none';
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

/* ==========================================
   日志面板功能
   ========================================== */

// 日志数据存储
const logDataStore = {
    'tool-001': {
        type: 'tool',
        name: '文件系统读取工具',
        status: 'completed',
        input: {
            path: '/project',
            action: 'read_directory'
        },
        output: {
            files: [
                'app.js',
                'package.json',
                'src/',
                'routes/',
                'controllers/'
            ],
            totalFiles: 45,
            totalSize: '2.3 MB'
        }
    },
    'tool-002': {
        type: 'tool',
        name: '文件系统读取工具',
        status: 'completed',
        input: {
            path: '/project/src',
            action: 'read_directory'
        },
        output: {
            files: [
                'auth.js',
                'userController.js',
                'uploadController.js',
                'middleware/',
                'utils/'
            ],
            totalFiles: 28,
            totalSize: '1.8 MB'
        }
    },
    'tool-003': {
        type: 'tool',
        name: '代码分析工具',
        status: 'completed',
        input: {
            files: ['app.js', 'routes/auth.js', 'controllers/userController.js'],
            analysisType: 'structure'
        },
        output: {
            structure: {
                entryPoint: 'app.js',
                routes: ['/api/auth', '/api/user', '/api/upload'],
                controllers: ['authController', 'userController', 'uploadController'],
                middleware: ['auth', 'errorHandler']
            },
            dependencies: ['express', 'mongoose', 'jsonwebtoken', 'bcrypt']
        }
    },
    'tool-004': {
        type: 'tool',
        name: '依赖分析工具',
        status: 'completed',
        input: {
            file: 'package.json'
        },
        output: {
            dependencies: {
                'express': '^4.18.2',
                'mongoose': '^7.0.0',
                'jsonwebtoken': '^9.0.0',
                'bcrypt': '^5.1.0'
            },
            devDependencies: {
                'nodemon': '^2.0.20',
                'jest': '^29.0.0'
            },
            vulnerabilities: []
        }
    },
    'tool-005': {
        type: 'tool',
        name: '工程记忆文件读取',
        status: 'completed',
        input: {
            file: '工程功能记忆文件.md'
        },
        output: {
            content: '已读取工程功能记忆文件，包含项目结构、功能模块、技术栈等信息。'
        }
    },
    'tool-006': {
        type: 'tool',
        name: '代码扫描工具',
        status: 'running',
        input: {
            file: 'routes/auth.js',
            scanType: 'security'
        },
        output: {
            progress: 65,
            findings: [
                {
                    line: 23,
                    type: 'warning',
                    message: 'JWT签名验证可能不完整'
                }
            ]
        }
    },
    'tool-007': {
        type: 'tool',
        name: '漏洞检测工具',
        status: 'running',
        input: {
            files: ['routes/user.js', 'controllers/userController.js'],
            vulnerabilityType: 'SQL注入'
        },
        output: {
            progress: 40,
            findings: [
                {
                    file: 'routes/user.js',
                    line: 45,
                    type: 'high',
                    message: '发现潜在的SQL注入风险'
                }
            ]
        }
    },
    'tool-008': {
        type: 'tool',
        name: '工程记忆文件编辑',
        status: 'completed',
        input: {
            file: '工程功能记忆文件.md',
            action: 'update',
            content: '添加发现的潜在漏洞信息'
        },
        output: {
            updated: true,
            size: '4.5 KB'
        }
    },
    'tool-009': {
        type: 'tool',
        name: '工程记忆文件读取',
        status: 'completed',
        input: {
            file: '工程功能记忆文件.md'
        },
        output: {
            content: '已读取工程功能记忆文件，包含所有阶段的发现和漏洞信息。'
        }
    },
    'tool-010': {
        type: 'tool',
        name: '漏洞报告读取',
        status: 'completed',
        input: {
            files: ['漏洞报告-001.md', '漏洞报告-002.md']
        },
        output: {
            reports: [
                {
                    name: '漏洞报告-001.md',
                    severity: 'high',
                    vulnerabilities: 2
                },
                {
                    name: '漏洞报告-002.md',
                    severity: 'medium',
                    vulnerabilities: 3
                }
            ]
        }
    },
    'tool-011': {
        type: 'tool',
        name: '报告生成工具',
        status: 'running',
        input: {
            template: '综合分析报告',
            sources: ['工程功能记忆文件.md', '漏洞报告-001.md', '漏洞报告-002.md']
        },
        output: {
            progress: 75,
            estimatedSize: '5.2 KB'
        }
    },
    'file-001': {
        type: 'file',
        name: '工程功能总结.md',
        size: '2.3 KB',
        content: `# 工程功能总结

## 项目概述
- 项目类型：Node.js Web应用
- 技术栈：Express.js + MongoDB
- 主要功能：用户认证、数据管理、文件上传

## 功能模块

### 1. 用户认证模块
- 用户注册
- 用户登录
- JWT令牌管理
- 会话管理

### 2. 数据管理模块
- CRUD操作
- 数据验证
- 数据查询

### 3. 文件上传模块
- 文件存储
- 文件类型验证
- 文件管理`
    },
    'file-002': {
        type: 'file',
        name: '工程功能记忆文件.md',
        size: '3.1 KB',
        content: `# 工程功能记忆文件

## 项目结构
\`\`\`
project/
├── app.js
├── package.json
├── routes/
│   ├── auth.js
│   └── user.js
├── controllers/
│   ├── userController.js
│   └── uploadController.js
└── middleware/
    └── auth.js
\`\`\`

## 关键文件说明
- app.js: 应用主入口，配置Express服务器
- routes/auth.js: 认证路由，处理登录注册
- controllers/userController.js: 用户控制器，业务逻辑处理`
    },
    'file-003': {
        type: 'file',
        name: '漏洞报告-001.md',
        size: '1.2 KB',
        severity: 'high',
        content: `# 漏洞报告-001

## 高危漏洞

### 1. SQL注入漏洞
- **位置**: routes/user.js 第45行
- **描述**: 用户输入未进行验证，直接拼接到SQL查询中
- **影响**: 可能导致数据库被攻击
- **修复建议**: 使用参数化查询或ORM

### 2. JWT令牌伪造
- **位置**: middleware/auth.js 第23行
- **描述**: JWT签名验证缺失
- **影响**: 可能被伪造令牌绕过认证
- **修复建议**: 添加完整的签名验证逻辑`
    },
    'file-004': {
        type: 'file',
        name: '漏洞报告-002.md',
        size: '0.8 KB',
        severity: 'medium',
        content: `# 漏洞报告-002

## 中危漏洞

### 1. XSS漏洞
- **位置**: views/profile.ejs 第12行
- **描述**: 用户输入未转义
- **影响**: 可能被注入恶意脚本

### 2. 文件上传漏洞
- **位置**: controllers/upload.js 第67行
- **描述**: 文件类型验证不足
- **影响**: 可能上传恶意文件

### 3. 权限绕过
- **位置**: routes/admin.js 第34行
- **描述**: 权限检查不完整
- **影响**: 可能绕过权限控制`
    },
    'file-005': {
        type: 'file',
        name: '工程记忆文件.md',
        size: '4.5 KB',
        content: `# 工程记忆文件（已更新）

## 项目结构
[同file-002的内容]

## 发现的漏洞
- SQL注入漏洞（高危）
- JWT令牌伪造（高危）
- XSS漏洞（中危）
- 文件上传漏洞（中危）
- 权限绕过（中危）

## 分析记录
- 阶段1：已完成工程功能模块分析
- 阶段2：正在进行威胁建模与漏洞分析
- 已发现8个潜在漏洞点`
    },
    'file-006': {
        type: 'file',
        name: '工程总结报告.md',
        size: '预计 5.2 KB',
        status: 'generating',
        content: `# 工程总结报告（生成中）

报告正在生成中，预计包含：
- 分析概览
- 核心发现
- 关键文件
- 修复建议`
    }
};

function initLogPanel() {
    // 绑定可点击日志项的点击事件
    const clickableItems = document.querySelectorAll('.clickable-log-item');
    clickableItems.forEach(item => {
        item.addEventListener('click', function() {
            const logId = this.dataset.logId;
            const logType = this.dataset.logType;
            const toolName = this.dataset.toolName;
            const fileName = this.dataset.fileName;
            
            // 切换到日志Tab
            const logsTab = document.querySelector('[data-sidebar-tab="logs"]');
            if (logsTab) {
                logsTab.click();
            }
            
            // 显示日志内容
            showLogContent(logId, logType, toolName || fileName);
        });
    });
    
    // 绑定关闭按钮
    const btnCloseLog = document.getElementById('btnCloseLog');
    if (btnCloseLog) {
        btnCloseLog.addEventListener('click', function() {
            hideLogContent();
        });
    }
}

function showLogContent(logId, logType, name) {
    const logsEmptyState = document.getElementById('logsEmptyState');
    const logsContent = document.getElementById('logsContent');
    const logTitle = document.getElementById('logTitle');
    const logBody = document.getElementById('logBody');
    
    const logData = logDataStore[logId];
    if (!logData) {
        console.warn('Log data not found:', logId);
        return;
    }
    
    // 隐藏空状态，显示内容
    logsEmptyState.style.display = 'none';
    logsContent.style.display = 'flex';
    
    // 设置标题
    logTitle.textContent = name || logData.name;
    
    // 渲染日志内容
    if (logType === 'tool') {
        renderToolLog(logBody, logData);
    } else if (logType === 'file') {
        renderFileLog(logBody, logData);
    }
}

function hideLogContent() {
    const logsEmptyState = document.getElementById('logsEmptyState');
    const logsContent = document.getElementById('logsContent');
    
    logsEmptyState.style.display = 'flex';
    logsContent.style.display = 'none';
}

function renderToolLog(container, logData) {
    const statusClass = logData.status === 'running' ? 'running' : 'completed';
    const statusText = logData.status === 'running' ? '运行中' : '已完成';
    
    container.innerHTML = `
        <div class="log-tool-call">
            <div class="log-tool-header">
                <span class="log-tool-icon">🔧</span>
                <span class="log-tool-name">${logData.name}</span>
                <span class="log-tool-status ${statusClass}">${statusText}</span>
            </div>
            
            <div class="log-tool-input">
                <div class="log-section-label">输入参数</div>
                <div class="log-section-content">${formatJSON(logData.input)}</div>
            </div>
            
            <div class="log-tool-output">
                <div class="log-section-label">输出结果</div>
                <div class="log-section-content">${formatJSON(logData.output)}</div>
            </div>
        </div>
    `;
}

function renderFileLog(container, logData) {
    // 使用文件末尾定义的escapeHtml函数
    const escapedContent = escapeHtml(logData.content);
    container.innerHTML = `
        <div class="log-file-content">
            <div class="log-file-header">
                <span class="log-file-icon">📄</span>
                <span class="log-file-name">${logData.name}</span>
                <span class="log-file-meta">${logData.size}</span>
            </div>
            
            <div class="log-file-body">
                <pre><code>${escapedContent}</code></pre>
            </div>
        </div>
    `;
}

function formatJSON(obj) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (e) {
        return String(obj);
    }
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
