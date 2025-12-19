# 聊天输入框组件 (Chat Input Component)

统一的聊天输入框组件，用于智能体交互页面。

## 文件结构

```
components/
├── chat-input.html       # HTML 模板
├── chat-input.css        # 样式文件
├── chat-input.js         # JavaScript 功能
└── README.md            # 使用说明（本文件）
```

## 功能特性

- ✅ 统一的样式和交互体验
- ✅ 自动调整输入框高度
- ✅ Shift+Enter 快捷键发送
- ✅ 工具按钮（上传文件、插入图片、代码、表格）
- ✅ 响应式设计，支持移动端
- ✅ 支持空状态和固定底部两种模式
- ✅ 完整的 JavaScript API

## 快速开始

### 1. 引入文件

在 HTML 页面的 `<head>` 中引入样式：

```html
<link rel="stylesheet" href="../components/chat-input.css">
```

在 `</body>` 前引入脚本：

```html
<script src="../components/chat-input.js"></script>
```

### 2. 插入 HTML

将 `chat-input.html` 的内容复制到需要的位置，或使用 JavaScript 动态插入：

```html
<div class="chat-input-container" data-container-mode="fixed">
    <div class="chat-input-wrapper">
        <textarea
            class="chat-input"
            id="chatInput"
            placeholder="输入您的问题或粘贴代码..."
            rows="3"
        ></textarea>
        <div class="chat-input-toolbar">
            <div class="chat-input-actions">
                <button class="btn-icon" title="上传文件" data-action="upload">📎</button>
                <button class="btn-icon" title="插入图片" data-action="image">🖼️</button>
                <button class="btn-icon" title="插入代码" data-action="code">💻</button>
                <button class="btn-icon" title="插入表格" data-action="table">📊</button>
            </div>
            <button class="btn btn-primary chat-send" id="chatSend">
                <span>发送</span>
                <span class="send-shortcut">Shift+Enter</span>
            </button>
        </div>
    </div>
</div>
```

### 3. 初始化组件

```javascript
// 基础用法
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = initChatInput({
        onSend: function(message) {
            console.log('发送消息:', message);
            // 在这里处理发送逻辑
        }
    });
});
```

## 配置选项

### HTML 属性

在 `.chat-input-container` 上设置：

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-container-mode` | `fixed` | 固定在底部（默认） |
|  | `empty` | 空状态居中显示 |

### JavaScript 选项

```javascript
initChatInput({
    // 组件选择器
    selector: '.chat-input-container',

    // 发送消息回调
    onSend: function(message) {
        console.log('发送:', message);
    },

    // 输入框最大高度
    maxHeight: 200,

    // 是否自动聚焦
    autoFocus: false
});
```

## API 方法

初始化后返回的组件实例提供以下方法：

```javascript
const chatInput = initChatInput({ ... });

// 获取输入内容
const value = chatInput.getValue();

// 设置输入内容
chatInput.setValue('新的内容');

// 清空输入
chatInput.clear();

// 聚焦输入框
chatInput.focus();

// 禁用/启用组件
chatInput.setDisabled(true);
chatInput.setDisabled(false);

// 销毁组件
chatInput.destroy();

// 访问 DOM 元素
chatInput.element;      // 容器元素
chatInput.input;        // 输入框元素
chatInput.sendButton;   // 发送按钮元素
```

## 使用示例

### 示例 1: 基础用法（固定底部）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <link rel="stylesheet" href="../components/chat-input.css">
    <link rel="stylesheet" href="../css/common.css">
</head>
<body>
    <div class="chat-area">
        <div class="chat-messages" id="chatMessages">
            <!-- 消息列表 -->
        </div>

        <!-- 输入框 -->
        <div class="chat-input-container" data-container-mode="fixed">
            <!-- ... 输入框HTML ... -->
        </div>
    </div>

    <script src="../components/chat-input.js"></script>
    <script>
        initChatInput({
            onSend: function(message) {
                addMessage(message);
            }
        });
    </script>
</body>
</html>
```

### 示例 2: 空状态（居中显示）

```html
<div class="empty-state-container">
    <div class="empty-agent-name">
        <span class="agent-name-text">智能体名称</span>
    </div>

    <div class="empty-state-guide">
        <p class="empty-state-guide-text">开始给智能体分配任务</p>
    </div>

    <!-- 输入框 -->
    <div class="chat-input-container" data-container-mode="empty">
        <!-- ... 输入框HTML ... -->
    </div>
</div>

<script>
    initChatInput({
        autoFocus: true,
        onSend: function(message) {
            startNewTask(message);
        }
    });
</script>
```

### 示例 3: 动态创建输入框

```javascript
function createChatInput(containerId, options) {
    const container = document.getElementById(containerId);

    // 插入HTML
    container.innerHTML = `
        <div class="chat-input-container" data-container-mode="fixed">
            <div class="chat-input-wrapper">
                <textarea class="chat-input" id="chatInput"
                    placeholder="${options.placeholder || '输入您的问题...'}"
                    rows="3"></textarea>
                <div class="chat-input-toolbar">
                    <div class="chat-input-actions">
                        <button class="btn-icon" title="上传文件" data-action="upload">📎</button>
                        <button class="btn-icon" title="插入图片" data-action="image">🖼️</button>
                        <button class="btn-icon" title="插入代码" data-action="code">💻</button>
                        <button class="btn-icon" title="插入表格" data-action="table">📊</button>
                    </div>
                    <button class="btn btn-primary chat-send" id="chatSend">
                        <span>发送</span>
                        <span class="send-shortcut">Shift+Enter</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // 初始化
    return initChatInput({
        selector: `#${containerId} .chat-input-container`,
        ...options
    });
}

// 使用
createChatInput('chatContainer', {
    placeholder: '请输入消息...',
    onSend: handleSend
});
```

## 样式自定义

如需自定义样式，可以在页面专用 CSS 中覆盖：

```css
/* 修改输入框最小高度 */
.your-page .chat-input {
    min-height: 80px;
}

/* 修改按钮颜色 */
.your-page .chat-send {
    background-color: #52c41a;
}

/* 修改宽度（默认80%） */
.your-page .chat-input-wrapper {
    width: 90%;
}
```

## 迁移指南

### 从旧版输入框迁移

如果你的页面使用了旧版输入框，按以下步骤迁移：

#### 1. 替换 HTML

**旧代码：**
```html
<div class="chat-input-container">
    <textarea class="chat-input" placeholder="..."></textarea>
    <button class="btn-icon">📎</button>
    <button class="btn btn-primary">发送</button>
</div>
```

**新代码：**
使用 `chat-input.html` 中的完整结构

#### 2. 引入样式和脚本

```html
<link rel="stylesheet" href="../components/chat-input.css">
<script src="../components/chat-input.js"></script>
```

#### 3. 初始化组件

```javascript
initChatInput({
    onSend: function(message) {
        // 你原来的发送逻辑
    }
});
```

## 最佳实践

1. ✅ **使用统一组件**：所有智能体页面都应使用此组件
2. ✅ **保持一致性**：不要在页面级CSS中大幅修改组件样式
3. ✅ **响应式设计**：确保组件在移动端也能正常工作
4. ✅ **无障碍访问**：保留按钮的 `title` 属性，便于屏幕阅读器
5. ✅ **性能优化**：只在需要时初始化组件，避免重复初始化

## 兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 常见问题

### Q: 如何隐藏某些工具按钮？

A: 在初始化后通过 CSS 隐藏：

```css
.chat-input-actions .btn-icon[data-action="table"] {
    display: none;
}
```

或通过 JavaScript：

```javascript
const chatInput = initChatInput({ ... });
const tableBtn = chatInput.element.querySelector('[data-action="table"]');
tableBtn.style.display = 'none';
```

### Q: 如何修改快捷键？

A: 当前快捷键为 `Shift+Enter`，如需修改，可以在 `chat-input.js` 中调整事件监听器。

### Q: 组件高度不一致怎么办？

A: 确保引入了 `chat-input.css`，并且没有页面级 CSS 覆盖了 `min-height` 属性。

## 更新日志

### v1.0.0 (2024-12-18)
- ✨ 初始版本
- ✨ 统一快速对话模式和自规划模式的输入框
- ✨ 提供完整的 JavaScript API
- ✨ 支持响应式设计

## 维护者

产品设计团队 & 前端开发团队

## 相关文档

- [Design System](./../.designsystem/README.md)
- [智能体页面组件规范](./../.designsystem/.agent-components)
