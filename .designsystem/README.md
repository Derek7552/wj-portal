# Clouditera Design System - Design Tokens

## 概述

这是 Clouditera 设计系统的 Design Token 实现，提供了标准化的颜色、间距、字体等设计变量的统一管理。

## 文件结构

```
.designsystem/
├── tokens.json              # Design Token 定义（JSON 格式）
├── README.md               # 本文件 - 设计系统完整文档
├── QUICK_REFERENCE.md      # 快速参考指南 - 常用模式和示例
├── CODE_CHECKLIST.md       # 代码规范检查清单
├── SPACING.md              # 间距设计规范
└── .cursorrules            # AI 助手规范 - 指导 AI 编写代码

frontend/css/
└── tokens.css              # 自动生成的 CSS 变量文件
```

## 文档说明

- **README.md**：设计系统完整文档，包含所有 token 的详细说明
- **QUICK_REFERENCE.md**：快速参考指南，提供常用模式和代码示例
- **CODE_CHECKLIST.md**：代码规范检查清单，用于代码审查
- **SPACING.md**：间距设计规范，包含间距体系和使用规范
- **.cursorrules**：AI 助手规范，确保 AI 编写代码时遵循设计系统

## 使用方法

### 1. 在 CSS 中使用

首先在 CSS 文件顶部引入 tokens.css：

```css
@import url('./tokens.css');
/* 或者 */
@import url('../css/tokens.css');
```

然后使用 CSS 变量：

```css
.button {
  background-color: var(--clouditera-brand-primary);
  color: white;
}

.button:hover {
  background-color: var(--clouditera-brand-primary-hover);
}

.text-primary {
  color: var(--clouditera-neutral-text-primary);
}
```

### 2. 在 HTML 中使用

在 HTML 中引入 tokens.css：

```html
<link rel="stylesheet" href="css/tokens.css">
```

然后可以在内联样式中使用：

```html
<div style="color: var(--clouditera-brand-primary);">
  品牌色文本
</div>
```

### 3. 在 JavaScript 中使用

```javascript
// 获取 CSS 变量值
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--clouditera-brand-primary');

// 设置 CSS 变量值
document.documentElement.style.setProperty(
  '--clouditera-brand-primary',
  '#298CFF'
);
```

## Token 命名规范

Token 采用层级命名结构：

```
--clouditera-{category}-{subcategory}-{name}
```

### 类别说明

- **brand**: 品牌色
  - `--clouditera-brand-primary`: 品牌主色 `#298CFF`
  - `--clouditera-brand-primary-hover`: 悬停状态
  - `--clouditera-brand-primary-active`: 激活状态

- **semantic**: 功能色（语义色）
  - `--clouditera-semantic-success`: 成功色 `#52c41a`
  - `--clouditera-semantic-warning`: 警告色 `#faad14`
  - `--clouditera-semantic-error`: 错误色 `#ff4d4f`
  - `--clouditera-semantic-info`: 信息色 `#298CFF`
  - `--clouditera-semantic-link`: 链接色 `#298CFF`

- **neutral**: 中性色
  - **text**: 文本色
    - `--clouditera-neutral-text-primary`: 主要文本 (rgba(0, 0, 0, 0.87)) - 用于标题、主要内容、重要信息
    - `--clouditera-neutral-text-secondary`: 次要文本 (rgba(0, 0, 0, 0.65)) - 用于描述、辅助信息、次要内容
    - `--clouditera-neutral-text-disabled`: 禁用文本 - 用于禁用状态
    - **使用原则**：页面文字仅使用 `text-primary` 和 `text-secondary` 两种颜色，禁止使用灰度色板（gray-6、gray-7、gray-9 等）作为文本颜色
  - **border**: 边框色
    - `--clouditera-neutral-border-primary`: 一级边框
    - `--clouditera-neutral-border-secondary`: 二级边框
  - **background**: 背景色
    - `--clouditera-neutral-background-primary`: 主要背景
    - `--clouditera-neutral-background-secondary`: 次要背景
    - `--clouditera-neutral-background-tertiary`: 三级背景
  - **gray**: 灰度色板（0-12）
    - `--clouditera-neutral-gray-0` 到 `--clouditera-neutral-gray-12`

- **palette**: 基础色板
  - `--clouditera-palette-{color}-{level}`: 如 `--clouditera-palette-blue-5`
  - 支持的颜色：red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta
  - 级别：0-9

- **size**: 尺寸
  - **layout**: 布局尺寸
    - `--clouditera-size-layout-sidebar-width`: 侧导航宽度 `240px` - 统一标准宽度，适用于所有侧导航组件（智能体侧导航、分类导航等）
    - `--clouditera-size-layout-sidebar-collapsed-width`: 侧导航收起宽度 `64px` - 主导航栏收起时的宽度
    - **使用原则**：所有侧导航组件必须使用统一的 `sidebar-width`，确保视觉一致性

## 兼容性别名

为了向后兼容，提供了简化的别名：

```css
--clouditera-primary          → --clouditera-brand-primary
--clouditera-success          → --clouditera-semantic-success
--clouditera-text-primary     → --clouditera-neutral-text-primary
--clouditera-border           → --clouditera-neutral-border-primary
```

## 更新流程

1. **修改设计规范**：更新 `.designsystem/.color` 文档
2. **更新 Token 定义**：修改 `tokens.json`
3. **重新生成 CSS**：更新 `frontend/css/tokens.css`（目前手动维护，未来可自动化）
4. **更新代码**：在代码中使用新的 token

## 最佳实践

1. ✅ **优先使用语义化 token**：使用 `--clouditera-semantic-success` 而不是 `--clouditera-palette-green-5`
2. ✅ **避免硬编码颜色**：所有颜色值都应使用 token
3. ✅ **保持一致性**：相同语义的场景使用相同的 token
4. ✅ **主题切换准备**：使用 CSS 变量便于未来实现主题切换

## 示例

### 按钮样式

```css
.btn-primary {
  background-color: var(--clouditera-brand-primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--clouditera-brand-primary-hover);
}

.btn-success {
  background-color: var(--clouditera-semantic-success);
  color: white;
}
```

### 文本样式

```css
.heading {
  color: var(--clouditera-neutral-text-primary);
  font-weight: 600;
}

.body-text {
  color: var(--clouditera-neutral-text-primary);
}

.caption {
  color: var(--clouditera-neutral-text-secondary);
}
```

### 卡片样式

```css
.card {
  background: var(--clouditera-neutral-background-white);
  border: 1px solid var(--clouditera-neutral-border-primary);
  border-radius: 8px;
  padding: 16px;
}
```

### 侧导航样式

```css
/* ✅ 正确 - 使用统一的侧导航宽度 */
.agent-sidebar {
  width: var(--clouditera-size-layout-sidebar-width); /* 240px */
}

.search-categories-sidebar {
  width: var(--clouditera-size-layout-sidebar-width); /* 240px */
}

/* ❌ 错误 - 硬编码宽度 */
.agent-sidebar {
  width: 220px; /* 应使用 token */
}

.agent-sidebar {
  width: 200px; /* 应使用 token */
}
```

## 版本信息

- **当前版本**: 1.0.0
- **最后更新**: 2024-12-10

## 相关文档

- [快速参考指南](./QUICK_REFERENCE.md) - 常用模式和代码示例
- [代码规范检查清单](./CODE_CHECKLIST.md) - 代码审查检查项
- [间距设计规范](./SPACING.md) - 间距体系和使用规范
- [AI 助手规范](./.cursorrules) - AI 编写代码时的规范

## 维护说明

如有问题或建议，请联系 Clouditera 设计团队。

## 更新日志

### v1.2.0 (2024-12-11)
- **新增**：侧导航宽度统一规范
  - 添加 `--clouditera-size-layout-sidebar-width` (240px) 作为统一的侧导航宽度标准
  - 添加 `--clouditera-size-layout-sidebar-collapsed-width` (64px) 作为主导航栏收起宽度
  - 要求所有侧导航组件使用统一的宽度 token，确保视觉一致性

### v1.1.0 (2024-12-18)
- **新增**：文本颜色优先级体系规范
  - 明确主要文本和次要文本的使用场景
  - 禁止使用灰度色板作为文本颜色
  - 通过颜色和字重建立清晰的视觉层次
- **优化**：完善代码审查检查点，增加文本颜色使用检查项

### v1.0.0 (2024-12-18)
- 初始版本
- 建立完整的设计系统文档结构
- 创建快速参考指南和代码检查清单
- 建立 AI 助手规范机制

