# Mock 数据系统使用说明

完整的前端 Mock 数据系统，支持在没有后端接口的情况下进行前端开发和测试。

---

## 📁 目录结构

```
frontend/mock/
├── data/                  # Mock 数据文件
│   ├── agents.js         # 智能体数据
│   ├── tasks.js          # 任务数据
│   └── users.js          # 用户数据
├── api/                   # Mock API 接口
│   ├── agent-api.js      # 智能体 API
│   ├── task-api.js       # 任务 API
│   └── user-api.js       # 用户 API
├── config/                # 配置文件
│   ├── index.js          # Mock 配置
│   └── proxy.config.js   # Proxy 代理配置
├── index.js               # Mock 主入口
└── README.md              # 本文档
```

---

## 🚀 快速开始

### 方式一: 直接使用 Mock API

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module">
        import { MockAPI } from './mock/index.js';

        // 获取智能体列表
        async function loadAgents() {
            const response = await MockAPI.agent.getAgentList({
                category: 'security',
                page: 1,
                pageSize: 10
            });

            if (response.success) {
                console.log('智能体列表:', response.data.list);
            }
        }

        loadAgents();
    </script>
</head>
<body>
    <!-- 页面内容 -->
</body>
</html>
```

### 方式二: 配置后使用

```javascript
import Mock, { MockAPI } from './mock/index.js';

// 初始化 Mock（可选）
Mock.init({
    enabled: true,
    defaultDelay: 300,
    logging: true
});

// 使用 API
async function loadData() {
    // 获取智能体详情
    const agentRes = await MockAPI.agent.getAgentDetail(1);
    console.log('智能体详情:', agentRes.data);

    // 获取任务列表
    const taskRes = await MockAPI.task.getTaskList({ agentId: 1 });
    console.log('任务列表:', taskRes.data.list);

    // 获取当前用户
    const userRes = await MockAPI.user.getCurrentUser();
    console.log('当前用户:', userRes.data);
}
```

---

## 📖 API 文档

### 智能体 API (MockAPI.agent)

#### 1. 获取智能体列表

```javascript
const response = await MockAPI.agent.getAgentList({
    category: 'security',  // 分类: 'all' | 'security' | 'automation' | 'info'
    level: 'advanced',     // 等级: 'basic' | 'advanced' | 'expert'
    keyword: '漏洞',       // 关键词搜索
    page: 1,               // 页码
    pageSize: 10           // 每页数量
});

// 响应格式
{
    success: true,
    code: 200,
    message: 'success',
    data: {
        list: [...],       // 智能体列表
        total: 4,          // 总数
        page: 1,           // 当前页
        pageSize: 10       // 每页数量
    }
}
```

#### 2. 获取智能体详情

```javascript
const response = await MockAPI.agent.getAgentDetail(1);

// 响应数据包含完整的智能体信息
{
    success: true,
    data: {
        id: 1,
        name: '自规划任务执行助手',
        icon: '🤖',
        category: 'automation',
        level: 'advanced',
        version: 'v1.2.0',
        description: '...',
        statistics: { ... }
    }
}
```

#### 3. 收藏/取消收藏

```javascript
const response = await MockAPI.agent.toggleAgentFavorite(1, true);
```

#### 4. 获取智能体分类

```javascript
const response = await MockAPI.agent.getAgentCategories();
```

### 任务 API (MockAPI.task)

#### 1. 获取任务列表

```javascript
const response = await MockAPI.task.getTaskList({
    agentId: 1,           // 智能体ID
    status: 'completed',  // 状态: 'pending' | 'running' | 'completed' | 'failed'
    page: 1,
    pageSize: 10
});
```

#### 2. 获取任务详情

```javascript
const response = await MockAPI.task.getTaskDetail('vuln-001');
```

#### 3. 创建任务

```javascript
const response = await MockAPI.task.createTask({
    agentId: 1,
    name: '新任务',
    config: { ... }
});
```

#### 4. 重新执行任务

```javascript
const response = await MockAPI.task.restartTask('vuln-002');
```

#### 5. 继续执行任务

```javascript
const response = await MockAPI.task.continueTask('vuln-002');
```

#### 6. 删除任务

```javascript
const response = await MockAPI.task.deleteTask('vuln-001');
```

#### 7. 获取任务统计

```javascript
const response = await MockAPI.task.getTaskStatistics(1);

// 响应数据
{
    total: 10,
    pending: 2,
    running: 1,
    completed: 6,
    failed: 1
}
```

### 用户 API (MockAPI.user)

#### 1. 用户登录

```javascript
const response = await MockAPI.user.login({
    username: 'test_user',
    password: '123456'
});

// 响应包含 token 和用户信息
{
    success: true,
    data: {
        token: 'mock_token_...',
        user: { ... }
    }
}
```

#### 2. 用户登出

```javascript
const response = await MockAPI.user.logout();
```

#### 3. 获取当前用户

```javascript
const response = await MockAPI.user.getCurrentUser();
```

#### 4. 更新用户信息

```javascript
const response = await MockAPI.user.updateUserProfile({
    displayName: '新名称',
    email: 'new@email.com'
});
```

#### 5. 修改密码

```javascript
const response = await MockAPI.user.changePassword({
    oldPassword: '123456',
    newPassword: 'new_password'
});
```

---

## 🔧 配置说明

### Mock 配置

在 `config/index.js` 中修改配置：

```javascript
export const mockConfig = {
    enabled: true,           // 是否启用 Mock
    defaultDelay: 300,       // 默认网络延迟（毫秒）
    randomDelay: true,       // 是否启用随机延迟
    delayRange: [200, 800],  // 随机延迟范围
    successRate: 0.95,       // 默认成功率
    baseURL: '/api',         // API 基础路径
    timeout: 10000,          // 超时时间
    logging: true,           // 是否打印日志
    logLevel: 'info'         // 日志级别
};
```

### 动态配置

```javascript
import Mock from './mock/index.js';

// 初始化时配置
Mock.init({
    enabled: true,
    defaultDelay: 500
});

// 运行时切换
Mock.setEnabled(false);  // 禁用 Mock

// 检查状态
if (Mock.isEnabled()) {
    console.log('Mock 已启用');
}

// 获取配置
const config = Mock.getConfig();
```

---

## 🌐 Proxy 代理配置

### 什么是 Proxy？

**Proxy（代理）** 是开发服务器的一个功能，用于：

1. **解决跨域问题**: 将前端请求转发到后端服务器
2. **统一接口**: 前端始终请求 `/api`，由代理转发到实际后端
3. **环境切换**: 开发、测试、生产环境使用不同的后端地址

### Proxy 的作用

```
┌─────────────┐           ┌──────────────┐           ┌─────────────┐
│   浏览器     │  请求     │  开发服务器   │  转发     │  后端服务器  │
│  (前端)     │  ───────> │   (Proxy)    │  ───────> │   (后端)    │
│             │  <─────── │              │  <─────── │             │
└─────────────┘   响应     └──────────────┘   响应     └─────────────┘

前端请求: http://localhost:3000/api/users
Proxy 转发: http://localhost:8080/users
```

### Vite Proxy 配置

创建 `vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import { proxyConfig } from './frontend/mock/config/proxy.config.js';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
});
```

### Webpack Proxy 配置

在 `webpack.config.js` 中:

```javascript
module.exports = {
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            }
        }
    }
};
```

### 多环境配置

```javascript
// 开发环境
const devProxy = {
    '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
    }
};

// 测试环境
const testProxy = {
    '/api': {
        target: 'https://test-api.clouditera.com',
        changeOrigin: true,
        secure: false  // 跳过 HTTPS 证书验证
    }
};
```

---

## 🔀 Mock vs Proxy

### 使用场景对比

| 场景 | 使用 Mock | 使用 Proxy |
|------|----------|-----------|
| 后端接口未开发 | ✅ 推荐 | ❌ 不可用 |
| 后端接口已开发 | ⚠️ 可选 | ✅ 推荐 |
| 前端独立开发 | ✅ 推荐 | ❌ |
| 联调测试 | ❌ | ✅ 推荐 |
| 离线开发 | ✅ 推荐 | ❌ |
| 模拟各种场景 | ✅ 灵活 | ❌ 有限 |

### 开发流程建议

```
阶段1: UI 开发阶段
└── 使用 Mock 数据，快速开发界面

阶段2: 后端接口开发完成
└── 切换到 Proxy，连接真实后端

阶段3: 联调测试阶段
└── 使用 Proxy + 真实后端接口

阶段4: 生产部署
└── 禁用 Mock，直接请求生产 API
```

### 混合使用

```javascript
// 根据环境变量决定使用 Mock 还是 Proxy
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

async function getAgentList() {
    if (USE_MOCK) {
        // 使用 Mock 数据
        return await MockAPI.agent.getAgentList();
    } else {
        // 使用真实接口（通过 Proxy）
        return await fetch('/api/agents').then(res => res.json());
    }
}
```

---

## 📝 最佳实践

### 1. 数据结构保持一致

Mock 数据结构应与后端接口响应保持一致：

```javascript
// ✅ 正确
{
    success: true,
    code: 200,
    message: 'success',
    data: { ... }
}

// ❌ 错误（与后端不一致）
{
    status: 'ok',
    result: { ... }
}
```

### 2. 模拟真实场景

```javascript
// 模拟网络延迟
await delay(300);

// 模拟随机失败
if (!randomSuccess(0.95)) {
    return {
        success: false,
        code: 500,
        message: '服务器错误'
    };
}

// 模拟分页
const start = (page - 1) * pageSize;
const end = start + pageSize;
return list.slice(start, end);
```

### 3. 使用环境变量

```javascript
// .env.development
VITE_USE_MOCK=true
VITE_API_BASE_URL=http://localhost:8080

// .env.production
VITE_USE_MOCK=false
VITE_API_BASE_URL=https://api.clouditera.com
```

### 4. 统一接口调用

创建 API 工具函数：

```javascript
// utils/request.js
import { MockAPI } from '../mock/index.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function request(url, options = {}) {
    if (USE_MOCK) {
        // 使用 Mock 数据
        return await callMockAPI(url, options);
    } else {
        // 使用真实接口
        return await fetch(url, options).then(res => res.json());
    }
}
```

---

## 🎯 使用示例

### 示例1: 加载智能体列表

```javascript
import { MockAPI } from './mock/index.js';

async function loadAgents() {
    try {
        const response = await MockAPI.agent.getAgentList({
            category: 'all',
            page: 1,
            pageSize: 10
        });

        if (response.success) {
            const agents = response.data.list;
            renderAgents(agents);
        } else {
            console.error('加载失败:', response.message);
        }
    } catch (error) {
        console.error('请求异常:', error);
    }
}

function renderAgents(agents) {
    const container = document.getElementById('agentsGrid');
    agents.forEach(agent => {
        // 渲染智能体卡片
        const card = createAgentCard(agent);
        container.appendChild(card);
    });
}
```

### 示例2: 创建并执行任务

```javascript
async function createAndRunTask() {
    // 1. 创建任务
    const createRes = await MockAPI.task.createTask({
        agentId: 1,
        name: '新的漏洞扫描任务',
        config: {
            target: 'https://example.com',
            depth: 3
        }
    });

    if (!createRes.success) {
        console.error('创建失败:', createRes.message);
        return;
    }

    const taskId = createRes.data.id;
    console.log('任务创建成功:', taskId);

    // 2. 获取任务详情
    const detailRes = await MockAPI.task.getTaskDetail(taskId);
    console.log('任务详情:', detailRes.data);

    // 3. 如果失败，重新执行
    if (detailRes.data.status === 'failed') {
        await MockAPI.task.restartTask(taskId);
        console.log('任务已重新启动');
    }
}
```

### 示例3: 用户登录

```javascript
async function handleLogin(formData) {
    const response = await MockAPI.user.login({
        username: formData.username,
        password: formData.password
    });

    if (response.success) {
        const { token, user } = response.data;

        // 保存登录信息
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_info', JSON.stringify(user));

        // 跳转到首页
        window.location.href = '/dashboard.html';
    } else {
        alert(response.message);
    }
}
```

---

## 🔍 调试技巧

### 1. 启用日志

```javascript
Mock.init({
    logging: true,
    logLevel: 'debug'  // 'debug' | 'info' | 'warn' | 'error'
});
```

### 2. 查看请求详情

```javascript
Mock.logger.info('正在请求智能体列表', { page: 1, pageSize: 10 });
const response = await MockAPI.agent.getAgentList({ page: 1, pageSize: 10 });
Mock.logger.info('响应数据', response);
```

### 3. 模拟不同场景

```javascript
// 模拟成功
const successRes = await MockAPI.agent.getAgentDetail(1);

// 模拟失败（ID 不存在）
const failedRes = await MockAPI.agent.getAgentDetail(999);

// 模拟网络延迟
Mock.init({ defaultDelay: 2000 });
```

---

## ⚠️ 注意事项

1. **生产环境禁用 Mock**: 确保生产环境不会使用 Mock 数据
2. **数据同步**: Mock 数据与后端接口保持同步
3. **测试覆盖**: 使用 Mock 测试各种场景（成功、失败、边界情况）
4. **性能**: Mock 数据量不宜过大，影响性能
5. **安全**: Mock 中的密码等敏感信息仅用于开发环境

---

## 📚 相关文档

- [Vite Server Options](https://vitejs.dev/config/server-options.html)
- [Webpack DevServer Proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

---

**创建时间**: 2024-12-24
**维护者**: Clouditera Team
