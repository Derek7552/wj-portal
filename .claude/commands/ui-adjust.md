# UI 局部调整 Command

> **Command 用途**：对现有界面进行局部调整和优化，包括颜色、布局、间距等
> **调用方式**：在 Claude Code 中输入 `/ui-adjust` 或直接描述调整需求

---

## 🎯 Command 功能

此 command 将帮助你：
1. ✅ 调整现有元素的颜色（应用设计系统规范）
2. ✅ 优化布局和间距（符合 8px 系统）
3. ✅ 修正字体和排版问题
4. ✅ 添加或完善交互状态
5. ✅ 优化响应式设计
6. ✅ 修复设计规范不一致问题

---

## 📝 使用方法

### 基本用法
```
/ui-adjust

文件：frontend/templates/css/template-search.css
调整：将所有硬编码颜色替换为设计 token
```

### 指定具体元素
```
/ui-adjust

文件：frontend/templates/pages/template-chat.html
元素：.btn-send 按钮
调整：增加悬停状态，使用品牌主色
```

### 多项调整
```
/ui-adjust

文件：frontend/components/task-card.css
调整：
1. 卡片间距改为 24px
2. 标题颜色使用 neutral-text-title
3. 添加悬停效果（边框变为品牌色）
```

### 布局调整
```
/ui-adjust

文件：frontend/templates/pages/template-planning.html
调整：将任务列表的间距从 12px 改为 16px，
并确保在移动端自动减小为 12px
```

---

## 🔍 调整类型

### 1. 颜色调整 🎨

参考：[`skills/designsystem/colors.md`](./../skills/designsystem/colors.md)

**常见场景：**

#### 替换硬编码颜色
```
调整前：
.button {
    background: #298CFF;
    color: #FFFFFF;
}

调整后：
.button {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
}
```

#### 优化文本颜色层级
```
调整前：
.title { color: #333; }
.text { color: #666; }
.meta { color: #999; }

调整后：
.title { color: var(--clouditera-neutral-text-title); }
.text { color: var(--clouditera-neutral-text-primary); }
.meta { color: var(--clouditera-neutral-text-secondary); }
```

#### 添加语义色
```
调整前：
.success { color: #52C41A; }

调整后：
.success {
    color: var(--clouditera-semantic-success);
    background: var(--clouditera-semantic-success-bg);
    border: 1px solid var(--clouditera-semantic-success-border);
}
```

---

### 2. 间距调整 📐

参考：[`skills/designsystem/layout.md`](./../skills/designsystem/layout.md)

**常见场景：**

#### 规范化间距值
```
调整前：
.container {
    padding: 15px 18px;
    margin-bottom: 22px;
}

调整后：
.container {
    padding: 16px;          /* 改为 8 的倍数 */
    margin-bottom: 24px;    /* 改为 8 的倍数 */
}
```

#### 使用 gap 替代 margin
```
调整前：
.button-group .btn {
    margin-right: 12px;
}
.button-group .btn:last-child {
    margin-right: 0;
}

调整后：
.button-group {
    display: flex;
    gap: 12px;              /* 更简洁 */
}
```

#### 响应式间距
```
调整前：
.card {
    padding: 24px;
}

调整后：
.card {
    padding: 24px;
}

@media (max-width: 768px) {
    .card {
        padding: 16px;      /* 移动端减小 */
    }
}
```

---

### 3. 排版调整 🔤

参考：[`skills/designsystem/typography.md`](./../skills/designsystem/typography.md)

**常见场景：**

#### 规范化字号
```
调整前：
.title { font-size: 19px; }
.text { font-size: 15px; }

调整后：
.title { font-size: 20px; }  /* 使用标准值 */
.text { font-size: 14px; }   /* 使用标准值 */
```

#### 优化行高
```
调整前：
.article {
    line-height: 1.5;
}

调整后：
.article {
    line-height: 1.8;    /* 长文本使用宽松行高 */
}
```

#### 规范字重
```
调整前：
.title { font-weight: 800; }

调整后：
.title { font-weight: 700; }  /* 使用标准字重 */
```

---

### 4. 布局调整 🏗️

参考：[`skills/designsystem/layout.md`](./../skills/designsystem/layout.md)

**常见场景：**

#### 优化 Flexbox 布局
```
调整前：
.header {
    display: flex;
}
.header-title {
    width: 70%;
}
.header-actions {
    width: 30%;
}

调整后：
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}
.header-title {
    flex: 1;
    min-width: 0;    /* 防止溢出 */
}
.header-actions {
    flex-shrink: 0;  /* 防止压缩 */
}
```

#### 改善网格布局
```
调整前：
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

调整后：
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;       /* 添加间距 */
}
```

---

### 5. 交互状态完善 🎨

**常见场景：**

#### 添加悬停状态
```
调整前：
.button {
    background: var(--clouditera-brand-primary);
}

调整后：
.button {
    background: var(--clouditera-brand-primary);
    transition: all 0.2s;
}

.button:hover {
    background: var(--clouditera-brand-primary-hover);
}

.button:active {
    background: var(--clouditera-brand-primary-active);
}
```

#### 完善表单状态
```
调整前：
.input {
    border: 1px solid var(--clouditera-neutral-border-primary);
}

调整后：
.input {
    border: 1px solid var(--clouditera-neutral-border-primary);
    transition: all 0.2s;
}

.input:focus {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 0 0 2px var(--clouditera-palette-blue-0);
    outline: none;
}

.input:disabled {
    background: var(--clouditera-neutral-background-secondary);
    color: var(--clouditera-neutral-text-disabled);
    cursor: not-allowed;
}
```

---

### 6. 响应式优化 📱

**常见场景：**

#### 添加移动端适配
```
调整前：
.container {
    padding: 24px;
}

调整后：
.container {
    padding: 24px;
}

@media (max-width: 992px) {
    .container {
        padding: 20px;
    }
}

@media (max-width: 768px) {
    .container {
        padding: 16px;
    }
}
```

#### 调整布局方向
```
调整前：
.split-layout {
    display: flex;
}

调整后：
.split-layout {
    display: flex;
    gap: 24px;
}

@media (max-width: 992px) {
    .split-layout {
        flex-direction: column;  /* 小屏幕切换为垂直 */
    }
}
```

---

## 💡 使用场景

### 场景 1：规范化现有代码

**需求：**
```
/ui-adjust

文件：frontend/templates/css/old-styles.css
调整：将所有硬编码的颜色值替换为设计 token
```

**输出：**
- 识别所有硬编码颜色（#hex 值）
- 映射到对应的设计 token
- 提供替换后的完整代码
- 列出替换清单

---

### 场景 2：优化间距

**需求：**
```
/ui-adjust

文件：frontend/components/task-card.css
调整：优化卡片内部间距，确保符合 8px 系统
```

**输出：**
- 分析现有间距值
- 调整为 8px 倍数
- 优化 gap 使用
- 添加响应式间距

---

### 场景 3：添加交互状态

**需求：**
```
/ui-adjust

文件：frontend/templates/pages/template-search.html
元素：所有按钮
调整：添加完整的交互状态（hover、active、disabled）
```

**输出：**
- 为每个按钮添加悬停状态
- 添加激活状态
- 添加禁用状态
- 包含过渡动画

---

### 场景 4：响应式改进

**需求：**
```
/ui-adjust

文件：frontend/templates/css/template-detail.css
调整：添加移动端适配，确保在小屏幕上正常显示
```

**输出：**
- 添加媒体查询
- 调整字号和间距
- 优化布局方向
- 处理溢出问题

---

### 场景 5：文案优化

参考：[`skills/designsystem/copywriting.md`](./../skills/designsystem/copywriting.md)

**需求：**
```
/ui-adjust

文件：frontend/templates/pages/template-planning.html
调整：优化所有按钮和提示文案，符合文案规范
```

**输出：**
- 使用用户视角（"你"）
- 精简冗余词汇
- 统一术语使用
- 优化错误提示

---

## 🔍 调整流程

### 第 1 步：读取现有代码
我会读取指定文件的当前内容

### 第 2 步：分析问题
- 识别不符合规范的地方
- 查找硬编码值
- 检查缺失的状态
- 分析响应式支持

### 第 3 步：应用设计系统
参考相应的设计规范：
- 颜色 → `colors.md`
- 间距 → `layout.md`
- 排版 → `typography.md`
- 组件 → `components.md`
- 文案 → `copywriting.md`

### 第 4 步：生成调整方案
- 说明调整理由
- 提供对比（调整前/调整后）
- 给出完整代码
- 列出改动清单

### 第 5 步：验证规范
确保调整后的代码：
- ✅ 使用设计 token
- ✅ 符合间距规范
- ✅ 包含交互状态
- ✅ 支持响应式
- ✅ 文案符合规范

---

## 📋 输出格式

### 1. 调整说明
```markdown
## 调整说明

### 文件：frontend/templates/css/template-search.css

### 调整内容：
1. 替换硬编码颜色为设计 token
2. 规范化间距值（改为 8px 倍数）
3. 添加按钮悬停状态

### 设计规范依据：
- 颜色系统：skills/designsystem/colors.md
- 间距系统：skills/designsystem/layout.md
```

### 2. 调整对比
```markdown
## 调整前后对比

### 调整前：
```css
.button {
    background: #298CFF;
    padding: 10px 20px;
}
```

### 调整后：
```css
.button {
    background: var(--clouditera-brand-primary);
    padding: 12px 24px;
    transition: all 0.2s;
}

.button:hover {
    background: var(--clouditera-brand-primary-hover);
}
```
```

### 3. 完整代码
提供调整后的完整文件内容

### 4. 改动清单
```markdown
## 改动清单

1. ✅ 第 15 行：替换 background: #298CFF → var(--clouditera-brand-primary)
2. ✅ 第 16 行：调整 padding: 10px 20px → 12px 24px
3. ✅ 第 18-21 行：添加 :hover 状态
4. ✅ 第 35 行：替换 margin: 15px → 16px
```

---

## ✅ 调整检查清单

每次调整都会确保：

### 颜色
- [ ] 无硬编码颜色（#hex 值）
- [ ] 使用语义化 token（优先）
- [ ] 文本颜色层级清晰
- [ ] 包含所有状态的颜色

### 间距
- [ ] 所有间距为 8px 倍数
- [ ] 优先使用 gap 而非 margin
- [ ] 响应式间距调整
- [ ] 避免过大间距

### 排版
- [ ] 字号使用标准值
- [ ] 行高合理（标题 1.2-1.4，正文 1.6-1.8）
- [ ] 字重使用标准值
- [ ] 颜色对比度足够

### 布局
- [ ] 使用 Flexbox/Grid
- [ ] 设置 min-width: 0（防溢出）
- [ ] 正确使用 flex-shrink/grow
- [ ] 响应式布局完善

### 交互
- [ ] 包含 :hover 状态
- [ ] 包含 :active 状态
- [ ] 包含 :focus 状态（表单）
- [ ] 包含 :disabled 状态
- [ ] 有过渡动画

### 响应式
- [ ] 桌面端（>= 1200px）
- [ ] 平板端（992px）
- [ ] 移动端（768px）
- [ ] 小屏幕（< 375px）

---

## 🎯 快速示例

### 示例 1：颜色调整
```
/ui-adjust

文件：frontend/components/badge.css
调整：将硬编码的 #52C41A 替换为语义化的成功色
```

### 示例 2：间距优化
```
/ui-adjust

文件：frontend/templates/css/template-chat.css
调整：.message-list 的 gap 从 15px 改为 16px
```

### 示例 3：添加状态
```
/ui-adjust

文件：frontend/components/button.css
调整：为 .btn-secondary 添加完整的交互状态
```

### 示例 4：响应式
```
/ui-adjust

文件：frontend/templates/css/template-planning.css
调整：添加移动端适配，卡片在小屏幕切换为单列
```

### 示例 5：批量调整
```
/ui-adjust

文件：frontend/templates/css/template-search.css
调整：
1. 所有颜色改为 token
2. 所有间距改为 8px 倍数
3. 添加缺失的交互状态
4. 完善移动端适配
```

---

## 🚫 注意事项

### 不要做的事
1. ❌ 不要改变原有的功能逻辑
2. ❌ 不要删除必要的自定义样式
3. ❌ 不要过度优化（保持简洁）
4. ❌ 不要引入新的依赖

### 要确认的事
1. ✅ 调整是否符合设计意图
2. ✅ 是否保持向后兼容
3. ✅ 是否影响其他页面
4. ✅ 调整后是否需要测试

---

## 📚 参考资源

### 设计系统文档
- 颜色规范：[`skills/designsystem/colors.md`](./../skills/designsystem/colors.md)
- 布局规范：[`skills/designsystem/layout.md`](./../skills/designsystem/layout.md)
- 排版规范：[`skills/designsystem/typography.md`](./../skills/designsystem/typography.md)
- 组件规范：[`skills/designsystem/components.md`](./../skills/designsystem/components.md)
- 文案规范：[`skills/designsystem/copywriting.md`](./../skills/designsystem/copywriting.md)

### 设计 Token
- Token 定义：`frontend/css/tokens.css`
- 详细规范：`.designsystem/`
- 快速参考：`.designsystem/QUICK_REFERENCE.md`

### 相关 Command
- 完整页面设计：[`ui-design.md`](./ui-design.md)

---

## 💬 使用技巧

### 获得最佳结果

1. **明确指定文件路径**
   ```
   文件：frontend/templates/css/template-search.css
   ```

2. **清晰描述调整内容**
   ```
   调整：将所有硬编码颜色替换为设计 token
   ```

3. **指定具体元素（如适用）**
   ```
   元素：.btn-primary、.btn-secondary
   ```

4. **说明调整理由（可选）**
   ```
   原因：当前颜色不符合设计系统规范
   ```

---

## 🔄 更新记录

### v1.0.0 - 2024-12-19
- ✅ 创建 UI 局部调整 command
- ✅ 支持颜色、间距、排版、布局、交互状态调整
- ✅ 集成设计系统规范
- ✅ 提供完整的调整流程和检查清单

---

**开始使用**：在 Claude Code 中输入 `/ui-adjust` 并描述你的调整需求 🚀
