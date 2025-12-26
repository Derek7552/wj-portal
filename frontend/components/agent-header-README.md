# Agent Header 组件

智能体头部组件，用于展示智能体的基本信息和操作按钮。

## 📋 文件清单

- `agent-header.css` - 组件样式文件
- `agent-header.js` - 组件 JavaScript 文件
- `agent-header.html` - 示例 HTML 文件
- `agent-header-README.md` - 本文档

## 🎯 功能特性

- ✅ 显示智能体图标、标题、类型、版本号
- ✅ 显示智能体描述信息
- ✅ 支持管理功能按钮（知识库、工具插件、设置等）
- ✅ 支持简化版（无描述）
- ✅ 响应式设计，适配移动端
- ✅ 可通过 HTML 或 JavaScript 使用
- ✅ 符合 Clouditera 设计系统

## 📦 安装使用

### 1. 引入文件

```html
<!-- CSS -->
<link rel="stylesheet" href="../../css/tokens.css">
<link rel="stylesheet" href="../../css/common.css">
<link rel="stylesheet" href="../../components/agent-header.css">

<!-- JavaScript (可选) -->
<script src="../../components/agent-header.js"></script>
```

### 2. HTML 方式使用

#### 完整版

```html
<div class="agent-header">
    <div class="agent-header-main">
        <div class="agent-icon">🤖</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">自规划任务执行助手</h2>
                <span class="agent-type">高级类</span>
                <span class="agent-version">v1.2.0</span>
            </div>
            <p class="agent-description">智能任务规划与执行，自动分解复杂任务</p>
        </div>
    </div>
    <div class="agent-header-actions">
        <button class="btn-agent-action" title="知识库">
            <span class="action-icon">📚</span>
            <span class="action-text">知识库</span>
            <span class="action-count">(0)</span>
        </button>
        <button class="btn-agent-action" title="工具插件">
            <span class="action-icon">🔧</span>
            <span class="action-text">工具插件</span>
            <span class="action-count">(2)</span>
        </button>
        <button class="btn-agent-action" title="设置">
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

#### 简化版

```html
<div class="agent-header agent-header-compact">
    <div class="agent-header-main">
        <div class="agent-icon">🎯</div>
        <div class="agent-info">
            <div class="agent-title-wrapper">
                <h2 class="agent-title">自规划任务执行助手</h2>
                <span class="agent-type">进阶类</span>
                <span class="agent-version">v1.2.0</span>
            </div>
        </div>
    </div>
    <div class="agent-header-actions">
        <button class="btn btn-primary btn-sm">
            <span>🔗</span>
            <span>分享</span>
        </button>
    </div>
</div>
```

### 3. JavaScript 方式使用

```javascript
// 初始化 Agent Header
initAgentHeader({
    container: '#myAgentHeader',  // 容器选择器
    icon: '🤖',                     // 图标
    title: '自规划任务执行助手',          // 标题
    type: '高级类',                 // 类型
    version: 'v1.2.0',             // 版本号
    description: '智能任务规划与执行', // 描述
    compact: false,                 // 是否简化版
    actions: [                      // 操作按钮
        {
            id: 'knowledge',
            icon: '📚',
            text: '知识库',
            count: 0,
            title: '查看知识库',
            onClick: function() {
                console.log('打开知识库');
            }
        },
        {
            id: 'tools',
            icon: '🔧',
            text: '工具插件',
            count: 2,
            title: '管理工具插件',
            onClick: function() {
                console.log('打开工具插件');
            }
        },
        {
            id: 'settings',
            icon: '⚙️',
            text: '设置',
            title: '智能体设置',
            onClick: function() {
                console.log('打开设置');
            }
        },
        {
            id: 'share',
            icon: '🔗',
            text: '分享',
            type: 'primary',
            title: '分享智能体',
            onClick: function() {
                console.log('分享智能体');
            }
        }
    ]
});
```

## 📐 API 说明

### initAgentHeader(options)

初始化智能体头部组件。

**参数**:

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `container` | String/Element | `'.agent-header'` | 容器选择器或元素 |
| `icon` | String | `'🤖'` | 智能体图标（emoji 或 HTML） |
| `title` | String | `'智能体'` | 智能体标题 |
| `type` | String | `'基础类'` | 智能体类型 |
| `version` | String | `'v1.0.0'` | 版本号 |
| `description` | String | `'智能体描述'` | 描述文本 |
| `compact` | Boolean | `false` | 是否使用简化版 |
| `actions` | Array | `[]` | 操作按钮配置数组 |

**返回值**: `HTMLElement` - 创建的 header 元素

### updateAgentHeader(container, updates)

更新智能体头部信息。

**参数**:

| 参数 | 类型 | 说明 |
|------|------|------|
| `container` | String/Element | 容器选择器或元素 |
| `updates` | Object | 需要更新的字段对象 |

**updates 对象支持的字段**:
- `icon` - 更新图标
- `title` - 更新标题
- `type` - 更新类型
- `version` - 更新版本
- `description` - 更新描述

**示例**:

```javascript
updateAgentHeader('#myAgentHeader', {
    title: '新的智能体名称',
    version: 'v2.0.0'
});
```

### extractAgentHeaderConfig(container)

从现有的 HTML 元素中提取配置。

**参数**:

| 参数 | 类型 | 说明 |
|------|------|------|
| `container` | String/Element | 容器选择器或元素 |

**返回值**: `Object` - 配置对象

**示例**:

```javascript
const config = extractAgentHeaderConfig('.agent-header');
console.log(config);
// {
//     icon: '🤖',
//     title: '自规划任务执行助手',
//     type: '高级类',
//     version: 'v1.2.0',
//     description: '...',
//     compact: false
// }
```

## 🎨 样式类说明

### 主要类名

| 类名 | 说明 |
|------|------|
| `.agent-header` | 主容器 |
| `.agent-header-compact` | 简化版修饰类 |
| `.agent-header-main` | 主信息区容器 |
| `.agent-header-actions` | 操作按钮区容器 |
| `.agent-icon` | 智能体图标 |
| `.agent-info` | 智能体信息容器 |
| `.agent-title-wrapper` | 标题包裹器 |
| `.agent-title` | 智能体标题 |
| `.agent-type` | 类型标签 |
| `.agent-version` | 版本号标签 |
| `.agent-description` | 描述文本 |
| `.btn-agent-action` | 管理功能按钮 |

### 按钮结构

```html
<button class="btn-agent-action">
    <span class="action-icon">📚</span>
    <span class="action-text">知识库</span>
    <span class="action-count">(0)</span>
</button>
```

## 📱 响应式设计

### 桌面端 (>992px)
- 横向布局
- 显示完整信息和按钮文字

### 平板端 (768px - 992px)
- 改为纵向布局
- 按钮文字正常显示

### 移动端 (<768px)
- 纵向布局
- 隐藏按钮文字，只显示图标
- 隐藏计数
- 缩小图标和字体

## 🔧 自定义

### 修改图标样式

```css
.agent-icon {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
    border-radius: 12px; /* 修改圆角 */
}
```

### 修改按钮样式

```css
.btn-agent-action {
    border-color: #your-color;
}

.btn-agent-action:hover {
    background: #your-hover-color;
}
```

## 📚 使用示例

### 在智能体页面中使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <link rel="stylesheet" href="../../css/tokens.css">
    <link rel="stylesheet" href="../../css/common.css">
    <link rel="stylesheet" href="../../components/agent-header.css">
</head>
<body>
    <main class="main-content-area">
        <!-- Agent Header -->
        <div class="agent-header">
            <div class="agent-header-main">
                <div class="agent-icon">🤖</div>
                <div class="agent-info">
                    <div class="agent-title-wrapper">
                        <h2 class="agent-title">自规划任务执行助手</h2>
                        <span class="agent-type">高级类</span>
                        <span class="agent-version">v1.2.0</span>
                    </div>
                    <p class="agent-description">智能任务规划与执行</p>
                </div>
            </div>
            <div class="agent-header-actions">
                <!-- 按钮... -->
            </div>
        </div>

        <!-- 其他内容... -->
    </main>
</body>
</html>
```

## ⚠️ 注意事项

1. **依赖文件**: 需要先引入 `tokens.css` 和 `common.css`
2. **标题标签**: 使用 `<h2>` 而非 `<h1>`，保持语义化
3. **图标建议**: 使用 emoji 或 SVG，保持一致的视觉效果
4. **按钮顺序**: 建议按"知识库 → 工具插件 → 设置 → 分享"的顺序排列
5. **响应式**: 移动端会隐藏按钮文字，确保图标有意义

## 🔄 版本历史

### v1.0.0 (2024-12-24)
- ✅ 初始版本
- ✅ 支持完整版和简化版
- ✅ 支持 HTML 和 JavaScript 两种使用方式
- ✅ 响应式设计
- ✅ 符合 Clouditera 设计系统

## 📖 相关文档

- [Clouditera 设计系统](../../css/tokens.css)
- [Agent Sidebar 组件](./agent-sidebar-README.md)
- [Chat Input 组件](./README.md)

---

**创建时间**: 2024-12-24
**维护者**: Clouditera Team
