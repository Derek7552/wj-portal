/**
 * 通用聊天输入框组件
 * Chat Input Component
 */

(function() {
    'use strict';

    /**
     * 初始化聊天输入框
     * @param {Object} options - 配置选项
     * @param {string} options.selector - 容器选择器，默认 '.chat-input-container'
     * @param {boolean} options.autoFocus - 是否自动聚焦，默认 false
     * @param {Function} options.onSend - 发送回调函数
     * @returns {Object|null} 输入框实例
     */
    function initChatInput(options) {
        options = options || {};
        var selector = options.selector || '.chat-input-container';
        var container = document.querySelector(selector);

        if (!container) {
            console.warn('Chat input container not found:', selector);
            return null;
        }

        var textarea = container.querySelector('.chat-input');
        var sendBtn = container.querySelector('.chat-send, #chatSend');

        if (!textarea) {
            console.warn('Chat input textarea not found in container');
            return null;
        }

        // 自动调整高度
        function autoResize() {
            textarea.style.height = 'auto';
            var maxHeight = 200; // 最大高度
            var newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = newHeight + 'px';

            // 如果超过最大高度，显示滚动条
            if (textarea.scrollHeight > maxHeight) {
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }
        }

        // 发送消息
        function send() {
            var message = textarea.value.trim();
            if (!message) {
                return;
            }

            if (typeof options.onSend === 'function') {
                options.onSend(message);
            }

            // 清空输入框
            textarea.value = '';
            autoResize();
        }

        // 绑定输入事件 - 自动调整高度
        textarea.addEventListener('input', autoResize);

        // 绑定键盘事件 - Shift+Enter 发送
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                send();
            }
        });

        // 绑定发送按钮点击事件
        if (sendBtn) {
            sendBtn.addEventListener('click', function(e) {
                e.preventDefault();
                send();
            });
        }

        // 绑定工具栏按钮事件
        var toolbarBtns = container.querySelectorAll('.chat-input-actions .btn-icon');
        toolbarBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var action = btn.getAttribute('data-action') || btn.getAttribute('title');
                console.log('工具栏按钮点击:', action);

                // 根据不同的 action 执行不同操作
                switch (action) {
                    case 'upload':
                    case '上传文件':
                        console.log('上传文件功能待实现');
                        break;
                    case 'image':
                    case '插入图片':
                        console.log('插入图片功能待实现');
                        break;
                    case 'code':
                    case '插入代码':
                        insertAtCursor(textarea, '\n```\n\n```\n');
                        break;
                    case 'table':
                    case '插入表格':
                        insertAtCursor(textarea, '\n| 列1 | 列2 | 列3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |\n');
                        break;
                    default:
                        break;
                }
            });
        });

        // 自动聚焦
        if (options.autoFocus) {
            setTimeout(function() {
                textarea.focus();
            }, 100);
        }

        // 初始化高度
        autoResize();

        // 返回实例对象
        var instance = {
            getValue: function() {
                return textarea.value;
            },
            setValue: function(value) {
                textarea.value = value;
                autoResize();
            },
            appendValue: function(value) {
                var current = textarea.value;
                if (current && current.trim().length > 0) {
                    textarea.value = current.trim() + ' ' + value;
                } else {
                    textarea.value = value;
                }
                autoResize();
            },
            focus: function() {
                textarea.focus();
            },
            clear: function() {
                textarea.value = '';
                autoResize();
            },
            send: send,
            getContainer: function() {
                return container;
            },
            getTextarea: function() {
                return textarea;
            }
        };

        return instance;
    }

    function insertAtCursor(textarea, text) {
        var startPos = textarea.selectionStart;
        var endPos = textarea.selectionEnd;
        var before = textarea.value.substring(0, startPos);
        var after = textarea.value.substring(endPos);

        textarea.value = before + text + after;

        var newPos = startPos + text.length;
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
        textarea.dispatchEvent(new Event('input'));
    }

    // 暴露到全局
    window.initChatInput = initChatInput;

})();
