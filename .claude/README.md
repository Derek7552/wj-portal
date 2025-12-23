# .claude 目录说明

> Claude Code 配置和 Skills 目录

---

## 📁 目录结构

```
.claude/
├── README.md                           # 本文件
├── settings.local.json                 # Claude Code 权限配置
├── mcp-servers.json                    # MCP 服务器配置
├── LINEAR_MCP_GUIDE.md                 # Linear MCP 使用指南
├── commands/                           # Commands 目录
│   ├── ui-design.md                    # UI 页面设计 Command
│   └── ui-adjust.md                    # UI 局部调整 Command
└── skills/                             # Skills 目录
    └── designsystem/                   # 设计系统 Skill
        ├── README.md                   # 设计系统主页
        ├── colors.md                   # 颜色规范
        ├── components.md               # 组件规范
        ├── copywriting.md              # 文案规范
        ├── layout.md                   # 布局规范
        └── typography.md               # 文字排版规范
```

---

## 🎨 UI 页面设计 Command

### 用途
基于 Clouditera 设计系统，根据设计师的意图快速生成完整的 UI 页面代码。

### 调用方式
在 Claude Code 中输入 `/ui-design` 或直接描述设计需求。

### 功能
- ✅ 理解和分析设计意图
- ✅ 选择合适的布局模式
- ✅ 应用设计系统规范
- ✅ 生成符合规范的 HTML/CSS 代码
- ✅ 提供完整的交互状态
- ✅ 确保响应式设计

### 使用示例
```
/ui-design

需求：创建一个任务卡片
包含：任务名称、状态、创建时间、操作按钮
```

详细文档：[`commands/ui-design.md`](./commands/ui-design.md)

---

## 🔧 UI 局部调整 Command

### 用途
对现有界面进行局部调整和优化，包括颜色、布局、间距、排版等。

### 调用方式
在 Claude Code 中输入 `/ui-adjust` 或直接描述调整需求。

### 功能
- ✅ 替换硬编码颜色为设计 token
- ✅ 规范化间距值（符合 8px 系统）
- ✅ 优化字体和排版
- ✅ 添加或完善交互状态
- ✅ 改进响应式设计
- ✅ 修复设计规范不一致问题

### 使用示例
```
/ui-adjust

文件：frontend/templates/css/template-search.css
调整：将所有硬编码颜色替换为设计 token
```

### 支持的调整类型
1. **颜色调整** - 替换硬编码、优化层级、添加语义色
2. **间距调整** - 规范化间距、使用 gap、响应式间距
3. **排版调整** - 规范字号、优化行高、标准字重
4. **布局调整** - 优化 Flexbox/Grid、改善响应式
5. **交互状态** - 添加 hover/active/focus/disabled
6. **响应式优化** - 添加媒体查询、调整布局方向

详细文档：[`commands/ui-adjust.md`](./commands/ui-adjust.md)

---

## 🎨 设计系统 Skill

### 用途
提供完整的 Clouditera 设计系统规范，包括颜色、组件、文案、布局和排版。

### 模块
1. **颜色规范** (`colors.md`) - 品牌色、中性色、语义色、扩展色板
2. **组件规范** (`components.md`) - 常用组件设计和代码模板
3. **文案规范** (`copywriting.md`) - 文案设计原则和场景示例
4. **布局规范** (`layout.md`) - 间距系统、页面布局、响应式设计
5. **文字排版** (`typography.md`) - 字体、字号、行高、字重

### 使用方式
在开发过程中需要查询设计规范时，参考 `skills/designsystem/` 中的相关文档。

---

## 🔗 Linear MCP 集成

### 用途
通过 MCP (Model Context Protocol) 集成 Linear 项目管理工具，实现任务创建、查询、更新等功能。

### 快速配置
```bash
# 使用 Claude CLI 添加 Linear MCP 服务器（推荐）
claude mcp add --transport sse linear-server https://mcp.linear.app/sse
```

### 功能
- ✅ 创建、更新、查询 Issues
- ✅ 管理标签和状态
- ✅ 分配团队成员
- ✅ 查看项目进度
- ✅ 与设计系统集成（创建 UI 相关任务）

### 使用示例
```
列出我今天的所有待办任务
```

```
创建 UI 设计任务：
标题：优化任务卡片样式
描述：根据设计系统规范调整任务卡片
参考：.claude/skills/designsystem/
```

详细文档：[`LINEAR_MCP_GUIDE.md`](./LINEAR_MCP_GUIDE.md)

---

## ⚙️ 配置文件

### settings.local.json
定义 Claude Code 的权限配置，当前允许：
- `Bash(bash:*)` - 执行 bash 命令
- `Bash(grep:*)` - 执行 grep 命令
- `Bash(cat:*)` - 执行 cat 命令

---

## 📚 相关文档

### 设计系统源文件
- Token 定义：`../frontend/css/tokens.css`
- 详细规范：`../.designsystem/`
- 快速参考：`../.designsystem/QUICK_REFERENCE.md`

### 组件库
- 组件实现：`../frontend/components/`
- 组件文档：`../frontend/components/README.md`

### 模板示例
- 模板文件：`../frontend/templates/pages/`
- 模板样式：`../frontend/templates/css/`

---

## 🔄 更新记录

### 2024-12-19
- ✅ 创建设计系统 Skill（5个模块：颜色、组件、文案、布局、排版）
- ✅ 创建 UI 页面设计 Command（从零开始设计完整页面）
- ✅ 创建 UI 局部调整 Command（优化现有界面元素）
- ✅ 集成 Linear MCP 项目管理工具（CLI 配置方式）
- ✅ 清理空目录和废弃文档
