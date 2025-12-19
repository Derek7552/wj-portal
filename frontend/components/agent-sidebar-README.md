# 智能体侧导航组件 (Agent Sidebar Component)

统一的智能体侧导航组件，用于显示任务列表和快速导航。

## 文件结构

```
components/
├── agent-sidebar.html       # HTML 模板
├── agent-sidebar.css        # 样式文件
├── agent-sidebar.js         # JavaScript 功能
└── agent-sidebar-README.md  # 使用说明（本文件）
```

## 功能特性

- ✅ 统一的样式和交互体验
- ✅ 新任务按钮（渐变色、悬停效果）
- ✅ 近期任务列表（支持滚动）
- ✅ 任务状态图标（进行中、已完成、失败）
- ✅ 查看全部任务入口
- ✅ 响应式设计，支持移动端
- ✅ 完整的 JavaScript API

## 快速开始

### 1. 引入文件

在 HTML 页面的 `<head>` 中引入样式：

```html
<link rel="stylesheet" href="../components/agent-sidebar.css">
```

在 `</body>` 前引入脚本：

```html
<script src="../components/agent-sidebar.js"></script>
```

### 2. 插入 HTML

```html
<aside class="agent-sidebar">
    <nav class="agent-nav">
        <!-- 新任务按钮 -->
        <button class="btn-new-chat" id="btnNewTask">
            <span class="btn-icon">✨</span>
            <span class="btn-text">新任务</span>
        </button>

        <!-- 近期任务 -->
        <div class="nav-group">
            <div class="nav-group-title">近期任务</div>

            <!-- 近期任务列表 -->
            <div class="recent-tasks-list" id="recentTasksList">
                <!-- 任务项将通过 JavaScript 动态生成 -->
            </div>

            <!-- 查看全部入口 -->
            <a href="#" class="view-all-tasks" id="viewAllTasks">
                查看全部任务记录 →
            </a>
        </div>
    </nav>
</aside>
```

### 3. 初始化组件

```javascript
// 准备任务数据
const tasks = [
    {
        id: 'task-001',
        name: '代码安全漏洞挖掘任务',
        status: 'completed', // running | completed | failed | pending
        active: true
    },
    {
        id: 'task-002',
        name: '开发用户认证系统',
        status: 'running',
        active: false
    }
];

// 初始化组件
const sidebar = initAgentSidebar({
    tasks: tasks,
    maxTasks: 10,
    onNewTask: function() {
        console.log('创建新任务');
        // 处理新任务逻辑
    },
    onTaskClick: function(taskId, task) {
        console.log('点击任务:', taskId);
        // 加载任务详情
    },
    onViewAll: function() {
        console.log('查看全部任务');
        // 显示全部任务列表
    }
});
```

## 配置选项

### JavaScript 选项

```javascript
initAgentSidebar({
    // 组件选择器
    selector: '.agent-sidebar',

    // 任务列表数据
    tasks: [],

    // 显示的最大任务数
    maxTasks: 10,

    // 新任务按钮点击回调
    onNewTask: function() {
        // 处理新任务
    },

    // 任务项点击回调
    onTaskClick: function(taskId, task) {
        // 处理任务点击
    },

    // 查看全部按钮点击回调
    onViewAll: function() {
        // 显示全部任务列表
    }
});
```

### 任务数据格式

```javascript
{
    id: 'task-001',           // 任务ID（必填）
    name: '任务名称',          // 任务名称（必填）
    status: 'completed',      // 任务状态：running | completed | failed | pending
    active: true              // 是否为当前活动任务
}
```

### 任务状态说明

| 状态 | 图标 | 说明 |
|------|------|------|
| `running` | ⏳ | 进行中 |
| `completed` | ✅ | 已完成 |
| `failed` | ❌ | 失败 |
| `pending` | ⏸️ | 待处理 |

## API 方法

初始化后返回的组件实例提供以下方法：

```javascript
const sidebar = initAgentSidebar({ ... });

// 更新任务列表
sidebar.updateTasks([
    { id: 'task-001', name: '新任务', status: 'running' }
]);

// 添加单个任务
sidebar.addTask({
    id: 'task-003',
    name: '新增的任务',
    status: 'pending'
});

// 移除任务
sidebar.removeTask('task-001');

// 设置活动任务
sidebar.setActiveTask('task-002');

// 获取当前任务列表
const currentTasks = sidebar.getTasks();

// 清空任务列表
sidebar.clearTasks();

// 访问 DOM 元素
sidebar.element;      // 容器元素
sidebar.tasksList;    // 任务列表元素

// 销毁组件
sidebar.destroy();
```

## 使用示例

### 示例 1: 基础用法

```javascript
const sidebar = initAgentSidebar({
    tasks: [
        { id: '1', name: '任务1', status: 'completed', active: true },
        { id: '2', name: '任务2', status: 'running', active: false }
    ],
    onNewTask: function() {
        showNewTaskView();
    },
    onTaskClick: function(taskId) {
        loadTaskDetail(taskId);
    },
    onViewAll: function() {
        showAllTasksList();
    }
});
```

### 示例 2: 从 API 加载任务

```javascript
// 从 API 获取任务列表
async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    const sidebar = initAgentSidebar({
        tasks: tasks,
        onTaskClick: function(taskId) {
            loadTaskDetail(taskId);
        }
    });
}

loadTasks();
```

### 示例 3: 动态更新任务

```javascript
const sidebar = initAgentSidebar({
    tasks: []
});

// 创建新任务后，添加到列表
function createNewTask(taskName) {
    const newTask = {
        id: generateTaskId(),
        name: taskName,
        status: 'running',
        active: false
    };

    sidebar.addTask(newTask);
    sidebar.setActiveTask(newTask.id);
}
```

### 示例 4: 集成到现有页面

```javascript
// template-planning.js 中
document.addEventListener('DOMContentLoaded', function() {
    // 初始化侧导航
    const sidebar = initAgentSidebar({
        tasks: mockTasks,
        maxTasks: 10,
        onNewTask: showNewTaskView,
        onTaskClick: loadTaskDetail,
        onViewAll: showAllTasksList
    });

    // 保存实例供其他函数使用
    window.agentSidebar = sidebar;
});
```

## 样式自定义

如需自定义样式，可以在页面专用 CSS 中覆盖：

```css
/* 修改侧导航宽度 */
.your-page .agent-sidebar {
    width: 220px;
}

/* 修改新任务按钮颜色 */
.your-page .btn-new-chat {
    background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
}

/* 修改任务列表最大高度 */
.your-page .recent-tasks-list {
    max-height: 400px;
}
```

## 响应式设计

组件自带响应式设计：

- **桌面端（>992px）**: 宽度 200px
- **平板端（768-992px）**: 宽度 180px
- **移动端（<768px）**: 隐藏

## 与其他组件集成

### 与聊天输入框组件配合使用

```javascript
// 初始化侧导航
const sidebar = initAgentSidebar({
    onTaskClick: function(taskId) {
        loadTaskDetail(taskId);

        // 重新初始化聊天输入框
        initChatInput({
            selector: '.chat-area .chat-input-container',
            onSend: function(message) {
                sendMessageToTask(taskId, message);
            }
        });
    }
});
```

## 最佳实践

1. ✅ **保持数据一致性**：任务列表数据应与后端同步
2. ✅ **合理限制数量**：使用 `maxTasks` 限制显示数量，避免列表过长
3. ✅ **提供反馈**：任务点击后应有明显的视觉反馈
4. ✅ **性能优化**：大量任务时使用虚拟滚动或分页加载
5. ✅ **无障碍访问**：保留按钮的 `title` 属性和语义化标签

## 兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 常见问题

### Q: 如何隐藏"查看全部"按钮？

A: 通过 CSS 隐藏：

```css
.view-all-tasks {
    display: none;
}
```

或在初始化后移除：

```javascript
const sidebar = initAgentSidebar({ ... });
sidebar.element.querySelector('.view-all-tasks').style.display = 'none';
```

### Q: 任务状态图标可以自定义吗？

A: 可以修改 `getTaskStatusConfig` 函数中的图标：

```javascript
// 在 agent-sidebar.js 中修改
function getTaskStatusConfig(status) {
    const configs = {
        'running': { icon: '🔄', text: '进行中' },  // 自定义图标
        'completed': { icon: '✔️', text: '已完成' },
        // ...
    };
    return configs[status] || { icon: '⏸️', text: '未知' };
}
```

### Q: 如何禁用任务点击？

A: 设置任务项为不可点击：

```css
.recent-task-item {
    pointer-events: none;
    opacity: 0.6;
}

/* 只允许特定任务可点击 */
.recent-task-item[data-task-id="task-001"] {
    pointer-events: auto;
    opacity: 1;
}
```

## 更新日志

### v1.0.0 (2024-12-18)
- ✨ 初始版本
- ✨ 统一自规划任务执行助手和快速对话模式的侧导航
- ✨ 提供完整的 JavaScript API
- ✨ 支持响应式设计

## 维护者

产品设计团队 & 前端开发团队

## 相关组件

- [聊天输入框组件](./README.md)
- [Design System](./../.designsystem/README.md)
