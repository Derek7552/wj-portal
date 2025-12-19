/**
 * 信息预览/对话模式 - 交互逻辑
 */

(function() {
    'use strict';

    // 模拟任务数据
    const mockTasks = [
        { id: '1', name: '技术方案分析', status: 'completed', active: true },
        { id: '2', name: '行业趋势探讨', status: 'completed', active: false },
        { id: '3', name: '案例研究总结', status: 'completed', active: false },
        { id: '4', name: '最佳实践分享', status: 'running', active: false },
        { id: '5', name: '新技术应用探索', status: 'completed', active: false }
    ];

    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        // 初始化侧导航组件
        if (typeof initAgentSidebar === 'function') {
            initAgentSidebar({
                tasks: mockTasks,
                maxTasks: 10,
                onNewTask: function() {
                    console.log('创建新任务');
                    // 这里可以实现新任务的创建逻辑
                },
                onTaskClick: function(taskId, taskData) {
                    console.log('点击任务:', taskId, taskData);
                    // 这里可以实现任务切换逻辑
                },
                onViewAll: function() {
                    console.log('查看全部任务');
                    // 这里可以实现查看全部任务的逻辑
                }
            });
        }

        // 初始化聊天输入框组件
        if (typeof initChatInput === 'function') {
            initChatInput({
                onSend: function(message) {
                    console.log('发送消息:', message);
                    // 模拟添加用户消息
                    addMessage('user', message);

                    // 模拟AI回复
                    setTimeout(function() {
                        addMessage('ai', '这是一条模拟的AI回复消息。实际使用时，这里应该调用AI接口获取真实回复。');
                    }, 1000);
                }
            });
        }

        // 清空对话按钮
        const clearChatBtn = document.getElementById('clearChat');
        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', function() {
                if (confirm('确定要清空当前对话吗？')) {
                    clearMessages();
                }
            });
        }
    });

    // 添加消息到对话区域
    function addMessage(type, text) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message message-' + type;

        const avatar = type === 'user' ? '👤' : '🤖';
        const currentTime = new Date().toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML =
            '<div class="message-avatar">' + avatar + '</div>' +
            '<div class="message-content">' +
                '<div class="message-time">' + currentTime + '</div>' +
                '<div class="message-text">' + escapeHtml(text) + '</div>' +
            '</div>';

        chatMessages.appendChild(messageDiv);

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 清空消息
    function clearMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        chatMessages.innerHTML =
            '<div class="message message-ai">' +
                '<div class="message-avatar">🤖</div>' +
                '<div class="message-content">' +
                    '<div class="message-time">刚刚</div>' +
                    '<div class="message-text">' +
                        '<p>您好！我是AI智能助手，我可以帮助您深入理解这篇内容。</p>' +
                        '<p>您可以向我提问任何相关问题，例如：</p>' +
                        '<ul>' +
                            '<li>详细解释某个概念或观点？</li>' +
                            '<li>如何应用这些建议到实际场景？</li>' +
                            '<li>与其他相关主题有什么联系？</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    // HTML转义
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
