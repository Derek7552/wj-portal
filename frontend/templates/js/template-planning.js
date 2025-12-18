/* ==========================================
   自规划任务执行助手 - 交互逻辑
   ========================================== */

// 任务列表相关变量（需要在函数定义之前初始化）
let currentPage = 1;
const pageSize = 6; // 每页显示6个任务

// 模拟任务数据
const mockTasks = [
    {
        id: 'task-001',
        name: '代码安全漏洞挖掘任务',
        status: 'completed',
        createTime: '2024-12-11 14:30',
        findings: {
            total: 8,
            high: 3,
            medium: 4,
            low: 1
        }
    },
    {
        id: 'task-002',
        name: '开发用户认证系统',
        status: 'running',
        createTime: '2024-12-11 10:15',
        findings: {
            total: 5,
            high: 1,
            medium: 3,
            low: 1
        }
    },
    {
        id: 'task-003',
        name: '数据库优化方案',
        status: 'completed',
        createTime: '2024-12-10 16:45',
        findings: {
            total: 12,
            high: 2,
            medium: 7,
            low: 3
        }
    },
    {
        id: 'task-004',
        name: 'API接口文档生成',
        status: 'failed',
        createTime: '2024-12-10 09:20',
        findings: {
            total: 0,
            high: 0,
            medium: 0,
            low: 0
        }
    },
    {
        id: 'task-005',
        name: '前端性能优化分析',
        status: 'completed',
        createTime: '2024-12-09 15:30',
        findings: {
            total: 6,
            high: 1,
            medium: 4,
            low: 1
        }
    },
    {
        id: 'task-006',
        name: '系统架构设计评审',
        status: 'running',
        createTime: '2024-12-09 11:00',
        findings: {
            total: 3,
            high: 0,
            medium: 2,
            low: 1
        }
    },
    {
        id: 'task-007',
        name: '安全配置检查',
        status: 'completed',
        createTime: '2024-12-08 14:20',
        findings: {
            total: 10,
            high: 4,
            medium: 5,
            low: 1
        }
    },
    {
        id: 'task-008',
        name: '代码重构建议',
        status: 'completed',
        createTime: '2024-12-08 10:10',
        findings: {
            total: 7,
            high: 1,
            medium: 4,
            low: 2
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initToolsTabs();
    initTaskList();
    initChatInput();
    initEventClickHandlers();
    initPhaseProgress();
    initFileTree();
    initLogNavigation();
});

/* ==========================================
   导航功能
   ========================================== */

function initNavigation() {
    // 首页导航 - hover显示收藏快捷入口
    const homeWrapper = document.querySelector('.nav-item-home-wrapper');
    const homeMenu = document.getElementById('homeMenu');

    if (homeWrapper && homeMenu) {
        homeWrapper.addEventListener('mouseenter', function() {
            homeMenu.style.display = 'block';
        });

        homeWrapper.addEventListener('mouseleave', function() {
            homeMenu.style.display = 'none';
        });
    }

    // 用户菜单
    const userNavItem = document.getElementById('userNavItem');
    const userMenu = document.getElementById('userMenu');

    if (userNavItem && userMenu) {
        userNavItem.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = userMenu.style.display === 'block';
            userMenu.style.display = isVisible ? 'none' : 'block';
        });

        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!userNavItem.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.style.display = 'none';
            }
        });
    }

    // 退出登录
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('确定要退出登录吗？')) {
                console.log('退出登录');
                // 这里添加退出登录逻辑
            }
        });
    }
}

/* ==========================================
   工具面板Tab切换
   ========================================== */

function initToolsTabs() {
    const tabs = document.querySelectorAll('.tools-tab');
    const contents = document.querySelectorAll('.tools-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            // 移除所有active状态
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // 添加当前tab的active状态
            this.classList.add('active');
            const targetContent = document.getElementById('tab' + capitalize(tabName));
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ==========================================
   任务列表
   ========================================== */

function initTaskList() {
    const taskItems = document.querySelectorAll('.recent-task-item');

    taskItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除其他任务的active状态
            taskItems.forEach(t => t.classList.remove('active'));

            // 添加当前任务的active状态
            this.classList.add('active');

            // 这里可以加载任务详情
            console.log('切换任务');
            
            // 恢复显示右侧工具面板
            const toolsPanel = document.querySelector('.tools-panel');
            if (toolsPanel) {
                toolsPanel.style.display = '';
            }
        });
    });

    // 新任务按钮
    const btnNewTask = document.getElementById('btnNewTask');
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function() {
            // 显示新任务输入界面
            console.log('创建新任务');
        });
    }

    // 查看全部任务按钮
    const viewAllTasks = document.getElementById('viewAllTasks');
    if (viewAllTasks) {
        viewAllTasks.addEventListener('click', function(e) {
            e.preventDefault();
            showAllTasksList();
        });
    }
}

/* ==========================================
   聊天输入
   ========================================== */

function initChatInput() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.getElementById('chatMessages');

    if (chatInput) {
        // 自动调整高度
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });

        // Shift+Enter 发送
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 发送按钮
    const sendBtn = document.querySelector('.chat-input-toolbar .btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();

    if (!message) return;

    console.log('发送消息:', message);

    // 清空输入框
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // 这里可以添加消息到聊天区域
}

/* ==========================================
   事件点击处理（工具调用、文档）
   ========================================== */

function initEventClickHandlers() {
    // 工具调用点击
    const toolEvents = document.querySelectorAll('.event-tool');
    toolEvents.forEach(tool => {
        tool.addEventListener('click', function() {
            const toolId = this.dataset.toolId;
            showToolLog(toolId);

            // 移除其他active状态
            document.querySelectorAll('.event-tool, .event-document').forEach(e => {
                e.classList.remove('active');
            });
            // 添加当前active状态
            this.classList.add('active');

            // 切换到日志tab
            switchToLogsTab();
        });
    });

    // 文档点击
    const documentEvents = document.querySelectorAll('.event-document');
    documentEvents.forEach(doc => {
        doc.addEventListener('click', function() {
            const docId = this.dataset.docId;
            showDocumentLog(docId);

            // 移除其他active状态
            document.querySelectorAll('.event-tool, .event-document').forEach(e => {
                e.classList.remove('active');
            });
            // 添加当前active状态
            this.classList.add('active');

            // 切换到日志tab
            switchToLogsTab();
        });
    });

    // 最终回复中的文档卡片点击
    const docCards = document.querySelectorAll('.doc-card');
    docCards.forEach(card => {
        card.addEventListener('click', function() {
            const docId = this.dataset.docId;
            showDocumentLog(docId);

            // 切换到日志tab
            switchToLogsTab();
        });
    });
}

function switchToLogsTab() {
    // 切换到日志tab
    const logsTab = document.querySelector('.tools-tab[data-tab="logs"]');
    if (logsTab) {
        logsTab.click();
    }
}

// 工具调用日志数据
const toolLogs = {
    'tool-1': {
        title: '读取项目目录结构',
        function: 'list_directory',
        params: { path: 'src/' },
        output: `src/
├── main/
│   ├── java/
│   │   └── com/example/
│   │       ├── controller/
│   │       │   ├── AuthController.java
│   │       │   └── UserController.java
│   │       ├── repository/
│   │       │   └── UserRepository.java
│   │       └── config/
│   │           └── SecurityConfig.java
│   └── resources/
│       ├── application.yml
│       └── templates/
│           └── user-profile.html
└── test/
    └── java/`
    },
    'tool-2': {
        title: '读取配置文件',
        function: 'read_file',
        params: { path: 'application.yml' },
        output: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/myapp
    username: root
    password: secret123
  jpa:
    hibernate:
      ddl-auto: update
server:
  port: 8080`
    },
    'tool-3': {
        title: '读取认证控制器代码',
        function: 'read_file',
        params: { path: 'AuthController.java' },
        output: `@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 认证逻辑
        return ResponseEntity.ok(token);
    }
}`
    },
    'tool-4': {
        title: '读取数据访问层代码',
        function: 'read_file',
        params: { path: 'UserRepository.java' },
        output: `@Repository
public class UserRepository {
    @Query("SELECT * FROM users WHERE id = " + userId)
    public User findById(String userId) {
        // SQL注入漏洞！
    }
}`
    },
    'tool-5': {
        title: '查看工程记忆文件',
        function: 'read_file',
        params: { path: '工程记忆.md' },
        output: `# 工程记忆文件

## 核心模块
- 用户认证模块
- 权限管理模块
- 数据访问层

## 关键发现
- UserRepository存在SQL拼接`
    },
    'tool-6': {
        title: '深入分析数据库查询代码',
        function: 'read_file',
        params: { path: 'UserRepository.java', lines: '45-78' },
        output: `45: public User findByUsername(String username) {
46:     String sql = "SELECT * FROM users WHERE username = '" + username + "'";
47:     // 直接字符串拼接，存在SQL注入风险！
48:     return jdbcTemplate.queryForObject(sql, new UserRowMapper());
49: }`
    },
    'tool-7': {
        title: '读取前端模板文件',
        function: 'read_file',
        params: { path: 'user-profile.html' },
        output: `<div class="user-profile">
  <h2>${user.nickname}</h2>
  <!-- 未转义，存在XSS风险 -->
</div>`
    },
    'tool-8': {
        title: '分析权限校验逻辑',
        function: 'read_file',
        params: { path: 'SecurityConfig.java' },
        output: `@Configuration
public class SecurityConfig {
    // 部分管理接口未配置权限
    .antMatchers("/api/admin/**").permitAll()
}`
    },
    'tool-9': {
        title: '更新工程记忆文件',
        function: 'edit_file',
        params: { path: '工程记忆.md', action: 'append' },
        output: '已添加漏洞分析记录到工程记忆文件'
    },
    'tool-10': {
        title: '读取工程记忆文件',
        function: 'read_file',
        params: { path: '工程记忆.md' },
        output: `# 工程记忆文件

## 已发现漏洞
- SQL注入 (高危)
- XSS (中危)
- 越权访问 (高危)`
    },
    'tool-11': {
        title: '读取漏洞报告',
        function: 'read_file',
        params: { path: '漏洞报告.md' },
        output: `# 漏洞详细报告

共发现8个安全漏洞，详见下表...`
    }
};

// 文档日志数据
const documentLogs = {
    'doc-1': {
        title: '工程功能模块分析总结',
        filename: '模块分析总结.md',
        size: '8 KB',
        content: `# 工程功能模块分析总结

## 项目概况
- 项目类型：Java Spring Boot Web应用
- 核心功能：用户认证、权限管理、数据访问

## 模块划分
1. **用户认证模块** (AuthController)
   - 登录/登出功能
   - Token生成与验证

2. **权限管理模块** (SecurityConfig)
   - 角色权限配置
   - API访问控制

3. **数据访问层** (UserRepository)
   - 用户数据CRUD
   - 数据库查询操作

## 关键代码路径
- \`src/main/java/com/example/controller/AuthController.java\`
- \`src/main/java/com/example/repository/UserRepository.java\`
- \`src/main/java/com/example/config/SecurityConfig.java\``
    },
    'doc-2': {
        title: '工程功能记忆文件',
        filename: '工程记忆.md',
        size: '9 KB',
        content: `# 工程记忆文件

## 核心模块
- 用户认证模块
- 权限管理模块
- 数据访问层

## 已发现问题
- UserRepository.java:67 - SQL注入漏洞
- user-profile.html:23 - XSS漏洞
- SecurityConfig.java:34 - 越权访问漏洞

## 分析进度
- ✓ 功能模块分析
- ✓ 威胁建模
- ✓ 漏洞深度分析`
    },
    'doc-3': {
        title: '漏洞详细报告',
        filename: '漏洞报告.md',
        size: '12 KB',
        content: `# 漏洞详细报告

## 高危漏洞 (3个)

### 1. SQL注入漏洞
**位置**: UserRepository.java:67
**描述**: 用户输入未经过滤直接拼接到SQL语句中
**修复建议**: 使用参数化查询或ORM框架

### 2. 越权访问漏洞
**位置**: SecurityConfig.java:34
**描述**: 部分管理接口未配置权限校验
**修复建议**: 为所有管理接口添加权限注解

### 3. 硬编码密钥
**位置**: JwtUtil.java:12
**描述**: JWT密钥硬编码在代码中
**修复建议**: 将密钥存储在环境变量或配置文件中

## 中危漏洞 (4个)
...`
    },
    'doc-4': {
        title: '工程安全评估总结报告',
        filename: '安全评估报告.md',
        size: '18 KB',
        content: `# 工程安全评估总结报告

## 评估概况
- 评估日期：2024-12-11
- 项目类型：Java Spring Boot Web应用
- 分析文件数：18个
- 发现漏洞数：8个

## 风险等级分布
- 高危：3个
- 中危：4个
- 低危：1个

## 主要风险点
1. 输入验证不足
2. 权限控制缺失
3. 敏感信息暴露

## 修复优先级
1. 立即修复所有高危漏洞
2. 1周内修复中危漏洞
3. 1个月内修复低危漏洞`
    }
};

// 任务清单日志
const taskListLog = {
    'task-list': {
        title: '任务清单',
        description: '全局任务执行情况',
        tasks: [
            { name: 'SQL注入漏洞检测', status: 'completed' },
            { name: 'XSS跨站脚本检测', status: 'completed' },
            { name: 'CSRF漏洞检测', status: 'completed' },
            { name: '认证授权缺陷检测', status: 'completed' },
            { name: '敏感数据暴露检测', status: 'completed' },
            { name: '不安全的反序列化检测', status: 'completed' }
        ]
    }
};

function showToolLog(toolId) {
    const log = toolLogs[toolId];
    if (!log) {
        console.log('未找到工具日志:', toolId);
        return;
    }

    console.log('显示工具日志:', toolId, log);
    const logPlaceholder = document.getElementById('logPlaceholder');
    const logDetail = document.getElementById('logDetail');

    // 隐藏占位符，显示详情
    logPlaceholder.style.display = 'none';
    logDetail.style.display = 'block';

    // 生成描述文本
    let toolText = `使用 <code>${log.function}</code> 工具`;
    let purposeText = '';
    let contentTitle = '';
    const params = log.params || {};

    if (log.function === 'read_file') {
        const path = params.path || '';
        const lines = params.lines ? ` 的第 <code>${params.lines}</code> 行` : '';
        purposeText = `读取 <code>${path}</code>${lines}`;
        contentTitle = path || '文件内容';
    } else if (log.function === 'list_directory') {
        const path = params.path || '';
        purposeText = `列出目录 <code>${path}</code> 的内容`;
        contentTitle = path || '目录内容';
    } else if (log.function === 'edit_file') {
        const path = params.path || '';
        const action = params.action || '编辑';
        purposeText = `${action}文件 <code>${path}</code>`;
        contentTitle = path || '文件内容';
    } else if (log.function === 'visit_url' || log.function === 'fetch_url') {
        const url = params.url || '';
        purposeText = `访问 <code>${url}</code>`;
        contentTitle = url || '网页内容';
    } else {
        // 默认格式
        const paramsStr = Object.entries(params).map(([k, v]) => `<code>${k}: ${v}</code>`).join(', ');
        purposeText = `执行操作${paramsStr ? `，参数：${paramsStr}` : ''}`;
        contentTitle = log.title || '执行结果';
    }

    // 填充日志详情
    logDetail.innerHTML = `
        <div class="log-detail-content">
            <div class="log-description">
                <div class="log-desc-content">
                    <div class="log-desc-tool">${toolText}</div>
                    <div class="log-desc-purpose">${purposeText}</div>
                </div>
            </div>
            <div class="log-output">
                <div class="log-content-title">${contentTitle}</div>
                <div class="log-code">${log.output}</div>
            </div>
        </div>
    `;
}

function showDocumentLog(docId) {
    const doc = documentLogs[docId];
    if (!doc) {
        console.log('未找到文档日志:', docId);
        return;
    }

    console.log('显示文档日志:', docId, doc);
    const logPlaceholder = document.getElementById('logPlaceholder');
    const logDetail = document.getElementById('logDetail');

    // 隐藏占位符，显示详情
    logPlaceholder.style.display = 'none';
    logDetail.style.display = 'block';

    // 生成描述文本
    const toolText = '生成文档';
    const purposeText = `<code>${doc.filename}</code>，大小为 <code>${doc.size}</code>`;
    const contentTitle = doc.filename || '文档内容';

    // 填充文档详情
    logDetail.innerHTML = `
        <div class="log-detail-content">
            <div class="log-description doc-description">
                <div class="log-desc-content">
                    <div class="log-desc-tool">${toolText}</div>
                    <div class="log-desc-purpose">${purposeText}</div>
                </div>
            </div>
            <div class="log-output">
                <div class="log-content-title">${contentTitle}</div>
                <div class="log-code">${doc.content}</div>
            </div>
        </div>
    `;
}

function closeLogDetail() {
    const logPlaceholder = document.getElementById('logPlaceholder');
    const logDetail = document.getElementById('logDetail');

    // 显示占位符，隐藏详情
    logPlaceholder.style.display = 'block';
    logDetail.style.display = 'none';

    // 移除所有active状态
    document.querySelectorAll('.event-tool, .event-document').forEach(e => {
        e.classList.remove('active');
    });
}

function showTaskList() {
    const taskLog = taskListLog['task-list'];
    if (!taskLog) {
        console.log('未找到任务清单');
        return;
    }

    console.log('显示任务清单:', taskLog);
    const logPlaceholder = document.getElementById('logPlaceholder');
    const logDetail = document.getElementById('logDetail');

    // 隐藏占位符，显示详情
    logPlaceholder.style.display = 'none';
    logDetail.style.display = 'block';

    // 生成任务列表HTML
    const tasksHtml = taskLog.tasks.map(task => {
        const statusClass = task.status === 'completed' ? 'completed' :
                           task.status === 'running' ? 'running' : 'pending';
        const statusIcon = task.status === 'completed' ? '✓' :
                          task.status === 'running' ? '🔄' : '⏸️';

        return `
            <div class="task-list-item ${statusClass}">
                <span class="task-status-indicator">${statusIcon}</span>
                <span class="task-name">${task.name}</span>
            </div>
        `;
    }).join('');

    // 填充任务清单详情
    logDetail.innerHTML = `
        <div class="log-detail-content">
            <div class="log-description">
                <div class="log-desc-content">
                    <div class="log-desc-tool">${taskLog.title}</div>
                    <div class="log-desc-purpose">${taskLog.description}</div>
                </div>
            </div>
            <div class="log-output">
                <div class="log-content-title">任务执行情况</div>
                <div class="task-list-container">
                    ${tasksHtml}
                </div>
            </div>
        </div>
    `;
}

/* ==========================================
   导航功能
   ========================================== */

function initNavigation() {
    // 首页导航 - hover显示收藏快捷入口
    const homeWrapper = document.querySelector('.nav-item-home-wrapper');
    const homeMenu = document.getElementById('homeMenu');

    if (homeWrapper && homeMenu) {
        homeWrapper.addEventListener('mouseenter', function() {
            homeMenu.style.display = 'block';
        });

        homeWrapper.addEventListener('mouseleave', function() {
            homeMenu.style.display = 'none';
        });
    }

    // 用户菜单
    const userNavItem = document.getElementById('userNavItem');
    const userMenu = document.getElementById('userMenu');

    if (userNavItem && userMenu) {
        userNavItem.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = userMenu.style.display === 'block';
            userMenu.style.display = isVisible ? 'none' : 'block';
        });

        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!userNavItem.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.style.display = 'none';
            }
        });
    }

    // 退出登录
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('确定要退出登录吗？')) {
                console.log('退出登录');
                // 这里添加退出登录逻辑
            }
        });
    }
}

/* ==========================================
   工具面板Tab切换
   ========================================== */

function initToolsTabs() {
    const tabs = document.querySelectorAll('.tools-tab');
    const contents = document.querySelectorAll('.tools-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            // 移除所有active状态
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // 添加当前tab的active状态
            this.classList.add('active');
            const targetContent = document.getElementById('tab' + capitalize(tabName));
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ==========================================
   任务列表
   ========================================== */

function initTaskList() {
    const taskItems = document.querySelectorAll('.recent-task-item');

    taskItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // 移除其他任务的active状态
            taskItems.forEach(t => t.classList.remove('active'));

            // 添加当前任务的active状态
            this.classList.add('active');

            // 这里可以加载任务详情
            console.log('切换任务');
            
            // 恢复显示右侧工具面板
            const toolsPanel = document.querySelector('.tools-panel');
            if (toolsPanel) {
                toolsPanel.style.display = '';
            }
        });
    });

    // 新任务按钮
    const btnNewTask = document.getElementById('btnNewTask');
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function() {
            // 显示新任务输入界面
            console.log('创建新任务');
        });
    }

    // 查看全部任务按钮
    const viewAllTasks = document.getElementById('viewAllTasks');
    console.log('查找 viewAllTasks 元素:', viewAllTasks);
    if (viewAllTasks) {
        viewAllTasks.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击查看全部任务记录按钮');
            console.log('showAllTasksList 函数类型:', typeof showAllTasksList);
            if (typeof showAllTasksList === 'function') {
                try {
                    showAllTasksList();
                } catch (error) {
                    console.error('调用 showAllTasksList 时出错:', error);
                }
            } else {
                console.error('showAllTasksList 函数未定义');
            }
        });
        console.log('已绑定 viewAllTasks 点击事件');
    } else {
        console.warn('未找到 viewAllTasks 元素');
    }
}

/* ==========================================
   聊天输入
   ========================================== */

function initChatInput() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.getElementById('chatMessages');

    if (chatInput) {
        // 自动调整高度
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });

        // Shift+Enter 发送
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 发送按钮
    const sendBtn = document.querySelector('.chat-input-toolbar .btn-primary');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();

    if (!message) return;

    console.log('发送消息:', message);

    // 清空输入框
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // 这里可以添加消息到聊天区域
}

/* ==========================================
   阶段进度看板
   ========================================== */

function initPhaseProgress() {
    const phaseItems = document.querySelectorAll('.phase-progress-item');
    const chatMessages = document.getElementById('chatMessages');

    phaseItems.forEach(item => {
        item.addEventListener('click', function() {
            const phaseNumber = this.dataset.phase;

            // 查找对话区中对应的阶段卡片
            const phaseCards = document.querySelectorAll('.phase-card');
            let targetCard = null;

            phaseCards.forEach(card => {
                const phaseBadge = card.querySelector('.phase-badge');
                if (phaseBadge && phaseBadge.textContent.includes(phaseNumber)) {
                    targetCard = card.closest('.message');
                }
            });

            // 滚动到目标阶段
            if (targetCard && chatMessages) {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // 添加高亮效果
                targetCard.style.transition = 'background 0.3s';
                targetCard.style.background = '#e6f7ff';

                setTimeout(() => {
                    targetCard.style.background = '';
                }, 2000);
            }

            // 更新当前阶段高亮
            phaseItems.forEach(i => i.classList.remove('current'));
            this.classList.add('current');
        });
    });
}

/* ==========================================
   文件目录树
   ========================================== */

// 文件树初始化标志
let fileTreeInitialized = false;

function initFileTree() {
    const filesTab = document.getElementById('tabFiles');
    if (!filesTab || fileTreeInitialized) return;

    // 文件目录树折叠/展开 - 使用事件委托
    filesTab.addEventListener('click', function(e) {
        const header = e.target.closest('.file-tree-header');
        if (header) {
            e.preventDefault();
            const folder = header.closest('.file-tree-folder');
            if (folder) {
                folder.classList.toggle('expanded');
            }
        }
    });

    // 文件操作按钮 - 使用事件委托
    filesTab.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn-file-action');
        if (btn) {
            e.stopPropagation();
            const fileItem = btn.closest('.file-tree-file');
            if (fileItem) {
                const fileName = fileItem.querySelector('.file-tree-name')?.textContent;
                console.log(`下载文件: ${fileName}`);
                // 这里应该调用API下载文件
            }
        }
    });

    fileTreeInitialized = true;
}

/* ==========================================
   日志导航功能
   ========================================== */

function initLogNavigation() {
    const btnPrevLog = document.getElementById('btnPrevLog');
    const btnNextLog = document.getElementById('btnNextLog');
    const btnRealtimeLog = document.getElementById('btnRealtimeLog');
    const logNavCurrent = document.getElementById('logNavCurrent');
    const logNavTotal = document.getElementById('logNavTotal');
    const logProgressFill = document.getElementById('logProgressFill');

    let currentLogIndex = 1;
    let isRealtime = false;

    // 内置两条日志：任务清单 和 工具调用日志
    const allLogs = [
        { type: 'tasklist', id: 'task-list', name: '任务清单' },
        { type: 'tool', id: 'tool-1', name: '工具调用日志' }
    ];

    const totalLogs = allLogs.length;
    logNavTotal.textContent = totalLogs;

    console.log('初始化日志导航，共', totalLogs, '条日志');

    // 上一条日志
    if (btnPrevLog) {
        btnPrevLog.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击上一条，当前索引:', currentLogIndex);
            if (currentLogIndex > 1) {
                currentLogIndex--;
                isRealtime = false;
                btnRealtimeLog.classList.remove('active');
                updateLogDisplay();
            }
        });
    }

    // 下一条日志
    if (btnNextLog) {
        btnNextLog.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击下一条，当前索引:', currentLogIndex);
            if (currentLogIndex < totalLogs) {
                currentLogIndex++;
                updateLogDisplay();

                // 如果到达最后一条，自动开启实时模式
                if (currentLogIndex === totalLogs) {
                    isRealtime = true;
                    btnRealtimeLog.classList.add('active');
                }
            }
        });
    }

    // 实时追踪
    if (btnRealtimeLog) {
        btnRealtimeLog.addEventListener('click', function(e) {
            e.preventDefault();
            isRealtime = !isRealtime;
            this.classList.toggle('active');

            if (isRealtime) {
                // 跳转到最新的日志
                currentLogIndex = totalLogs;
                updateLogDisplay();
            }
        });
    }

    function updateLogDisplay() {
        console.log('更新日志显示，索引:', currentLogIndex, '总数:', totalLogs);
        logNavCurrent.textContent = currentLogIndex;

        // 更新进度条
        const progress = (currentLogIndex / totalLogs) * 100;
        if (logProgressFill) {
            logProgressFill.style.width = progress + '%';
        }

        // 更新按钮状态
        if (btnPrevLog) {
            btnPrevLog.disabled = currentLogIndex <= 1;
        }
        if (btnNextLog) {
            btnNextLog.disabled = currentLogIndex >= totalLogs;
        }

        // 显示对应的日志
        const logEntry = allLogs[currentLogIndex - 1];
        console.log('显示日志:', logEntry);
        if (logEntry) {
            if (logEntry.type === 'tool') {
                showToolLog(logEntry.id);
            } else if (logEntry.type === 'doc') {
                showDocumentLog(logEntry.id);
            } else if (logEntry.type === 'tasklist') {
                showTaskList();
            }
        }
    }

    // 初始化时显示第一条日志（任务清单）
    updateLogDisplay();
}

/* ==========================================
   查看全部任务记录
   ========================================== */

function showAllTasksList() {
    console.log('showAllTasksList 函数被调用');
    const chatArea = document.querySelector('.chat-area');
    if (!chatArea) {
        console.error('未找到 .chat-area 元素');
        return;
    }
    console.log('找到 chatArea 元素:', chatArea);

    // 生成任务列表HTML
    const tasksHtml = generateTasksListHTML(currentPage);
    console.log('生成的任务列表HTML长度:', tasksHtml.length);
    
    // 替换对话区内容
    chatArea.innerHTML = `
        <div class="tasks-list-container">
            <div class="tasks-list-header">
                <h2 class="tasks-list-title">全部任务记录</h2>
            </div>
            <div class="tasks-list-content">
                ${tasksHtml}
            </div>
            ${generatePaginationHTML()}
        </div>
    `;

    // 隐藏右侧工具面板（日志和文件）
    const toolsPanel = document.querySelector('.tools-panel');
    if (toolsPanel) {
        toolsPanel.style.display = 'none';
    }

    // 绑定分页事件
    bindPaginationEvents();
}

function generateTasksListHTML(page) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageTasks = mockTasks.slice(startIndex, endIndex);

    if (pageTasks.length === 0) {
        return '<div class="tasks-empty">暂无任务记录</div>';
    }

    return pageTasks.map(task => {
        const statusConfig = getStatusConfig(task.status);
        return `
            <div class="task-record-card" data-task-id="${task.id}">
                <!-- 第一行：任务名称和状态/时间 -->
                <div class="task-record-header">
                    <div class="task-record-name">${task.name}</div>
                    <div class="task-record-meta">
                        <div class="task-record-status">
                            <span class="task-status-badge ${task.status}">${statusConfig.icon}</span>
                            <span class="task-status-text">${statusConfig.text}</span>
                        </div>
                        <div class="task-record-time">${task.createTime}</div>
                    </div>
                </div>
                
                <!-- 第二行：关键发现统计（紧凑布局） -->
                <div class="task-record-findings">
                    ${task.findings.total > 0 ? `
                        <span class="finding-label">关键发现</span>
                        <span class="finding-value">共 ${task.findings.total} 项</span>
                        <div class="finding-details">
                            ${task.findings.high > 0 ? `<span class="finding-item high">高危 ${task.findings.high}</span>` : ''}
                            ${task.findings.medium > 0 ? `<span class="finding-item medium">中危 ${task.findings.medium}</span>` : ''}
                            ${task.findings.low > 0 ? `<span class="finding-item low">低危 ${task.findings.low}</span>` : ''}
                        </div>
                    ` : `
                        <span class="finding-label">关键发现</span>
                        <span class="finding-value">暂无发现</span>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

function getStatusConfig(status) {
    const configs = {
        'running': { icon: '⏳', text: '进行中' },
        'completed': { icon: '✅', text: '已完成' },
        'failed': { icon: '❌', text: '失败' }
    };
    return configs[status] || { icon: '⏸️', text: '未知' };
}

function generatePaginationHTML() {
    const totalPages = Math.ceil(mockTasks.length / pageSize);
    
    if (totalPages <= 1) {
        return '';
    }

    let pagesHTML = '';
    
    // 上一页按钮
    pagesHTML += `
        <button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>
            上一页
        </button>
    `;

    // 页码按钮
    pagesHTML += '<div class="pagination-pages">';
    
    // 显示页码逻辑
    if (totalPages <= 7) {
        // 如果总页数少于等于7，显示所有页码
        for (let i = 1; i <= totalPages; i++) {
            pagesHTML += `
                <button class="pagination-page ${i === currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }
    } else {
        // 如果总页数大于7，显示省略号
        if (currentPage <= 3) {
            // 前3页
            for (let i = 1; i <= 4; i++) {
                pagesHTML += `
                    <button class="pagination-page ${i === currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }
            pagesHTML += '<span class="pagination-ellipsis">...</span>';
            pagesHTML += `
                <button class="pagination-page" data-page="${totalPages}">
                    ${totalPages}
                </button>
            `;
        } else if (currentPage >= totalPages - 2) {
            // 后3页
            pagesHTML += `
                <button class="pagination-page" data-page="1">1</button>
            `;
            pagesHTML += '<span class="pagination-ellipsis">...</span>';
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pagesHTML += `
                    <button class="pagination-page ${i === currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }
        } else {
            // 中间页
            pagesHTML += `
                <button class="pagination-page" data-page="1">1</button>
            `;
            pagesHTML += '<span class="pagination-ellipsis">...</span>';
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pagesHTML += `
                    <button class="pagination-page ${i === currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }
            pagesHTML += '<span class="pagination-ellipsis">...</span>';
            pagesHTML += `
                <button class="pagination-page" data-page="${totalPages}">
                    ${totalPages}
                </button>
            `;
        }
    }
    
    pagesHTML += '</div>';

    // 下一页按钮
    pagesHTML += `
        <button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>
            下一页
        </button>
    `;

    return `<div class="pagination">${pagesHTML}</div>`;
}

function bindPaginationEvents() {
    // 上一页/下一页按钮
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showAllTasksList();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(mockTasks.length / pageSize);
            if (currentPage < totalPages) {
                currentPage++;
                showAllTasksList();
            }
        });
    }

    // 页码按钮
    const pageBtns = document.querySelectorAll('.pagination-page');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            if (page && page !== currentPage) {
                currentPage = page;
                showAllTasksList();
            }
        });
    });
}
