# 🔤 Clouditera 文字排版规范

> 提供字体、字号、行高、字重等排版规范

---

## 📝 字体系统

### 字体家族

```css
/* 系统字体栈 */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
             'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
             'Noto Color Emoji';
```

**说明**：
- 优先使用系统默认字体，确保最佳性能和本地化体验
- 支持中英文混排
- 包含 emoji 字体支持

### 等宽字体（代码）

```css
/* 代码/等宽字体 */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono',
             Consolas, 'Courier New', monospace;
```

---

## 📏 字号体系

### 标准字号

| 名称 | 字号 | 用途 | 示例 |
|------|------|------|------|
| **xs** | 11px | 辅助信息、标注 | 版权信息、时间戳 |
| **sm** | 12px | 小文本、标签 | 标签、徽章、次要信息 |
| **base** | 13px | 次要文本 | 帮助文本、说明 |
| **md** | 14px | 正文、主要内容 | 正文、表单标签 |
| **lg** | 16px | 重要内容 | 卡片标题、导航 |
| **xl** | 18px | 小标题 | 页面小标题 |
| **2xl** | 20px | 标题 | 模块标题 |
| **3xl** | 22px | 大标题 | 页面主标题 |
| **4xl** | 24px | 特大标题 | 重要页面标题 |
| **5xl** | 28px | 超大标题 | 首页大标题 |

### 使用示例

```css
/* 页面主标题 */
.page-title {
    font-size: 22px;    /* 3xl */
}

/* 卡片标题 */
.card-title {
    font-size: 16px;    /* lg */
}

/* 正文内容 */
.text-body {
    font-size: 14px;    /* md */
}

/* 辅助信息 */
.text-meta {
    font-size: 12px;    /* sm */
}

/* 标签 */
.tag {
    font-size: 12px;    /* sm */
}
```

---

## 📐 行高（Line Height）

### 标准行高

| 场景 | 行高 | 说明 |
|------|------|------|
| **紧凑** | 1.2 | 标题、单行文本 |
| **标准** | 1.5 | 按钮、表单、短文本 |
| **舒适** | 1.6 | 正文、列表项 |
| **宽松** | 1.8 | 长文本、文章内容 |

### 使用示例

```css
/* 标题 - 紧凑行高 */
h1, h2, h3 {
    line-height: 1.2;
}

/* 按钮、标签 - 标准行高 */
.btn, .tag {
    line-height: 1.5;
}

/* 正文 - 舒适行高 */
.text-body {
    line-height: 1.6;
}

/* 文章内容 - 宽松行高 */
.article-content {
    line-height: 1.8;
}
```

---

## ⚖️ 字重（Font Weight）

### 标准字重

| 名称 | 字重值 | 用途 |
|------|--------|------|
| **regular** | 400 | 正常文本 |
| **medium** | 500 | 强调文本、导航 |
| **semibold** | 600 | 小标题、重要信息 |
| **bold** | 700 | 标题、特别强调 |

### 使用示例

```css
/* 正文 - 正常字重 */
.text-body {
    font-weight: 400;  /* regular */
}

/* 强调文本 */
.text-emphasis {
    font-weight: 500;  /* medium */
}

/* 卡片标题 */
.card-title {
    font-weight: 600;  /* semibold */
}

/* 页面标题 */
.page-title {
    font-weight: 700;  /* bold */
}
```

---

## 🎨 文本颜色

### 颜色层级

```css
/* 标题/重要文本 - 最深 */
.text-title {
    color: var(--clouditera-neutral-text-title);      /* gray-9: #262626 */
}

/* 主要内容 - 适中 */
.text-primary {
    color: var(--clouditera-neutral-text-primary);    /* gray-7: #595959 */
}

/* 次要信息 - 浅色 */
.text-secondary {
    color: var(--clouditera-neutral-text-secondary);  /* gray-6: #8C8C8C */
}

/* 禁用文本 - 最浅 */
.text-disabled {
    color: var(--clouditera-neutral-text-disabled);   /* gray-5: #BFBFBF */
}

/* 链接 - 品牌色 */
.text-link {
    color: var(--clouditera-brand-primary);           /* #298CFF */
}

/* 成功 */
.text-success {
    color: var(--clouditera-semantic-success);        /* #52C41A */
}

/* 警告 */
.text-warning {
    color: var(--clouditera-semantic-warning);        /* #FAAD14 */
}

/* 错误 */
.text-error {
    color: var(--clouditera-semantic-error);          /* #FF4D4F */
}
```

---

## 📋 排版组合示例

### 页面标题

```html
<h1 class="page-title">页面主标题</h1>
```

```css
.page-title {
    font-size: 22px;                                    /* 3xl */
    font-weight: 700;                                   /* bold */
    line-height: 1.2;                                   /* 紧凑 */
    color: var(--clouditera-neutral-text-title);       /* 最深 */
    margin: 0 0 16px 0;
}
```

### 卡片标题

```html
<h3 class="card-title">卡片标题</h3>
```

```css
.card-title {
    font-size: 16px;                                    /* lg */
    font-weight: 600;                                   /* semibold */
    line-height: 1.4;                                   /* 标准 */
    color: var(--clouditera-neutral-text-title);       /* 最深 */
    margin: 0;
}
```

### 正文内容

```html
<p class="text-body">这是正文内容。</p>
```

```css
.text-body {
    font-size: 14px;                                    /* md */
    font-weight: 400;                                   /* regular */
    line-height: 1.6;                                   /* 舒适 */
    color: var(--clouditera-neutral-text-primary);     /* 适中 */
    margin: 12px 0;
}
```

### 辅助信息

```html
<span class="text-meta">2024-12-19 10:30</span>
```

```css
.text-meta {
    font-size: 12px;                                    /* sm */
    font-weight: 400;                                   /* regular */
    line-height: 1.5;                                   /* 标准 */
    color: var(--clouditera-neutral-text-secondary);   /* 浅色 */
}
```

### 链接

```html
<a href="#" class="link">查看详情</a>
```

```css
.link {
    font-size: 14px;                                    /* md */
    font-weight: 400;                                   /* regular */
    color: var(--clouditera-brand-primary);
    text-decoration: none;
    transition: color 0.2s;
}

.link:hover {
    color: var(--clouditera-brand-primary-hover);
    text-decoration: underline;
}
```

---

## 📄 文章内容排版

### 文章标题层级

```css
/* 一级标题 */
.article h1 {
    font-size: 24px;      /* 4xl */
    font-weight: 700;     /* bold */
    line-height: 1.2;
    color: var(--clouditera-neutral-text-title);
    margin: 32px 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--clouditera-neutral-border-tertiary);
}

/* 二级标题 */
.article h2 {
    font-size: 22px;      /* 3xl */
    font-weight: 600;     /* semibold */
    line-height: 1.3;
    color: var(--clouditera-neutral-text-title);
    margin: 32px 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--clouditera-neutral-border-tertiary);
}

/* 三级标题 */
.article h3 {
    font-size: 18px;      /* xl */
    font-weight: 600;     /* semibold */
    line-height: 1.4;
    color: var(--clouditera-neutral-text-title);
    margin: 24px 0 12px 0;
}

/* 四级标题 */
.article h4 {
    font-size: 16px;      /* lg */
    font-weight: 600;     /* semibold */
    line-height: 1.4;
    color: var(--clouditera-neutral-text-title);
    margin: 20px 0 12px 0;
}
```

### 文章正文

```css
.article p {
    font-size: 15px;
    font-weight: 400;
    line-height: 1.8;     /* 宽松 */
    color: var(--clouditera-neutral-text-primary);
    margin: 12px 0;
}

.article strong {
    font-weight: 600;
    color: var(--clouditera-neutral-text-title);
}

.article em {
    font-style: italic;
}
```

### 列表

```css
.article ul,
.article ol {
    padding-left: 24px;
    margin: 12px 0;
}

.article li {
    font-size: 15px;
    line-height: 1.8;
    color: var(--clouditera-neutral-text-primary);
    margin: 8px 0;
}
```

### 代码

```css
/* 行内代码 */
.article code {
    font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
    font-size: 13px;
    padding: 2px 6px;
    background: var(--clouditera-neutral-background-secondary);
    border: 1px solid var(--clouditera-neutral-border-secondary);
    border-radius: 3px;
    color: var(--clouditera-palette-magenta-5);
}

/* 代码块 */
.article pre {
    font-family: 'SF Mono', Monaco, Consolas, 'Courier New', monospace;
    font-size: 13px;
    line-height: 1.6;
    padding: 16px;
    background: var(--clouditera-neutral-background-secondary);
    border: 1px solid var(--clouditera-neutral-border-secondary);
    border-radius: 6px;
    overflow-x: auto;
    margin: 16px 0;
}
```

---

## ✅ 排版检查清单

### 字号
- [ ] 字号使用标准值（11/12/13/14/16/18/20/22/24/28px）
- [ ] 标题层级清晰（h1 > h2 > h3）
- [ ] 正文字号合适（14-16px）

### 行高
- [ ] 标题使用紧凑行高（1.2-1.4）
- [ ] 正文使用舒适行高（1.6）
- [ ] 长文本使用宽松行高（1.8）

### 字重
- [ ] 使用标准字重（400/500/600/700）
- [ ] 层级通过字重区分
- [ ] 不过度使用粗体

### 颜色
- [ ] 使用设计 token（无硬编码）
- [ ] 颜色层级清晰（title > primary > secondary）
- [ ] 对比度足够（至少 4.5:1）

---

## 🚫 避免事项

1. ❌ **不要使用非标准字号**（如 15px, 17px, 19px 等）
2. ❌ **不要使用非标准字重**（如 300, 800, 900）
3. ❌ **不要过度使用粗体**
4. ❌ **不要使用过小的字号**（< 12px，除非特殊场景）
5. ❌ **不要使用过窄的行高**（< 1.2）
6. ❌ **不要硬编码文本颜色**

---

## 📚 相关文档

- 颜色规范：[colors.md](./colors.md)
- 返回主页：[README.md](./README.md)
