# 快速对话类智能助手 - 页面模版

> 基于 `agent-detail-empty.html` 和 `agent-detail-chat.html` 设计
> 适用于：快速对话、实时交互类的智能体页面

---

## 一、页面结构

### 1.1 整体布局

```
├── 左侧主导航（collapsed模式）
│   ├── Logo
│   ├── 首页（hover显示收藏快捷入口）
│   └── 底部菜单（UI模板、帮助中心、用户反馈、用户）
│
├── 智能体头部信息
│   ├── Icon（48px渐变背景）
│   ├── 标题 + 类型标签 + 版本号
│   ├── 描述文字
│   └── 管理功能按钮组（知识库、工具插件、设置、分享）
│
├── 内容区域（flex布局）
│   ├── 左侧：智能体侧导航（240px）
│   │   ├── 新任务按钮
│   │   └── 近期任务列表
│   │
│   └── 右侧：对话主内容区
│       ├── 【空状态页面】
│       │   ├── 智能体名称（渐变文字）
│       │   ├── 引导文案
│       │   └── 输入框（60%宽度）
│       │
│       └── 【对话页面】
│           ├── 对话/任务名称条
│           ├── 消息列表
│           └── 输入框（60%宽度）
```

---

## 二、空状态页面（Empty State）

### 2.1 HTML结构

```html
<!-- 主内容区域 - 空状态 -->
<div class="agent-main-content">
    <div class="empty-state-container">
        <!-- 智能体名称 - 优先级最高 -->
        <div class="empty-agent-name">
            <span class="agent-name-text">【智能体名称】</span>
        </div>

        <!-- 引导文案 - 次要优先级 -->
        <div class="empty-state-guide">
            <p class="empty-state-guide-text">开始给智能体分配任务</p>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <!-- 输入框区域 -->
                <textarea
                    class="chat-input"
                    id="chatInput"
                    placeholder="输入您的问题或粘贴代码..."
                    rows="3"
                ></textarea>

                <!-- 工具栏：左侧操作按钮 + 右侧发送按钮 -->
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
</div>
```

### 2.2 关键CSS类

```css
/* 空状态容器 - 移除卡片效果 */
.agent-main-content:has(.empty-state-container) {
    box-shadow: none;
    background: transparent;
}

.empty-state-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 48px 24px;
    min-height: calc(100vh - 300px);
}

.empty-state-container .chat-input-container {
    width: 100%;
    border-top: none;  /* 移除分割线 */
    padding-top: 0;
}

/* 智能体名称 - 渐变文字 */
.empty-agent-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
    padding: 0;
}

.empty-agent-name .agent-name-text {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.5px;
}

/* 引导文案 */
.empty-state-guide {
    margin-bottom: 48px;
    text-align: center;
    padding-bottom: 32px;
}

.empty-state-guide-text {
    font-size: 16px;
    font-weight: 500;
    color: #595959;
    margin: 0;
    opacity: 0.85;
}
```

---

## 三、对话页面（Chat State）

### 3.1 HTML结构

```html
<div class="agent-main-content">
    <div class="chat-container">
        <!-- 对话/任务名称条 -->
        <div class="chat-task-name">
            <span class="task-name-text">【任务名称】</span>
            <span class="task-time">2024-12-09 10:30</span>
        </div>

        <!-- 对话消息区域 -->
        <div class="chat-messages" id="chatMessages">
            <!-- AI消息示例 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">2024-12-09 10:30</div>
                    <div class="message-bubble">
                        <p>你好！我可以帮你...</p>
                    </div>
                </div>
            </div>

            <!-- 用户消息示例 -->
            <div class="message message-user">
                <div class="message-avatar">👤</div>
                <div class="message-content">
                    <div class="message-time">2024-12-09 10:32</div>
                    <div class="message-bubble">
                        <p>请帮我...</p>
                    </div>
                </div>
            </div>

            <!-- AI回复（带操作按钮） -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">2024-12-09 10:33</div>
                    <div class="message-bubble">
                        <p>回复内容...</p>
                    </div>
                    <div class="message-actions">
                        <button class="btn-icon" title="复制">📋</button>
                        <button class="btn-icon" title="点赞">👍</button>
                        <button class="btn-icon" title="反馈">💬</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 输入区域（与空状态相同结构）-->
        <div class="chat-input-container">
            <!-- 同上 -->
        </div>
    </div>
</div>
```

### 3.2 关键CSS类

```css
.chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 164px);
    min-height: 500px;
}

/* 对话/任务名称条 */
.chat-task-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-bottom: 1px solid #f0f0f0;
    background: #fafafa;
}

.task-name-text {
    font-size: 16px;
    font-weight: 600;
    color: #262626;
}

.task-time {
    font-size: 13px;
    color: #8c8c8c;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
}

/* 消息结构 */
.message {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
}

.message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
}

.message-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 70%;
}

/* 消息时间在气泡上方 */
.message-time {
    font-size: 12px;
    color: #bfbfbf;
    margin-bottom: 8px;
}

.message-bubble {
    background: #f5f5f5;
    padding: 12px 16px;
    border-radius: 8px;
    line-height: 1.6;
}

.message-ai .message-bubble {
    background: #f5f5f5;
}

.message-user .message-bubble {
    background: #e6f7ff;
}

/* 消息操作按钮 */
.message-actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}

.message-actions .btn-icon {
    font-size: 16px;
    padding: 4px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
    color: #8c8c8c;
}

.message-actions .btn-icon:hover {
    background-color: #f5f5f5;
    color: #262626;
}
```

---

## 四、统一输入框（核心组件）

### 4.1 设计规范

- **宽度**：60% 页面宽度，居中显示
- **布局**：上下结构
  - 上：textarea 输入框
  - 下：工具栏（左侧操作按钮 + 右侧发送按钮）
- **边框**：输入框整体有边框，聚焦时高亮
- **工具栏**：绝对定位在输入框底部

### 4.2 CSS代码

```css
/* 输入区域容器 */
.chat-input-container {
    border-top: 1px solid #f0f0f0;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
}

/* 输入框包装器 - 60%宽度 */
.chat-input-wrapper {
    position: relative;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    transition: border-color 0.2s;
    width: 60%;
    max-width: 100%;
}

.chat-input-wrapper:focus-within {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

/* 输入框 */
.chat-input {
    width: 100%;
    border: none;
    padding: 12px;
    padding-bottom: 52px;  /* 为工具栏预留空间 */
    font-size: 14px;
    font-family: inherit;
    resize: none;
    min-height: 120px;
    line-height: 1.6;
}

.chat-input:focus {
    outline: none;
}

/* 工具栏 - 浮动在输入框底部 */
.chat-input-toolbar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    background-color: transparent;
}

/* 操作按钮组 */
.chat-input-actions {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
}

.chat-input-actions .btn-icon {
    font-size: 18px;
    padding: 6px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
    color: #8c8c8c;
}

.chat-input-actions .btn-icon:hover {
    background-color: #f5f5f5;
    color: #262626;
}

/* 发送按钮 */
.chat-send {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 20px;
}

.send-shortcut {
    font-size: 11px;
    opacity: 0.7;
    font-weight: 400;
}
```

---

## 五、智能体头部信息（统一规范）

### 5.1 HTML结构

```html
<div class="agent-header">
    <div class="agent-header-main">
        <div class="agent-icon">🔒</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">【智能体名称】</h2>
                <span class="agent-type">基础类</span>
                <span class="agent-version">v1.0.0</span>
            </div>
            <p class="agent-description">【智能体描述】</p>
        </div>
    </div>
    <!-- 管理功能按钮组 -->
    <div class="agent-header-actions">
        <button class="btn-agent-action" title="知识库">
            <span class="action-icon">📚</span>
            <span class="action-text">知识库</span>
            <span class="action-count">(25)</span>
        </button>
        <button class="btn-agent-action" title="工具插件">
            <span class="action-icon">🔧</span>
            <span class="action-text">工具插件</span>
            <span class="action-count">(8)</span>
        </button>
        <button class="btn-agent-action" title="智能体设置">
            <span class="action-icon">⚙️</span>
            <span class="action-text">设置</span>
        </button>
        <button class="btn btn-primary btn-sm">
            <span>🔗</span>
            <span>分享</span>
        </button>
    </div>
</div>
```

### 5.2 类型标签

- `基础类`：快速对话、简单查询类
- `进阶类`：专业分析、复杂任务类

---

## 六、侧导航（智能体管理区）

### 6.1 侧导航结构

```html
<aside class="agent-sidebar">
    <nav class="agent-nav">
        <!-- 新任务按钮 -->
        <button class="btn-new-chat">
            <span class="btn-icon">✨</span>
            <span class="btn-text">新任务</span>
        </button>

        <!-- 近期任务 -->
        <div class="nav-group">
            <div class="nav-group-title">近期任务</div>
            <div class="recent-tasks-list">
                <a href="#" class="recent-task-item">
                    <span class="task-status-icon running">⏳</span>
                    <div class="task-name">任务名称</div>
                </a>
                <!-- 更多任务... -->
            </div>
            <a href="#" class="view-all-tasks">
                查看全部任务记录 →
            </a>
        </div>
    </nav>
</aside>
```

### 6.2 任务状态图标

- `⏳` - 运行中 (running)
- `✅` - 已完成 (completed)
- `❌` - 失败 (failed)

**注意**：管理功能（知识库、工具插件、设置、分享）已移至顶部智能体头部的按钮组，侧导航不再包含底部管理区。

---

## 七、视觉层次规范

### 7.1 空状态页面视觉优先级

1. **智能体名称**（最高）
   - 28px 加粗文字
   - 紫色渐变（#667eea → #764ba2）
   - 无背景填充

2. **引导文案**（次要）
   - 16px 中等粗细
   - 中灰色（#595959, 85%透明度）

3. **输入框**（操作区）
   - 60%宽度，居中
   - 聚焦时蓝色高亮

### 7.2 颜色规范

- **主色调**：蓝色 #1890ff
- **渐变色**：紫色 #667eea → #764ba2
- **文字颜色**：
  - 主要文字：#262626
  - 次要文字：#595959
  - 辅助文字：#8c8c8c
- **边框颜色**：#d9d9d9 / #f0f0f0
- **消息气泡背景**：
  - AI消息：#f5f5f5
  - 用户消息：#e6f7ff

---

## 八、使用指南

### 8.1 创建新的快速对话智能体

1. 复制 `agent-detail-empty.html` 和 `agent-detail-chat.html`
2. 修改以下内容：
   - 智能体icon（agent-header的.agent-icon）
   - 智能体名称（多处）
   - 智能体类型（基础类/进阶类）
   - 版本号
   - 描述文字
   - placeholder提示文字
   - 管理按钮的数量（知识库、工具插件）

3. 保持不变的内容：
   - 整体布局结构
   - 输入框组件
   - 侧导航结构
   - 视觉样式

### 8.2 文件清单

**必需文件：**
- `agent-detail-empty.html` - 空状态页面
- `agent-detail-chat.html` - 对话页面
- `css/agent-detail.css` - 样式文件
- `css/dashboard.css` - 主导航样式
- `css/common.css` - 全局样式
- `js/agent-detail.js` - 交互逻辑
- `js/dashboard.js` - 主导航逻辑

---

## 九、注意事项

1. **主导航模式**：智能体详情页必须使用collapsed模式
2. **输入框宽度**：统一为60%，不要随意修改
3. **分割线**：empty页面不要有水平分割线
4. **背景**：empty页面主内容区背景透明
5. **工具栏**：操作按钮必须左对齐，发送按钮右对齐
6. **渐变方向**：统一使用135deg（左上到右下）
7. **消息时间**：时间显示在消息气泡上方，不是下方
8. **管理按钮**：位于智能体头部右侧，不在侧导航底部
9. **消息操作**：AI消息可以有操作按钮（复制、点赞、反馈）

---

## 十、对话页面特性

### 10.1 消息类型

- **message-ai**：AI回复消息
  - 左侧排列
  - 灰色背景 (#f5f5f5)
  - 可带操作按钮

- **message-user**：用户消息
  - 左侧排列（统一左对齐）
  - 蓝色背景 (#e6f7ff)
  - 无操作按钮

### 10.2 代码高亮

对话中的代码块使用 `<pre><code class="language-xxx">` 结构，支持语法高亮。

### 10.3 特殊内容

- 安全评分：`<span class="score score-danger">35/100</span>`
- 强调文字：`<strong>⚠️ 发现严重安全问题！</strong>`
- 代码内联：`<code>示例代码</code>`

---

## 十一、版本记录

- **v1.1.0** (2024-12-09)
  - 更新：管理功能按钮组移至智能体头部
  - 更新：对话页面名称条为任务名称+时间
  - 更新：消息时间位置调整到气泡上方
  - 新增：消息操作按钮（复制、点赞、反馈）
  - 移除：侧导航底部管理区
  - 更新：消息统一左对齐布局

- **v1.0.0** (2024-12-08)
  - 初始版本
  - 基于快速对话助手示例创建
  - 支持空状态和对话两种页面模式
  - 输入框60%宽度设计
  - 智能体名称渐变文字样式

---

**模版维护者**：请在修改此模版时更新版本记录
