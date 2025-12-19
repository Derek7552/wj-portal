# Clouditera 设计系统使用指南

## 📖 目录

1. [设计系统概述](#设计系统概述)
2. [三层架构说明](#三层架构说明)
3. [Command 层使用](#command-层使用)
4. [快速开始](#快速开始)
5. [常见场景](#常见场景)
6. [开发规范](#开发规范)

---

## 设计系统概述

Clouditera 设计系统采用三层架构，从简单到复杂提供完整的 UI 设计支持：

```
┌─────────────────────────────────────┐
│   Agent 层 - 复杂任务、自主决策        │
│   (未来扩展)                         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Skill 层 - 可复用能力、专业处理      │
│   (未来扩展)                         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Command 层 - 快速查询、即时生成      │
│   ✅ 已实现                          │
└─────────────────────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Design System - 设计规范基础        │
│   tokens.css + 规范文档              │
└─────────────────────────────────────┘
```

---

## 三层架构说明

### 第一层：Command 层（已实现）✅

**特点**：
- ⚡ **即时响应** - 快速查询和简单生成
- 🎯 **单一功能** - 每个命令专注一件事
- 📖 **易于使用** - 简单的命令调用
- 💡 **无需等待** - 立即返回结果

**已实现的命令**：

| 命令 | 功能 | 使用场景 |
|------|------|---------|
| `/ui-design` | 完整 UI 设计指南 | 全面了解设计系统 |
| `/ui-check` | 规范检查 | 验证代码是否符合规范 |
| `/color-palette` | 查看调色板 | 选择合适的颜色 |
| `/spacing` | 间距规范 | 确定元素间距 |
| `/component-template` | 生成组件模板 | 快速创建标准组件 |

### 第二层：Skill 层（规划中）🔜

**特点**：
- 🔧 **专业能力** - 封装领域专业知识
- 🔄 **可复用** - 被多个场景调用
- 📦 **模块化** - 独立的功能模块

**规划的技能**：
- `design-system-validator` - 设计规范验证器
- `component-generator` - 组件代码生成器
- `style-optimizer` - 样式优化器
- `color-system` - 颜色系统管理器

### 第三层：Agent 层（规划中）🔜

**特点**：
- 🤖 **自主决策** - 根据需求自主规划
- 🎯 **端到端** - 完成完整流程
- 🔄 **多步骤** - 调用多个工具和技能

**规划的智能体**：
- `ui-designer-agent` - UI 设计实现智能体
- `design-reviewer-agent` - 设计审查智能体
- `design-system-maintainer-agent` - 设计系统维护智能体

---

## Command 层使用

### 1. `/ui-design` - 完整设计指南

**功能**：激活 UI 设计助手，提供完整的设计系统规范和实现指导

**适用场景**：
- 新人学习设计系统
- 实现新的 UI 功能
- 需要完整的设计规范参考

**使用示例**：
```
/ui-design

我需要创建一个用户信息卡片，包含头像、姓名、角色和操作按钮
```

**返回内容**：
- 设计系统完整规范
- 针对需求的实现方案
- 符合规范的完整代码
- 所有交互状态的样式

---

### 2. `/ui-check` - UI 规范检查

**功能**：检查 CSS 代码是否符合设计系统规范

**适用场景**：
- 代码审查
- 自检代码质量
- 重构前的问题识别

**使用示例**：
```
/ui-check

检查这个文件：frontend/components/user-card.css
```

**检查项目**：
- ✓ 硬编码颜色
- ✓ 不规范的间距
- ✓ 不规范的字号
- ✓ 不规范的圆角
- ✓ 不规范的字重

**返回内容**：
- 详细的检查报告
- 问题列表（按严重程度）
- 修复建议和代码示例

---

### 3. `/color-palette` - 调色板查询

**功能**：展示完整的设计系统调色板

**适用场景**：
- 选择合适的颜色
- 查找颜色 token
- 了解颜色使用规范

**使用示例**：
```
/color-palette                # 查看所有颜色
/color-palette blue           # 查看蓝色系
/color-palette semantic       # 查看语义色
```

**返回内容**：
- 完整的颜色定义
- 使用场景说明
- 快速选择指南

---

### 4. `/spacing` - 间距规范

**功能**：查询标准间距规范和使用场景

**适用场景**：
- 确定元素间距
- 学习间距规范
- 快速查找标准值

**使用示例**：
```
/spacing
```

**返回内容**：
- 标准间距值（4/6/8/12/16/20/24/32px）
- 每个间距的使用场景
- 组合使用示例
- 快速决策树

---

### 5. `/component-template` - 组件模板

**功能**：生成常用组件的标准模板

**适用场景**：
- 快速创建新组件
- 参考标准实现
- 学习组件规范

**使用示例**：
```
/component-template button        # 生成按钮模板
/component-template card          # 生成卡片模板
/component-template input         # 生成输入框模板
```

**可用模板**：
- `button` - 按钮（主要/次要/图标）
- `card` - 卡片
- `input` - 输入框
- `tag` - 标签
- `badge` - 徽章
- `avatar` - 头像
- `alert` - 警告提示

**返回内容**：
- 完整的 HTML 结构
- 符合规范的 CSS 样式
- 所有交互状态
- 使用说明

---

## 快速开始

### 场景 1：我是新人，想学习设计系统

```
步骤 1：了解整体规范
/ui-design

步骤 2：查看调色板
/color-palette

步骤 3：了解间距规范
/spacing

步骤 4：生成第一个组件
/component-template button
```

### 场景 2：我要实现一个新功能

```
步骤 1：明确设计需求
/ui-design
描述：我需要创建一个任务状态卡片...

步骤 2：选择合适的颜色
/color-palette
查找：任务状态用什么颜色？

步骤 3：参考类似组件
/component-template card

步骤 4：实现代码

步骤 5：检查规范
/ui-check
检查刚写的代码
```

### 场景 3：我要审查现有代码

```
步骤 1：运行规范检查
/ui-check
指定文件路径

步骤 2：查看问题
阅读检查报告

步骤 3：查询正确用法
/color-palette  # 查颜色 token
/spacing        # 查间距规范

步骤 4：修复问题
根据建议修复代码

步骤 5：再次检查
/ui-check
确认所有问题已解决
```

---

## 常见场景

### 1. 如何选择颜色？

```
问题：我需要给"成功"状态选择颜色

解决方案：
1. 使用 /color-palette
2. 查看"语义色"部分
3. 使用 var(--clouditera-semantic-success)

或者需要更浅的背景：
var(--clouditera-palette-green-0)
```

### 2. 如何确定间距？

```
问题：按钮之间应该用多大间距？

解决方案：
1. 使用 /spacing
2. 查看"使用场景"
3. 按钮之间（同组元素）→ 8px

代码：
.button-group {
    display: flex;
    gap: 8px;
}
```

### 3. 如何创建新组件？

```
问题：需要创建一个用户信息卡片

解决方案：
1. 使用 /component-template card
2. 获取基础模板
3. 根据需求调整
4. 使用 /ui-check 验证
```

### 4. 如何修复硬编码颜色？

```
问题：代码中有 color: #298CFF;

解决方案：
1. 使用 /color-palette 查找对应 token
2. #298CFF 是品牌主色
3. 替换为：var(--clouditera-brand-primary)
```

### 5. 如何实现 hover 状态？

```
问题：按钮 hover 时应该用什么颜色？

解决方案：
1. 主要按钮 hover：var(--clouditera-brand-primary-hover)
2. 次要按钮 hover：background: var(--clouditera-palette-blue-0)
3. 参考 /component-template button 查看完整示例
```

---

## 开发规范

### 核心原则

#### 1. 禁止硬编码颜色 ⛔

```css
/* ❌ 错误 */
color: #298CFF;
background: white;
border: 1px solid #d9d9d9;

/* ✅ 正确 */
color: var(--clouditera-brand-primary);
background: var(--clouditera-neutral-background-white);
border: 1px solid var(--clouditera-neutral-border-primary);
```

#### 2. 使用标准间距 ✅

```css
/* ❌ 错误 */
padding: 15px 18px;
margin: 10px;

/* ✅ 正确 */
padding: 16px;           /* 标准间距 */
margin: 12px;            /* 中间距 */
```

#### 3. 语义化优先 🎯

```css
/* 👎 不推荐 - 使用具体颜色名 */
color: var(--clouditera-palette-green-5);

/* 👍 推荐 - 使用语义化名称 */
color: var(--clouditera-semantic-success);
```

#### 4. 包含所有状态 📱

```css
/* 必须包含 */
.button {
    /* 正常状态 */
}

.button:hover {
    /* 悬停状态 */
}

.button:active {
    /* 激活状态 */
}

.button:disabled {
    /* 禁用状态 */
}
```

#### 5. 响应式设计 📐

```css
/* 桌面端 */
.container {
    padding: 24px;
}

/* 移动端 */
@media (max-width: 768px) {
    .container {
        padding: 16px;
    }
}
```

---

## 文件结构

```
.claude/
├── commands/                           # Command 层 ✅
│   ├── ui-design.md                   # 完整设计指南
│   ├── ui-check.md                    # 规范检查
│   ├── color-palette.md               # 调色板查询
│   ├── spacing.md                     # 间距规范
│   └── component-template.md          # 组件模板
│
├── skills/                             # Skill 层 🔜
│   └── (未来扩展)
│
├── agents/                             # Agent 层 🔜
│   └── (未来扩展)
│
└── DESIGN_SYSTEM_GUIDE.md             # 本文档

frontend/
├── css/
│   └── tokens.css                     # 设计 token 定义 ✅
├── components/                         # 可复用组件
│   ├── agent-sidebar.css
│   └── chat-input.css
└── templates/
    └── css/                            # 页面样式
        ├── template-detail.css
        └── template-planning.css
```

---

## 检查清单

在提交代码前，请确认：

### 样式规范
- [ ] 所有颜色都使用设计 token（无硬编码）
- [ ] 间距值为标准值（4/6/8/12/16/20/24/32px）
- [ ] 字号为标准值（11/12/13/14/16/18/20px）
- [ ] 圆角为标准值（4/6/8px 或 50%）
- [ ] 字重为标准值（400/500/600/700）

### 交互状态
- [ ] 按钮有 hover 状态
- [ ] 按钮有 active 状态
- [ ] 表单有 focus 状态
- [ ] 组件有 disabled 状态

### 响应式
- [ ] 移动端适配（max-width: 768px）
- [ ] 平板端适配（max-width: 992px）

### 代码质量
- [ ] CSS 类名语义化
- [ ] 无冗余样式
- [ ] 无重复定义

---

## 工具使用流程图

```
需求 → 确定使用哪个工具？
  │
  ├─ 快速查询？ → Command 层
  │   ├─ 查颜色 → /color-palette
  │   ├─ 查间距 → /spacing
  │   └─ 查模板 → /component-template
  │
  ├─ 实现功能？ → /ui-design
  │   → 获取完整指南和实现方案
  │
  └─ 检查代码？ → /ui-check
      → 获取问题报告和修复建议
```

---

## 获取帮助

### 快速参考
- 完整设计规范：`/ui-design`
- 颜色系统：`/color-palette`
- 间距系统：`/spacing`
- 组件模板：`/component-template`

### 详细文档
- 设计 Token 定义：`frontend/css/tokens.css`
- 组件示例：`frontend/components/`
- 页面样式：`frontend/templates/css/`

### 架构文档
- 三层架构设计：`/tmp/design-system-architecture.md`

---

## 版本历史

### v1.0.0 - 2024-12-18
- ✅ 创建 Command 层（5 个命令）
- ✅ 设计三层架构
- ✅ 编写完整文档
- 🔜 规划 Skill 层
- 🔜 规划 Agent 层

---

## 反馈和建议

如有问题或建议，请联系设计系统维护团队。

---

**开始使用**：在 Claude Code 中输入 `/ui-design` 开始你的设计之旅！ 🚀
