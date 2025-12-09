# 信息查看/检索模式智能体 - 页面模版

> 基于 `agent-detail-search.html` 设计
> 适用于：信息展示、内容检索、列表查看类的智能体页面

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
├── 搜索框区域（居中，最大800px）
│   ├── 搜索输入框
│   └── 清除按钮
│
└── 主内容区域（左右布局）
    ├── 左侧：分类导航（220px，sticky定位）
    │   ├── 内容分类（一级分类）
    │   └── 信息来源（支持展开/折叠的二级分类）
    │
    └── 右侧：内容主区域
        ├── 筛选栏（排序选择 + 结果计数）
        ├── 结果列表（卡片式展示）
        └── 分页器
```

---

## 二、核心组件

### 2.1 智能体头部（统一样式）

```html
<div class="agent-header">
    <div class="agent-header-main">
        <div class="agent-icon">🔍</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">【智能体名称】</h2>
                <span class="agent-type">基础类</span>
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

### 2.2 搜索框

```html
<div class="search-section">
    <div class="search-wrapper">
        <input type="text" class="search-input" id="searchInput"
               placeholder="搜索内容、标题或关键词...">
        <button class="search-reset" id="searchReset" style="display: none;">✕</button>
    </div>
</div>
```

**特点：**
- 居中显示，最大宽度800px
- 支持清除按钮（输入时显示）
- 回车触发搜索

### 2.3 左侧分类导航

```html
<aside class="search-categories-sidebar">
    <div class="category-group">
        <div class="category-group-title">内容分类</div>
        <div class="category-list">
            <a href="#" class="category-item active" data-category="all">
                <span class="category-name">全部</span>
                <span class="category-count">(856)</span>
            </a>
            <!-- 更多分类项 -->
        </div>
    </div>

    <div class="category-group">
        <div class="category-group-title">信息来源</div>
        <div class="category-list">
            <!-- 支持展开/折叠的二级分类 -->
            <div class="category-item-parent">
                <a href="#" class="category-item category-item-expandable">
                    <span class="category-name">来源分组一</span>
                    <span class="category-expand">›</span>
                </a>
                <div class="category-sub-list">
                    <a href="#" class="category-sub-item">来源 A</a>
                    <!-- 更多子项 -->
                </div>
            </div>
        </div>
    </div>
</aside>
```

**特点：**
- 固定宽度220px
- Sticky定位（top: 24px）
- 支持滚动（最大高度：100vh - 280px）
- 支持多级分类（可展开/折叠）
- 显示数量统计

### 2.4 筛选栏

```html
<div class="search-filters">
    <div class="filter-left">
        <span class="filter-label">排序：</span>
        <select class="filter-select" id="sortSelect">
            <option value="time">最新发布</option>
            <option value="hot">最热门</option>
            <option value="relevant">最相关</option>
        </select>
    </div>
    <div class="filter-right">
        <span class="result-count">共找到 <strong>856</strong> 条信息</span>
    </div>
</div>
```

**特点：**
- 左侧：排序选择器
- 右侧：结果计数
- 白色卡片背景

### 2.5 结果卡片

```html
<article class="result-card" data-category="type1">
    <div class="result-header">
        <h3 class="result-title">
            <a href="#">【标题】</a>
        </h3>
        <div class="result-meta">
            <span class="result-date">2024-12-09 14:30</span>
            <span class="result-source">来源 A</span>
            <span class="result-tag tag-threat">分类一</span>
        </div>
    </div>
    <p class="result-summary">【摘要内容】...</p>
    <div class="result-footer">
        <div class="result-stats">
            <span class="stat-item">👁️ 1.2k</span>
            <span class="stat-item">💬 23</span>
            <span class="stat-item">👍 156</span>
        </div>
        <button class="btn-collect" title="收藏">⭐</button>
    </div>
</article>
```

**特点：**
- 卡片式布局
- 包含：标题、元数据、摘要、统计数据、收藏按钮
- 悬停效果（提升、阴影加深）
- 摘要限制2行（溢出省略号）

---

## 三、关键CSS类

### 3.1 主布局

```css
/* 搜索框区域 */
.search-section {
    margin-bottom: 24px;
}

.search-wrapper {
    max-width: 800px;
    margin: 0 auto;
}

/* 主内容区域 - 左右布局 */
.search-content-wrapper {
    display: flex;
    gap: 24px;
    min-height: calc(100vh - 280px);
}

/* 左侧分类导航 */
.search-categories-sidebar {
    width: 220px;
    position: sticky;
    top: 24px;
    max-height: calc(100vh - 280px);
    overflow-y: auto;
}

/* 右侧内容主区域 */
.search-content-main {
    flex: 1;
    min-width: 0;
}
```

### 3.2 分类导航样式

```css
.category-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 6px;
    transition: all 0.2s;
}

.category-item:hover {
    background: #f5f5f5;
}

.category-item.active {
    background: #e6f7ff;
    color: #1890ff;
    font-weight: 500;
}

/* 展开/折叠功能 */
.category-item-expandable .category-expand {
    transition: transform 0.2s;
}

.category-item-expandable.expanded .category-expand {
    transform: rotate(90deg);
}
```

### 3.3 结果卡片样式

```css
.result-card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.3s;
}

.result-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    transform: translateY(-2px);
}

/* 摘要限制2行 */
.result-summary {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

---

## 四、交互功能

### 4.1 搜索功能

- 输入时显示清除按钮
- 回车键触发搜索
- 清除按钮重置搜索

### 4.2 分类筛选

- 点击一级分类切换激活状态
- 点击可展开分类触发展开/折叠
- 点击二级分类筛选具体来源

### 4.3 排序功能

- 下拉选择器切换排序方式
- 支持：最新发布、最热门、最相关

### 4.4 收藏功能

- 点击收藏按钮切换状态
- 激活状态显示彩色星标

### 4.5 分页导航

- 上一页/下一页按钮
- 页码直接跳转

---

## 五、适用场景

### 5.1 推荐使用

✅ **信息资讯类智能体**：新闻、公告、动态等
✅ **内容检索类智能体**：文档搜索、知识库查询等
✅ **数据展示类智能体**：报告列表、案例库等
✅ **资源聚合类智能体**：工具集合、链接导航等

### 5.2 不推荐使用

❌ **对话交互类智能体**：使用快速对话模式
❌ **任务执行类智能体**：使用任务管理模式
❌ **实时操作类智能体**：需要自定义界面

---

## 六、定制指南

### 6.1 修改内容分类

1. 在 `.category-list` 中添加/修改分类项
2. 更新 `data-category` 属性值
3. 修改分类名称和数量

```html
<a href="#" class="category-item" data-category="custom-type">
    <span class="category-name">自定义分类</span>
    <span class="category-count">(99)</span>
</a>
```

### 6.2 修改信息来源

1. 在第二个 `.category-group` 中修改来源分组
2. 更新 `data-source` 属性值
3. 添加/删除二级分类项

```html
<div class="category-item-parent">
    <a href="#" class="category-item category-item-expandable" data-source="custom-group">
        <span class="category-name">自定义分组</span>
        <span class="category-expand">›</span>
    </a>
    <div class="category-sub-list">
        <a href="#" class="category-sub-item" data-source="custom-1">自定义来源</a>
    </div>
</div>
```

### 6.3 修改结果卡片标签颜色

在 `css/agent-search.css` 中添加自定义标签样式：

```css
.tag-custom {
    background: #f0f5ff;
    color: #2f54eb;
}
```

### 6.4 调整布局宽度

```css
/* 调整左侧导航宽度 */
.search-categories-sidebar {
    width: 240px;  /* 默认220px */
}

/* 调整搜索框最大宽度 */
.search-wrapper {
    max-width: 900px;  /* 默认800px */
}
```

---

## 七、文件清单

**必需文件：**
- `agent-detail-search.html` - 主页面
- `css/agent-detail.css` - 智能体详情通用样式
- `css/agent-search.css` - 信息检索模式专用样式
- `css/dashboard.css` - 主导航样式
- `css/common.css` - 全局样式
- `js/agent-search.js` - 交互逻辑
- `js/dashboard.js` - 主导航逻辑

---

## 八、与其他模式的区别

| 特性 | 信息检索模式 | 快速对话模式 | 任务管理模式 |
|------|------------|------------|------------|
| **主要用途** | 信息浏览、内容搜索 | 实时对话交互 | 任务列表管理 |
| **左侧导航** | 分类筛选导航 | 近期任务列表 | 无 |
| **顶部搜索** | ✅ 有 | ❌ 无 | ✅ 有 |
| **主内容** | 结果列表卡片 | 对话消息流 | 任务卡片列表 |
| **交互方式** | 点击查看详情 | 输入发送消息 | 查看任务状态 |
| **分页** | ✅ 有 | ❌ 无 | ✅ 有 |

---

## 九、注意事项

1. **主导航模式**：智能体详情页必须使用collapsed模式
2. **搜索框宽度**：居中显示，最大宽度800px
3. **左侧导航宽度**：统一为220px，不要随意修改
4. **Sticky定位**：确保left侧导航top值为24px
5. **分类展开**：使用JavaScript控制`.expanded`类
6. **结果摘要**：限制2行显示，超出显示省略号
7. **卡片间距**：列表gap统一为16px
8. **响应式设计**：移动端左侧导航改为垂直堆叠

---

## 十、响应式适配

### 10.1 平板（≤992px）

- 左右布局改为垂直堆叠
- 左侧导航宽度100%
- 分类导航不再sticky

### 10.2 手机（≤768px）

- 筛选栏改为垂直布局
- 结果卡片padding减小
- 结果底部改为垂直布局

---

## 十一、版本记录

- **v1.0.0** (2024-12-09)
  - 初始版本
  - 基于安全资讯智能体设计
  - 支持搜索、分类、筛选、分页功能
  - 完整的响应式设计
  - 多级分类导航支持

---

## 十、信息详情页（左右布局）

### 10.1 使用场景

当用户从列表页点击某条信息进入详情查看时，需要提供：
- **左侧**：完整的信息内容展示
- **右侧**：AI对话助手，支持用户针对内容提问、讨论

### 10.2 页面结构

```
├── 左侧主导航（collapsed模式）
│
├── 智能体信息提示（弱化显示）
│   └── 智能体名称 · 类型 · 版本
│
├── 标题栏（白色卡片）
│   ├── 返回按钮（左侧）
│   ├── 信息标题（中间，flex: 1，自动省略）
│   └── 操作按钮组（右侧，margin-left: auto）
│       ├── 收藏
│       ├── 分享
│       └── 导出
│
└── 主内容区域（左右布局）
    ├── 左侧：信息详情（flex: 1）
    │   ├── Meta信息（时间、来源、标签）
    │   ├── 内容摘要
    │   ├── 文章正文
    │   └── 相关推荐
    │
    └── 右侧：对话区域（420px固定宽度）
        ├── 对话头部（紫色渐变）
        ├── 消息列表
        └── 输入框
```

### 10.3 HTML结构

```html
<!-- 智能体信息提示（弱化显示，位于页面顶部） -->
<div class="detail-agent-info">
    <span class="agent-name-text">信息查看检索示例</span>
    <span class="agent-separator">·</span>
    <span class="agent-type-text">基础类</span>
    <span class="agent-separator">·</span>
    <span class="agent-version-text">v1.0.0</span>
</div>

<!-- 返回按钮和信息标题（白色卡片） -->
<div class="detail-title-section">
    <!-- 返回按钮 -->
    <button class="btn-back-to-list" onclick="window.location.href='agent-detail-search.html';" title="返回列表">
        <span class="back-icon">←</span>
    </button>
    
    <!-- 信息标题（占据中间空间，自动省略） -->
    <h1 class="detail-title-main">信息标题示例：关于某个主题的深度分析报告</h1>
    
    <!-- 操作按钮组（自动靠右） -->
    <div class="detail-actions">
        <button class="btn-action" id="collectBtn" title="收藏">
            <span>⭐</span>
            <span>收藏</span>
        </button>
        <button class="btn-action" title="分享">
            <span>🔗</span>
            <span>分享</span>
        </button>
        <button class="btn-action" title="导出">
            <span>📥</span>
            <span>导出</span>
        </button>
    </div>
</div>

<!-- 主内容区域：左右布局 -->
<div class="detail-container">
    <!-- 左侧：信息详情 -->
    <div class="detail-content">
        <!-- 详情页头部（Meta信息） -->
        <div class="detail-header">
            <div class="detail-meta">
                <span class="meta-item">
                    <span class="meta-icon">📅</span>
                    <span>2024-03-15 14:30</span>
                </span>
                <span class="meta-item">
                    <span class="meta-icon">📰</span>
                    <span>来源 A</span>
                </span>
                <span class="meta-item">
                    <span class="detail-tag tag-primary">标签一</span>
                </span>
            </div>
        </div>

        <!-- 内容摘要 -->
        <div class="detail-summary">
            <div class="summary-label">📋 内容摘要</div>
            <p class="summary-text">文章摘要内容...</p>
        </div>

        <!-- 文章正文 -->
        <article class="detail-article">
            <h2>一级标题</h2>
            <p>段落内容...</p>
            <h3>二级标题</h3>
            <ul>
                <li>列表项</li>
            </ul>
        </article>

        <!-- 相关推荐 -->
        <div class="detail-related">
            <h3 class="related-title">📚 相关推荐</h3>
            <div class="related-list">
                <a href="#" class="related-item">
                    <span class="related-icon">📄</span>
                    <span class="related-text">相关文章标题</span>
                </a>
            </div>
        </div>
    </div>

    <!-- 右侧：对话区域 -->
    <div class="detail-chat">
        <div class="chat-container">
            <!-- 对话头部 -->
            <div class="chat-header">
                <div class="chat-header-main">
                    <span class="chat-icon">🤖</span>
                    <span class="chat-title">AI 智能助手</span>
                </div>
                <button class="btn-icon" id="clearChat" title="清空对话">
                    🗑️
                </button>
            </div>

            <!-- 消息列表 -->
            <div class="chat-messages" id="chatMessages">
                <div class="message message-ai">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-time">2024-12-09 15:20</div>
                        <div class="message-bubble">
                            <p>您好！我可以帮您分析这篇资讯的内容...</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 输入区域 -->
            <div class="chat-input-container">
                <div class="chat-input-wrapper">
                    <textarea class="chat-input" id="chatInput"
                              placeholder="向AI提问关于这篇资讯的问题..."
                              rows="3"></textarea>
                    <div class="chat-input-toolbar">
                        <div class="chat-input-actions">
                            <button class="btn-icon" title="上传文件">📎</button>
                            <button class="btn-icon" title="插入图片">🖼️</button>
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
</div>
```

### 10.4 核心CSS样式

#### 10.4.1 智能体信息提示

```css
/* 智能体信息提示（弱化显示，位于页面顶部） */
.detail-agent-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #bfbfbf;
    line-height: 1;
    margin-top: 24px;
    margin-bottom: 8px;
    padding: 0 24px;
}

.agent-name-text,
.agent-type-text,
.agent-version-text {
    color: #bfbfbf;
}

.agent-separator {
    color: #d9d9d9;
    margin: 0 2px;
}
```

#### 10.4.2 标题栏布局（关键设计）

```css
/* 标题栏容器（白色卡片） */
.detail-title-section {
    margin-bottom: 24px;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 16px;
    background: white;
    border-radius: 8px;
    padding: 16px 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    flex-wrap: nowrap !important;
    overflow: hidden;
}

/* 返回按钮（左侧固定） */
.btn-back-to-list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    background: #f5f5f5;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}

.btn-back-to-list:hover {
    background: #e6f7ff;
    color: #1890ff;
    transform: translateX(-2px);
}

.back-icon {
    font-size: 18px;
    color: #595959;
    transition: color 0.2s;
}

.btn-back-to-list:hover .back-icon {
    color: #1890ff;
}

/* 信息标题（中间，占据剩余空间，自动省略） */
.detail-title-main {
    flex: 1 1 auto;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
    color: #262626;
    margin: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap !important;
    box-sizing: border-box;
    padding-right: 16px;
}

/* 操作按钮组（右侧，使用 margin-left: auto 自动靠右） */
.detail-title-section .detail-actions {
    flex: 0 0 auto !important;
    flex-shrink: 0 !important;
    flex-grow: 0 !important;
    margin-left: auto; /* 关键：自动靠右 */
    display: flex !important;
    gap: 6px;
    align-items: center;
    flex-wrap: nowrap !important;
    box-sizing: border-box;
}

.detail-title-section .btn-action {
    white-space: nowrap !important;
    flex-shrink: 0 !important;
    padding: 6px 10px;
    font-size: 13px;
    min-width: auto;
    max-width: none;
}
```

**设计要点：**
- 使用 `flex: 1 1 auto` 让标题占据中间可用空间
- 使用 `margin-left: auto` 将按钮组推到右侧
- 标题使用 `text-overflow: ellipsis` 和 `white-space: nowrap` 实现单行省略
- 按钮使用 `flex-shrink: 0` 防止被压缩
- 容器使用 `overflow: hidden` 防止内容溢出

#### 10.4.3 主布局容器

```css
/* 主布局容器 - 左右分栏 */
.detail-container {
    display: flex;
    gap: 24px;
    height: calc(100vh - 140px);
    min-height: 600px;
}

/* 左侧：信息详情区域 */
.detail-content {
    flex: 1;
    min-width: 0; /* 防止flex溢出 */
    overflow-y: auto;
    padding: 32px;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

/* 右侧：对话区域 */
.detail-chat {
    width: 420px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
}
```

#### 10.4.4 Meta信息布局

```css
/* 详情页头部（Meta信息） */
.detail-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-color);
}

/* Meta信息（水平布局，左右分布） */
.detail-meta {
    display: flex;
    flex-direction: row; /* 桌面端：水平布局 */
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 0;
}

.meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--text-secondary);
}

.meta-icon {
    font-size: 16px;
}

/* 响应式：移动端垂直布局 */
@media (max-width: 768px) {
    .detail-meta {
        flex-direction: column; /* 移动端：垂直布局 */
        align-items: flex-start;
        gap: 8px;
    }
}
```

#### 10.4.5 内容样式

```css
/* 内容摘要 */
.detail-summary {
    margin-bottom: 32px;
    padding: 20px;
    background: linear-gradient(135deg, #f6f9fc 0%, #fafbfd 100%);
    border-left: 4px solid var(--primary-color);
    border-radius: 4px;
}

.summary-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 12px;
}

.summary-text {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-primary);
    margin: 0;
}

/* 文章内容 */
.detail-article {
    font-size: 16px;
    line-height: 1.8;
    color: var(--text-primary);
    margin-bottom: 40px;
}

.detail-article h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 32px 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--border-color);
    color: var(--text-primary);
}

.detail-article h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 24px 0 12px 0;
    color: var(--text-primary);
}

.detail-article p {
    margin: 16px 0;
    text-align: justify;
}

.detail-article ul,
.detail-article ol {
    margin: 16px 0;
    padding-left: 24px;
}

.detail-article li {
    margin: 8px 0;
    line-height: 1.8;
}
```

#### 10.4.6 对话区域样式

```css
/* 对话头部（紫色渐变） */
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
    gap: 10px;
}

.chat-icon {
    font-size: 20px;
}

.chat-title {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
}

/* 消息列表 */
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #fafafa;
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
}

.message-ai .message-bubble {
    background: #ffffff;
}

.message-user .message-bubble {
    background: #e6f7ff;
}
```

#### 10.4.7 响应式设计

```css
/* 平板及以下：左右布局改为上下布局 */
@media (max-width: 992px) {
    .detail-container {
        flex-direction: column;
        height: auto;
    }

    .detail-chat {
        width: 100%;
        min-height: 500px;
    }
}

/* 移动端：标题栏允许换行 */
@media (max-width: 768px) {
    .detail-title-section {
        flex-wrap: wrap; /* 移动端：允许换行 */
    }
    
    .detail-title-main {
        white-space: normal; /* 移动端：允许标题换行 */
        overflow: visible;
        text-overflow: clip;
        width: 100%;
        padding-right: 0;
        margin-bottom: 8px;
    }
    
    .detail-title-section .detail-actions {
        flex-wrap: wrap; /* 移动端：允许按钮换行 */
        width: 100%;
        margin-left: 0;
        justify-content: flex-start;
        margin-top: 8px;
    }
    
    .detail-meta {
        flex-direction: column; /* 移动端：Meta信息垂直布局 */
        align-items: flex-start;
        gap: 8px;
    }
}
```

### 10.5 JavaScript交互

#### 10.5.1 收藏功能

```javascript
// 收藏按钮切换
const collectBtn = document.getElementById('collectBtn');
if (collectBtn) {
    collectBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const isActive = this.classList.contains('active');
        showToast(isActive ? '收藏成功' : '已取消收藏');
        // 这里可以调用API保存收藏状态
    });
}
```

#### 10.5.2 分享功能

```javascript
// 分享功能（复制链接）
function shareNews() {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => showToast('链接已复制到剪贴板'))
        .catch(() => showToast('复制失败，请手动复制链接'));
}

// 绑定分享按钮
document.querySelectorAll('.btn-action[title="分享"]').forEach(btn => {
    btn.addEventListener('click', shareNews);
});
```

#### 10.5.3 导出功能

```javascript
// 导出功能（导出为文本文件）
function exportNews() {
    const title = document.querySelector('.detail-title-main').textContent;
    const article = document.querySelector('.detail-article').innerText;
    const summary = document.querySelector('.summary-text')?.textContent || '';
    const content = `${title}\n\n${summary}\n\n${article}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.substring(0, 50)}.txt`; // 限制文件名长度
    a.click();
    URL.revokeObjectURL(url);

    showToast('导出成功');
}

// 绑定导出按钮
document.querySelectorAll('.btn-action[title="导出"]').forEach(btn => {
    btn.addEventListener('click', exportNews);
});
```

#### 10.5.4 AI对话功能

```javascript
// 发送消息
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatMessages = document.getElementById('chatMessages');
const clearChat = document.getElementById('clearChat');

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatInput.value = '';

    // 模拟AI回复
    setTimeout(() => {
        addAIMessage('让我帮您分析这篇内容...');
    }, 1000);
}

// 添加用户消息
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

// 添加AI消息
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

// 清空对话
if (clearChat) {
    clearChat.addEventListener('click', function() {
        if (confirm('确定要清空对话记录吗？')) {
            chatMessages.innerHTML = '';
            // 可以添加欢迎消息
            addAIMessage('您好！我是AI智能助手，我可以帮助您深入理解这篇内容。');
        }
    });
}

// Enter发送，Shift+Enter换行
if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// 发送按钮
if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
}

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
    // 简单的toast提示实现
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

### 10.6 文件清单

**必需文件：**
- `agent-news-detail.html` - 详情页HTML
- `css/agent-news-detail.css` - 详情页样式
- `css/agent-detail.css` - 通用智能体详情样式
- `css/common.css` - 全局样式
- `js/agent-news-detail.js` - 详情页交互逻辑
- `js/dashboard.js` - 主导航逻辑

### 10.7 设计要点

#### 10.7.1 标题栏布局（核心设计）

1. **智能体信息提示**：
   - 位于页面顶部，弱化显示（`color: #bfbfbf`）
   - 上边距24px，与内容区域分离
   - 格式：`智能体名称 · 类型 · 版本`

2. **标题栏布局**：
   - 使用白色卡片背景，带阴影
   - **左侧**：返回按钮（固定宽度36px）
   - **中间**：信息标题（`flex: 1 1 auto`，自动占据剩余空间）
   - **右侧**：操作按钮组（`margin-left: auto`，自动靠右）
   - 使用 `gap: 16px` 确保元素间距
   - 使用 `overflow: hidden` 防止内容溢出

3. **标题省略处理**：
   - 使用 `text-overflow: ellipsis` 和 `white-space: nowrap` 实现单行省略
   - 标题添加 `padding-right: 16px` 确保与按钮有间距
   - 使用 `min-width: 0` 允许flex子元素缩小

4. **按钮防压缩**：
   - 按钮组使用 `flex: 0 0 auto` 和 `flex-shrink: 0`
   - 单个按钮使用 `white-space: nowrap` 防止文字换行
   - 使用 `margin-left: auto` 将按钮推到右侧

#### 10.7.2 响应式处理

1. **桌面端（>992px）**：
   - 左右布局：左侧flex自适应，右侧固定420px
   - 标题栏：单行显示，标题省略，按钮靠右
   - Meta信息：水平布局

2. **平板端（≤992px）**：
   - 左右布局改为上下布局
   - 对话区域宽度100%，最小高度500px

3. **移动端（≤768px）**：
   - 标题栏允许换行：标题和按钮可以换行显示
   - Meta信息改为垂直布局
   - 标题文字允许换行（`white-space: normal`）

#### 10.7.3 其他设计要点

1. **左右分栏比例**：左侧flex自适应，右侧固定420px
2. **对话头部**：紫色渐变背景（`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`），区别于列表页
3. **滚动区域**：左侧和右侧消息区域各自独立滚动
4. **操作反馈**：收藏、分享、导出都有toast提示
5. **消息样式**：复用快速对话模式的消息组件
6. **文章排版**：1.8行高，段落间距适中，标题层级清晰
7. **摘要样式**：渐变背景，左侧4px蓝色边框，突出显示

### 10.8 使用示例

**安全资讯智能体：**
- 列表页：`agent-news.html`（信息检索模式）
- 详情页：`agent-news-detail.html`（信息详情+对话）

**其他适用场景：**
- 知识库文档详情
- 政策法规详情
- 技术报告详情
- 案例分析详情

---

## 十一、版本记录

- **v1.3.0** (2024-12-09)
  - **重大更新**：重构信息详情页标题栏布局
  - 新增：智能体信息提示（弱化显示，位于页面顶部）
  - 优化：标题栏布局（返回按钮 + 标题 + 操作按钮，使用flex布局和margin-left: auto）
  - 优化：标题自动省略处理（单行省略，防止与按钮重合）
  - 优化：按钮组自动靠右（使用margin-left: auto）
  - 完善：响应式布局（移动端允许标题和按钮换行）
  - 完善：Meta信息布局（桌面端水平，移动端垂直）
  - 更新：CSS样式文档，详细说明布局原理

- **v1.2.0** (2024-12-09)
  - 新增：信息详情页左右布局模式
  - 新增：详情页与AI对话集成
  - 新增：分享、导出、收藏功能
  - 完善：返回按钮设计规范
  - 更新：响应式布局支持

- **v1.1.0** (2024-12-08)
  - 更新：管理功能按钮组移至智能体头部
  - 优化：分类导航支持展开/折叠
  - 新增：结果卡片统计数据显示
  - 完善：响应式设计

- **v1.0.0** (2024-12-07)
  - 初始版本
  - 支持信息列表展示和检索
  - 左侧分类导航 + 右侧结果列表
  - 搜索、筛选、分页功能

---

**模版维护者**：请在修改此模版时更新版本记录
