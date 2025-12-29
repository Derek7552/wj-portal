# PDT-391 UI设计流程指南

> **从需求到UI原型的完整流程**  
> **创建日期**：2025-12-28

---

## 📋 流程概览

```
需求文档 (PRD)
    ↓
UI设计规划
    ↓
使用 Commands 生成UI代码
    ↓
调整和优化
    ↓
完成UI原型
```

---

## 🎯 第一步：需求分析

### 1.1 理解需求文档

你已经有了完整的PRD文档：`PDT-391-PRD.md`

**核心需求**：
- 两个提示框的设计
  - 第一个提示框：阶段执行区域异常提示（红色横幅）
  - 第二个提示框：异常终止总结卡片（独立对话卡片）
- 9种异常场景的展示
- 响应式设计

### 1.2 提取设计要素

从PRD中提取关键设计信息：

**第一个提示框**：
- 位置：阶段执行区域内部
- 样式：红色横幅（#fee2e2背景，#dc2626边框）
- 内容：警告图标、异常标题、错误类型、错误信息

**第二个提示框**：
- 位置：独立对话卡片
- 内容：固定开头、中断提示、已完成工作、异常原因
- 样式：左侧红色边框、列表项（✓和•标记）

---

## 🎨 第二步：使用 Commands 进行UI设计

### 2.1 可用的 Commands

仓库中有两个主要的UI设计命令：

#### **1. `/ui-design` - UI页面设计Command**

**用途**：从零开始创建完整的UI页面代码

**调用方式**：
- 在Cursor中输入 `/ui-design`
- 或直接描述设计需求

**功能**：
- ✅ 理解和分析设计意图
- ✅ 选择合适的布局模式
- ✅ 应用设计系统规范
- ✅ 生成符合规范的HTML/CSS代码
- ✅ 提供完整的交互状态
- ✅ 确保响应式设计

#### **2. `/ui-adjust` - UI局部调整Command**

**用途**：对现有界面进行局部调整和优化

**调用方式**：
- 在Cursor中输入 `/ui-adjust`
- 或直接描述调整需求

**功能**：
- ✅ 替换硬编码颜色为设计token
- ✅ 规范化间距值（符合8px系统）
- ✅ 优化字体和排版
- ✅ 添加或完善交互状态
- ✅ 改进响应式设计

### 2.2 设计系统资源

设计系统文档位置：
- **设计系统Skill**：`.claude/skills/designsystem/`
  - `colors.md` - 颜色规范
  - `components.md` - 组件规范
  - `layout.md` - 布局规范
  - `typography.md` - 文字排版规范
  - `copywriting.md` - 文案规范
- **Token定义**：`frontend/css/tokens.css`
- **组件库**：`frontend/components/`

---

## 🚀 第三步：执行UI设计

### 3.1 方案A：使用 `/ui-design` 创建新页面

**步骤**：

1. **在Cursor中调用命令**：
   ```
   /ui-design
   ```

2. **提供设计需求**（参考PRD文档）：
   ```
   需求：设计AI漏洞猎人任务异常终止场景的UI界面
   
   包含内容：
   1. 第一个提示框（阶段执行区域异常提示）：
      - 红色横幅样式
      - 警告图标、异常标题、错误类型、错误信息
      - 位置：在阶段执行过程中显示
   
   2. 第二个提示框（异常终止总结卡片）：
      - 独立对话卡片
      - 固定开头、中断提示、已完成工作列表、异常原因列表
      - 左侧红色边框
   
   3. 支持9种异常场景的展示
   
   布局要求：
   - 左侧：对话日志区域（包含两个提示框）
   - 右侧：智能体工作区域（显示产物和任务进度）
   - 响应式设计（桌面、平板、移动端）
   ```

3. **AI会生成**：
   - 设计说明
   - HTML结构代码
   - CSS样式代码（使用设计token）
   - JavaScript交互代码（如需要）
   - 使用说明和文件保存位置建议

### 3.2 方案B：基于现有模板调整

如果已有类似的模板文件，可以使用 `/ui-adjust`：

1. **在Cursor中调用命令**：
   ```
   /ui-adjust
   ```

2. **提供调整需求**：
   ```
   文件：frontend/templates/pages/template-planning-error.html
   调整：根据PDT-391需求优化异常终止提示框
   具体内容：
   - 第一个提示框：更新为红色横幅样式，包含错误类型和错误信息
   - 第二个提示框：添加固定开头，优化已完成工作和异常原因的展示格式
   ```

---

## 📝 第四步：设计实现细节

### 4.1 第一个提示框设计要点

**HTML结构**：
```html
<div class="phase-execution-error">
  <div class="error-alert">
    <span class="error-icon">⚠️</span>
    <div class="error-content">
      <div class="error-title">系统异常</div>
      <div class="error-type">错误类型：内存溢出异常 (OutOfMemoryError)</div>
      <div class="error-message">错误信息：分析大型代码文件时内存资源不足，任务被迫终止</div>
    </div>
  </div>
</div>
```

**CSS样式**（使用设计token）：
```css
.error-alert {
  background: var(--clouditera-palette-red-0); /* #fee2e2 */
  border: 1px solid var(--clouditera-palette-red-4); /* #dc2626 */
  border-radius: 8px;
  padding: 16px;
}
```

### 4.2 第二个提示框设计要点

**HTML结构**：
```html
<div class="error-summary-card">
  <div class="card-header">
    <span class="card-icon">❌</span>
    <h3>任务异常终止</h3>
  </div>
  <div class="card-content">
    <p class="fixed-intro">非常抱歉，任务在执行阶段2：威胁建模与漏洞分析时遇到异常，已被终止，无法继续完成。</p>
    <p class="interrupt-message">任务异常终止。原因：内存溢出异常，分析大型代码文件时内存资源不足。请稍后重试。您可以在智能体空间中查看漏洞报告。</p>
    <div class="completed-work">
      <div class="section-title">已完成的工作：</div>
      <ul>
        <li>✓ 完成工程功能模块分析，生成分析总结文档</li>
        <li>✓ 开始威胁建模，发现1个高危漏洞（SQL注入）</li>
      </ul>
    </div>
    <div class="error-reason">
      <div class="section-title">异常原因：</div>
      <ul>
        <li>• 在分析大型代码文件时发生内存溢出，系统资源不足</li>
        <li>• 建议优化代码分析策略或增加系统资源配置</li>
      </ul>
    </div>
  </div>
</div>
```

**CSS样式**：
```css
.error-summary-card {
  border-left: 3px solid var(--clouditera-palette-red-4);
  padding: 16px;
}

.completed-work ul li::marker {
  content: "✓ ";
  color: var(--clouditera-palette-green-4);
}

.error-reason ul li::marker {
  content: "• ";
  color: var(--clouditera-neutral-text-primary);
}
```

---

## ✅ 第五步：质量检查

### 5.1 设计系统规范检查

使用设计系统检查清单：

- [ ] **颜色**：所有颜色都使用设计token（无硬编码）
- [ ] **间距**：间距值为标准值（8/12/16/20/24/32px）
- [ ] **字号**：字号为标准值（12/13/14/16/18/20/22px）
- [ ] **圆角**：圆角为标准值（4/6/8px）
- [ ] **字重**：字重为标准值（400/500/600/700）

### 5.2 交互状态检查

- [ ] 所有交互元素有hover状态
- [ ] 所有交互元素有active状态
- [ ] 所有交互元素有focus状态
- [ ] 所有交互元素有disabled状态（如适用）

### 5.3 响应式检查

- [ ] 移动端适配（max-width: 768px）
- [ ] 平板端适配（max-width: 992px）
- [ ] 桌面端优化（min-width: 1200px）

### 5.4 功能验收检查

参考PRD文档的验收标准：
- [ ] 9个中断场景的提示文案正确显示
- [ ] 第一个提示框正确显示在阶段执行区域内部
- [ ] 第二个提示框正确显示为独立对话卡片
- [ ] 无论是否有漏洞，都显示"已完成的工作"
- [ ] 异常原因正确显示，并包含建议措施

---

## 📁 第六步：文件组织

### 6.1 建议的文件结构

```
frontend/
├── agents/
│   ├── pages/
│   │   └── vulnerability-hunter-error.html  # 异常终止页面
│   ├── css/
│   │   └── vulnerability-hunter-error.css   # 异常终止样式
│   └── js/
│       └── vulnerability-hunter-error.js    # 异常终止逻辑
└── templates/
    └── pages/
        └── template-planning-error.html     # 模板文件（如需要）
```

### 6.2 引入设计Token

在所有CSS文件中引入：
```css
@import url('../../css/tokens.css');
```

或在HTML中引入：
```html
<link rel="stylesheet" href="../../css/tokens.css">
```

---

## 🔄 第七步：迭代优化

### 7.1 使用 `/ui-adjust` 进行优化

如果生成的代码需要调整：

1. **颜色调整**：
   ```
   /ui-adjust
   文件：frontend/agents/css/vulnerability-hunter-error.css
   调整：将所有硬编码颜色替换为设计token
   ```

2. **间距调整**：
   ```
   /ui-adjust
   文件：frontend/agents/css/vulnerability-hunter-error.css
   调整：规范化所有间距值为8px倍数
   ```

3. **交互状态**：
   ```
   /ui-adjust
   文件：frontend/agents/css/vulnerability-hunter-error.css
   调整：为所有交互元素添加完整的hover、active、focus状态
   ```

---

## 📚 参考资源

### Commands文档
- UI页面设计：`.claude/commands/ui-design.md`
- UI局部调整：`.claude/commands/ui-adjust.md`

### 设计系统文档
- 设计系统主页：`.claude/skills/designsystem/README.md`
- 颜色规范：`.claude/skills/designsystem/colors.md`
- 组件规范：`.claude/skills/designsystem/components.md`
- 布局规范：`.claude/skills/designsystem/layout.md`
- 排版规范：`.claude/skills/designsystem/typography.md`
- 文案规范：`.claude/skills/designsystem/copywriting.md`

### 实现资源
- Token定义：`frontend/css/tokens.css`
- 组件库：`frontend/components/`
- 模板示例：`frontend/templates/pages/`

### 需求文档
- PRD文档：`XQList/需求1/PDT-391-PRD.md`
- 异常场景分析：`XQList/需求1/PDT-391-异常场景分析.md`

---

## 🎯 快速开始

### 立即开始设计

1. **打开Cursor**
2. **输入命令**：
   ```
   /ui-design
   ```
3. **提供需求**（参考上面的需求描述）
4. **等待AI生成代码**
5. **检查生成的代码是否符合PRD要求**
6. **使用 `/ui-adjust` 进行优化调整**

---

## 💡 提示

- **详细描述需求**：提供越详细的需求，生成的代码越准确
- **参考PRD文档**：将PRD文档中的具体要求提供给AI
- **分步实现**：可以先实现第一个提示框，再实现第二个提示框
- **复用组件**：检查是否有可复用的组件（`frontend/components/`）
- **遵循设计系统**：确保所有代码都使用设计token，符合设计系统规范

---

*文档版本: v1.0*  
*最后更新: 2025-12-28*


