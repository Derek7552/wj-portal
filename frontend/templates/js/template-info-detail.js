/**
 * 信息详情页交互逻辑（通用模板）
 * 包括：对话功能、收藏功能、分享导出等
 */

// ================================
// DOM 元素
// ================================
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const clearChat = document.getElementById('clearChat');
const collectBtn = document.getElementById('collectBtn');

// ================================
// 对话功能
// ================================

/**
 * 发送消息
 */
function sendMessage() {
    const message = chatInput.value.trim();

    if (!message) {
        return;
    }

    // 添加用户消息
    addUserMessage(message);

    // 清空输入框
    chatInput.value = '';

    // 模拟AI回复（实际应该是API调用）
    setTimeout(() => {
        addAIMessage('感谢您的提问！让我帮您分析一下这篇资讯中的关键信息...');
    }, 1000);
}

/**
 * 添加用户消息
 */
function addUserMessage(text) {
    const messageHtml = `
        <div class="message message-user">
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-time">${getCurrentTime()}</div>
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
            </div>
        </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom();
}

/**
 * 添加AI消息
 */
function addAIMessage(text) {
    const messageHtml = `
        <div class="message message-ai">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-time">${getCurrentTime()}</div>
                <div class="message-bubble">
                    <p>${escapeHtml(text)}</p>
                </div>
                <div class="message-actions">
                    <button class="btn-icon" title="复制" onclick="copyMessage(this)">📋</button>
                    <button class="btn-icon" title="点赞" onclick="likeMessage(this)">👍</button>
                    <button class="btn-icon" title="反馈" onclick="feedbackMessage(this)">💬</button>
                </div>
            </div>
        </div>
    `;

    chatMessages.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom();
}

/**
 * 清空对话
 */
function clearChatMessages() {
    // 确认对话框
    if (!confirm('确定要清空所有对话记录吗？')) {
        return;
    }

    // 清空消息，保留欢迎消息
    const welcomeMessage = chatMessages.querySelector('.message-ai');
    chatMessages.innerHTML = '';
    if (welcomeMessage) {
        chatMessages.appendChild(welcomeMessage.cloneNode(true));
    }
}

/**
 * 滚动到底部
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * 获取当前时间
 */
function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * HTML转义
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================================
// 消息操作
// ================================

/**
 * 复制消息
 */
function copyMessage(button) {
    const messageBubble = button.closest('.message-content').querySelector('.message-bubble');
    const text = messageBubble.innerText;

    navigator.clipboard.writeText(text).then(() => {
        showToast('已复制到剪贴板');
    }).catch(() => {
        showToast('复制失败，请重试');
    });
}

/**
 * 点赞消息
 */
function likeMessage(button) {
    // 切换点赞状态
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        button.textContent = '👍';
        showToast('已取消点赞');
    } else {
        button.classList.add('liked');
        button.textContent = '👍';
        showToast('点赞成功');
    }
}

/**
 * 反馈消息
 */
function feedbackMessage(button) {
    showToast('感谢您的反馈！');
}

// ================================
// 收藏功能
// ================================

/**
 * 切换收藏状态
 */
function toggleCollect() {
    if (collectBtn.classList.contains('active')) {
        collectBtn.classList.remove('active');
        collectBtn.querySelector('span:last-child').textContent = '收藏';
        showToast('已取消收藏');
    } else {
        collectBtn.classList.add('active');
        collectBtn.querySelector('span:last-child').textContent = '已收藏';
        showToast('收藏成功');
    }
}

// ================================
// 分享和导出
// ================================

/**
 * 分享资讯
 */
function shareNews() {
    // 复制链接到剪贴板
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('链接已复制，可以分享给好友了');
    }).catch(() => {
        showToast('复制失败，请重试');
    });
}

/**
 * 导出资讯
 */
function exportNews() {
    // 获取文章内容
    const title = document.querySelector('.detail-title').textContent;
    const article = document.querySelector('.detail-article').innerText;

    // 创建文本内容
    const content = `${title}\n\n${article}`;

    // 创建并下载文件
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('导出成功');
}

// ================================
// 工具函数
// ================================

/**
 * 显示提示信息
 */
function showToast(message, duration = 2000) {
    // 移除已存在的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// ================================
// 事件监听
// ================================

// 发送消息
chatSend?.addEventListener('click', sendMessage);

// 回车发送（Shift+Enter换行）
chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
        // Shift+Enter 换行，默认行为
        return;
    } else if (e.key === 'Enter') {
        // 单独Enter发送
        e.preventDefault();
        sendMessage();
    }
});

// 清空对话
clearChat?.addEventListener('click', clearChatMessages);

// 收藏按钮
collectBtn?.addEventListener('click', toggleCollect);

// 分享和导出按钮（通过事件委托）
document.addEventListener('click', (e) => {
    const target = e.target.closest('button');
    if (!target) return;

    const buttonText = target.textContent.trim();

    if (buttonText.includes('分享')) {
        shareNews();
    } else if (buttonText.includes('导出')) {
        exportNews();
    }
});

// ================================
// 页面加载完成
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('安全资讯详情页加载完成');

    // 自动滚动到消息底部
    if (chatMessages) {
        scrollToBottom();
    }

    // 添加toast样式（如果不存在）
    if (!document.querySelector('style[data-toast-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-toast-style', 'true');
        style.textContent = `
            .toast {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                padding: 12px 24px;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                border-radius: 6px;
                font-size: 14px;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }

            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});

// ================================
// 导出函数供HTML调用
// ================================

window.sendMessage = sendMessage;
window.clearChatMessages = clearChatMessages;
window.toggleCollect = toggleCollect;
window.shareNews = shareNews;
window.exportNews = exportNews;
window.copyMessage = copyMessage;
window.likeMessage = likeMessage;
window.feedbackMessage = feedbackMessage;
