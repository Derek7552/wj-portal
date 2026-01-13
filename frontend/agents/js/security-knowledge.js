// 安全智库智能体页面交互逻辑

// 模拟对话数据
const mockConversations = [
    { id: '1', title: 'OWASP Top 10 漏洞咨询', status: 'running', messageCount: 8, lastReply: '刚刚', time: '2025-12-19 14:30' },
    { id: '2', title: '零信任架构咨询', status: 'running', messageCount: 15, lastReply: '2小时前', time: '2025-12-19 12:15' },
    { id: '3', title: 'API安全最佳实践', status: 'completed', messageCount: 23, lastReply: '昨天', time: '2025-12-18 16:20' },
    { id: '4', title: 'DevSecOps实施方案', status: 'completed', messageCount: 18, lastReply: '2天前', time: '2025-12-17 10:30' },
    { id: '5', title: '容器安全加固指南', status: 'completed', messageCount: 12, lastReply: '3天前', time: '2025-12-16 15:45' },
    { id: '6', title: 'Web应用渗透测试', status: 'completed', messageCount: 31, lastReply: '5天前', time: '2025-12-14 09:20' },
    { id: '7', title: '等保2.0合规咨询', status: 'completed', messageCount: 27, lastReply: '1周前', time: '2025-12-12 14:10' },
    { id: '8', title: '云安全架构设计', status: 'completed', messageCount: 19, lastReply: '1周前', time: '2025-12-11 11:30' },
    { id: '9', title: '数据加密方案选型', status: 'completed', messageCount: 14, lastReply: '2周前', time: '2025-12-05 16:00' },
    { id: '10', title: '安全监控体系建设', status: 'completed', messageCount: 22, lastReply: '2周前', time: '2025-12-04 13:45' }
];

document.addEventListener('DOMContentLoaded', function() {
    // 初始化侧边栏展开/收起功能
    initSidebarToggle();

    // 初始化收藏功能（使用dashboard.js中的函数）
    if (typeof window.initFavorites === 'function') {
        window.initFavorites();
    }

    // 初始化首页菜单位置（使用dashboard.js中的函数）
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }

    // 初始化新任务按钮
    initNewTaskButton();

    // 初始化近期任务列表
    initRecentTasks();

    // 初始化查看全部对话记录按钮
    initViewAllButton();

    // 初始化聊天输入
    initChatInput();
});

// 初始化侧边栏展开/收起功能（安全智库页：默认收起且不支持展开）
function initSidebarToggle() {
    const sidebar = document.getElementById('sidebar');

    if (!sidebar) return;

    // 安全智库页：强制收起，不允许展开
    sidebar.classList.add('collapsed');

    // 移除展开/收起按钮（如果存在）
    const toggleBtn = document.getElementById('sidebarToggle');
    if (toggleBtn) {
        toggleBtn.style.display = 'none';
    }
}

// 初始化新任务按钮
function initNewTaskButton() {
    const newTaskBtn = document.querySelector('.btn-new-chat');
    if (!newTaskBtn) return;

    newTaskBtn.addEventListener('click', function() {
        console.log('创建新任务');

        // 移除所有任务的active状态
        const allTaskItems = document.querySelectorAll('.recent-task-item');
        allTaskItems.forEach(function(item) {
            item.classList.remove('active');
        });

        // 显示空状态页面
        showEmptyState();
    });
}

// 初始化近期任务列表
function initRecentTasks() {
    const taskItems = document.querySelectorAll('.recent-task-item');

    taskItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除所有任务的active状态
            taskItems.forEach(function(task) {
                task.classList.remove('active');
            });

            // 添加当前任务的active状态
            this.classList.add('active');

            // 显示对话内容（这里可以根据实际需求加载历史对话）
            const taskName = this.querySelector('.task-name').textContent;
            showChatContent(taskName);
        });
    });
}

// 初始化查看全部对话记录按钮
function initViewAllButton() {
    const viewAllBtn = document.querySelector('.view-all-tasks');
    if (!viewAllBtn) return;

    viewAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('查看全部对话记录');
        showAllConversations();
    });
}

// 显示全部对话记录
function showAllConversations() {
    const mainContent = document.querySelector('.agent-main-content');
    if (!mainContent) return;

    // 生成对话列表HTML
    let conversationsHtml = '';
    for (let i = 0; i < mockConversations.length; i++) {
        const conv = mockConversations[i];
        const statusIcon = conv.status === 'running' ? '⏳' : '✅';
        const statusClass = conv.status;

        conversationsHtml += '<div class="task-record-card" data-conv-id="' + conv.id + '">' +
            '<div class="task-record-left">' +
                '<div class="task-record-header">' +
                    '<div class="task-record-status">' +
                        '<span class="task-status-badge ' + statusClass + '">' + statusIcon + '</span>' +
                    '</div>' +
                    '<div class="task-record-name">' + conv.title + '</div>' +
                '</div>' +
                '<div class="task-record-statistics">' +
                    '<span class="statistics-label">消息数</span>' +
                    '<span class="statistics-value">' + conv.messageCount + ' 条</span>' +
                '</div>' +
            '</div>' +
            '<div class="task-record-right">' +
                '<div class="task-record-time">' + conv.time + '</div>' +
                '<div class="task-record-actions">' +
                    '<button class="task-action-btn">查看</button>' +
                    '<button class="task-action-btn">删除</button>' +
                '</div>' +
            '</div>' +
        '</div>';
    }

    if (mockConversations.length === 0) {
        conversationsHtml = '<div class="tasks-empty">暂无对话记录</div>';
    }

    // 替换内容
    mainContent.innerHTML = '<div class="tasks-list-container">' +
        '<div class="tasks-list-header">' +
            '<h2 class="tasks-list-title">历史对话记录</h2>' +
        '</div>' +
        '<div class="tasks-list-content">' +
            conversationsHtml +
        '</div>' +
    '</div>';

    // 绑定对话项点击事件
    const convItems = mainContent.querySelectorAll('.task-record-card');
    for (let i = 0; i < convItems.length; i++) {
        convItems[i].addEventListener('click', function(e) {
            // 如果点击的是按钮，不触发卡片点击
            if (e.target.classList.contains('task-action-btn')) {
                e.stopPropagation();
                const btnText = e.target.textContent;
                const convId = this.getAttribute('data-conv-id');

                if (btnText === '查看') {
                    // 查找对应的对话并显示详情
                    let selectedConv = null;
                    for (let j = 0; j < mockConversations.length; j++) {
                        if (mockConversations[j].id === convId) {
                            selectedConv = mockConversations[j];
                            break;
                        }
                    }

                    if (selectedConv) {
                        showChatContent(selectedConv.title);
                    }
                } else if (btnText === '删除') {
                    if (confirm('确定要删除此对话吗？')) {
                        console.log('删除对话:', convId);
                    }
                }
                return;
            }

            // 点击卡片其他区域，显示对话详情
            const convId = this.getAttribute('data-conv-id');
            let selectedConv = null;
            for (let j = 0; j < mockConversations.length; j++) {
                if (mockConversations[j].id === convId) {
                    selectedConv = mockConversations[j];
                    break;
                }
            }

            if (selectedConv) {
                showChatContent(selectedConv.title);
            }
        });
    }
}

// 显示空状态页面
function showEmptyState() {
    const mainContent = document.querySelector('.agent-main-content');
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="empty-state-container">
            <div class="empty-agent-name">
                <span class="agent-name-text">安全智库</span>
            </div>
            <div class="empty-state-guide">
                <p class="empty-state-guide-text">咨询安全知识，获取最佳实践指南</p>
            </div>
            <div class="chat-input-container" data-container-mode="empty">
                <div class="chat-input-wrapper">
                    <textarea
                        class="chat-input"
                        id="chatInput"
                        placeholder="输入您的安全问题或咨询内容..."
                        rows="3"
                    ></textarea>
                    <div class="chat-input-toolbar">
                        <div class="chat-input-actions">
                            <div class="knowledge-base-dropdown-wrapper">
                                <button class="filter-btn knowledge-base-btn">
                                    <span class="filter-icon">📚</span>
                                    <span class="filter-text">全部</span>
                                    <span class="filter-arrow">▼</span>
                                </button>
                                <div class="knowledge-base-dropdown-menu">
                                    <div class="knowledge-base-menu-item active" data-kb="all">
                                        <span class="menu-item-icon">📚</span>
                                        <span class="menu-item-text">全部</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="personal">
                                        <span class="menu-item-icon">📖</span>
                                        <span class="menu-item-text">个人知识库</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="enterprise">
                                        <span class="menu-item-icon">🏢</span>
                                        <span class="menu-item-text">企业知识库</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="industry">
                                        <span class="menu-item-icon">🌐</span>
                                        <span class="menu-item-text">行业知识库</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary chat-send" id="chatSend">
                            <span>发送</span>
                            <span class="send-shortcut">Shift+Enter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 重新初始化聊天输入
    initChatInput();
}

// 显示对话内容
function showChatContent(taskName) {
    const mainContent = document.querySelector('.agent-main-content');
    if (!mainContent) return;

    // 获取当前时间
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    const dateTimeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(/\//g, '-');

    // 这里可以根据taskName加载对应的历史对话
    // 目前显示一个示例对话界面
    mainContent.innerHTML = `
        <div class="chat-container">
            <!-- 对话/任务名称 -->
            <div class="chat-task-name">
                <div class="task-name-text">${taskName}</div>
                <div class="task-time">${dateTimeStr}</div>
            </div>

            <!-- 对话消息区域 -->
            <div class="chat-messages" id="chatMessages">
                <!-- 用户消息 -->
                <div class="message message-user">
                    <div class="message-avatar">👤</div>
                    <div class="message-content">
                        <div class="message-time">${timeStr}</div>
                        <div class="message-bubble">
                            <p>请帮我详细讲解一下${taskName}的相关内容，包括实施要点和注意事项。</p>
                        </div>
                    </div>
                </div>

                <!-- AI消息 -->
                <div class="message message-ai">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-time">${timeStr}</div>
                        <div class="message-bubble">
                            <p>好的，我来为您详细介绍${taskName}。</p>
                            <p>这个主题涵盖了以下几个关键方面：</p>
                            <ul>
                                <li>核心概念和原理</li>
                                <li>实施步骤与方法</li>
                                <li>常见问题与解决方案</li>
                                <li>最佳实践建议</li>
                            </ul>
                            <p>您想深入了解哪个方面呢？或者有其他具体问题可以随时向我提问。</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 输入区域 -->
            <div class="chat-input-container" data-container-mode="chat">
                <div class="chat-input-wrapper">
                    <textarea
                        class="chat-input"
                        id="chatInput"
                        placeholder="输入您的问题..."
                        rows="3"
                    ></textarea>
                    <div class="chat-input-toolbar">
                        <div class="chat-input-actions">
                            <div class="knowledge-base-dropdown-wrapper">
                                <button class="filter-btn knowledge-base-btn">
                                    <span class="filter-icon">📚</span>
                                    <span class="filter-text">全部</span>
                                    <span class="filter-arrow">▼</span>
                                </button>
                                <div class="knowledge-base-dropdown-menu">
                                    <div class="knowledge-base-menu-item active" data-kb="all">
                                        <span class="menu-item-icon">📚</span>
                                        <span class="menu-item-text">全部</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="personal">
                                        <span class="menu-item-icon">📖</span>
                                        <span class="menu-item-text">个人知识库</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="enterprise">
                                        <span class="menu-item-icon">🏢</span>
                                        <span class="menu-item-text">企业知识库</span>
                                    </div>
                                    <div class="knowledge-base-menu-item" data-kb="industry">
                                        <span class="menu-item-icon">🌐</span>
                                        <span class="menu-item-text">行业知识库</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary chat-send" id="chatSend">
                            <span>发送</span>
                            <span class="send-shortcut">Shift+Enter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 重新初始化聊天输入
    initChatInput();

    // 滚动到消息底部
    const messagesContainer = mainContent.querySelector('.chat-messages');
    if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// 初始化聊天输入
function initChatInput() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    if (!chatInput || !chatSend) return;

    // 发送按钮点击事件
    chatSend.addEventListener('click', function() {
        sendMessage();
    });

    // 输入框键盘事件
    chatInput.addEventListener('keydown', function(e) {
        // Shift + Enter 发送消息
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 自动调整输入框高度
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    // 初始化知识库下拉框
    initKnowledgeBaseDropdown();
}

// 初始化知识库下拉框
function initKnowledgeBaseDropdown() {
    const dropdownBtn = document.querySelector('.knowledge-base-btn');
    const dropdownMenu = document.querySelector('.knowledge-base-dropdown-menu');
    const menuItems = document.querySelectorAll('.knowledge-base-menu-item');

    if (!dropdownBtn || !dropdownMenu) return;

    // 点击下拉按钮
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    // 点击菜单项
    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.stopPropagation();

            // 移除其他项的active状态
            menuItems.forEach(function(i) {
                i.classList.remove('active');
            });

            // 添加当前项的active状态
            this.classList.add('active');

            // 更新按钮显示
            const icon = this.querySelector('.menu-item-icon').textContent;
            const text = this.querySelector('.menu-item-text').textContent;
            dropdownBtn.querySelector('.filter-icon').textContent = icon;
            dropdownBtn.querySelector('.filter-text').textContent = text;

            // 关闭下拉菜单
            dropdownMenu.classList.remove('show');

            // 记录选择的知识库
            const kb = this.getAttribute('data-kb');
            console.log('选择知识库:', kb, text);
        });
    });

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('show');
    });

    // 设置默认选中项（全部）
    const defaultItem = document.querySelector('.knowledge-base-menu-item[data-kb="all"]');
    if (defaultItem) {
        defaultItem.classList.add('active');
    }
}

// 发送消息
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;

    const message = chatInput.value.trim();
    if (!message) return;

    console.log('发送消息:', message);

    // 清空输入框
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // 这里可以添加实际的消息发送逻辑
    // 例如：调用API、显示消息等
}
