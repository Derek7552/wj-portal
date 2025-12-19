# 🎨 Clouditera 设计系统 Skill

> **Skill 用途**：提供 Clouditera 设计系统的完整规范、使用指南和开发支持
> **调用方式**：在开发 UI 时需要查询规范、选择设计元素或验证代码时使用

---

## 📚 设计系统模块

本 skill 包含以下模块，每个模块提供详细的规范和使用指南：

### 1. [🎨 颜色系统](./colors.md)
- 品牌色、中性色、语义色
- 扩展色板（数据可视化）
- 颜色使用原则和场景示例
- 快速颜色决策树

### 2. [🧩 组件规范](./components.md)
- 常用组件设计规范
- 组件代码模板
- 交互状态定义
- 组件使用最佳实践

### 3. [✍️ 文案规范](./copywriting.md)
- 文案设计原则
- 语言风格指南
- 常见场景文案示例
- 错误提示规范

### 4. [📐 布局规范](./layout.md)
- 页面布局模式
- 间距系统
- 栅格系统
- 响应式设计

### 5. [🔤 文字排版](./typography.md)
- 字体规范
- 字号体系
- 行高和字重
- 排版最佳实践

---

## 🚀 快速开始

### 场景 1：我要实现一个按钮
```
1. 查看组件规范 → components.md
2. 选择颜色 → colors.md
3. 确定间距 → layout.md
4. 设置文字 → typography.md
```

### 场景 2：我要设计一个卡片
```
1. 查看布局规范 → layout.md
2. 查看组件规范 → components.md
3. 选择配色 → colors.md
4. 确定文字样式 → typography.md
```

### 场景 3：我要写一段提示文案
```
1. 查看文案规范 → copywriting.md
2. 参考常见场景示例
3. 确保符合语言风格指南
```

---

## 🎯 核心原则

### 1. 使用设计 Token ⭐
```css
/* ✅ 正确：使用 CSS 变量 */
.button {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    padding: 12px 24px;
    font-size: 14px;
}

/* ❌ 错误：硬编码值 */
.button {
    background: #298CFF;
    color: #FFFFFF;
    padding: 10px 20px;
    font-size: 13px;
}
```

### 2. 保持一致性 📐
- 相同功能使用相同的设计模式
- 遵循已有的间距、颜色、字号规范
- 复用已有的组件和样式

### 3. 完整的交互状态 🎨
```css
.element {
    /* 正常状态 */
}

.element:hover {
    /* 悬停状态 */
}

.element:active {
    /* 激活状态 */
}

.element:focus {
    /* 聚焦状态 */
}

.element:disabled {
    /* 禁用状态 */
}
```

### 4. 响应式设计 📱
```css
/* 桌面端 */
.container {
    padding: 24px;
}

/* 平板端 */
@media (max-width: 992px) {
    .container {
        padding: 20px;
    }
}

/* 移动端 */
@media (max-width: 768px) {
    .container {
        padding: 16px;
    }
}
```

---

## 📋 开发检查清单

在提交代码前，请确认：

### 样式规范
- [ ] 所有颜色都使用设计 token（无硬编码）
- [ ] 间距值为标准值（8/12/16/20/24/32px）
- [ ] 字号为标准值（12/13/14/16/18/20/22px）
- [ ] 圆角为标准值（4/6/8px）
- [ ] 字重为标准值（400/500/600/700）

### 交互状态
- [ ] 按钮有 hover、active、disabled 状态
- [ ] 表单有 focus 状态
- [ ] 链接有 hover 状态
- [ ] 卡片有 hover 状态（如适用）

### 响应式
- [ ] 移动端适配（max-width: 768px）
- [ ] 平板端适配（max-width: 992px）
- [ ] 大屏幕优化（min-width: 1200px）

### 文案规范
- [ ] 使用用户视角（"你"而非"我们"）
- [ ] 语言简洁明了
- [ ] 术语使用一致
- [ ] 错误提示清晰有用

### 可访问性
- [ ] 颜色对比度足够（至少 4.5:1）
- [ ] 交互元素可键盘操作
- [ ] 适当的 aria 标签（如需要）

---

## 🔍 快速查询

### 我需要...

**选择颜色？**
→ 查看 [colors.md](./colors.md) → 快速决策树

**确定间距？**
→ 查看 [layout.md](./layout.md) → 间距系统

**创建组件？**
→ 查看 [components.md](./components.md) → 组件模板

**写提示文案？**
→ 查看 [copywriting.md](./copywriting.md) → 场景示例

**设置文字样式？**
→ 查看 [typography.md](./typography.md) → 字号体系

---

## 📦 Token 引入

所有页面都需要引入设计 token：

```html
<!-- HTML 中引入 -->
<link rel="stylesheet" href="../../css/tokens.css">
```

```css
/* CSS 中引入 */
@import url('../../css/tokens.css');
```

---

## 🛠️ 工具和资源

### 设计文件
- Token 定义：`frontend/css/tokens.css`
- 详细规范：`.designsystem/`
- 快速参考：`.designsystem/QUICK_REFERENCE.md`
- 代码检查清单：`.designsystem/CODE_CHECKLIST.md`

### 组件库
- 侧导航组件：`frontend/components/agent-sidebar.*`
- 聊天输入组件：`frontend/components/chat-input.*`
- 组件文档：`frontend/components/README.md`

### 模板示例
- 对话模式：`frontend/templates/pages/template-chat.html`
- 信息检索：`frontend/templates/pages/template-search.html`
- 自规划模式：`frontend/templates/pages/template-planning.html`
- 信息预览：`frontend/templates/pages/template-info-chat.html`

---

## 🔄 更新记录

### v1.0.0 - 2024-12-19
- ✅ 创建设计系统 skill 结构
- ✅ 整合颜色、组件、文案、布局、排版规范
- ✅ 提供快速查询和检查清单

---

## 💬 反馈和支持

如有问题或建议，请：
1. 查看相关模块的详细文档
2. 参考 `.designsystem/` 中的完整规范
3. 查看 `frontend/components/` 中的组件示例

---

**开始使用**：选择上方模块开始查看详细规范 🚀
