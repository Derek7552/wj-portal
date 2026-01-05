// 安全智库智能体页面交互逻辑

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
