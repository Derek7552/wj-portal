# 🧩 Clouditera 组件规范

> 提供常用组件的设计规范、代码模板和最佳实践

---

## 📋 组件库

### 已实现的组件
- [侧导航栏（Agent Sidebar）](#侧导航栏)
- [聊天输入框（Chat Input）](#聊天输入框)
- [按钮（Button）](#按钮)
- [卡片（Card）](#卡片)
- [标签（Tag）](#标签)
- [输入框（Input）](#输入框)

---

## 侧导航栏

### 组件说明
智能体详情页的左侧导航组件，展示任务列表和快捷操作。

### 文件位置
- HTML: `frontend/components/agent-sidebar.html`
- CSS: `frontend/components/agent-sidebar.css`
- JS: `frontend/components/agent-sidebar.js`
- 文档: `frontend/components/agent-sidebar-README.md`

### 基本用法
```html
<aside class="agent-sidebar">
    <nav class="agent-nav">
        <!-- 新建按钮 -->
        <button class="btn-new-chat" id="btnNewTask">
            <span class="btn-icon">✨</span>
            <span class="btn-text">新任务</span>
        </button>

        <!-- 任务列表 -->
        <div class="nav-group">
            <div class="nav-group-title">近期任务</div>
            <div class="recent-tasks-list" id="recentTasksList">
                <!-- 任务项通过 JS 动态渲染 -->
            </div>
        </div>

        <!-- 底部链接 -->
        <a href="#" class="view-all-tasks" id="viewAllTasks">
            <span class="view-all-icon">📋</span>
            <span class="view-all-text">查看全部</span>
        </a>
    </nav>
</aside>

<script src="../../components/agent-sidebar.js"></script>
<script>
initAgentSidebar({
    tasks: mockTasks,
    maxTasks: 10,
    onNewTask: function() { /* 新建任务 */ },
    onTaskClick: function(taskId) { /* 切换任务 */ },
    onViewAll: function() { /* 查看全部 */ }
});
</script>
```

### 样式规范
```css
.agent-sidebar {
    width: 220px;
    background: var(--clouditera-neutral-background-white);
    border-right: 1px solid var(--clouditera-neutral-border-secondary);
}

.btn-new-chat {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    padding: 12px 16px;
    border-radius: 8px;
}

.recent-task-item {
    padding: 10px 12px;
    border-radius: 6px;
}

.recent-task-item.active {
    background: var(--clouditera-palette-blue-0);
    border-left: 3px solid var(--clouditera-brand-primary);
}
```

---

## 聊天输入框

### 组件说明
带工具栏和快捷键的多行文本输入组件。

### 文件位置
- HTML: `frontend/components/chat-input.html`
- CSS: `frontend/components/chat-input.css`
- JS: `frontend/components/chat-input.js`

### 基本用法
```html
<div class="chat-input-container" id="chatInputContainer"></div>

<script src="../../components/chat-input.js"></script>
<script>
initChatInput({
    onSend: function(message) {
        console.log('发送消息:', message);
    }
});
</script>
```

### 样式规范
```css
.chat-input-wrapper {
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-primary);
    border-radius: 8px;
}

.chat-input-wrapper:focus-within {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 0 0 2px var(--clouditera-palette-blue-0);
}

.chat-send {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    padding: 8px 16px;
    border-radius: 6px;
}
```

---

## 按钮

### 主要按钮
```html
<button class="btn btn-primary">主要操作</button>
```

```css
.btn-primary {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary:hover {
    background: var(--clouditera-brand-primary-hover);
}

.btn-primary:active {
    background: var(--clouditera-brand-primary-active);
}

.btn-primary:disabled {
    background: var(--clouditera-neutral-gray-4);
    color: var(--clouditera-neutral-text-disabled);
    cursor: not-allowed;
}
```

### 次要按钮
```html
<button class="btn btn-secondary">次要操作</button>
```

```css
.btn-secondary {
    background: var(--clouditera-neutral-background-white);
    color: var(--clouditera-neutral-text-primary);
    border: 1px solid var(--clouditera-neutral-border-primary);
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: var(--clouditera-palette-blue-0);
    border-color: var(--clouditera-brand-primary);
    color: var(--clouditera-brand-primary);
}
```

### 文本按钮
```html
<button class="btn btn-text">文本按钮</button>
```

```css
.btn-text {
    background: transparent;
    color: var(--clouditera-brand-primary);
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
}

.btn-text:hover {
    background: var(--clouditera-palette-blue-0);
}
```

### 图标按钮
```html
<button class="btn-icon" title="删除">
    <span>🗑️</span>
</button>
```

```css
.btn-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
}

.btn-icon:hover {
    background: var(--clouditera-neutral-background-secondary);
}
```

---

## 卡片

### 基础卡片
```html
<div class="card">
    <div class="card-header">
        <h3 class="card-title">卡片标题</h3>
    </div>
    <div class="card-body">
        <p>卡片内容</p>
    </div>
</div>
```

```css
.card {
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-secondary);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
}

.card:hover {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 2px 8px rgba(41, 140, 255, 0.1);
}

.card-header {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--clouditera-neutral-border-tertiary);
    margin-bottom: 12px;
}

.card-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--clouditera-neutral-text-title);
    margin: 0;
}

.card-body {
    color: var(--clouditera-neutral-text-primary);
    font-size: 14px;
    line-height: 1.6;
}
```

---

## 标签

### 基础标签
```html
<span class="tag">默认标签</span>
<span class="tag tag-primary">主要标签</span>
<span class="tag tag-success">成功标签</span>
<span class="tag tag-warning">警告标签</span>
<span class="tag tag-error">错误标签</span>
```

```css
.tag {
    display: inline-block;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 4px;
    background: var(--clouditera-neutral-background-secondary);
    color: var(--clouditera-neutral-text-primary);
}

.tag-primary {
    background: var(--clouditera-palette-blue-0);
    color: var(--clouditera-palette-blue-5);
}

.tag-success {
    background: var(--clouditera-semantic-success-bg);
    color: var(--clouditera-semantic-success);
    border: 1px solid var(--clouditera-semantic-success-border);
}

.tag-warning {
    background: var(--clouditera-semantic-warning-bg);
    color: var(--clouditera-semantic-warning);
    border: 1px solid var(--clouditera-semantic-warning-border);
}

.tag-error {
    background: var(--clouditera-semantic-error-bg);
    color: var(--clouditera-semantic-error);
    border: 1px solid var(--clouditera-semantic-error-border);
}
```

---

## 输入框

### 文本输入框
```html
<div class="input-wrapper">
    <label class="input-label">用户名</label>
    <input type="text" class="input" placeholder="请输入用户名">
</div>
```

```css
.input-wrapper {
    margin-bottom: 16px;
}

.input-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--clouditera-neutral-text-title);
    margin-bottom: 8px;
}

.input {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    color: var(--clouditera-neutral-text-primary);
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-primary);
    border-radius: 6px;
    transition: all 0.2s;
}

.input:focus {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 0 0 2px var(--clouditera-palette-blue-0);
    outline: none;
}

.input::placeholder {
    color: var(--clouditera-neutral-text-secondary);
}

.input:disabled {
    background: var(--clouditera-neutral-background-secondary);
    color: var(--clouditera-neutral-text-disabled);
    cursor: not-allowed;
}
```

### 多行文本框
```html
<textarea class="textarea" rows="4" placeholder="请输入内容"></textarea>
```

```css
.textarea {
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    font-family: inherit;
    color: var(--clouditera-neutral-text-primary);
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-primary);
    border-radius: 6px;
    resize: vertical;
    transition: all 0.2s;
}

.textarea:focus {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 0 0 2px var(--clouditera-palette-blue-0);
    outline: none;
}
```

---

## ✅ 组件开发检查清单

### 基础规范
- [ ] 使用设计 token（无硬编码颜色）
- [ ] 遵循间距规范（8/12/16/20/24px）
- [ ] 圆角使用标准值（4/6/8px）
- [ ] 字号使用标准值（12/13/14/16px）

### 交互状态
- [ ] 包含 hover 状态
- [ ] 包含 active 状态（如适用）
- [ ] 包含 focus 状态（表单元素）
- [ ] 包含 disabled 状态（如适用）

### 可访问性
- [ ] 颜色对比度足够（4.5:1 以上）
- [ ] 交互元素可键盘操作
- [ ] 适当的 title 或 aria 标签

### 响应式
- [ ] 移动端适配（max-width: 768px）
- [ ] 平板端适配（max-width: 992px）

---

## 📚 相关文档

- 组件实现示例：`frontend/components/`
- 设计 Token：`frontend/css/tokens.css`
- 颜色规范：[colors.md](./colors.md)
- 布局规范：[layout.md](./layout.md)
- 返回主页：[README.md](./README.md)
