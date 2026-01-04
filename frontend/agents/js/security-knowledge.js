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
                            <button class="btn-icon" title="上传文件">📎</button>
                            <button class="btn-icon" title="插入图片">🖼️</button>
                            <button class="btn-icon" title="插入代码">💻</button>
                            <button class="btn-icon" title="插入表格">📊</button>
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

    // 这里可以根据taskName加载对应的历史对话
    // 目前显示一个示例对话界面
    mainContent.innerHTML = `
        <div class="chat-container">
            <div class="chat-header">
                <div class="chat-title">${taskName}</div>
                <div class="chat-time">刚刚</div>
            </div>
            <div class="chat-messages">
                <div class="message-item user-message">
                    <div class="message-content">
                        <p>${taskName}相关问题...</p>
                    </div>
                    <div class="message-time">14:30</div>
                </div>
                <div class="message-item ai-message">
                    <div class="message-content">
                        <p>我可以帮你解答关于${taskName}的问题。请告诉我你想了解哪方面的内容？</p>
                    </div>
                    <div class="message-time">14:30</div>
                </div>
            </div>
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
                            <button class="btn-icon" title="上传文件">📎</button>
                            <button class="btn-icon" title="插入图片">🖼️</button>
                            <button class="btn-icon" title="插入代码">💻</button>
                            <button class="btn-icon" title="插入表格">📊</button>
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
