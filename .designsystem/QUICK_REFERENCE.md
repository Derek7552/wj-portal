# Clouditera Design System - 快速参考指南

> 本文档为 AI 助手和开发者提供快速参考，确保代码编写时遵循设计系统规范。

## 🎨 颜色使用规范

### 品牌色（Brand Colors）

**主色 - 云脑蓝**
```css
/* ✅ 正确 */
background-color: var(--clouditera-brand-primary);
color: var(--clouditera-neutral-background-white);

/* ❌ 错误 - 硬编码 */
background-color: #298CFF;
color: white;
```

**状态色**
- 悬停：`var(--clouditera-brand-primary-hover)`
- 激活：`var(--clouditera-brand-primary-active)`

### 语义色（Semantic Colors）

**使用场景映射**
```css
/* 成功状态 */
.success { color: var(--clouditera-semantic-success); }

/* 警告状态 */
.warning { color: var(--clouditera-semantic-warning); }

/* 错误状态 */
.error { color: var(--clouditera-semantic-error); }

/* 信息提示 */
.info { color: var(--clouditera-semantic-info); }

/* 链接 */
a { color: var(--clouditera-semantic-link); }
```

### 文本颜色（Text Colors）

```css
/* 主要文本 */
.text-primary { color: var(--clouditera-neutral-text-primary); }

/* 次要文本 */
.text-secondary { color: var(--clouditera-neutral-text-secondary); }

/* 禁用文本 */
.text-disabled { color: var(--clouditera-neutral-text-disabled); }

/* 标题文本 */
.text-title { color: var(--clouditera-neutral-text-title); }
```

### 背景颜色（Background Colors）

```css
/* 主要背景 - 布局背景 */
.bg-primary { background: var(--clouditera-neutral-background-primary); }

/* 次要背景 - 浅灰背景 */
.bg-secondary { background: var(--clouditera-neutral-background-secondary); }

/* 三级背景 - 分割线背景 */
.bg-tertiary { background: var(--clouditera-neutral-background-tertiary); }

/* 白色背景 */
.bg-white { background: var(--clouditera-neutral-background-white); }
```

### 边框颜色（Border Colors）

```css
/* 一级边框 */
.border-primary { border-color: var(--clouditera-neutral-border-primary); }

/* 二级边框 */
.border-secondary { border-color: var(--clouditera-neutral-border-secondary); }
```

## 📐 常用组件模式

### 按钮（Button）

```css
/* 主按钮 */
.btn-primary {
  background-color: var(--clouditera-brand-primary);
  color: var(--clouditera-neutral-background-white);
  border: 1px solid var(--clouditera-brand-primary);
}

.btn-primary:hover {
  background-color: var(--clouditera-brand-primary-hover);
}

/* 次要按钮 */
.btn-secondary {
  background-color: var(--clouditera-neutral-background-secondary);
  color: var(--clouditera-neutral-text-primary);
  border: 1px solid var(--clouditera-neutral-border-primary);
}

/* 轮廓按钮 */
.btn-outline {
  background-color: transparent;
  color: var(--clouditera-brand-primary);
  border: 1px solid var(--clouditera-brand-primary);
}
```

### 卡片（Card）

```css
.card {
  background: var(--clouditera-neutral-background-white);
  border: 1px solid var(--clouditera-neutral-border-primary);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### 输入框（Input）

```css
.input {
  background-color: var(--clouditera-neutral-background-white);
  color: var(--clouditera-neutral-text-primary);
  border: 1px solid var(--clouditera-neutral-border-primary);
  border-radius: 6px;
  padding: 12px 16px;
}

.input:focus {
  border-color: var(--clouditera-brand-primary);
  box-shadow: 0 0 0 3px rgba(41, 140, 255, 0.1);
}

.input::placeholder {
  color: var(--clouditera-neutral-text-secondary);
}
```

### 标签（Tag/Badge）

```css
/* 成功标签 */
.tag-success {
  background: var(--clouditera-palette-green-0);
  color: var(--clouditera-semantic-success);
}

/* 警告标签 */
.tag-warning {
  background: var(--clouditera-palette-orange-0);
  color: var(--clouditera-palette-orange-5);
}

/* 错误标签 */
.tag-error {
  background: var(--clouditera-palette-red-0);
  color: var(--clouditera-semantic-error);
}

/* 信息标签 */
.tag-info {
  background: var(--clouditera-palette-blue-0);
  color: var(--clouditera-brand-primary);
}
```

## 🚫 禁止事项

### ❌ 不要硬编码颜色

```css
/* ❌ 错误 */
.button {
  background-color: #298CFF;
  color: #ffffff;
  border: 1px solid #d9d9d9;
}

/* ✅ 正确 */
.button {
  background-color: var(--clouditera-brand-primary);
  color: var(--clouditera-neutral-background-white);
  border: 1px solid var(--clouditera-neutral-border-primary);
}
```

### ❌ 不要使用非语义化的色板颜色

```css
/* ❌ 错误 - 直接使用色板 */
.success { color: var(--clouditera-palette-green-5); }

/* ✅ 正确 - 使用语义色 */
.success { color: var(--clouditera-semantic-success); }
```

### ❌ 不要混用颜色变量命名

```css
/* ❌ 错误 - 混用旧变量 */
.button {
  background: var(--primary-color);  /* 旧命名 */
  color: var(--clouditera-neutral-background-white);  /* 新命名 */
}

/* ✅ 正确 - 统一使用新命名 */
.button {
  background: var(--clouditera-brand-primary);
  color: var(--clouditera-neutral-background-white);
}
```

## 📋 代码检查清单

在编写 CSS 代码时，请检查：

- [ ] 所有颜色都使用 design system 变量，没有硬编码
- [ ] 按钮使用正确的品牌色变量
- [ ] 文本颜色使用语义化的文本色变量
- [ ] 背景色使用正确的背景色变量
- [ ] 边框色使用边框色变量
- [ ] 状态色（成功/警告/错误）使用语义色变量
- [ ] 没有使用 `white`、`black` 等硬编码颜色值
- [ ] 没有使用 `#ffffff`、`#000000` 等硬编码十六进制值

## 🔍 变量查找

如果不知道使用哪个变量，按以下顺序查找：

1. **品牌相关** → `--clouditera-brand-*`
2. **语义状态** → `--clouditera-semantic-*`
3. **文本颜色** → `--clouditera-neutral-text-*`
4. **背景颜色** → `--clouditera-neutral-background-*`
5. **边框颜色** → `--clouditera-neutral-border-*`
6. **色板颜色** → `--clouditera-palette-{color}-{level}`

## 📐 间距使用规范

### Clouditera 内置间距尺寸

| 尺寸名称 | 值 | 使用场景 |
|---------|-----|----------|
| **small** | 8px | 紧密排列、标签、图标（默认） |
| **default** | 12px | 输入框、小按钮、元素组 |
| **large** | 16px | 卡片、按钮、标准间距 |

### 使用统一的间距管理

```css
/* ✅ 推荐：使用 gap 属性统一管理间距 */
.button-group {
  display: flex;
  gap: 8px;  /* small - 默认 */
}

/* 指定间距大小 */
.button-group-large {
  gap: 16px;  /* large */
}

/* 自定义间距值（必须是 8px 的倍数） */
.button-group-custom {
  gap: 24px;  /* 3× */
}
```

### CSS 间距使用

```css
/* 使用 Clouditera 内置尺寸 */
.padding-small { padding: 8px; }      /* small */
.padding-default { padding: 12px; }   /* default */
.padding-large { padding: 16px; }      /* large */

/* 按钮内边距 */
.btn { padding: 10px 20px; }          /* 垂直：md，水平：lg */

/* 输入框内边距 - 对应 default (12px) */
.input { padding: 12px 16px; }        /* default × large */

/* 卡片内边距 */
.card { padding: 16px; }              /* large */

/* Flexbox/Grid 间距 */
.flex-container {
  gap: 8px;   /* small - 默认 */
  gap: 12px;  /* default */
  gap: 16px;  /* large */
}
```

### 间距使用原则

1. ✅ **使用 gap 属性统一管理**组件间距
2. ✅ **使用内置尺寸**：small (8px)、default (12px)、large (16px)
3. ✅ **自定义值必须是 8px 的倍数**：20px, 24px, 32px, 40px, 48px
4. ❌ **禁止使用非 8px 倍数的值**：5px, 7px, 9px, 11px, 13px, 15px...

详细说明请参考 [间距设计规范](./SPACING.md)。

## 📚 完整变量列表

查看 `tokens.json` 或 `frontend/css/tokens.css` 获取完整的变量列表。

