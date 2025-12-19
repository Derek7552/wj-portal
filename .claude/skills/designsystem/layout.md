# 📐 Clouditera 布局规范

> 提供页面布局、间距系统和响应式设计指南

---

## 📏 间距系统

### 基准单位
**基准单位：8px**

所有间距值都基于 8px 的倍数，确保视觉一致性和对齐。

### 标准间距尺寸

| 名称 | 值 | 说明 | 使用场景 |
|------|-----|------|---------|
| **xs** | 4px | 超小间距 | 图标与文字间距 |
| **sm** | 8px | 小间距 | 紧密元素、标签间距 |
| **md** | 12px | 中间距 | 输入框内边距、元素组间距 |
| **base** | 16px | 标准间距 | 卡片内边距、按钮内边距 |
| **lg** | 20px | 大间距 | - |
| **xl** | 24px | 超大间距 | 卡片间距、区域间距 |
| **2xl** | 32px | 特大间距 | 大区域间距、页面内边距 |
| **3xl** | 40px | 巨大间距 | - |
| **4xl** | 48px | 超巨间距 | 页面级间距 |

### 使用原则

```css
/* ✅ 推荐：使用标准间距值（8 的倍数） */
.container {
    padding: 16px;     /* base */
    margin: 24px;      /* xl */
    gap: 8px;          /* sm */
}

/* ❌ 不推荐：使用非标准值 */
.container {
    padding: 15px;     /* 不是 8 的倍数 */
    margin: 23px;      /* 不是 8 的倍数 */
}
```

---

## 🎯 间距使用场景

### 1. 内边距（Padding）

```css
/* 小组件内边距 */
.tag {
    padding: 4px 12px;  /* xs md */
}

/* 按钮内边距 */
.btn {
    padding: 12px 24px;  /* md xl */
}

.btn-small {
    padding: 8px 16px;   /* sm base */
}

/* 输入框内边距 */
.input {
    padding: 12px 16px;  /* md base */
}

/* 卡片内边距 */
.card {
    padding: 16px;       /* base */
}

.card-large {
    padding: 24px;       /* xl */
}

/* 页面内边距 */
.page-container {
    padding: 24px;       /* xl - 桌面端 */
}

@media (max-width: 768px) {
    .page-container {
        padding: 16px;   /* base - 移动端 */
    }
}
```

### 2. 外边距（Margin）

```css
/* 元素间距 */
.section {
    margin-bottom: 24px;  /* xl */
}

.section-large {
    margin-bottom: 32px;  /* 2xl */
}

/* 标题与内容间距 */
.title {
    margin-bottom: 16px;  /* base */
}
```

### 3. 间隙（Gap）- 推荐使用 ⭐

```css
/* ✅ 推荐：使用 Flexbox gap 管理间距 */
.button-group {
    display: flex;
    gap: 8px;  /* sm - 同组元素 */
}

.card-grid {
    display: grid;
    gap: 24px;  /* xl - 卡片间距 */
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 16px;  /* base - 表单项间距 */
}

/* ❌ 不推荐：手动设置 margin */
.button-group .btn {
    margin-right: 8px;  /* 最后一个需要特殊处理 */
}
.button-group .btn:last-child {
    margin-right: 0;
}
```

### 4. 分别设置水平和垂直间距

```css
.component-group {
    display: flex;
    row-gap: 12px;     /* 垂直间距 */
    column-gap: 16px;  /* 水平间距 */
    flex-wrap: wrap;
}
```

---

## 📱 响应式间距

根据屏幕尺寸调整间距，提供更好的体验。

```css
/* 桌面端 */
.container {
    padding: 24px;     /* xl */
    gap: 16px;         /* base */
}

/* 平板端 */
@media (max-width: 992px) {
    .container {
        padding: 20px;  /* lg */
        gap: 12px;      /* md */
    }
}

/* 移动端 */
@media (max-width: 768px) {
    .container {
        padding: 16px;  /* base */
        gap: 8px;       /* sm */
    }
}
```

---

## 🏗️ 页面布局模式

### 1. 三栏布局（智能体详情页）

```html
<div class="page-layout">
    <!-- 左侧主导航 -->
    <aside class="sidebar">240px</aside>

    <!-- 主内容区 -->
    <main class="main-content">
        <!-- 智能体侧导航 -->
        <aside class="agent-sidebar">220px</aside>

        <!-- 内容区 -->
        <div class="content-area">flex: 1</div>
    </main>
</div>
```

```css
.page-layout {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 240px;
    flex-shrink: 0;
}

.main-content {
    flex: 1;
    display: flex;
    min-width: 0;
}

.agent-sidebar {
    width: 220px;
    flex-shrink: 0;
}

.content-area {
    flex: 1;
    min-width: 0;
    padding: 24px;
}
```

### 2. 左右分栏布局

```html
<div class="split-layout">
    <div class="left-panel">左侧内容</div>
    <div class="right-panel">右侧内容</div>
</div>
```

```css
.split-layout {
    display: flex;
    gap: 24px;
    height: 100%;
}

.left-panel {
    flex: 1;
    min-width: 0;
}

.right-panel {
    width: 400px;
    flex-shrink: 0;
}

/* 响应式：小屏幕切换为上下布局 */
@media (max-width: 992px) {
    .split-layout {
        flex-direction: column;
    }

    .right-panel {
        width: 100%;
    }
}
```

### 3. 网格布局

```css
/* 卡片网格 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
}

/* 固定列数 */
.grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

@media (max-width: 992px) {
    .grid-3-col {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .grid-3-col {
        grid-template-columns: 1fr;
    }
}
```

---

## 📐 对齐方式

### 水平对齐

```css
/* 左对齐（默认） */
.align-start {
    justify-content: flex-start;
}

/* 居中对齐 */
.align-center {
    justify-content: center;
}

/* 右对齐 */
.align-end {
    justify-content: flex-end;
}

/* 两端对齐 */
.align-between {
    justify-content: space-between;
}
```

### 垂直对齐

```css
/* 顶部对齐 */
.align-top {
    align-items: flex-start;
}

/* 垂直居中（推荐） */
.align-middle {
    align-items: center;
}

/* 底部对齐 */
.align-bottom {
    align-items: flex-end;
}

/* 基线对齐 */
.align-baseline {
    align-items: baseline;
}
```

---

## 📊 常用布局示例

### 卡片头部（标题 + 操作）

```html
<div class="card-header">
    <h3 class="card-title">卡片标题</h3>
    <div class="card-actions">
        <button class="btn-icon">⚙️</button>
        <button class="btn-icon">🗑️</button>
    </div>
</div>
```

```css
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--clouditera-neutral-border-tertiary);
    margin-bottom: 16px;
}

.card-actions {
    display: flex;
    gap: 8px;
}
```

### 表单布局

```html
<form class="form">
    <div class="form-group">
        <label>用户名</label>
        <input type="text">
    </div>
    <div class="form-group">
        <label>密码</label>
        <input type="password">
    </div>
    <div class="form-actions">
        <button class="btn-primary">提交</button>
        <button class="btn-secondary">取消</button>
    </div>
</form>
```

```css
.form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 8px;
}
```

### 列表项布局

```html
<div class="list-item">
    <div class="list-item-main">
        <h4 class="list-item-title">标题</h4>
        <p class="list-item-desc">描述文本</p>
    </div>
    <div class="list-item-actions">
        <button>操作</button>
    </div>
</div>
```

```css
.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    border-radius: 6px;
}

.list-item-main {
    flex: 1;
    min-width: 0;
}

.list-item-title {
    margin: 0 0 4px 0;
}

.list-item-desc {
    margin: 0;
    color: var(--clouditera-neutral-text-secondary);
}
```

---

## ✅ 布局检查清单

### 间距
- [ ] 所有间距使用 8px 的倍数
- [ ] 优先使用 gap 而非 margin
- [ ] 响应式间距调整（移动端减小）

### 布局
- [ ] 使用 Flexbox 或 Grid 布局
- [ ] 设置 min-width: 0 防止溢出
- [ ] 正确使用 flex-shrink 和 flex-grow

### 响应式
- [ ] 桌面端布局（>= 1200px）
- [ ] 平板端适配（992px）
- [ ] 移动端适配（768px）
- [ ] 小屏手机适配（< 375px）

---

## 🚫 避免事项

1. ❌ **不要使用非 8px 倍数的间距**（如 5px, 7px, 13px, 15px）
2. ❌ **不要手动设置 margin 管理间距**，应使用 gap
3. ❌ **不要在同一页面使用过多不同的间距值**
4. ❌ **不要忽略响应式设计**
5. ❌ **不要使用固定高度**（除非必需）
6. ❌ **不要忘记设置 min-width: 0** 防止 flex 子元素溢出

---

## 📚 相关文档

- 间距详细规范：`.designsystem/SPACING.md`
- 返回主页：[README.md](./README.md)
