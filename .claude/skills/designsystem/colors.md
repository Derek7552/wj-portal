# 🎨 Clouditera 颜色系统

> 提供完整的颜色规范、使用指南和快速查询

---

## 📋 快速参考

### 品牌色系
```css
/* 主品牌色 - 云脑蓝 */
--clouditera-brand-primary: #298CFF;          /* 主要操作、链接 */
--clouditera-brand-primary-hover: #0C7FFF;    /* 悬停状态 */
--clouditera-brand-primary-active: #006BE6;   /* 激活状态 */
```

### 中性色系（灰度）
```css
/* 文本颜色 */
--clouditera-neutral-text-title: #262626;     /* 标题、重要文本 */
--clouditera-neutral-text-primary: #595959;   /* 主要内容 */
--clouditera-neutral-text-secondary: #8C8C8C; /* 次要信息 */
--clouditera-neutral-text-disabled: #BFBFBF;  /* 禁用文本 */

/* 灰度色阶（0最浅，9最深） */
--clouditera-neutral-gray-9: #262626;  /* 最深 - 标题 */
--clouditera-neutral-gray-8: #434343;
--clouditera-neutral-gray-7: #595959;  /* 主要文本 */
--clouditera-neutral-gray-6: #8C8C8C;  /* 次要文本 */
--clouditera-neutral-gray-5: #BFBFBF;  /* 禁用、占位符 */
--clouditera-neutral-gray-4: #D9D9D9;
--clouditera-neutral-gray-3: #E8E8E8;
--clouditera-neutral-gray-2: #F5F5F5;
--clouditera-neutral-gray-1: #FAFAFA;
--clouditera-neutral-gray-0: #FFFFFF;  /* 最浅 - 白色 */

/* 背景色 */
--clouditera-neutral-background-white: #FFFFFF;      /* 主要背景（卡片、弹窗） */
--clouditera-neutral-background-primary: #FAFAFA;    /* 页面背景 */
--clouditera-neutral-background-secondary: #F5F5F5;  /* 次要背景（分隔区域） */
--clouditera-neutral-background-tertiary: #E8E8E8;   /* 三级背景（禁用区域） */

/* 边框色 */
--clouditera-neutral-border-primary: #D9D9D9;    /* 主要边框 */
--clouditera-neutral-border-secondary: #E8E8E8;  /* 次要边框 */
--clouditera-neutral-border-tertiary: #F5F5F5;   /* 浅色边框 */
```

### 语义色系
```css
/* 成功 - 绿色 */
--clouditera-semantic-success: #52C41A;
--clouditera-semantic-success-bg: #F6FFED;
--clouditera-semantic-success-border: #B7EB8F;

/* 警告 - 金色 */
--clouditera-semantic-warning: #FAAD14;
--clouditera-semantic-warning-bg: #FFFBE6;
--clouditera-semantic-warning-border: #FFE58F;

/* 错误 - 红色 */
--clouditera-semantic-error: #FF4D4F;
--clouditera-semantic-error-bg: #FFF1F0;
--clouditera-semantic-error-border: #FFCCC7;

/* 信息 - 蓝色 */
--clouditera-semantic-info: #1890FF;
--clouditera-semantic-info-bg: #E6F7FF;
--clouditera-semantic-info-border: #91D5FF;
```

### 扩展色板（10级色阶，用于数据可视化、标签等）

**蓝色系 (Blue)**
```css
--clouditera-palette-blue-0: #E6F4FF;  /* 最浅 - 背景 */
--clouditera-palette-blue-1: #BAE0FF;
--clouditera-palette-blue-2: #91CAFF;
--clouditera-palette-blue-3: #69B1FF;
--clouditera-palette-blue-4: #4096FF;
--clouditera-palette-blue-5: #1677FF;  /* 主色 */
--clouditera-palette-blue-6: #0958D9;
--clouditera-palette-blue-7: #003EB3;
--clouditera-palette-blue-8: #002C8C;
--clouditera-palette-blue-9: #001D66;  /* 最深 */
```

**绿色系 (Green)**
```css
--clouditera-palette-green-0: #F6FFED;
--clouditera-palette-green-1: #D9F7BE;
--clouditera-palette-green-2: #B7EB8F;
--clouditera-palette-green-3: #95DE64;
--clouditera-palette-green-4: #73D13D;
--clouditera-palette-green-5: #52C41A;  /* 主色 */
--clouditera-palette-green-6: #389E0D;
--clouditera-palette-green-7: #237804;
--clouditera-palette-green-8: #135200;
--clouditera-palette-green-9: #092B00;
```

**红色系 (Red)**
```css
--clouditera-palette-red-0: #FFF1F0;
--clouditera-palette-red-1: #FFCCC7;
--clouditera-palette-red-2: #FFA39E;
--clouditera-palette-red-3: #FF7875;
--clouditera-palette-red-4: #FF4D4F;
--clouditera-palette-red-5: #F5222D;  /* 主色 */
--clouditera-palette-red-6: #CF1322;
--clouditera-palette-red-7: #A8071A;
--clouditera-palette-red-8: #820014;
--clouditera-palette-red-9: #5C0011;
```

**金色系 (Gold)**
```css
--clouditera-palette-gold-0: #FFFBE6;
--clouditera-palette-gold-1: #FFF1B8;
--clouditera-palette-gold-2: #FFE58F;
--clouditera-palette-gold-3: #FFD666;
--clouditera-palette-gold-4: #FFC53D;
--clouditera-palette-gold-5: #FAAD14;  /* 主色 */
--clouditera-palette-gold-6: #D48806;
--clouditera-palette-gold-7: #AD6800;
--clouditera-palette-gold-8: #874D00;
--clouditera-palette-gold-9: #613400;
```

**紫色系 (Purple)**
```css
--clouditera-palette-purple-0: #F9F0FF;
--clouditera-palette-purple-1: #EFDBFF;
--clouditera-palette-purple-2: #D3ADF7;
--clouditera-palette-purple-3: #B37FEB;
--clouditera-palette-purple-4: #9254DE;
--clouditera-palette-purple-5: #722ED1;  /* 主色 */
--clouditera-palette-purple-6: #531DAB;
--clouditera-palette-purple-7: #391085;
--clouditera-palette-purple-8: #22075E;
--clouditera-palette-purple-9: #120338;
```

**洋红色系 (Magenta)**
```css
--clouditera-palette-magenta-0: #FFF0F6;
--clouditera-palette-magenta-1: #FFD6E7;
--clouditera-palette-magenta-2: #FFADD2;
--clouditera-palette-magenta-3: #FF85C0;
--clouditera-palette-magenta-4: #F759AB;
--clouditera-palette-magenta-5: #EB2F96;  /* 主色 */
--clouditera-palette-magenta-6: #C41D7F;
--clouditera-palette-magenta-7: #9E1068;
--clouditera-palette-magenta-8: #780650;
--clouditera-palette-magenta-9: #520339;
```

---

## 🎯 使用原则

### 1. 语义优先 ⭐ (最重要)
```css
/* ✅ 推荐：使用语义化颜色名称 */
.success-message {
    color: var(--clouditera-semantic-success);
    background: var(--clouditera-semantic-success-bg);
}

/* ❌ 不推荐：直接使用色板颜色 */
.success-message {
    color: var(--clouditera-palette-green-5);
}
```

**为什么？** 语义化名称具有更好的可维护性，主题切换时只需修改语义色定义。

### 2. 层级清晰 📐
```css
/* 文本层级 */
.title {
    color: var(--clouditera-neutral-text-title);     /* 标题 - 最深 gray-9 */
}

.content {
    color: var(--clouditera-neutral-text-primary);   /* 内容 - 适中 gray-7 */
}

.meta {
    color: var(--clouditera-neutral-text-secondary); /* 辅助 - 浅色 gray-6 */
}
```

### 3. 禁止硬编码 ⛔
```css
/* ❌ 错误：硬编码颜色值 */
.button {
    background: #298CFF;
    color: #FFFFFF;
    border: 1px solid #D9D9D9;
}

/* ✅ 正确：使用 CSS 变量 */
.button {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-primary);
}
```

### 4. 交互状态完整 🎨
```css
.button-primary {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
}

.button-primary:hover {
    background: var(--clouditera-brand-primary-hover);
}

.button-primary:active {
    background: var(--clouditera-brand-primary-active);
}

.button-primary:disabled {
    background: var(--clouditera-neutral-gray-4);
    color: var(--clouditera-neutral-text-disabled);
    cursor: not-allowed;
}
```

---

## 🔍 常见场景

### 场景 1：主要按钮
```css
.btn-primary {
    background: var(--clouditera-brand-primary);
    color: var(--clouditera-neutral-background-white);
    border: none;
}

.btn-primary:hover {
    background: var(--clouditera-brand-primary-hover);
}

.btn-primary:active {
    background: var(--clouditera-brand-primary-active);
}
```

### 场景 2：次要按钮
```css
.btn-secondary {
    background: var(--clouditera-neutral-background-white);
    color: var(--clouditera-neutral-text-primary);
    border: 1px solid var(--clouditera-neutral-border-primary);
}

.btn-secondary:hover {
    background: var(--clouditera-palette-blue-0);
    border-color: var(--clouditera-brand-primary);
    color: var(--clouditera-brand-primary);
}
```

### 场景 3：卡片
```css
.card {
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-secondary);
    border-radius: 8px;
}

.card:hover {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 2px 8px rgba(41, 140, 255, 0.1);
}
```

### 场景 4：状态标签
```css
/* 成功状态 */
.tag-success {
    background: var(--clouditera-semantic-success-bg);
    color: var(--clouditera-semantic-success);
    border: 1px solid var(--clouditera-semantic-success-border);
}

/* 警告状态 */
.tag-warning {
    background: var(--clouditera-semantic-warning-bg);
    color: var(--clouditera-semantic-warning);
    border: 1px solid var(--clouditera-semantic-warning-border);
}

/* 错误状态 */
.tag-error {
    background: var(--clouditera-semantic-error-bg);
    color: var(--clouditera-semantic-error);
    border: 1px solid var(--clouditera-semantic-error-border);
}
```

### 场景 5：表单输入框
```css
.input {
    background: var(--clouditera-neutral-background-white);
    border: 1px solid var(--clouditera-neutral-border-primary);
    color: var(--clouditera-neutral-text-primary);
}

.input:focus {
    border-color: var(--clouditera-brand-primary);
    box-shadow: 0 0 0 2px var(--clouditera-palette-blue-0);
    outline: none;
}

.input::placeholder {
    color: var(--clouditera-neutral-text-secondary);
}

.input:disabled {
    background: var(--clouditera-neutral-background-secondary);
    color: var(--clouditera-neutral-text-disabled);
    cursor: not-allowed;
}
```

### 场景 6：链接
```css
.link {
    color: var(--clouditera-brand-primary);
    text-decoration: none;
}

.link:hover {
    color: var(--clouditera-brand-primary-hover);
    text-decoration: underline;
}

.link:active {
    color: var(--clouditera-brand-primary-active);
}
```

---

## 💡 快速决策树

```
需要选择颜色？
  │
  ├─ 是品牌色/主要操作？
  │   └─ var(--clouditera-brand-primary)
  │      hover → var(--clouditera-brand-primary-hover)
  │      active → var(--clouditera-brand-primary-active)
  │
  ├─ 是文本颜色？
  │   ├─ 标题/重要文本？ → var(--clouditera-neutral-text-title) [gray-9]
  │   ├─ 主要内容？ → var(--clouditera-neutral-text-primary) [gray-7]
  │   ├─ 次要信息？ → var(--clouditera-neutral-text-secondary) [gray-6]
  │   └─ 禁用文本？ → var(--clouditera-neutral-text-disabled) [gray-5]
  │
  ├─ 是背景色？
  │   ├─ 卡片/弹窗背景？ → var(--clouditera-neutral-background-white)
  │   ├─ 页面背景？ → var(--clouditera-neutral-background-primary)
  │   ├─ 分隔区域？ → var(--clouditera-neutral-background-secondary)
  │   └─ 禁用区域？ → var(--clouditera-neutral-background-tertiary)
  │
  ├─ 是边框色？
  │   ├─ 主要边框？ → var(--clouditera-neutral-border-primary)
  │   ├─ 次要边框？ → var(--clouditera-neutral-border-secondary)
  │   └─ 浅色边框？ → var(--clouditera-neutral-border-tertiary)
  │
  ├─ 是状态色？
  │   ├─ 成功？ → var(--clouditera-semantic-success)
  │   ├─ 警告？ → var(--clouditera-semantic-warning)
  │   ├─ 错误？ → var(--clouditera-semantic-error)
  │   └─ 信息？ → var(--clouditera-semantic-info)
  │
  └─ 是装饰/可视化？
      └─ 使用扩展色板 var(--clouditera-palette-{color}-{0-9})
```

---

## ✅ 检查清单

开发时请确认：
- [ ] 所有颜色都使用 CSS 变量（无硬编码 #hex 值）
- [ ] 优先使用语义化颜色（semantic-* 和 neutral-text-*）
- [ ] 包含所有交互状态（hover、active、disabled、focus）
- [ ] 确保足够的对比度（文本/背景至少 4.5:1）
- [ ] 悬停状态使用对应的 *-hover 变量
- [ ] 禁用状态使用 neutral-text-disabled 和 neutral-gray-4

---

## 📚 相关文档

- 设计 Token 定义：`frontend/css/tokens.css`
- 颜色详细规范：`.designsystem/.color`
- 返回主页：[README.md](./README.md)
