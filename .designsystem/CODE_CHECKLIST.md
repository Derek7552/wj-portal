# 代码规范检查清单

在编写或修改 CSS 代码时，请使用此清单确保遵循设计系统规范。

## ✅ 颜色使用检查

### 必须检查项

- [ ] **所有颜色都使用 design system 变量**
  - 没有硬编码的十六进制颜色（`#298CFF`、`#ffffff` 等）
  - 没有硬编码的命名颜色（`white`、`black`、`red` 等）
  - 没有硬编码的 RGB/RGBA 值（`rgb(41, 140, 255)` 等，除非是阴影/渐变）

- [ ] **按钮颜色正确**
  - 主按钮：`var(--clouditera-brand-primary)`
  - 按钮文字：`var(--clouditera-neutral-background-white)`
  - 悬停状态：`var(--clouditera-brand-primary-hover)`

- [ ] **文本颜色正确**
  - 主要文本：`var(--clouditera-neutral-text-primary)`
  - 次要文本：`var(--clouditera-neutral-text-secondary)`
  - 白色文字：`var(--clouditera-neutral-background-white)`（不是 `white`）

- [ ] **背景颜色正确**
  - 页面背景：`var(--clouditera-neutral-background-primary)` 或 `var(--clouditera-neutral-background-white)`
  - 卡片背景：`var(--clouditera-neutral-background-white)`
  - 区块背景：`var(--clouditera-neutral-background-secondary)`

- [ ] **边框颜色正确**
  - 主要边框：`var(--clouditera-neutral-border-primary)`
  - 次要边框：`var(--clouditera-neutral-border-secondary)`

- [ ] **状态颜色正确**
  - 成功：`var(--clouditera-semantic-success)`
  - 警告：`var(--clouditera-semantic-warning)`
  - 错误：`var(--clouditera-semantic-error)`
  - 信息：`var(--clouditera-semantic-info)`

## ✅ 间距使用检查

### 必须检查项

- [ ] **使用统一的间距管理**
  - 使用 `gap` 属性管理组件之间的间距
  - 避免手动设置 margin 来创建间距

- [ ] **使用 Clouditera 内置间距尺寸**
  - `small` (8px) - 默认，用于紧密排列、标签、图标
  - `default` (12px) - 用于输入框、小按钮、元素组
  - `large` (16px) - 用于卡片、按钮、标准间距

- [ ] **所有间距值都是 8px 的倍数**
  - 允许的值：8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px...
  - 禁止的值：5px, 7px, 9px, 11px, 13px, 15px, 17px, 19px, 21px, 23px, 25px 等

- [ ] **间距使用符合规范**
  - 按钮内边距：`10px 20px` (标准) 或 `14px 32px` (大按钮)
  - 输入框内边距：`12px 16px` (对应 default × large)
  - 卡片内边距：`16px` (对应 large) 或 `24px` (3×)
  - Flexbox/Grid 间距：`8px` (small) 或 `12px` (default) 或 `16px` (large)

- [ ] **相同类型的元素使用相同的间距**
  - 所有按钮使用相同的 padding
  - 所有卡片使用相同的 padding
  - 所有输入框使用相同的 padding

## 🔍 常见错误检查

### ❌ 禁止的模式

```css
/* ❌ 硬编码颜色 */
color: white;
background: #298CFF;
border: 1px solid #d9d9d9;

/* ❌ 使用旧变量名 */
color: var(--primary-color);
background: var(--bg-primary);

/* ❌ 直接使用色板而非语义色 */
.success { color: var(--clouditera-palette-green-5); }
```

### ✅ 正确的模式

```css
/* ✅ 使用 design system 变量 */
color: var(--clouditera-neutral-background-white);
background: var(--clouditera-brand-primary);
border: 1px solid var(--clouditera-neutral-border-primary);

/* ✅ 使用语义色 */
.success { color: var(--clouditera-semantic-success); }
```

## 📋 代码审查流程

1. **编写代码前**
   - 查看 `QUICK_REFERENCE.md` 了解常用模式
   - 查看 `tokens.json` 确认变量名称

2. **编写代码时**
   - 使用 design system 变量
   - 避免硬编码颜色

3. **代码完成后**
   - 使用此清单逐项检查
   - 搜索代码中的硬编码颜色（`#`、`rgb`、`white`、`black` 等）
   - 确认所有颜色都使用了正确的变量

## 🛠️ 快速修复命令

### 查找硬编码颜色

```bash
# 查找十六进制颜色
grep -r "#[0-9a-fA-F]\{3,6\}" frontend/css/

# 查找命名颜色
grep -rE "\b(white|black|red|blue|green|yellow|orange|purple|pink|gray|grey)\b" frontend/css/

# 查找 RGB/RGBA
grep -rE "rgb\(|rgba\(" frontend/css/
```

## 📝 修复示例

### 示例 1：按钮颜色

```css
/* 修复前 */
.btn-primary {
  background-color: #298CFF;
  color: white;
}

/* 修复后 */
.btn-primary {
  background-color: var(--clouditera-brand-primary);
  color: var(--clouditera-neutral-background-white);
}
```

### 示例 2：文本颜色

```css
/* 修复前 */
.text {
  color: rgba(0, 0, 0, 0.87);
}

/* 修复后 */
.text {
  color: var(--clouditera-neutral-text-primary);
}
```

### 示例 3：背景颜色

```css
/* 修复前 */
.card {
  background: #ffffff;
  border: 1px solid #d9d9d9;
}

/* 修复后 */
.card {
  background: var(--clouditera-neutral-background-white);
  border: 1px solid var(--clouditera-neutral-border-primary);
}
```

## 🎯 优先级

1. **高优先级**：按钮、链接、主要交互元素
2. **中优先级**：文本、背景、边框
3. **低优先级**：装饰性元素、渐变效果

## 📚 相关文档

- [快速参考指南](./QUICK_REFERENCE.md)
- [设计系统 README](./README.md)
- [间距设计规范](./SPACING.md)
- [AI 助手规范](./.cursorrules)

