# 聊天输入框组件迁移指南

本指南帮助您将现有页面的输入框迁移到统一的聊天输入框组件。

## 为什么需要迁移？

✅ **统一样式**：所有页面使用相同的输入框样式和高度
✅ **统一交互**：一致的用户体验
✅ **易于维护**：修改组件样式自动应用到所有页面
✅ **功能完整**：自带高度调整、快捷键、工具按钮等功能

## 快速迁移步骤

### 步骤 1: 引入组件文件

在页面 `<head>` 中添加样式：

```html
<link rel="stylesheet" href="../components/chat-input.css">
```

在 `</body>` 前添加脚本：

```html
<script src="../components/chat-input.js"></script>
```

### 步骤 2: 替换 HTML

#### 旧代码（自规划模式）：

```html
<div class="chat-input-container">
    <div class="chat-input-wrapper">
        <textarea
            class="chat-input"
            placeholder="您可以随时干预，提出建议或调整方向..."
            rows="3"
        ></textarea>
        <div class="chat-input-toolbar">
            <div class="chat-input-actions">
                <button class="btn-icon" title="上传文件">📎</button>
                <button class="btn-icon" title="插入图片">🖼️</button>
            </div>
            <button class="btn btn-primary">
                <span>发送</span>
                <span class="shortcut">⇧↵</span>
            </button>
        </div>
    </div>
</div>
```

#### 新代码（统一组件）：

```html
<div class="chat-input-container" data-container-mode="fixed">
    <div class="chat-input-wrapper">
        <textarea
            class="chat-input"
            id="chatInput"
            placeholder="您可以随时干预，提出建议或调整方向..."
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

#### 主要变化：

1. ✅ 添加 `data-container-mode="fixed"` 或 `"empty"`
2. ✅ textarea 添加 `id="chatInput"`
3. ✅ 按钮添加 `data-action` 属性
4. ✅ 增加代码和表格按钮
5. ✅ 发送按钮添加 `class="chat-send"` 和 `id="chatSend"`
6. ✅ 快捷键文本改为 `Shift+Enter`，class 改为 `send-shortcut`

### 步骤 3: 移除旧的 CSS

删除页面专用 CSS 文件中的以下样式（如果有）：

```css
/* 删除这些样式，改用组件样式 */
.chat-input-container { ... }
.chat-input-wrapper { ... }
.chat-input { ... }
.chat-input-toolbar { ... }
.chat-input-actions { ... }
.btn-icon { ... }
.chat-send { ... }
```

### 步骤 4: 初始化组件

#### 旧代码：

```javascript
function initChatInput() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.getElementById('chatMessages');

    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });

        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    const sendBtn = document.querySelector('.chat-input-toolbar .btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    if (!message) return;
    console.log('发送消息:', message);
    chatInput.value = '';
    chatInput.style.height = 'auto';
}
```

#### 新代码：

```javascript
// 使用组件的 initChatInput 函数
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = initChatInput({
        onSend: function(message) {
            console.log('发送消息:', message);
            // 在这里添加发送逻辑
        }
    });
});
```

## 具体页面迁移示例

### 1. template-planning.html（自规划任务执行助手）

#### 修改文件：

- `/frontend/templates/pages/template-planning.html`
- `/frontend/templates/css/template-planning.css`
- `/frontend/templates/js/template-planning.js`

#### HTML 修改：

```diff
+ <link rel="stylesheet" href="../components/chat-input.css">

- <div class="chat-input-container">
+ <div class="chat-input-container" data-container-mode="fixed">
    <div class="chat-input-wrapper">
-       <textarea class="chat-input" placeholder="...">
+       <textarea class="chat-input" id="chatInput" placeholder="...">
        </textarea>
        <div class="chat-input-toolbar">
            <div class="chat-input-actions">
-               <button class="btn-icon" title="上传文件">📎</button>
+               <button class="btn-icon" title="上传文件" data-action="upload">📎</button>
-               <button class="btn-icon" title="插入图片">🖼️</button>
+               <button class="btn-icon" title="插入图片" data-action="image">🖼️</button>
+               <button class="btn-icon" title="插入代码" data-action="code">💻</button>
+               <button class="btn-icon" title="插入表格" data-action="table">📊</button>
            </div>
-           <button class="btn btn-primary">
+           <button class="btn btn-primary chat-send" id="chatSend">
                <span>发送</span>
-               <span class="shortcut">⇧↵</span>
+               <span class="send-shortcut">Shift+Enter</span>
            </button>
        </div>
    </div>
</div>

+ <script src="../components/chat-input.js"></script>
```

#### CSS 修改：

从 `template-planning.css` 中删除以下样式：

```css
/* 删除这些样式 */
.chat-input-container { ... }
.chat-input-wrapper { ... }
.chat-input { ... }
.chat-input-toolbar { ... }
.chat-input-actions { ... }
.btn-icon { ... }
.shortcut { ... }
```

#### JavaScript 修改：

```diff
- function initChatInput() {
-     const chatInput = document.querySelector('.chat-input');
-     ...
- }

+ // 在 DOMContentLoaded 中添加
+ document.addEventListener('DOMContentLoaded', function() {
+     initChatInput({
+         onSend: function(message) {
+             console.log('发送消息:', message);
+             // 原有的发送逻辑
+         }
+     });
+ });
```

### 2. template-chat.html（快速对话模式）

#### 修改文件：

- `/frontend/templates/pages/template-chat.html`
- `/frontend/templates/css/template-detail.css`
- `/frontend/templates/js/template-detail.js`

#### 修改内容：

与自规划模式类似，参考上面的步骤。

## 常见问题

### Q: 迁移后高度不一致？

A: 确保：
1. ✅ 引入了 `chat-input.css`
2. ✅ 删除了页面专用的输入框样式
3. ✅ 设置了正确的 `data-container-mode`

### Q: 旧的 JavaScript 功能失效？

A: 使用组件的 `onSend` 回调：

```javascript
initChatInput({
    onSend: function(message) {
        // 你原来的发送逻辑
    }
});
```

### Q: 需要自定义工具按钮？

A: 可以在初始化后隐藏不需要的按钮：

```javascript
const chatInput = initChatInput({ ... });

// 隐藏某个按钮
const tableBtn = chatInput.element.querySelector('[data-action="table"]');
tableBtn.style.display = 'none';
```

### Q: 动态生成的输入框如何处理？

A: 在生成 HTML 后立即初始化：

```javascript
function loadTaskDetail(taskId) {
    // 生成 HTML
    chatArea.innerHTML = taskDetailHTML;

    // 重新初始化输入框组件
    initChatInput({
        selector: '.chat-area .chat-input-container',
        onSend: handleSend
    });
}
```

## 检查清单

迁移完成后，请检查：

- [ ] 页面引入了 `chat-input.css` 和 `chat-input.js`
- [ ] HTML 结构符合组件规范
- [ ] 删除了页面专用的输入框 CSS
- [ ] JavaScript 使用组件的 `initChatInput` 函数
- [ ] 输入框高度一致（120px）
- [ ] 自动高度调整功能正常
- [ ] Shift+Enter 快捷键可用
- [ ] 工具按钮可点击（虽然功能可能未实现）
- [ ] 空状态和固定模式都测试过
- [ ] 响应式在移动端正常工作

## 迁移优先级

建议按以下顺序迁移：

1. **高优先级**：
   - ✅ template-planning.html（自规划任务执行助手）
   - ✅ template-chat.html（快速对话模式）

2. **中优先级**：
   - template-info-detail.html（信息预览/对话模式）
   - 其他智能体详情页

3. **低优先级**：
   - 示例页面
   - 测试页面

## 获取帮助

如有问题，请参考：
- [组件使用文档](./README.md)
- [组件示例](./chat-input-example.html)
- Design System 规范

## 版本历史

- v1.0.0 (2024-12-18) - 初始版本，统一快速对话和自规划模式
