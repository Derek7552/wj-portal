/* ==========================================
   聊天输入框组件 - JavaScript
   ========================================== */

/**
 * 初始化聊天输入框组件
 * @param {Object} options - 配置选项
 * @param {string} options.selector - 组件选择器，默认 '.chat-input-container'
 * @param {Function} options.onSend - 发送消息的回调函数
 * @param {number} options.maxHeight - 输入框最大高度，默认 200px
 * @param {boolean} options.autoFocus - 是否自动聚焦，默认 false
 */
function initChatInput(options = {}) {
    const {
        selector = '.chat-input-container',
        onSend = null,
        maxHeight = 200,
        autoFocus = false
    } = options;

    // 查找组件容器
    const container = document.querySelector(selector);
    if (!container) {
        console.warn(`聊天输入框组件未找到: ${selector}`);
        return null;
    }

    // 获取子元素
    const chatInput = container.querySelector('.chat-input');
    const chatSend = container.querySelector('.chat-send');
    const actionButtons = container.querySelectorAll('.chat-input-actions .btn-icon');

    if (!chatInput || !chatSend) {
        console.warn('聊天输入框组件缺少必要的子元素');
        return null;
    }

    // 自动聚焦
    if (autoFocus) {
        chatInput.focus();
    }

    // 自动调整高度
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, maxHeight) + 'px';
    });

    // Shift+Enter 发送消息
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 发送按钮点击
    chatSend.addEventListener('click', function(e) {
        e.preventDefault();
        sendMessage();
    });

    // 工具按钮点击事件
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.dataset.action;
            handleToolAction(action);
        });
    });

    // 发送消息函数
    function sendMessage() {
        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        // 调用回调函数
        if (onSend && typeof onSend === 'function') {
            onSend(message);
        } else {
            console.log('发送消息:', message);
        }

        // 清空输入框
        chatInput.value = '';
        chatInput.style.height = 'auto';

        // 触发 input 事件以更新高度
        chatInput.dispatchEvent(new Event('input'));
    }

    // 工具按钮处理函数
    function handleToolAction(action) {
        console.log('工具按钮点击:', action);

        switch (action) {
            case 'upload':
                // 触发文件上传
                handleFileUpload();
                break;
            case 'image':
                // 触发图片上传
                handleImageUpload();
                break;
            case 'code':
                // 插入代码块
                insertCodeBlock();
                break;
            case 'table':
                // 插入表格
                insertTable();
                break;
            default:
                console.log('未知的工具操作:', action);
        }
    }

    // 文件上传处理
    function handleFileUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('选择了文件:', file.name);
                // 这里可以处理文件上传逻辑
            }
        };
        input.click();
    }

    // 图片上传处理
    function handleImageUpload() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('选择了图片:', file.name);
                // 这里可以处理图片上传逻辑
            }
        };
        input.click();
    }

    // 插入代码块
    function insertCodeBlock() {
        const codeTemplate = '```\n\n```';
        insertTextAtCursor(chatInput, codeTemplate);
        // 将光标移到代码块中间
        const cursorPos = chatInput.selectionStart - 4;
        chatInput.setSelectionRange(cursorPos, cursorPos);
        chatInput.focus();
    }

    // 插入表格
    function insertTable() {
        const tableTemplate = '| 列1 | 列2 | 列3 |\n|-----|-----|-----|\n| 内容 | 内容 | 内容 |\n';
        insertTextAtCursor(chatInput, tableTemplate);
        chatInput.focus();
    }

    // 在光标位置插入文本
    function insertTextAtCursor(input, text) {
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const before = input.value.substring(0, start);
        const after = input.value.substring(end);

        input.value = before + text + after;
        input.setSelectionRange(start + text.length, start + text.length);

        // 触发 input 事件以更新高度
        input.dispatchEvent(new Event('input'));
    }

    // 返回组件实例，提供公共方法
    return {
        element: container,
        input: chatInput,
        sendButton: chatSend,

        // 获取输入内容
        getValue: () => chatInput.value,

        // 设置输入内容
        setValue: (value) => {
            chatInput.value = value;
            chatInput.dispatchEvent(new Event('input'));
        },

        // 清空输入
        clear: () => {
            chatInput.value = '';
            chatInput.style.height = 'auto';
        },

        // 聚焦输入框
        focus: () => chatInput.focus(),

        // 禁用/启用
        setDisabled: (disabled) => {
            chatInput.disabled = disabled;
            chatSend.disabled = disabled;
            actionButtons.forEach(btn => btn.disabled = disabled);
        },

        // 销毁组件
        destroy: () => {
            // 移除事件监听器（如需要的话）
            console.log('聊天输入框组件已销毁');
        }
    };
}

// 支持模块化导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initChatInput };
}
