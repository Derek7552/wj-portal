/**
 * 智能体详情页面交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 新任务按钮
    // ==========================================
    const btnNewChat = document.querySelector('.btn-new-chat');
    if (btnNewChat) {
        btnNewChat.addEventListener('click', function() {
            // 跳转到空状态页面（新任务）
            window.location.href = 'agent-detail-empty.html';
        });
    }

    // ==========================================
    // 快速对话功能
    // ==========================================
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatInput && chatSend) {
        // 发送消息
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;

            // 添加用户消息到聊天区域
            addMessage(message, 'user');

            // 清空输入框
            chatInput.value = '';
            chatInput.style.height = 'auto';

            // 模拟AI回复（实际应该调用API）
            setTimeout(() => {
                addMessage('这是AI的回复示例...', 'ai');
            }, 1000);
        }

        // 添加消息到聊天区
        function addMessage(text, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message message-${type}`;

            const currentTime = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            messageDiv.innerHTML = `
                <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>${escapeHtml(text)}</p>
                    </div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // HTML转义
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // 点击发送按钮
        chatSend.addEventListener('click', sendMessage);

        // Shift+Enter 发送
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // 自动调整输入框高度
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 150) + 'px';
        });
    }

    // ==========================================
    // 消息操作按钮
    // ==========================================
    document.addEventListener('click', function(e) {
        if (e.target.closest('.message-actions .btn-icon')) {
            const btn = e.target.closest('.btn-icon');
            const title = btn.getAttribute('title');
            const messageBubble = btn.closest('.message-content').querySelector('.message-bubble');

            if (title === '复制') {
                const text = messageBubble.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showToast('已复制到剪贴板');
                });
            } else if (title === '点赞') {
                btn.textContent = btn.textContent === '👍' ? '👍🏻' : '👍';
                showToast('感谢反馈！');
            } else if (title === '反馈') {
                showToast('反馈功能开发中...');
            }
        }
    });

    // ==========================================
    // 任务管理功能
    // ==========================================

    // 筛选功能
    const filterSelects = document.querySelectorAll('.filter-group .select-field');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
            // 这里应该调用API筛选任务
        });
    });

    // 任务操作按钮
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.task-actions .btn, .task-actions .btn-icon');
        if (!btn) return;

        const taskCard = btn.closest('.task-card');
        const taskTitle = taskCard?.querySelector('.task-title')?.textContent;

        const btnText = btn.textContent.trim();

        if (btnText.includes('继续任务') || btnText.includes('继续')) {
            console.log('继续任务:', taskTitle);
            showToast('正在加载任务...');
            // 跳转到任务详情页
        } else if (btnText.includes('查看详情')) {
            console.log('查看详情:', taskTitle);
            // 跳转到任务详情页
        } else if (btnText.includes('重试')) {
            console.log('重试任务:', taskTitle);
            showToast('正在重试任务...');
        } else if (btnText.includes('查看日志')) {
            console.log('查看日志:', taskTitle);
        } else if (btnText.includes('导出报告')) {
            console.log('导出报告:', taskTitle);
            showToast('正在生成报告...');
        } else if (btn.classList.contains('btn-icon') && btn.title === '删除') {
            if (confirm(`确定要删除任务"${taskTitle}"吗？`)) {
                taskCard.style.opacity = '0';
                setTimeout(() => {
                    taskCard.remove();
                    showToast('任务已删除');
                }, 300);
            }
        }
    });

    // ==========================================
    // 创建新任务按钮
    // ==========================================
    const createTaskBtn = document.querySelector('.page-actions .btn-primary');
    if (createTaskBtn && createTaskBtn.textContent.includes('创建新任务')) {
        createTaskBtn.addEventListener('click', function() {
            console.log('创建新任务');
            showToast('跳转到创建任务页面...');
            // 实际应该跳转或打开模态框
        });
    }

    // ==========================================
    // 工具函数
    // ==========================================

    // 显示Toast提示
    function showToast(message, duration = 2000) {
        // 检查是否已有toast
        let toast = document.querySelector('.toast');
        if (toast) {
            toast.remove();
        }

        // 创建toast元素
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ==========================================
    // 侧边栏折叠功能
    // ==========================================
    const agentSidebar = document.querySelector('.agent-sidebar');
    if (agentSidebar) {
        // 可以添加折叠功能（移动端）
        const handleResize = () => {
            if (window.innerWidth <= 992) {
                agentSidebar.classList.add('mobile');
            } else {
                agentSidebar.classList.remove('mobile');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    }
});

// 添加动画样式
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
