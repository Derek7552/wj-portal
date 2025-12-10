# 自规划模式智能体 - 页面模版

> 基于 `agent-detail-planning.html` 设计
> 适用于：复杂任务自动分解、自主规划执行、实时进度跟踪的智能体页面

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
└── 主内容区域（三栏布局）
    ├── 左侧：任务导航（220px）
    │   ├── 新任务按钮
    │   └── 近期任务列表
    │       ├── 任务标题
    │       ├── 状态标识（进行中/已完成/失败）
    │       ├── 创建时间
    │       └── 进度信息
    │
    ├── 中间：任务执行区域（flex: 1）
    │   ├── 任务头部
    │   │   ├── 任务标题
    │   │   ├── 元数据（创建时间、运行时长、进度）
    │   │   └── 控制按钮（暂停/继续、停止）
    │   ├── 进度条
    │   ├── Tab切换（对话记录、关键日志）
    │   ├── 内容区域
    │   │   ├── 消息列表（系统消息、AI消息、用户消息）
    │   │   └── 任务分解步骤展示
    │   └── 输入区域
    │
    └── 右侧：资源面板（320px）
        ├── Tab切换（文件、产物）
        ├── 文件Tab
        │   ├── 相关文档列表
        │   └── 文件上传区域
        └── 产物Tab
            └── 生成的代码/文档列表
```

---

## 二、核心组件

### 2.1 智能体头部（统一样式）

```html
<div class="agent-header">
    <div class="agent-header-main">
        <div class="agent-icon">🎯</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">自规划任务执行助手</h2>
                <span class="agent-type">高级类</span>
                <span class="agent-version">v2.0.0</span>
            </div>
            <p class="agent-description">智能分解复杂任务，自主规划执行步骤，实时反馈进度，支持人工干预和调整</p>
        </div>
    </div>
    <div class="agent-header-actions">
        <button class="btn-agent-action">
            <span class="action-icon">📚</span>
            <span class="action-text">知识库</span>
            <span class="action-count">(156)</span>
        </button>
        <!-- 其他按钮 -->
    </div>
</div>
```

### 2.2 任务导航（左侧）

```html
<aside class="agent-sidebar">
    <nav class="agent-nav">
        <!-- 新任务按钮 -->
        <button class="btn-new-chat" id="btnNewTask">
            <span class="btn-icon">✨</span>
            <span class="btn-text">新任务</span>
        </button>

        <!-- 近期任务 -->
        <div class="nav-group">
            <div class="nav-group-title">近期任务</div>
            <div class="recent-tasks-list">
                <a href="#" class="recent-task-item active"
                   data-task-id="1"
                   data-task-name="开发用户认证系统"
                   data-task-status="running">
                    <span class="task-status-icon running">⏳</span>
                    <div class="task-name">开发用户认证系统</div>
                </a>
                <a href="#" class="recent-task-item"
                   data-task-id="2"
                   data-task-name="数据分析报告生成"
                   data-task-status="completed">
                    <span class="task-status-icon completed">✅</span>
                    <div class="task-name">数据分析报告生成</div>
                </a>
                <!-- 更多任务 -->
            </div>

            <!-- 查看全部任务入口 -->
            <a href="#" class="view-all-tasks" id="viewAllTasks">
                查看全部任务记录 →
            </a>
        </div>
    </nav>
</aside>
```

**特点：**
- 新任务按钮：快速创建新任务
- **任务状态图标（使用emoji）**：
  - ⏳ 进行中
  - ✅ 已完成
  - ❌ 失败
- **简洁展示**：仅显示任务名称和状态图标
- Active状态：浅蓝色半透明背景 + 左侧蓝色边框
- 任务名称：单行显示，溢出省略号
- 查看全部任务：浅蓝色背景按钮，文本居中
- **与快速对话助手样式完全一致**

### 2.3 任务头部

```html
<div class="task-header">
    <div class="task-header-left">
        <h3 class="task-title">开发用户认证系统</h3>
        <div class="task-meta">
            <span class="task-meta-item">
                <span class="meta-icon">📅</span>
                <span>创建于 2024-12-09 14:30</span>
            </span>
            <span class="task-meta-item">
                <span class="meta-icon">⏱️</span>
                <span>已运行 2小时15分</span>
            </span>
            <span class="task-meta-item">
                <span class="meta-icon">📊</span>
                <span>进度 3/5</span>
            </span>
        </div>
    </div>
    <div class="task-header-right">
        <button class="btn btn-secondary btn-sm" id="btnPauseTask">
            <span>⏸️</span>
            <span>暂停</span>
        </button>
        <button class="btn btn-danger btn-sm" id="btnStopTask">
            <span>⏹️</span>
            <span>停止</span>
        </button>
    </div>
</div>
```

**特点：**
- 左侧：任务标题 + 元数据（创建时间、运行时长、进度）
- 右侧：控制按钮（暂停/继续、停止）
- 渐变背景色

### 2.4 进度条

```html
<div class="task-progress-bar">
    <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: 60%;"></div>
    </div>
    <div class="progress-bar-text">60% 完成 (3/5 步骤)</div>
</div>
```

**特点：**
- 蓝色渐变进度条
- 显示百分比和步骤数
- 平滑过渡动画

### 2.5 任务分解步骤

```html
<div class="task-breakdown">
    <div class="task-step completed">
        <span class="step-number">✓</span>
        <span class="step-text">分析需求，确定技术方案</span>
    </div>
    <div class="task-step completed">
        <span class="step-number">✓</span>
        <span class="step-text">设计数据库表结构</span>
    </div>
    <div class="task-step running">
        <span class="step-number">4</span>
        <span class="step-text">开发JWT令牌验证中间件</span>
    </div>
    <div class="task-step pending">
        <span class="step-number">5</span>
        <span class="step-text">编写单元测试和集成测试</span>
    </div>
</div>
```

**特点：**
- 已完成：绿色左边框 + 浅绿背景 + ✓图标
- 进行中：蓝色左边框 + 浅蓝背景 + 脉冲动画
- 待执行：灰色左边框 + 浅灰背景 + 数字编号

### 2.6 关键日志

```html
<div class="logs-container">
    <div class="log-entry log-success">
        <div class="log-time">2024-12-09 14:31:05</div>
        <div class="log-level">SUCCESS</div>
        <div class="log-message">步骤1完成 - 技术方案确定</div>
    </div>
    <div class="log-entry log-info">
        <div class="log-time">2024-12-09 14:45:12</div>
        <div class="log-level">INFO</div>
        <div class="log-message">开始执行步骤2 - 数据库表结构设计</div>
    </div>
    <div class="log-entry log-warning">
        <div class="log-time">2024-12-09 15:00:45</div>
        <div class="log-level">WARNING</div>
        <div class="log-message">用户请求调整 - 添加角色字段</div>
    </div>
</div>
```

**特点：**
- 黑色背景（终端风格）
- 等宽字体（Monaco, Consolas）
- 日志级别颜色：
  - SUCCESS：绿色
  - INFO：蓝色
  - WARNING：橙色
  - ERROR：红色

### 2.7 右侧资源面板

```html
<aside class="task-sidebar">
    <!-- Tab切换 -->
    <div class="sidebar-tabs">
        <button class="sidebar-tab active" data-sidebar-tab="files">
            <span class="tab-icon">📁</span>
            <span class="tab-text">文件</span>
            <span class="tab-badge">3</span>
        </button>
        <button class="sidebar-tab" data-sidebar-tab="outputs">
            <span class="tab-icon">📦</span>
            <span class="tab-text">产物</span>
            <span class="tab-badge">5</span>
        </button>
    </div>

    <!-- 文件列表 -->
    <div class="sidebar-content" id="filesTab">
        <div class="sidebar-section">
            <div class="sidebar-section-title">相关文档</div>
            <div class="file-list">
                <div class="file-item">
                    <div class="file-icon">📄</div>
                    <div class="file-info">
                        <div class="file-name">需求文档.md</div>
                        <div class="file-meta">128 KB · 2024-12-09</div>
                    </div>
                    <button class="btn-file-action" title="下载">⬇️</button>
                </div>
            </div>
        </div>
        <div class="upload-area">
            <button class="btn-upload">
                <span class="upload-icon">📤</span>
                <span class="upload-text">点击上传</span>
            </button>
        </div>
    </div>

    <!-- 产物列表 -->
    <div class="sidebar-content" id="outputsTab" style="display: none;">
        <div class="output-list">
            <div class="output-item">
                <div class="output-header">
                    <div class="output-icon">💻</div>
                    <div class="output-info">
                        <div class="output-name">auth.controller.js</div>
                        <div class="output-meta">步骤3生成 · 2.5 KB</div>
                    </div>
                </div>
                <div class="output-actions">
                    <button class="btn-output-action" title="查看">👁️</button>
                    <button class="btn-output-action" title="复制">📋</button>
                    <button class="btn-output-action" title="下载">⬇️</button>
                </div>
            </div>
        </div>
    </div>
</aside>
```

**特点：**
- Tab切换：文件 / 产物
- Badge显示数量
- 文件支持上传和下载
- 产物支持查看、复制、下载

---

## 三、关键CSS类

### 3.1 主布局

```css
/* 三栏布局 */
.content-container {
    display: grid;
    grid-template-columns: 220px 1fr 320px;
    gap: 24px;
    height: calc(100vh - 280px);
    min-height: 600px;
}
```

### 3.2 任务状态样式

```css
/* 近期任务列表 */
.recent-tasks-list {
    margin: 8px 8px 0 8px;
    max-height: 300px;
    overflow-y: auto;
    flex-shrink: 1;
}

/* 任务项布局 */
.recent-task-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s;
    margin: 2px 0;
}

.recent-task-item:hover {
    background: #f5f5f5;
}

.recent-task-item.active {
    background: rgba(37, 99, 235, 0.08);
    border-left: 3px solid #2563EB;
    padding-left: 5px;
}

.recent-task-item.active .task-name {
    color: #2563EB;
    font-weight: 600;
}

/* 任务状态图标（emoji） */
.task-status-icon {
    font-size: 16px;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
    line-height: 1;
}

/* 任务名称 */
.task-name {
    flex: 1;
    font-size: 13px;
    color: #262626;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
}

/* 查看全部任务样式 */
.view-all-tasks {
    display: block;
    text-align: center;
    padding: 10px 8px;
    margin: 8px 8px 0 8px;
    color: #1890ff;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s;
    background: #f0f7ff;
}

.view-all-tasks:hover {
    background: #e6f4ff;
    color: #40a9ff;
}

/* 滚动条美化 */
.recent-tasks-list::-webkit-scrollbar {
    width: 4px;
}

.recent-tasks-list::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 2px;
}
```

### 3.3 步骤状态样式

```css
.task-step.completed {
    border-left-color: #52c41a;
    background: #f6ffed;
}

.task-step.running {
    border-left-color: #1890ff;
    background: #e6f7ff;
    animation: stepPulse 2s ease-in-out infinite;
}

.task-step.pending {
    border-left-color: #d9d9d9;
    background: #fafafa;
}
```

### 3.4 日志样式

```css
.logs-container {
    background: #0a0a0a;
    font-family: 'Monaco', 'Consolas', monospace;
}

.log-entry {
    display: grid;
    grid-template-columns: 160px 80px 1fr;
    gap: 16px;
}

.log-success .log-level {
    color: #52c41a;
}

.log-info .log-level {
    color: #1890ff;
}

.log-warning .log-level {
    color: #faad14;
}

.log-error .log-level {
    color: #ff4d4f;
}
```

---

## 四、交互功能

### 4.1 任务管理

- **创建新任务**：点击"新任务"按钮，显示输入界面
  - 空状态界面：智能体名称 + 引导文案 + 输入框
  - 输入任务描述（支持多行）
  - 点击"创建任务"或按Shift+Enter提交
  - 自动生成任务名称（取前30个字符）
  - 任务创建后自动切换到详情视图
- **切换任务**：点击左侧任务列表中的任务项（仅显示任务名称和状态）
  - 自动切换到任务详情视图
  - 更新任务头部信息
- **查看全部任务**：点击"查看全部任务"入口，跳转到完整任务列表页面或打开弹窗
- **暂停/继续**：点击暂停按钮可暂停任务，再次点击继续执行
- **停止任务**：点击停止按钮并确认，终止任务执行

### 4.2 对话交互

- **查看对话记录**：默认显示对话tab
- **发送消息**：输入框输入内容，Enter发送，Shift+Enter换行
- **人工干预**：随时发送消息调整任务执行方向
- **实时反馈**：AI自动回复并展示执行进度

### 4.3 日志查看

- **切换到日志tab**：查看关键执行日志
- **日志级别过滤**：SUCCESS、INFO、WARNING、ERROR
- **时间戳显示**：精确到秒

### 4.4 文件管理

- **上传文件**：点击上传区域选择文件
- **下载文件**：点击文件项的下载按钮
- **查看文件列表**：显示文件名、大小、日期

### 4.5 产物管理

- **查看产物**：点击眼睛图标查看生成的代码
- **复制产物**：点击复制图标复制到剪贴板
- **下载产物**：点击下载图标下载文件
- **产物分类**：按生成步骤标记

---

## 五、适用场景

### 5.1 推荐使用

✅ **代码生成类任务**：开发功能模块、编写API接口
✅ **文档生成类任务**：撰写技术文档、API文档、需求文档
✅ **数据分析类任务**：数据清洗、分析、报告生成
✅ **项目管理类任务**：项目规划、任务分解、进度跟踪
✅ **复杂问题解决**：需要多步骤推理和执行的任务

### 5.2 不推荐使用

❌ **简单对话类**：使用快速对话模式
❌ **信息检索类**：使用信息检索模式
❌ **单步任务**：不需要分解的简单任务

---

## 六、定制指南

### 6.1 修改任务状态颜色

```css
.task-status-dot.status-custom {
    background: #your-color;
}

.task-step.custom {
    border-left-color: #your-color;
    background: #your-bg-color;
}
```

### 6.2 调整布局宽度

```css
/* 三栏宽度调整 */
.content-container {
    grid-template-columns: 240px 1fr 360px; /* 左侧240px，右侧360px */
}
```

### 6.3 自定义日志级别

```css
.log-custom .log-level {
    color: #your-color;
}
```

### 6.4 添加新的产物类型

```html
<div class="output-item">
    <div class="output-icon">🎨</div> <!-- 自定义图标 -->
    <div class="output-name">custom-file.ext</div>
</div>
```

---

## 七、文件清单

**必需文件：**
- `agent-detail-planning.html` - 主页面
- `css/agent-detail.css` - 智能体详情通用样式
- `css/agent-detail-planning.css` - 自规划模式专用样式
- `css/dashboard.css` - 主导航样式
- `css/common.css` - 全局样式
- `js/agent-detail-planning.js` - 交互逻辑
- `js/dashboard.js` - 主导航逻辑

---

## 八、与其他模式的区别

| 特性 | 自规划模式 | 快速对话模式 | 信息检索模式 |
|------|-----------|------------|------------|
| **主要用途** | 复杂任务自动分解执行 | 快速对话交互 | 信息浏览检索 |
| **左侧导航** | 任务列表 | 历史会话 | 分类筛选 |
| **中间区域** | 对话+日志双tab | 对话消息流 | 结果列表 |
| **右侧面板** | 文件+产物 | 无 | 无 |
| **任务分解** | ✅ 有 | ❌ 无 | ❌ 无 |
| **进度跟踪** | ✅ 有 | ❌ 无 | ❌ 无 |
| **文件管理** | ✅ 有 | ❌ 无 | ❌ 无 |
| **产物输出** | ✅ 有 | ❌ 无 | ❌ 无 |

---

## 九、核心特性

### 9.1 自动任务分解

智能体接收到任务后，自动分析并分解为多个可执行步骤：
1. 理解任务需求
2. 规划执行步骤
3. 逐步执行并反馈
4. 生成最终产物

### 9.2 实时进度跟踪

- **进度条**：直观显示整体完成百分比
- **步骤状态**：每个步骤的执行状态（已完成/进行中/待执行）
- **时间统计**：任务运行时长
- **元数据展示**：创建时间、步骤数

### 9.3 人工干预机制

- **随时介入**：在任务执行过程中发送消息
- **方向调整**：提出建议，AI自动调整执行方案
- **暂停/继续**：控制任务执行节奏
- **强制停止**：终止任务执行

### 9.4 产物管理

- **自动保存**：每个步骤生成的代码、文档自动保存
- **分类标记**：标注产物来自哪个步骤
- **便捷操作**：查看、复制、下载
- **版本追踪**：记录产物生成时间

---

## 十、注意事项

1. **主导航模式**：智能体详情页必须使用collapsed模式
2. **三栏布局**：左侧220px、中间flex、右侧320px
3. **任务状态**：使用不同颜色圆点区分
4. **步骤动画**：进行中的步骤需要脉冲动画
5. **日志终端风格**：黑色背景、等宽字体
6. **消息滚动**：新消息自动滚动到底部
7. **响应式设计**：移动端改为单栏垂直布局
8. **性能优化**：长任务消息列表使用虚拟滚动

---

## 十一、响应式适配

### 11.1 桌面（>1200px）

- 三栏布局：220px - flex - 320px
- 日志网格布局：3列（时间、级别、消息）

### 11.2 平板（≤1200px）

- 三栏宽度调整：200px - flex - 280px
- 保持网格布局

### 11.3 移动端（≤992px）

- 改为单栏垂直布局
- 顺序：任务导航 → 任务执行 → 资源面板
- 日志改为垂直布局（单列）

```css
@media (max-width: 992px) {
    .content-container {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }

    .agent-sidebar {
        order: 1;
    }

    .agent-main-content {
        order: 2;
        min-height: 500px;
    }

    .task-sidebar {
        order: 3;
        min-height: 400px;
    }
}
```

---

## 十二、版本记录

- **v1.3.0** (2024-12-10)
  - 新增：点击"新任务"按钮显示空状态输入界面
  - 新增：输入框支持Shift+Enter快捷键创建任务
  - 新增：自动从任务描述生成任务名称（前30字符）
  - 新增：创建任务后自动添加系统消息
  - 优化：统一任务切换逻辑，点击任务自动显示详情视图
  - 优化：空状态界面布局，参考快速对话助手示例
  - 新增：渐变文字样式的智能体名称显示

- **v1.2.0** (2024-12-10)
  - 重大更新：统一近期任务样式，与快速对话助手保持一致
  - 变更：使用emoji图标（⏳ ✅ ❌）替代彩色圆点
  - 变更：active状态改为半透明背景 + 左侧蓝色边框
  - 变更：查看全部任务改为浅蓝色背景按钮，文本居中
  - 变更：任务项改为<a>标签，移除卡片样式
  - 优化：简化HTML结构，使用 `task-status-icon` 和 `task-name` 类
  - 优化：列表支持滚动，最大高度300px
  - 优化：添加滚动条美化样式

- **v1.1.0** (2024-12-10)
  - 优化：简化近期任务展示，仅显示任务名称和状态
  - 新增：查看全部任务入口链接（带箭头动画效果）
  - 移除：任务列表中的时间和进度信息（在任务详情页展示）
  - 优化：任务项布局改为横向flex布局，更加紧凑
  - 新增：查看全部任务的交互逻辑

- **v1.0.0** (2024-12-10)
  - 初始版本
  - 三栏布局：任务导航 + 执行区域 + 资源面板
  - 支持任务自动分解和步骤跟踪
  - 对话记录和关键日志双tab
  - 文件上传和产物管理
  - 任务控制（暂停、继续、停止）
  - 完整的响应式设计
  - 实时状态更新和动画效果

---

**模版维护者**：请在修改此模版时更新版本记录
