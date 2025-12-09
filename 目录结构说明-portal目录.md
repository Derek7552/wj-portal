# 目录结构说明 - Portal目录

## 📁 Portal目录结构

Portal（门户）相关页面已独立到 `frontend/portal/` 目录，结构与 `frontend/agents/` 和 `frontend/templates/` 类似：

```
frontend/
├── portal/                          # Portal门户目录
│   ├── pages/                       # Portal HTML页面
│   │   ├── index.html               # 首页（云脑门户）
│   │   ├── news.html                # 资讯列表页
│   │   ├── news-detail.html         # 资讯详情页
│   │   ├── papers.html              # 论文列表页
│   │   ├── paper-detail.html        # 论文详情页
│   │   ├── resources.html           # 资源页面
│   │   ├── login.html               # 登录页面
│   │   └── register.html            # 注册页面
│   │
│   ├── css/                          # Portal专用样式
│   │   ├── index.css                # 首页样式
│   │   ├── news.css                 # 资讯列表页样式
│   │   ├── news-detail.css          # 资讯详情页样式
│   │   ├── papers.css               # 论文列表页样式
│   │   ├── paper-detail.css         # 论文详情页样式
│   │   ├── resources.css            # 资源页面样式
│   │   ├── auth.css                 # 登录注册页面样式
│   │   └── position-fix.css        # 定位修复样式
│   │
│   └── js/                           # Portal专用脚本
│       └── resources.js              # 资源页面脚本
│
├── agents/                           # 智能体实际应用目录
├── templates/                        # UI模版目录
├── css/                              # 全局通用样式
├── js/                               # 全局通用脚本
├── dashboard.html                    # 仪表盘页面
├── templates.html                    # UI模版库页面
└── index.html                        # 首页重定向（跳转到 portal/pages/index.html）
```

---

## 🔗 路径引用规则

### 从 `portal/pages/` 目录引用资源

**引用全局资源（frontend根目录）：**
- CSS: `../../css/common.css`
- JS: `../../js/common.js`, `../../js/window-size.js`
- HTML: `../../dashboard.html`, `../../templates.html`

**引用portal目录下的资源：**
- CSS: `../css/index.css`, `../css/news.css` 等
- JS: `../js/resources.js`

**引用同目录下的页面：**
- HTML: `news-detail.html`, `papers.html`, `login.html` 等（相对路径，无需前缀）

---

## 📋 Portal页面列表

### 1. 首页（index.html）
- **文件**: `portal/pages/index.html`
- **样式**: `portal/css/index.css`, `portal/css/position-fix.css`
- **脚本**: `../../js/common.js`, `../../js/window-size.js`
- **用途**: 云脑平台门户首页，展示平台介绍和价值主张

### 2. 资讯相关
- **列表页**: `portal/pages/news.html` - 样式：`portal/css/news.css`
- **详情页**: `portal/pages/news-detail.html` - 样式：`portal/css/news-detail.css`

### 3. 论文相关
- **列表页**: `portal/pages/papers.html` - 样式：`portal/css/papers.css`
- **详情页**: `portal/pages/paper-detail.html` - 样式：`portal/css/paper-detail.css`

### 4. 资源页面
- **文件**: `portal/pages/resources.html`
- **样式**: `portal/css/resources.css`
- **脚本**: `portal/js/resources.js`

### 5. 认证页面
- **登录**: `portal/pages/login.html` - 样式：`portal/css/auth.css`
- **注册**: `portal/pages/register.html` - 样式：`portal/css/auth.css`

---

## 🔄 页面跳转链接

### Portal内部链接（同目录）
所有portal页面之间的导航链接使用相对路径：
- `index.html` → `news.html`, `papers.html`, `resources.html`, `login.html`, `register.html`
- `news.html` → `news-detail.html?id=X`
- `papers.html` → `paper-detail.html?id=X`

### 跨目录链接
- Portal页面 → Dashboard: `../../dashboard.html`
- Portal页面 → Templates: `../../templates.html`
- Portal页面 → Agents: `../../agents/pages/agent-*.html`

---

## 📝 首页重定向

在 `frontend/` 根目录下创建了 `index.html` 重定向文件，自动跳转到 `portal/pages/index.html`。

这样可以保持URL的简洁性：
- 访问 `http://domain.com/` → 自动跳转到 `portal/pages/index.html`
- 访问 `http://domain.com/portal/pages/index.html` → 直接访问首页

---

## ⚠️ 注意事项

1. **路径引用必须正确**
   - 从 `portal/pages/` 引用全局资源需要 `../../` 前缀
   - 从 `portal/pages/` 引用 `portal/` 下的资源需要 `../` 前缀

2. **同目录链接**
   - Portal页面之间的链接使用相对路径（如 `news-detail.html`）
   - 这样可以保持链接的简洁性和可维护性

3. **全局样式和脚本**
   - `css/common.css` 和 `js/common.js` 是全局共享的
   - Portal页面通过 `../../css/common.css` 引用

---

**最后更新**: 2024-12-09
