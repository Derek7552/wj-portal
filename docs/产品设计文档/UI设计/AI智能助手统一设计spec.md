# AI 智能助手统一设计规范

## 设计决策

**背景**：个人知识库页面的 AI 智能助手采用了紫蓝渐变头部，与其他智能体（漏洞猎人、漏洞情报等）的白色简洁风格不一致。

**方案对比**：
- 方案 A：统一为简洁白色风格 → 一致性好、维护成本低
- 方案 B：蓝色渐变头部 → 保留特色但仍不统一
- 方案 C：浅紫色背景 → 折中但增加配色复杂度

**最终选择**：方案 A（统一为简洁白色风格）

**理由**：
1. 与其他智能体保持设计一致性
2. 减少用户在不同智能体间切换时的视觉跳跃
3. 维护成本低，共用同一套样式组件

---

## 统一设计规范

### 1. 聊天容器 `.chat-container` / `.chat-area`

```css
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--clouditera-neutral-background-white);
    border-radius: 8px;
    border: 1px solid var(--clouditera-neutral-border-secondary);
    overflow: hidden;
}
```

**要点**：
- 背景：白色 `--neutral-background-white`
- 边框：使用 `border` 而非 `box-shadow`
- 圆角：8px

---

### 2. 聊天头部 `.chat-header`

```css
.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--clouditera-neutral-background-tertiary);
    background: var(--clouditera-neutral-background-white);
}
```

**要点**：
- 背景：白色（不使用渐变）
- 底部边框：`1px solid --neutral-background-tertiary`
- 内边距：`16px 20px`

---

### 3. 聊天标题 `.chat-title`

```css
.chat-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--clouditera-neutral-text-primary);
}
```

**要点**：
- 字体大小：16px
- 字重：600
- 颜色：深灰 `--neutral-text-primary`

---

### 4. 头部图标与按钮

```css
.chat-header-main {
    display: flex;
    align-items: center;
    gap: 8px;
}

.chat-icon {
    font-size: 20px;
}

.chat-header .btn-icon {
    color: var(--clouditera-neutral-gray-6);
    font-size: 16px;
    padding: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}

.chat-header .btn-icon:hover {
    color: var(--clouditera-neutral-gray-9);
    background: var(--clouditera-neutral-background-primary);
}
```

**要点**：
- 图标颜色：浅灰 `--neutral-gray-6`
- hover 状态：深灰 + 浅灰背景

---

### 5. 消息区域 `.chat-messages`

```css
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: var(--clouditera-neutral-background-primary);
}
```

**要点**：
- 背景：浅灰 `--neutral-background-primary`（或 `#fafafa`）
- 内边距：20px

---

### 6. 消息头像 `.message-avatar`

```css
.message-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    background: var(--clouditera-palette-blue-1);
}
```

**要点**：
- 尺寸：36px x 36px
- 背景：浅蓝 `--palette-blue-1`（不使用渐变）
- 圆形：`border-radius: 50%`

---

### 7. 输入区域

复用通用组件 `chat-input.css` 的样式，无需特殊定制。

---

## 布局示意

```
┌─────────────────────────────────────────┐
│  🤖 AI 智能助手                    [🗑️]  │  ← 白色背景，深灰文字
├─────────────────────────────────────────┤
│                                         │
│  ┌──┐                                   │
│  │🤖│ 你好！我是 AI 智能助手...          │  ← 浅灰背景消息区
│  └──┘                                   │
│                                         │
│  ┌──┐                                   │
│  │👤│ 帮我总结一下这个文档              │
│  └──┘                                   │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ 询问知识库相关问题...               │ │  ← 白色背景输入框
│ │                                     │ │
│ │ [📎] [🖼️]              [发送 ⌘+Enter]│ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 变更清单

需要修改的文件：

| 文件 | 修改内容 |
|------|---------|
| `frontend/agents/css/personal-knowledge-base.css` | 移除紫蓝渐变，统一为白色风格 |
| `frontend/agents/pages/personal-knowledge-base.html` | 无需修改（结构已符合） |

---

## 具体 CSS 变更

### Before（当前样式）

```css
/* 对话头部 - 紫蓝渐变 */
.chat-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.chat-title {
    color: #ffffff;
}

.chat-header .btn-icon {
    color: #ffffff;
    opacity: 0.8;
}

/* 消息头像 - 紫蓝渐变 */
.message-avatar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### After（统一样式）

```css
/* 对话头部 - 白色简洁 */
.chat-header {
    background: var(--clouditera-neutral-background-white);
    border-bottom: 1px solid var(--clouditera-neutral-border-secondary);
}

.chat-title {
    color: var(--clouditera-neutral-text-primary);
}

.chat-header .btn-icon {
    color: var(--clouditera-neutral-gray-6);
}

.chat-header .btn-icon:hover {
    color: var(--clouditera-neutral-gray-9);
    background: var(--clouditera-neutral-background-primary);
}

/* 消息头像 - 浅蓝背景 */
.message-avatar {
    background: var(--clouditera-palette-blue-1);
}
```

---

## 参考

- 漏洞猎人样式：`frontend/agents/css/vulnerability-hunter.css`
- 通用输入框组件：`frontend/components/chat-input.css`
- 设计 Token：`frontend/css/tokens.css`
