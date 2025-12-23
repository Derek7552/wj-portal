# Linear MCP 集成指南

> 通过 MCP (Model Context Protocol) 集成 Linear 项目管理工具

---

## 📋 概述

Linear MCP 服务器允许 Claude 直接与 Linear 进行交互，包括：
- 📝 创建、更新、查询 Issues
- 🏷️ 管理标签和状态
- 👥 分配团队成员
- 📊 查看项目进度
- 🔍 搜索和筛选任务

---

## 🚀 快速开始

### 使用 Claude CLI 配置（推荐）✨

这是最简单的配置方式：

```bash
# 添加 Linear MCP 服务器
claude mcp add --transport sse linear-server https://mcp.linear.app/sse
```

**认证配置**：
- 命令执行后会提示你进行 OAuth 认证
- 或者提示你输入 Linear API Key
- 按照提示完成认证即可

**验证配置**：
```bash
# 在 Claude Code 中查看已配置的 MCP 服务器
/mcp

# 或使用 CLI 命令
claude mcp list
```

**重启 Claude Code**：
配置完成后，重启 Claude Code 以加载 MCP 服务器。

---

## 🎯 可用功能

### 1. 查询 Issues

```
列出所有待办事项
```

```
显示我负责的所有 issues
```

```
查看项目 [项目名] 的所有 issues
```

### 2. 创建 Issue

```
创建一个新任务：
标题：实现用户认证功能
描述：需要实现 JWT 认证和刷新令牌机制
优先级：高
```

### 3. 更新 Issue

```
更新 issue WJ-123：
状态：进行中
分配给：张三
```

### 4. 添加评论

```
在 issue WJ-123 添加评论：
已完成初步设计，等待 review
```

### 5. 搜索 Issues

```
搜索包含 "认证" 关键词的 issues
```

### 6. 查看团队信息

```
显示团队成员列表
```

```
显示所有项目
```

---

## 📚 常用命令示例

### 创建开发任务

```
在 Linear 创建一个开发任务：

标题：优化数据库查询性能
描述：
- 分析慢查询日志
- 添加必要的索引
- 优化 N+1 查询问题
优先级：高
标签：性能优化, 后端
```

### 批量查询

```
显示以下信息：
1. 我今天需要完成的任务
2. 待 review 的任务
3. 阻塞状态的任务
```

### 项目进度

```
显示项目 "云脑 V2.0" 的进度：
- 已完成的任务数
- 进行中的任务
- 待办任务
- 预计完成时间
```

---

## 🎨 与设计系统集成

### 创建 UI 相关任务

```
创建 UI 设计任务：
标题：优化任务卡片样式
描述：
根据设计系统规范调整任务卡片：
1. 颜色改为使用 design token
2. 间距调整为 8px 倍数
3. 添加 hover 状态

参考：.claude/skills/designsystem/
优先级：中
标签：UI, 设计系统
```

### 跟踪设计规范实施

```
创建追踪任务：
标题：设计系统规范化 - 模板页面
描述：
需要规范化的页面：
- [ ] template-search.html
- [ ] template-planning.html
- [ ] template-chat.html
- [ ] template-info-chat.html

检查项：
- 颜色使用 token
- 间距符合 8px 系统
- 包含所有交互状态
- 响应式适配完整

标签：设计系统, 重构
```

---

## 🔍 故障排查

### 问题 1：无法连接到 Linear

**症状**：提示 "Linear MCP server is not available"

**解决方案**：
1. 运行 `/mcp` 检查服务器状态
2. 运行 `claude mcp list` 确认 Linear 已添加
3. 检查网络连接
4. 重启 Claude Code

### 问题 2：认证失败

**症状**：提示 "Authentication failed"

**解决方案**：
1. 重新运行 `claude mcp add` 命令
2. 确认 Linear API key 有效
3. 访问 https://linear.app/settings/api 检查权限

### 问题 3：找不到团队或项目

**症状**：创建 issue 时提示团队或项目不存在

**解决方案**：
```
列出所有可用的团队和项目
```

然后使用正确的团队/项目名称或 ID。

---

## 📝 最佳实践

### 1. Issue 标题规范

```
✅ 好的标题：
- "实现用户认证功能"
- "修复登录页面样式问题"
- "优化数据库查询性能"

❌ 不好的标题：
- "bug"
- "做一下这个"
- "修复"
```

### 2. 使用标签分类

```
创建任务时添加相关标签：

技术类：
- 前端, 后端, 数据库, API
- UI, 设计系统, 组件

类型类：
- bug, feature, 优化, 重构
- 文档, 测试

优先级：
- 紧急, 高, 中, 低
```

### 3. 描述要详细

```
创建任务：
标题：实现搜索功能

描述：
**需求**：
用户可以在首页搜索智能体和任务

**技术方案**：
1. 前端添加搜索框组件
2. 实现防抖搜索
3. 后端实现全文搜索 API
4. 添加搜索结果高亮

**验收标准**：
- [ ] 搜索响应时间 < 200ms
- [ ] 支持模糊搜索
- [ ] 支持按类型筛选
- [ ] 移动端适配
```

---

## 💡 使用技巧

### 技巧 1：快速创建任务

```
快速创建任务：修复按钮样式问题
```

### 技巧 2：批量操作

```
将以下任务的状态改为"已完成"：
WJ-101, WJ-102, WJ-103
```

### 技巧 3：结合代码分析

```
分析当前代码，找出需要优化的地方，
并在 Linear 中创建相应的任务
```

### 技巧 4：自动化工作流

```
1. 分析 template-search.css 的设计规范问题
2. 为每个问题创建一个 Linear issue
3. 按优先级排序
```

---

## 🔗 相关资源

### Linear 官方文档
- Linear API 文档：https://developers.linear.app/docs
- API Reference：https://developers.linear.app/docs/graphql/working-with-the-graphql-api

### MCP 相关
- MCP 协议：https://modelcontextprotocol.io
- Linear MCP Server：https://mcp.linear.app/

### 项目文档
- 设计系统：`.claude/skills/designsystem/`
- UI 设计 Command：`.claude/commands/ui-design.md`
- UI 调整 Command：`.claude/commands/ui-adjust.md`

---

## ✅ 配置检查清单

在开始使用前，确认：

- [ ] 已运行 `claude mcp add` 命令
- [ ] 完成认证配置
- [ ] 运行 `/mcp` 确认服务器状态为 "connected"
- [ ] 可以成功查询 Linear 数据（如 "列出所有团队"）

---

## 🔄 更新记录

### 2024-12-19
- ✅ 创建 Linear MCP 配置指南
- ✅ 使用 CLI 方式配置（推荐）
- ✅ 添加使用示例和最佳实践

---

**开始使用**：配置完成后，直接与我对话即可操作 Linear！🚀

示例：
```
列出我今天的所有待办任务
```
