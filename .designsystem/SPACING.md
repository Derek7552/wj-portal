# Clouditera Design System - 间距设计规范

## 📐 间距体系

### 基准单位

**基准单位：8px**

所有间距值都基于 8px 的倍数，确保视觉一致性和对齐。

### 内置间距尺寸

Clouditera 设计系统提供了三种内置间距尺寸：

| 尺寸名称 | 值 | 说明 | 使用场景 |
|---------|-----|------|----------|
| **small** | 8px | 小间距（默认） | 紧密排列的元素、标签间距、图标间距 |
| **default** | 12px | 标准间距 | 输入框内边距、小按钮内边距、元素组间距 |
| **large** | 16px | 大间距 | 卡片内边距、按钮内边距、标准元素间距 |

**默认间距大小**：`small` (8px)

### 自定义间距

除了内置尺寸外，还支持自定义数值类型的间距：

```css
/* 自定义间距值（必须是 8px 的倍数） */
.custom-spacing {
  gap: 20px;  /* 2.5× */
  gap: 24px;  /* 3× */
  gap: 32px;  /* 4× */
  gap: 40px;  /* 5× */
  gap: 48px;  /* 6× */
}
```

## 🎯 使用场景

### 1. 组件间距管理

使用统一的间距管理方式，确保组件之间的一致性：

```css
/* 使用 Flexbox 管理组件间距 */
.component-group {
  display: flex;
  gap: 8px;   /* small - 默认 */
  gap: 12px;  /* default */
  gap: 16px;  /* large */
}

/* 垂直布局 */
.component-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;  /* default */
}
```

### 2. CSS 间距使用

#### 内边距（Padding）

```css
/* 小间距 - 对应 small (8px) */
.padding-small {
  padding: 8px;
}

/* 标准间距 - 对应 default (12px) */
.padding-default {
  padding: 12px;
}

/* 大间距 - 对应 large (16px) */
.padding-large {
  padding: 16px;
}

/* 按钮内边距 */
.btn {
  padding: 10px 20px;  /* 垂直：md，水平：lg */
}

.btn-large {
  padding: 14px 32px;  /* 垂直：base，水平：2xl */
}

/* 输入框内边距 - 对应 default (12px) */
.input {
  padding: 12px 16px;  /* default × large */
}

/* 卡片内边距 */
.card {
  padding: 16px;  /* large */
}

.card-large {
  padding: 24px;  /* 3× */
}
```

#### 外边距（Margin）

```css
/* 小间距 - 对应 small (8px) */
.margin-small {
  margin: 8px;
}

/* 标准间距 - 对应 default (12px) */
.margin-default {
  margin: 12px;
}

/* 大间距 - 对应 large (16px) */
.margin-large {
  margin: 16px;
}

/* 区域间距 */
.section {
  margin-bottom: 24px;  /* 3× */
}

.section-large {
  margin-bottom: 32px;  /* 4× */
}
```

#### 间距（Gap）

```css
/* Flexbox/Grid 间距 */
.flex-container {
  gap: 8px;   /* small - 默认 */
  gap: 12px;  /* default */
  gap: 16px;  /* large */
}

/* 卡片网格 */
.card-grid {
  gap: 24px;  /* 3× */
}
```

## 📋 间距管理特性

### 方向控制

```css
/* 水平布局（默认） */
.component-group {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

/* 垂直布局 */
.component-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

### 间距大小控制

```css
/* 使用内置尺寸 */
.gap-small { gap: 8px; }      /* small */
.gap-default { gap: 12px; }    /* default */
.gap-large { gap: 16px; }     /* large */

/* 自定义数值（必须是 8px 的倍数） */
.gap-custom-1 { gap: 24px; }   /* 24px */
.gap-custom-2 { gap: 32px; }   /* 32px */

/* 分别设置水平和垂直间距 */
.component-group {
  row-gap: 12px;    /* 垂直间距 */
  column-gap: 16px;  /* 水平间距 */
}
```

### 自动换行

```css
/* 水平模式下自动换行 */
.component-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

### 对齐方式

```css
/* 设置对齐方式 */
.component-group {
  display: flex;
  align-items: flex-start;  /* 顶部对齐 */
  align-items: center;      /* 居中对齐（默认） */
  align-items: flex-end;    /* 底部对齐 */
  align-items: baseline;    /* 基线对齐 */
  align-items: stretch;     /* 拉伸对齐 */
}
```

## ✅ 最佳实践

### 1. 使用统一的间距管理

```css
/* ✅ 推荐：使用 gap 属性统一管理间距 */
.button-group {
  display: flex;
  gap: 8px;  /* small */
}

/* ❌ 不推荐：手动设置 margin */
.button-group .btn {
  margin-right: 8px;  /* 最后一个元素需要特殊处理 */
}
```

### 2. 使用内置尺寸

```css
/* ✅ 推荐：使用内置尺寸 */
.gap-small { gap: 8px; }      /* small */
.gap-default { gap: 12px; }   /* default */
.gap-large { gap: 16px; }     /* large */

/* ❌ 不推荐：随意使用自定义值 */
.gap-invalid { gap: 7px; }    /* 不是 8px 的倍数 */
.gap-invalid { gap: 13px; }    /* 不是 8px 的倍数 */
```

### 3. 保持一致性

- 相同类型的元素使用相同的间距
- 优先使用内置尺寸（small、default、large）
- 自定义间距值必须是 8px 的倍数

### 4. 响应式间距

```css
/* 响应式间距 */
.component-group {
  gap: 8px;  /* 移动端：small */
}

@media (min-width: 768px) {
  .component-group {
    gap: 12px;  /* 桌面端：default */
  }
}
```

## 🚫 避免事项

1. ❌ **不要使用非 8px 倍数的间距值**（如 5px, 7px, 9px, 11px, 13px, 15px, 17px, 19px, 21px, 23px, 25px）
2. ❌ **不要手动设置 margin 来创建间距**，应使用 `gap` 属性统一管理
3. ❌ **不要随意使用自定义间距值**，优先使用内置尺寸（small、default、large）
4. ❌ **不要在同一页面中使用过多不同的间距值**

## 📊 间距值对照表

| Clouditera 尺寸 | 值 | CSS 对应 | 使用场景 |
|----------------|-----|----------|----------|
| small | 8px | `8px` | 紧密排列、标签、图标（默认） |
| default | 12px | `12px` | 输入框、小按钮、元素组 |
| large | 16px | `16px` | 卡片、按钮、标准间距 |
| 自定义 | 20px | `20px` | 中等间距 |
| 自定义 | 24px | `24px` | 大间距、卡片间距 |
| 自定义 | 32px | `32px` | 大区域间距 |
| 自定义 | 40px | `40px` | 超大区域间距 |
| 自定义 | 48px | `48px` | 页面级间距 |

## 📚 相关文档

- [快速参考指南](./QUICK_REFERENCE.md)
- [代码规范检查清单](./CODE_CHECKLIST.md)
- [AI 助手规范](./.cursorrules)

