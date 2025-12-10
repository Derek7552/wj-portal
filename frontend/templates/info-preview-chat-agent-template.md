# 信息预览/对话模式智能体 - 页面模版

> 基于 `agent-detail-preview.html` 设计
> 适用于：信息预览、实时对话、内容讨论类的智能体页面

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
└── 主内容区域（左右布局）
    ├── 左侧：信息预览区域（flex: 1）
    │   ├── 快捷操作栏（搜索、筛选、刷新）
    │   ├── 信息卡片列表（可滚动）
    │   │   ├── 卡片标题
    │   │   ├── 简要信息
    │   │   └── 时间/来源标签
    │   └── 加载更多
    │
    └── 右侧：对话区域（固定宽度420px）
        ├── 对话头部（渐变背景）
        │   ├── AI助手信息
        │   └── 清空对话按钮
        ├── 消息列表（可滚动）
        │   ├── AI消息气泡
        │   └── 用户消息气泡
        └── 输入区域
            ├── 文本输入框
            ├── 工具栏（附件、图片）
            └── 发送按钮
```

---

## 二、核心组件

### 2.1 智能体头部（统一样式）

```html
<div class="agent-header">
    <div class="agent-header-main">
        <div class="agent-icon">💬</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">【智能体名称】</h2>
                <span class="agent-type">对话类</span>
                <span class="agent-version">v1.0.0</span>
            </div>
            <p class="agent-description">【智能体描述】</p>
        </div>
    </div>
    <div class="agent-header-actions">
        <button class="btn-agent-action">
            <span class="action-icon">📚</span>
            <span class="action-text">知识库</span>
            <span class="action-count">(128)</span>
        </button>
        <!-- 其他按钮 -->
    </div>
</div>
```

### 2.2 快捷操作栏

```html
<div class="preview-toolbar">
    <div class="toolbar-left">
        <div class="search-box">
            <input type="text" class="search-input" id="previewSearch"
                   placeholder="搜索信息...">
            <button class="search-clear" id="searchClear" style="display: none;">✕</button>
        </div>
    </div>
    <div class="toolbar-right">
        <select class="filter-select" id="filterSelect">
            <option value="all">全部信息</option>
            <option value="latest">最新</option>
            <option value="unread">未读</option>
            <option value="important">重要</option>
        </select>
        <button class="btn-icon" id="refreshBtn" title="刷新">
            🔄
        </button>
    </div>
</div>
```

**特点：**
- 左侧：搜索框（支持清除）
- 右侧：筛选下拉 + 刷新按钮
- 紧凑布局，不占用过多空间

### 2.3 左侧信息预览区域

```html
<div class="preview-container">
    <!-- 快捷操作栏 -->
    <div class="preview-toolbar">
        <!-- 如上所示 -->
    </div>

    <!-- 信息卡片列表 -->
    <div class="preview-list" id="previewList">
        <article class="preview-card" data-id="1">
            <div class="preview-card-header">
                <h3 class="preview-title">信息标题示例</h3>
                <span class="preview-status status-unread">●</span>
            </div>
            <p class="preview-summary">这是信息的简要预览内容，用户可以快速了解信息概况...</p>
            <div class="preview-meta">
                <span class="meta-time">2024-12-09 14:30</span>
                <span class="meta-source">来源 A</span>
                <span class="preview-tag tag-primary">分类一</span>
            </div>
            <div class="preview-actions">
                <button class="btn-preview-action" title="查看详情">
                    📄 详情
                </button>
                <button class="btn-preview-action" title="讨论此信息">
                    💬 讨论
                </button>
                <button class="btn-preview-action" title="收藏">
                    ⭐
                </button>
            </div>
        </article>

        <!-- 更多卡片... -->
    </div>

    <!-- 加载更多 -->
    <div class="preview-load-more">
        <button class="btn-load-more" id="loadMoreBtn">
            加载更多
        </button>
    </div>
</div>
```

**特点：**
- 卡片式展示信息预览
- 每个卡片包含：标题、摘要、元数据、快捷操作
- 支持滚动查看更多
- 未读状态标识
- 点击"讨论"按钮将信息加载到右侧对话区域

### 2.4 右侧对话区域

```html
<div class="chat-panel">
    <div class="chat-container">
        <!-- 对话头部 -->
        <div class="chat-header">
            <div class="chat-header-main">
                <span class="chat-icon">🤖</span>
                <div class="chat-title-wrapper">
                    <span class="chat-title">AI 智能助手</span>
                    <span class="chat-subtitle">为您解答疑问</span>
                </div>
            </div>
            <div class="chat-header-actions">
                <button class="btn-icon" id="toggleContext" title="显示上下文">
                    📋
                </button>
                <button class="btn-icon" id="clearChat" title="清空对话">
                    🗑️
                </button>
            </div>
        </div>

        <!-- 上下文预览区域（可折叠） -->
        <div class="chat-context" id="chatContext" style="display: none;">
            <div class="context-label">
                <span class="context-icon">📌</span>
                <span>当前讨论的信息</span>
                <button class="btn-context-close" id="closeContext">✕</button>
            </div>
            <div class="context-content">
                <h4 class="context-title">【当前信息标题】</h4>
                <p class="context-summary">【信息摘要】</p>
            </div>
        </div>

        <!-- 消息列表 -->
        <div class="chat-messages" id="chatMessages">
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">2024-12-09 15:20</div>
                    <div class="message-bubble">
                        <p>您好！我是AI智能助手，您可以向我提问任何关于信息内容的问题，我会尽力为您解答。</p>
                    </div>
                </div>
            </div>

            <div class="message message-user">
                <div class="message-avatar">👤</div>
                <div class="message-content">
                    <div class="message-time">2024-12-09 15:21</div>
                    <div class="message-bubble">
                        <p>这条信息的主要内容是什么？</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <textarea class="chat-input" id="chatInput"
                          placeholder="输入您的问题..."
                          rows="3"></textarea>
                <div class="chat-input-toolbar">
                    <div class="chat-input-actions">
                        <button class="btn-icon" title="上传文件">📎</button>
                        <button class="btn-icon" title="插入图片">🖼️</button>
                        <button class="btn-icon" title="语音输入">🎤</button>
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

**特点：**
- 固定宽度420px
- 紫色/蓝色渐变头部
- 可折叠的上下文预览区（显示当前讨论的信息）
- 消息气泡式展示（AI和用户消息区分）
- 底部固定输入框
- 支持Shift+Enter换行，Enter发送

---

## 三、关键CSS类

### 3.1 主布局

```css
/* 主内容区域 - 左右布局 */
.preview-chat-wrapper {
    display: flex;
    gap: 24px;
    height: calc(100vh - 280px);
    min-height: 600px;
}

/* 左侧：信息预览区域 */
.preview-container {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* 右侧：对话区域 */
.chat-panel {
    width: 420px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
```

### 3.2 快捷操作栏样式

```css
.preview-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    gap: 16px;
}

.toolbar-left {
    flex: 1;
    min-width: 0;
}

.toolbar-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.search-box {
    position: relative;
    max-width: 400px;
}

.search-input {
    width: 100%;
    padding: 8px 36px 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.2s;
}

.search-input:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    padding: 4px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #bfbfbf;
    font-size: 16px;
    transition: color 0.2s;
}

.search-clear:hover {
    color: #595959;
}
```

### 3.3 信息卡片样式

```css
/* 信息列表容器 */
.preview-list {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

/* 信息卡片 */
.preview-card {
    background: #fafafa;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
    cursor: pointer;
}

.preview-card:hover {
    border-color: #d9d9d9;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transform: translateY(-1px);
}

.preview-card.active {
    border-color: #1890ff;
    background: #e6f7ff;
}

/* 卡片头部 */
.preview-card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
}

.preview-title {
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    margin: 0;
    line-height: 1.4;
}

.preview-status {
    flex-shrink: 0;
    font-size: 12px;
    margin-top: 4px;
}

.status-unread {
    color: #1890ff;
}

.status-read {
    color: #d9d9d9;
}

/* 卡片摘要 */
.preview-summary {
    font-size: 14px;
    line-height: 1.6;
    color: #595959;
    margin: 0 0 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 卡片元数据 */
.preview-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
}

.meta-time,
.meta-source {
    font-size: 12px;
    color: #8c8c8c;
    display: inline-flex;
    align-items: center;
}

/* 卡片操作按钮 */
.preview-actions {
    display: flex;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
}

.btn-preview-action {
    padding: 6px 12px;
    border: 1px solid #d9d9d9;
    background: white;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    color: #595959;
}

.btn-preview-action:hover {
    border-color: #1890ff;
    color: #1890ff;
    background: #e6f7ff;
}
```

### 3.4 对话区域样式

```css
/* 对话容器 */
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* 对话头部 */
.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header-main {
    display: flex;
    align-items: center;
    gap: 12px;
}

.chat-icon {
    font-size: 24px;
}

.chat-title-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.chat-title {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
}

.chat-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
}

.chat-header-actions {
    display: flex;
    gap: 8px;
}

/* 上下文预览区域 */
.chat-context {
    padding: 16px 20px;
    background: #fff7e6;
    border-bottom: 1px solid #ffe58f;
}

.context-label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #d46b08;
}

.btn-context-close {
    margin-left: auto;
    padding: 2px 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #d46b08;
    font-size: 16px;
}

.context-content {
    font-size: 13px;
}

.context-title {
    font-size: 14px;
    font-weight: 600;
    color: #262626;
    margin: 0 0 4px 0;
}

.context-summary {
    font-size: 13px;
    color: #595959;
    margin: 0;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 消息列表 */
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #fafafa;
}

/* 消息结构 */
.message {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
}

.message-ai .message-avatar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.message-user .message-avatar {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.message-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: calc(100% - 48px);
}

.message-time {
    font-size: 12px;
    color: #bfbfbf;
    margin-bottom: 8px;
}

.message-bubble {
    background: #ffffff;
    padding: 12px 16px;
    border-radius: 8px;
    line-height: 1.6;
    font-size: 14px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    word-wrap: break-word;
}

.message-ai .message-bubble {
    background: #ffffff;
    border: 1px solid #f0f0f0;
}

.message-user .message-bubble {
    background: #e6f7ff;
    border: 1px solid #bae7ff;
}

.message-bubble p {
    margin: 0;
}

.message-bubble p + p {
    margin-top: 8px;
}

/* 输入区域 */
.chat-input-container {
    padding: 16px;
    background: white;
    border-top: 1px solid #f0f0f0;
}

.chat-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.chat-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.6;
    resize: none;
    font-family: inherit;
    transition: all 0.2s;
}

.chat-input:focus {
    border-color: #1890ff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
}

.chat-input-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chat-input-actions {
    display: flex;
    gap: 4px;
}

.chat-send {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.chat-send:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

.send-shortcut {
    font-size: 11px;
    opacity: 0.8;
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
}
```

---

## 四、交互功能

### 4.1 搜索功能

- 输入时显示清除按钮
- 支持实时搜索过滤卡片
- 清除按钮重置搜索

### 4.2 筛选功能

- 下拉选择器切换筛选条件
- 支持：全部、最新、未读、重要等筛选
- 筛选后自动更新列表

### 4.3 信息卡片交互

- 点击卡片高亮显示（添加active类）
- 点击"详情"按钮打开详情页
- 点击"讨论"按钮将信息加载到右侧对话区
- 点击"收藏"按钮切换收藏状态
- 未读信息显示蓝色圆点标识

### 4.4 上下文预览

- 点击"讨论"按钮时，右侧显示上下文预览区
- 显示当前讨论的信息标题和摘要
- 支持折叠/展开
- 点击关闭按钮隐藏上下文

### 4.5 对话功能

- Enter键发送消息（Shift+Enter换行）
- 消息自动滚动到底部
- 支持清空对话
- AI消息和用户消息样式区分
- 时间戳显示

### 4.6 加载更多

- 滚动到底部自动加载或点击按钮加载
- 加载时显示loading状态

---

## 五、适用场景

### 5.1 推荐使用

✅ **信息咨询类智能体**：需要边浏览信息边提问的场景
✅ **内容解读类智能体**：需要AI辅助理解信息内容
✅ **实时动态类智能体**：新闻、公告等信息流 + 对话交互
✅ **知识问答类智能体**：快速预览知识条目并深度讨论
✅ **客服助手类智能体**：工单列表 + 客服对话

### 5.2 不推荐使用

❌ **纯信息检索类智能体**：使用信息检索模式
❌ **纯对话类智能体**：使用快速对话模式
❌ **任务管理类智能体**：使用任务管理模式
❌ **数据可视化类智能体**：需要自定义界面

---

## 六、定制指南

### 6.1 修改卡片显示内容

1. 在 `.preview-card` 中添加/修改字段
2. 更新 `data-*` 属性值
3. 调整卡片高度和间距

```html
<article class="preview-card" data-id="1" data-category="custom">
    <div class="preview-card-header">
        <h3 class="preview-title">自定义标题</h3>
        <span class="preview-status status-unread">●</span>
    </div>
    <p class="preview-summary">自定义摘要内容...</p>
    <div class="preview-meta">
        <span class="meta-custom">自定义字段</span>
    </div>
</article>
```

### 6.2 修改筛选条件

在 `#filterSelect` 中添加/修改选项：

```html
<select class="filter-select" id="filterSelect">
    <option value="all">全部信息</option>
    <option value="custom1">自定义筛选1</option>
    <option value="custom2">自定义筛选2</option>
</select>
```

### 6.3 修改对话头部样式

```css
/* 修改渐变颜色 */
.chat-header {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

/* 修改头部高度 */
.chat-header {
    padding: 20px; /* 默认16px 20px */
}
```

### 6.4 调整布局宽度

```css
/* 调整右侧对话区域宽度 */
.chat-panel {
    width: 480px; /* 默认420px */
}

/* 调整卡片间距 */
.preview-list {
    gap: 16px; /* 默认12px */
}
```

### 6.5 自定义标签颜色

在 `css/agent-preview.css` 中添加：

```css
.tag-custom {
    background: #f0f5ff;
    color: #2f54eb;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}
```

---

## 七、文件清单

**必需文件：**
- `agent-detail-preview.html` - 主页面
- `css/agent-detail.css` - 智能体详情通用样式
- `css/agent-detail-preview.css` - 信息预览/对话模式专用样式
- `css/dashboard.css` - 主导航样式
- `css/common.css` - 全局样式
- `js/agent-detail-preview.js` - 交互逻辑
- `js/dashboard.js` - 主导航逻辑

---

## 八、与其他模式的区别

| 特性 | 信息预览/对话模式 | 信息检索模式 | 快速对话模式 |
|------|-----------------|------------|------------|
| **主要用途** | 信息浏览 + 实时对话 | 信息浏览、内容搜索 | 纯对话交互 |
| **左侧区域** | 信息预览卡片列表 | 分类筛选导航 | 历史会话列表 |
| **右侧区域** | 固定对话面板 | 结果列表 | 对话消息流 |
| **顶部搜索** | ✅ 有（左侧工具栏） | ✅ 有（居中） | ❌ 无 |
| **交互方式** | 点击卡片+对话 | 点击查看详情 | 输入发送消息 |
| **上下文支持** | ✅ 有（可折叠） | ❌ 无 | ❌ 无 |
| **分页** | 加载更多 | ✅ 有 | ❌ 无 |

---

## 九、核心特性

### 9.1 双栏布局优势

- **左侧信息预览**：快速浏览信息列表，了解概况
- **右侧实时对话**：针对感兴趣的信息立即提问
- **高效交互**：无需跳转页面，一屏完成浏览和讨论

### 9.2 上下文关联

- 点击"讨论"按钮时，将信息内容作为上下文传递给AI
- 上下文预览区显示当前讨论的信息
- AI基于上下文提供精准回答
- 可随时切换讨论的信息

### 9.3 状态管理

- 卡片active状态：标识当前讨论的信息
- 未读/已读状态：蓝色圆点标识
- 收藏状态：星标切换
- 消息历史：保留对话记录

---

## 十、注意事项

1. **主导航模式**：智能体详情页必须使用collapsed模式
2. **对话区域宽度**：固定420px，不要随意修改
3. **卡片高度**：自适应内容，摘要限制2行
4. **上下文预览**：默认隐藏，点击"讨论"时显示
5. **消息滚动**：新消息自动滚动到底部
6. **输入框高度**：默认3行，支持自动扩展
7. **响应式设计**：移动端改为上下布局
8. **性能优化**：卡片列表使用虚拟滚动（信息量大时）

---

## 十一、响应式适配

### 11.1 平板（≤992px）

- 左右布局改为上下布局
- 预览区域在上，对话区域在下
- 对话区域宽度100%，高度固定500px
- 快捷操作栏改为垂直布局

### 11.2 手机（≤768px）

- 卡片padding减小
- 工具栏垂直布局
- 搜索框宽度100%
- 消息气泡最大宽度调整
- 输入框工具栏垂直布局

```css
/* 平板及以下 */
@media (max-width: 992px) {
    .preview-chat-wrapper {
        flex-direction: column;
        height: auto;
    }

    .chat-panel {
        width: 100%;
        height: 500px;
        min-height: 500px;
    }
}

/* 手机 */
@media (max-width: 768px) {
    .preview-toolbar {
        flex-direction: column;
        align-items: stretch;
    }

    .toolbar-left,
    .toolbar-right {
        width: 100%;
    }

    .search-box {
        max-width: 100%;
    }

    .preview-card {
        padding: 12px;
    }

    .chat-input-toolbar {
        flex-wrap: wrap;
    }

    .chat-input-actions {
        order: 2;
        width: 100%;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .chat-send {
        order: 1;
        width: 100%;
        justify-content: center;
    }
}
```

---

## 十二、JavaScript核心功能

### 12.1 卡片点击处理

```javascript
// 处理卡片点击 - 激活状态
document.querySelectorAll('.preview-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // 如果点击的是按钮，不处理
        if (e.target.closest('.btn-preview-action')) return;

        // 移除其他卡片的active状态
        document.querySelectorAll('.preview-card').forEach(c => {
            c.classList.remove('active');
        });

        // 添加当前卡片的active状态
        this.classList.add('active');

        // 标记为已读
        const status = this.querySelector('.preview-status');
        if (status) {
            status.classList.remove('status-unread');
            status.classList.add('status-read');
        }
    });
});
```

### 12.2 讨论按钮处理

```javascript
// 处理"讨论"按钮点击
document.querySelectorAll('.preview-card').forEach(card => {
    const discussBtn = card.querySelector('.btn-preview-action[title="讨论此信息"]');
    if (discussBtn) {
        discussBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            // 获取信息内容
            const title = card.querySelector('.preview-title').textContent;
            const summary = card.querySelector('.preview-summary').textContent;
            const cardId = card.dataset.id;

            // 激活卡片
            document.querySelectorAll('.preview-card').forEach(c => {
                c.classList.remove('active');
            });
            card.classList.add('active');

            // 显示上下文预览
            showContext(title, summary);

            // 发送系统消息到对话区
            addSystemMessage(`已加载信息："${title}"，您可以向我提问相关内容。`);

            // 保存当前讨论的信息ID
            window.currentDiscussionId = cardId;
        });
    }
});

function showContext(title, summary) {
    const contextEl = document.getElementById('chatContext');
    const titleEl = contextEl.querySelector('.context-title');
    const summaryEl = contextEl.querySelector('.context-summary');

    titleEl.textContent = title;
    summaryEl.textContent = summary;
    contextEl.style.display = 'block';
}

function hideContext() {
    document.getElementById('chatContext').style.display = 'none';
}

// 关闭上下文按钮
document.getElementById('closeContext')?.addEventListener('click', hideContext);
```

### 12.3 搜索功能

```javascript
const searchInput = document.getElementById('previewSearch');
const searchClear = document.getElementById('searchClear');

searchInput?.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();

    // 显示/隐藏清除按钮
    searchClear.style.display = query ? 'block' : 'none';

    // 过滤卡片
    document.querySelectorAll('.preview-card').forEach(card => {
        const title = card.querySelector('.preview-title').textContent.toLowerCase();
        const summary = card.querySelector('.preview-summary').textContent.toLowerCase();

        if (title.includes(query) || summary.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

searchClear?.addEventListener('click', function() {
    searchInput.value = '';
    this.style.display = 'none';

    // 显示所有卡片
    document.querySelectorAll('.preview-card').forEach(card => {
        card.style.display = 'block';
    });
});
```

### 12.4 筛选功能

```javascript
const filterSelect = document.getElementById('filterSelect');

filterSelect?.addEventListener('change', function() {
    const filter = this.value;

    document.querySelectorAll('.preview-card').forEach(card => {
        let show = true;

        switch(filter) {
            case 'latest':
                // 只显示最新的（可根据时间戳判断）
                show = true; // 实际需要根据数据判断
                break;
            case 'unread':
                // 只显示未读的
                show = card.querySelector('.status-unread') !== null;
                break;
            case 'important':
                // 只显示重要的
                show = card.dataset.important === 'true';
                break;
            default:
                show = true;
        }

        card.style.display = show ? 'block' : 'none';
    });
});
```

### 12.5 对话功能

```javascript
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const clearChat = document.getElementById('clearChat');

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // 模拟AI回复
    setTimeout(() => {
        addAIMessage(generateAIResponse(message));
    }, 1000);
}

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

function addAIMessage(text) {
    const messageHtml = `
        <div class="message message-ai">
            <div class="message-avatar">🤖</div>
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

function addSystemMessage(text) {
    const messageHtml = `
        <div class="message message-ai">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-time">${getCurrentTime()}</div>
                <div class="message-bubble" style="background: #fff7e6; border-color: #ffe58f;">
                    <p>${escapeHtml(text)}</p>
                </div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom();
}

function generateAIResponse(userMessage) {
    // 这里应该调用实际的AI API
    // 示例：基于当前讨论的信息返回回复
    if (window.currentDiscussionId) {
        return `根据您所选择的信息内容，${userMessage}的相关回答是...`;
    }
    return '让我为您解答...';
}

// Enter发送，Shift+Enter换行
chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

chatSend?.addEventListener('click', sendMessage);

// 清空对话
clearChat?.addEventListener('click', function() {
    if (confirm('确定要清空对话记录吗？')) {
        chatMessages.innerHTML = '';
        addAIMessage('您好！我是AI智能助手，您可以向我提问任何关于信息内容的问题。');
        window.currentDiscussionId = null;
        hideContext();
    }
});

// 工具函数
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: #262626;
        color: white;
        border-radius: 6px;
        z-index: 10000;
        font-size: 14px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
}
```

### 12.6 刷新功能

```javascript
const refreshBtn = document.getElementById('refreshBtn');

refreshBtn?.addEventListener('click', function() {
    // 添加旋转动画
    this.style.transform = 'rotate(360deg)';
    this.style.transition = 'transform 0.5s';

    // 模拟刷新数据
    setTimeout(() => {
        this.style.transform = 'rotate(0deg)';
        showToast('数据已刷新');
        // 这里应该调用API重新加载数据
    }, 500);
});
```

### 12.7 加载更多

```javascript
const loadMoreBtn = document.getElementById('loadMoreBtn');

loadMoreBtn?.addEventListener('click', function() {
    this.textContent = '加载中...';
    this.disabled = true;

    // 模拟加载数据
    setTimeout(() => {
        // 这里应该调用API加载更多数据
        // 然后将新数据追加到列表中

        this.textContent = '加载更多';
        this.disabled = false;
        showToast('已加载更多内容');
    }, 1000);
});

// 或者：滚动到底部自动加载
const previewList = document.querySelector('.preview-list');
previewList?.addEventListener('scroll', function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight - 50) {
        // 触发加载更多
        if (!window.isLoading) {
            window.isLoading = true;
            loadMoreBtn?.click();
            setTimeout(() => {
                window.isLoading = false;
            }, 1000);
        }
    }
});
```

---

## 十三、版本记录

- **v1.0.0** (2024-12-10)
  - 初始版本
  - 左右双栏布局：信息预览 + 实时对话
  - 支持搜索、筛选、刷新功能
  - 卡片式信息预览
  - 上下文预览区域
  - 完整的对话功能
  - 响应式设计支持
  - 状态管理（未读/已读、收藏、激活）

---

**模版维护者**：请在修改此模版时更新版本记录
