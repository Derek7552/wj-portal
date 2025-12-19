# UI 页面设计 Command

> **Command 用途**：根据设计师的意图，基于 Clouditera 设计系统生成完整的 UI 页面
> **调用方式**：在 Claude Code 中输入 `/ui-design` 或直接描述设计需求

---

## 🎯 Command 功能

此 command 将帮助你：
1. ✅ 理解和分析设计意图
2. ✅ 选择合适的布局模式
3. ✅ 应用设计系统规范（颜色、间距、排版等）
4. ✅ 生成符合规范的 HTML/CSS 代码
5. ✅ 提供完整的交互状态
6. ✅ 确保响应式设计

---

## 📝 使用方法

### 基本用法
```
/ui-design

描述你的设计需求，例如：
"我需要设计一个任务卡片，展示任务名称、状态、创建时间，并有编辑和删除按钮"
```

### 详细用法（提供更多上下文）
```
/ui-design

需求：创建一个智能体配置页面
包含：
- 基本信息表单（名称、描述）
- 模型选择下拉框
- 提示词文本框
- 保存和取消按钮
布局：垂直排列，居中显示
```

---

## 🔍 设计流程

当你使用此 command 时，我会按以下步骤进行：

### 第 1 步：需求分析
- 理解页面功能和目标用户
- 识别核心元素和信息层级
- 确定页面类型（列表、详情、表单等）

### 第 2 步：布局设计
参考：[`skills/designsystem/layout.md`](./../skills/designsystem/layout.md)
- 选择合适的布局模式（网格、分栏、列表等）
- 确定间距（基于 8px 系统）
- 规划响应式断点

### 第 3 步：组件选择
参考：[`skills/designsystem/components.md`](./../skills/designsystem/components.md)
- 选择合适的组件类型
- 复用已有组件
- 必要时创建新组件

### 第 4 步：样式应用
参考：
- 颜色：[`skills/designsystem/colors.md`](./../skills/designsystem/colors.md)
- 排版：[`skills/designsystem/typography.md`](./../skills/designsystem/typography.md)
- 应用设计 token
- 确保视觉层级清晰
- 包含所有交互状态

### 第 5 步：文案优化
参考：[`skills/designsystem/copywriting.md`](./../skills/designsystem/copywriting.md)
- 使用用户视角
- 保持简洁明了
- 确保术语一致

### 第 6 步：代码生成
- 生成语义化的 HTML 结构
- 编写符合规范的 CSS 样式
- 添加必要的 JavaScript 交互
- 包含注释说明

---

## 💡 设计原则

### 1. 遵循设计系统 ⭐
所有设计必须基于 Clouditera 设计系统：
- 使用设计 token（无硬编码）
- 遵循间距规范（8px 倍数）
- 使用标准字号和字重
- 应用标准颜色

### 2. 信息层级清晰 📐
通过以下方式建立层级：
- **大小**：重要信息使用更大字号
- **颜色**：标题用深色，辅助信息用浅色
- **字重**：标题加粗，正文正常
- **间距**：相关元素靠近，不相关元素分开

### 3. 完整的交互状态 🎨
所有交互元素必须包含：
- `:hover` - 悬停状态
- `:active` - 激活状态
- `:focus` - 聚焦状态（表单元素）
- `:disabled` - 禁用状态

### 4. 响应式优先 📱
确保在不同设备上都能良好展示：
- 桌面端（>= 1200px）
- 平板端（992px）
- 移动端（768px）
- 小屏幕（< 375px）

### 5. 可访问性 ♿
- 颜色对比度足够（4.5:1 以上）
- 交互元素可键盘操作
- 适当的语义化标签

---

## 📋 输出内容

使用此 command 后，我会提供：

### 1. 设计说明
- 布局结构说明
- 组件选择理由
- 颜色和样式决策
- 交互行为描述

### 2. HTML 代码
```html
<!-- 语义化、结构清晰的 HTML -->
<div class="task-card">
    <div class="task-header">
        <h3 class="task-title">任务名称</h3>
        <span class="task-status">运行中</span>
    </div>
    <div class="task-meta">
        <span class="task-time">2024-12-19 10:30</span>
    </div>
    <div class="task-actions">
        <button class="btn-icon" title="编辑">✏️</button>
        <button class="btn-icon" title="删除">🗑️</button>
    </div>
</div>
```

### 3. CSS 样式
```css
/* 完整的样式，包含所有状态 */
.task-card {
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-secondary);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
}

.task-card:hover {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 2px 8px rgba(41, 140, 255, 0.1);
}
```

### 4. JavaScript（如需要）
```javascript
// 必要的交互逻辑
document.querySelector('.btn-delete').addEventListener('click', function() {
    if (confirm('确定删除此任务？')) {
        // 删除逻辑
    }
});
```

### 5. 使用说明
- 文件保存位置建议
- 依赖的资源（tokens.css 等）
- 集成方法
- 注意事项

---

## 🎨 示例场景

### 场景 1：创建任务卡片

**输入：**
```
/ui-design

需求：设计一个任务卡片
内容：
- 任务标题
- 任务状态（运行中/已完成/失败）
- 创建时间
- 编辑和删除按钮
```

**输出：**
我会提供：
1. 卡片布局设计说明
2. 完整的 HTML 结构
3. 符合设计系统的 CSS 样式
4. 状态徽章的不同颜色（成功/警告/错误）
5. 按钮的交互状态
6. 响应式适配

---

### 场景 2：创建表单页面

**输入：**
```
/ui-design

需求：智能体创建表单
包含：
- 智能体名称输入框（必填）
- 描述文本框（可选，最多500字）
- 类型选择（下拉框）
- 提交和取消按钮
布局：居中显示，最大宽度 600px
```

**输出：**
1. 表单布局设计
2. 表单验证提示样式
3. 必填标记样式
4. 字数统计显示
5. 提交按钮的加载状态
6. 错误提示样式

---

### 场景 3：创建列表页面

**输入：**
```
/ui-design

需求：智能体列表页
包含：
- 搜索框
- 筛选器（类型、状态）
- 卡片网格布局
- 每个卡片显示：图标、名称、描述、标签
```

**输出：**
1. 页面整体布局
2. 搜索和筛选栏设计
3. 网格布局代码
4. 卡片组件设计
5. 空状态设计
6. 加载状态设计

---

## ✅ 质量检查清单

生成的代码会确保：

### HTML
- [ ] 语义化标签（header、main、section、article 等）
- [ ] 合理的层级结构
- [ ] 有意义的 class 命名
- [ ] 无冗余标签

### CSS
- [ ] 使用设计 token（无硬编码颜色）
- [ ] 间距使用 8px 倍数
- [ ] 字号使用标准值
- [ ] 包含所有交互状态
- [ ] 响应式断点正确
- [ ] 代码结构清晰有注释

### 可访问性
- [ ] 颜色对比度足够
- [ ] 交互元素可键盘操作
- [ ] 表单有 label 和 placeholder
- [ ] 按钮有 title 属性

### 文案
- [ ] 使用用户视角（"你"）
- [ ] 简洁明了
- [ ] 术语一致
- [ ] 错误提示清晰

---

## 🚀 快速开始

### 1. 简单需求
```
/ui-design

创建一个按钮，主要操作，带图标
```

### 2. 中等复杂度
```
/ui-design

创建一个信息卡片，包含标题、内容、标签和操作按钮
```

### 3. 复杂页面
```
/ui-design

创建一个完整的详情页，包含：
- 头部（返回按钮 + 标题 + 操作按钮）
- 左侧导航（200px 固定宽度）
- 右侧内容区（自适应）
- 响应式：平板以下切换为上下布局
```

---

## 📚 参考资源

### 设计系统文档
- 主页：[`skills/designsystem/README.md`](./../skills/designsystem/README.md)
- 颜色：[`skills/designsystem/colors.md`](./../skills/designsystem/colors.md)
- 组件：[`skills/designsystem/components.md`](./../skills/designsystem/components.md)
- 文案：[`skills/designsystem/copywriting.md`](./../skills/designsystem/copywriting.md)
- 布局：[`skills/designsystem/layout.md`](./../skills/designsystem/layout.md)
- 排版：[`skills/designsystem/typography.md`](./../skills/designsystem/typography.md)

### 实现资源
- Token 定义：`frontend/css/tokens.css`
- 组件库：`frontend/components/`
- 模板示例：`frontend/templates/pages/`

---

## 💬 提示

### 获得最佳结果的技巧

1. **清晰描述需求**：说明页面功能、包含的元素、期望的布局
2. **提供上下文**：说明使用场景、目标用户
3. **指定特殊要求**：如果有特定的颜色偏好、布局要求等
4. **参考现有页面**：可以说明"类似 template-chat.html 的布局"

### 示例提示词

**好的提示词 ✅**
```
创建一个任务列表页面，每个任务卡片显示名称、状态图标、时间，
支持点击进入详情。布局采用网格，每行最多3个卡片。
移动端切换为单列布局。
```

**需要改进的提示词 ❌**
```
做个列表页
```

---

## 🔄 更新记录

### v1.0.0 - 2024-12-19
- ✅ 创建 UI 设计 command
- ✅ 集成设计系统 skill
- ✅ 提供完整的设计流程
- ✅ 包含示例和检查清单

---

**开始使用**：在 Claude Code 中输入 `/ui-design` 并描述你的设计需求 🚀
