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
        statistics: {
            total: 8,
            typeA: 3,
            typeB: 4,
            typeC: 1
        }
    },
    {
        id: 'task-002',
        name: '开发用户认证系统',
        status: 'running',
        createTime: '2024-12-11 10:15',
        statistics: {
            total: 5,
            typeA: 1,
            typeB: 3,
            typeC: 1
        }
    },
    {
        id: 'task-003',
        name: '数据库优化方案',
        status: 'completed',
        createTime: '2024-12-10 16:45',
        statistics: {
            total: 12,
            typeA: 2,
            typeB: 7,
            typeC: 3
        }
    },
    {
        id: 'task-004',
        name: 'API接口文档生成',
        status: 'failed',
        createTime: '2024-12-10 09:20',
        statistics: {
            total: 0,
            typeA: 0,
            typeB: 0,
            typeC: 0
        }
    },
    {
        id: 'task-005',
        name: '前端性能优化分析',
        status: 'completed',
        createTime: '2024-12-09 15:30',
        statistics: {
            total: 6,
            typeA: 1,
            typeB: 4,
            typeC: 1
        }
    },
    {
        id: 'task-006',
        name: '系统架构设计评审',
        status: 'running',
        createTime: '2024-12-09 11:00',
        statistics: {
            total: 3,
            typeA: 0,
            typeB: 2,
            typeC: 1
        }
    },
    {
        id: 'task-007',
        name: '安全配置检查',
        status: 'completed',
        createTime: '2024-12-08 14:20',
        statistics: {
            total: 10,
            typeA: 4,
            typeB: 5,
            typeC: 1
        }
    },
    {
        id: 'task-008',
        name: '代码重构建议',
        status: 'completed',
        createTime: '2024-12-08 10:10',
        statistics: {
            total: 7,
            typeA: 1,
            typeB: 4,
            typeC: 2
        }
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件触发');
    initNavigation();
    initAgentSidebarComponent(); // 初始化侧导航组件
    initToolsTabs();
    initTaskList();
    initChatInputComponent(); // 使用新组件
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
   侧导航组件初始化
   ========================================== */

let agentSidebarInstance = null;

function initAgentSidebarComponent() {
    // 准备任务数据（只显示前4个任务，设置第一个为活动状态）
    const sidebarTasks = mockTasks.slice(0, 4).map((task, index) => ({
        id: task.id,
        name: task.name,
        status: task.status,
        active: index === 0 // 第一个任务为活动状态
    }));

    // 使用侧导航组件
    agentSidebarInstance = initAgentSidebar({
        tasks: sidebarTasks,
        maxTasks: 10,
        onNewTask: function() {
            console.log('点击新任务按钮');
            showNewTaskView();
        },
        onTaskClick: function(taskId) {
            console.log('点击任务项:', taskId);
            loadTaskDetail(taskId);
        },
        onViewAll: function() {
            console.log('点击查看全部任务');
            showAllTasksList();
        }
    });

    return agentSidebarInstance;
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
        const taskId = item.dataset.taskId;
        
        // 只对 task-001（代码安全漏洞挖掘任务）绑定点击事件
        if (taskId === 'task-001') {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                // 移除其他任务的active状态
                taskItems.forEach(t => t.classList.remove('active'));

                // 添加当前任务的active状态
                this.classList.add('active');

                // 加载任务详情
                console.log('侧边栏任务项点击, taskId:', taskId);
                loadTaskDetail(taskId);
            });
        } else {
            // 其他任务移除点击事件，设置为不可点击样式
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.6';
            item.style.cursor = 'default';
        }
    });

    // 新任务按钮
    const btnNewTask = document.getElementById('btnNewTask');
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('点击新任务按钮');
            showNewTaskView();
        });
    }

    // 查看全部任务按钮 - 使用事件委托
    const agentSidebar = document.querySelector('.agent-sidebar');
    if (agentSidebar) {
        agentSidebar.addEventListener('click', function(e) {
            // 检查是否点击的是 viewAllTasks 按钮或其子元素
            const viewAllTasks = e.target.closest('#viewAllTasks, .view-all-tasks');
            if (viewAllTasks) {
                e.preventDefault();
                e.stopPropagation();
                console.log('点击查看全部任务记录按钮（事件委托）');
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
            }
        });
        console.log('已使用事件委托绑定 viewAllTasks 点击事件');
    }
    
    // 也直接绑定一次（双重保险）
    const viewAllTasks = document.getElementById('viewAllTasks');
    console.log('查找 viewAllTasks 元素:', viewAllTasks);
    if (viewAllTasks) {
        viewAllTasks.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('点击查看全部任务记录按钮（直接绑定）');
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
        console.log('已直接绑定 viewAllTasks 点击事件');
    } else {
        console.warn('未找到 viewAllTasks 元素');
    }
}

/* ==========================================
   聊天输入（使用组件）
   ========================================== */

let chatInputInstance = null;

function initChatInputComponent() {
    // 使用聊天输入框组件
    chatInputInstance = initChatInput({
        onSend: function(message) {
            console.log('发送消息:', message);
            // 这里可以添加消息到聊天区域
        }
    });

    return chatInputInstance;
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

// 注意：这个函数是重复的，应该删除。任务列表初始化已经在第204行的 initTaskList() 中处理
// 如果这个函数被调用，说明有其他地方也在调用它，需要检查

/* ==========================================
   聊天输入功能已迁移到组件 (chat-input.js)
   使用 initChatInputComponent() 函数初始化
   ========================================== */

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
    
    // 绑定任务卡片点击事件
    bindTaskCardEvents();
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
                <!-- 左侧：任务信息和统计 -->
                <div class="task-record-left">
                    <!-- 上方：任务状态 + 任务名称 -->
                    <div class="task-record-header">
                        <div class="task-record-status">
                            <span class="task-status-badge ${task.status}">${statusConfig.icon}</span>
                        </div>
                        <div class="task-record-name">${task.name}</div>
                    </div>
                    <!-- 下方：统计信息 -->
                    <div class="task-record-statistics">
                        ${task.statistics && task.statistics.total > 0 ? `
                            <span class="statistics-label">统计信息</span>
                            <span class="statistics-value">共 ${task.statistics.total} 项</span>
                            <div class="statistics-details">
                                ${task.statistics.typeA > 0 ? `<span class="statistics-item type-a">类型A ${task.statistics.typeA}</span>` : ''}
                                ${task.statistics.typeB > 0 ? `<span class="statistics-item type-b">类型B ${task.statistics.typeB}</span>` : ''}
                                ${task.statistics.typeC > 0 ? `<span class="statistics-item type-c">类型C ${task.statistics.typeC}</span>` : ''}
                            </div>
                        ` : `
                            <span class="statistics-label">统计信息</span>
                            <span class="statistics-value">暂无数据</span>
                        `}
                    </div>
                </div>
                <!-- 右侧：时间（hover时显示操作按钮） -->
                <div class="task-record-right">
                    <div class="task-record-time">${task.createTime}</div>
                    <div class="task-record-actions">
                        <button class="task-action-btn" title="查看详情">查看</button>
                        <button class="task-action-btn" title="删除任务">删除</button>
                    </div>
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

function bindTaskCardEvents() {
    // 使用事件委托，在父容器上绑定事件
    const tasksListContent = document.querySelector('.tasks-list-content');
    if (!tasksListContent) {
        console.warn('未找到 .tasks-list-content 元素');
        return;
    }
    
    // 在父容器上绑定事件委托（每次重新绑定，因为HTML是重新生成的）
    tasksListContent.addEventListener('click', function(e) {
        // 查找被点击的任务卡片
        const card = e.target.closest('.task-record-card');
        if (!card) {
            return;
        }
        
        // 如果点击的是操作按钮
        if (e.target.closest('.task-action-btn')) {
            const btn = e.target.closest('.task-action-btn');
            if (btn.title === '查看详情' || btn.textContent.trim() === '查看') {
                e.preventDefault();
                e.stopPropagation();
                const taskId = card.dataset.taskId;
                console.log('点击查看详情按钮, taskId:', taskId);
                if (taskId) {
                    loadTaskDetail(taskId);
                }
            }
            return;
        }
        
        // 点击任务卡片本身
        e.preventDefault();
        e.stopPropagation();
        const taskId = card.dataset.taskId;
        console.log('点击任务卡片, taskId:', taskId);
        if (taskId) {
            loadTaskDetail(taskId);
        } else {
            console.warn('任务卡片没有 taskId 属性');
        }
    });
    
    console.log('任务卡片事件已绑定, 卡片数量:', document.querySelectorAll('.task-record-card').length);
}

// 获取 task-001 的完整内容（与初始化时一致）
function getTask001FullContent() {
    // 从HTML模板中读取完整内容
    const template = document.querySelector('#task-001-template');
    if (template) {
        return template.innerHTML;
    }
    
    // 如果没有模板，返回完整的HTML字符串
    return `
        <div class="chat-header">
            <span class="chat-title">代码安全漏洞挖掘任务</span>
            <span class="chat-time">2024-12-11 14:30</span>
        </div>
        <div class="chat-messages" id="chatMessages">
            <!-- 系统消息 -->
            <div class="message message-system">
                <div class="message-avatar">🎯</div>
                <div class="message-content">
                    <div class="message-time">14:30</div>
                    <div class="message-text">任务已创建：对项目进行安全代码审计，识别潜在漏洞</div>
                </div>
            </div>
            <!-- 任务意图识别 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">14:30</div>
                    <div class="intent-card">
                        <div class="intent-header">
                            <span class="intent-icon">🎯</span>
                            <span class="intent-title">任务意图识别</span>
                        </div>
                        <div class="intent-content">
                            <p><strong>任务类型：</strong>代码安全漏洞挖掘</p>
                            <p><strong>分析对象：</strong>Web应用项目（Java Spring Boot）</p>
                            <p><strong>预期目标：</strong>识别安全漏洞、生成漏洞报告、提供修复建议</p>
                        </div>
                    </div>
                    <!-- 任务规划 -->
                    <div class="planning-card">
                        <div class="planning-header">
                            <span class="planning-icon">📋</span>
                            <span class="planning-title">任务执行规划</span>
                        </div>
                        <div class="planning-stages">
                            <div class="stage-item">
                                <span class="stage-number">1</span>
                                <span class="stage-name">工程功能模块分析</span>
                            </div>
                            <div class="stage-item">
                                <span class="stage-number">2</span>
                                <span class="stage-name">威胁建模与漏洞分析</span>
                            </div>
                            <div class="stage-item">
                                <span class="stage-number">3</span>
                                <span class="stage-name">分析总结报告生成</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 阶段1：工程功能模块分析 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">14:31</div>
                    <div class="phase-card">
                        <div class="phase-header">
                            <span class="phase-badge">阶段 1</span>
                            <span class="phase-title">工程功能模块分析</span>
                            <span class="phase-status completed">✓ 已完成</span>
                        </div>
                        <div class="phase-content">
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">分析项目结构，识别核心功能模块和关键代码路径...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-1">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取项目目录结构</div>
                                    <div class="event-meta">list_directory • src/</div>
                                </div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-2">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取配置文件</div>
                                    <div class="event-meta">read_file • application.yml</div>
                                </div>
                            </div>
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">识别到用户认证、权限管理、数据访问三个核心模块，需要重点关注输入验证和访问控制...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-3">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取认证控制器代码</div>
                                    <div class="event-meta">read_file • AuthController.java</div>
                                </div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-4">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取数据访问层代码</div>
                                    <div class="event-meta">read_file • UserRepository.java</div>
                                </div>
                            </div>
                            <div class="event-item event-document" data-doc-id="doc-1">
                                <span class="event-icon">📄</span>
                                <div class="event-content">
                                    <div class="event-text">工程功能模块分析总结</div>
                                    <div class="event-meta">生成文档 • 模块分析总结.md</div>
                                </div>
                            </div>
                            <div class="event-item event-document" data-doc-id="doc-2">
                                <span class="event-icon">📄</span>
                                <div class="event-content">
                                    <div class="event-text">工程功能记忆文件</div>
                                    <div class="event-meta">生成文档 • 工程记忆.md</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 阶段2：威胁建模与漏洞分析 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">14:35</div>
                    <div class="phase-card">
                        <div class="phase-header">
                            <span class="phase-badge">阶段 2</span>
                            <span class="phase-title">威胁建模与漏洞分析</span>
                            <span class="phase-status completed">✓ 已完成</span>
                        </div>
                        <div class="phase-content">
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">基于功能模块分析，构建威胁模型，识别潜在攻击面...</div>
                            </div>
                            <div class="task-planning-event">
                                <div class="task-planning-header">
                                    <span class="task-planning-icon">📝</span>
                                    <span class="task-planning-title">规划新任务</span>
                                    <span class="task-count">6个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">SQL注入漏洞检测</span>
                                    </div>
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">XSS跨站脚本检测</span>
                                    </div>
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">CSRF漏洞检测</span>
                                    </div>
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">认证授权缺陷检测</span>
                                    </div>
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">敏感数据暴露检测</span>
                                    </div>
                                    <div class="task-list-item pending">
                                        <span class="task-status-indicator">⏸️</span>
                                        <span class="task-name">不安全的反序列化检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="task-update-event start">
                                <div class="task-update-header">
                                    <span class="task-update-icon">▶️</span>
                                    <span class="task-update-title">开始执行任务</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item running">
                                        <span class="task-status-indicator">🔄</span>
                                        <span class="task-name">SQL注入漏洞检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">检查SQL注入风险：UserRepository中存在字符串拼接构建SQL的情况...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-5">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">查看工程记忆文件</div>
                                    <div class="event-meta">read_file • 工程记忆.md</div>
                                </div>
                            </div>
                            <div class="event-item event-tool active" data-tool-id="tool-6">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">深入分析数据库查询代码</div>
                                    <div class="event-meta">read_file • UserRepository.java:45-78</div>
                                </div>
                            </div>
                            <div class="vulnerability-finding">
                                <div class="vuln-header">
                                    <span class="vuln-severity high">高危</span>
                                    <span class="vuln-title">SQL注入漏洞</span>
                                </div>
                                <div class="vuln-location">UserRepository.java:67</div>
                                <div class="vuln-description">用户输入未经过滤直接拼接到SQL语句中，可导致SQL注入攻击</div>
                            </div>
                            <div class="task-update-event end">
                                <div class="task-update-header">
                                    <span class="task-update-icon">✅</span>
                                    <span class="task-update-title">任务执行结束</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item completed">
                                        <span class="task-status-indicator">✓</span>
                                        <span class="task-name">SQL注入漏洞检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="task-update-event start">
                                <div class="task-update-header">
                                    <span class="task-update-icon">▶️</span>
                                    <span class="task-update-title">开始执行任务</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item running">
                                        <span class="task-status-indicator">🔄</span>
                                        <span class="task-name">XSS跨站脚本检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">检查XSS风险：前端模板未对用户输入进行HTML转义...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-7">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取前端模板文件</div>
                                    <div class="event-meta">read_file • user-profile.html</div>
                                </div>
                            </div>
                            <div class="vulnerability-finding">
                                <div class="vuln-header">
                                    <span class="vuln-severity medium">中危</span>
                                    <span class="vuln-title">存储型XSS漏洞</span>
                                </div>
                                <div class="vuln-location">user-profile.html:23</div>
                                <div class="vuln-description">用户昵称未进行HTML转义直接渲染，可导致XSS攻击</div>
                            </div>
                            <div class="task-update-event end">
                                <div class="task-update-header">
                                    <span class="task-update-icon">✅</span>
                                    <span class="task-update-title">任务执行结束</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item completed">
                                        <span class="task-status-indicator">✓</span>
                                        <span class="task-name">XSS跨站脚本检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="task-update-event start">
                                <div class="task-update-header">
                                    <span class="task-update-icon">▶️</span>
                                    <span class="task-update-title">开始执行任务</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item running">
                                        <span class="task-status-indicator">🔄</span>
                                        <span class="task-name">认证授权缺陷检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">检查认证授权机制：发现权限校验存在绕过风险...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-8">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">分析权限校验逻辑</div>
                                    <div class="event-meta">read_file • SecurityConfig.java</div>
                                </div>
                            </div>
                            <div class="vulnerability-finding">
                                <div class="vuln-header">
                                    <span class="vuln-severity high">高危</span>
                                    <span class="vuln-title">越权访问漏洞</span>
                                </div>
                                <div class="vuln-location">SecurityConfig.java:34</div>
                                <div class="vuln-description">部分管理接口未配置权限校验，普通用户可越权访问</div>
                            </div>
                            <div class="task-update-event end">
                                <div class="task-update-header">
                                    <span class="task-update-icon">✅</span>
                                    <span class="task-update-title">任务执行结束</span>
                                    <span class="task-count">1个任务</span>
                                </div>
                                <div class="task-list">
                                    <div class="task-list-item completed">
                                        <span class="task-status-indicator">✓</span>
                                        <span class="task-name">认证授权缺陷检测</span>
                                    </div>
                                </div>
                            </div>
                            <div class="task-progress">
                                <div class="progress-header">
                                    <span class="progress-text">漏洞分析进度</span>
                                    <span class="progress-percent">100%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 100%"></div>
                                </div>
                                <div class="progress-stats">
                                    <span>已分析 18 个文件</span>
                                    <span>发现 8 个漏洞</span>
                                </div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-9">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">更新工程记忆文件</div>
                                    <div class="event-meta">edit_file • 工程记忆.md</div>
                                </div>
                            </div>
                            <div class="event-item event-document" data-doc-id="doc-3">
                                <span class="event-icon">📄</span>
                                <div class="event-content">
                                    <div class="event-text">漏洞详细报告</div>
                                    <div class="event-meta">生成文档 • 漏洞报告.md</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 阶段3：分析总结报告生成 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">14:42</div>
                    <div class="phase-card">
                        <div class="phase-header">
                            <span class="phase-badge">阶段 3</span>
                            <span class="phase-title">分析总结报告生成</span>
                            <span class="phase-status completed">✓ 已完成</span>
                        </div>
                        <div class="phase-content">
                            <div class="event-item event-thinking">
                                <span class="event-icon">💭</span>
                                <div class="event-text">整合分析结果，生成综合性安全评估报告...</div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-10">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取工程记忆文件</div>
                                    <div class="event-meta">read_file • 工程记忆.md</div>
                                </div>
                            </div>
                            <div class="event-item event-tool" data-tool-id="tool-11">
                                <span class="event-icon">🔧</span>
                                <div class="event-content">
                                    <div class="event-text">读取漏洞报告</div>
                                    <div class="event-meta">read_file • 漏洞报告.md</div>
                                </div>
                            </div>
                            <div class="event-item event-document" data-doc-id="doc-4">
                                <span class="event-icon">📄</span>
                                <div class="event-content">
                                    <div class="event-text">工程安全评估总结报告</div>
                                    <div class="event-meta">生成文档 • 安全评估报告.md</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 最终回复 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">14:45</div>
                    <div class="final-response">
                        <div class="response-header">
                            <h3>分析概览与核心发现</h3>
                        </div>
                        <div class="response-summary">
                            <p>已完成对该项目的全面安全代码审计。通过工程功能模块分析、威胁建模与漏洞深度挖掘，共发现 <strong>8个安全漏洞</strong>，其中高危漏洞3个、中危漏洞4个、低危漏洞1个。主要风险集中在SQL注入、越权访问和XSS攻击方面。</p>
                        </div>
                        <div class="vulnerability-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>漏洞名称</th>
                                        <th>危险等级</th>
                                        <th>位置</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SQL注入</td>
                                        <td><span class="severity-badge high">高危</span></td>
                                        <td>UserRepository.java:67</td>
                                    </tr>
                                    <tr>
                                        <td>越权访问</td>
                                        <td><span class="severity-badge high">高危</span></td>
                                        <td>SecurityConfig.java:34</td>
                                    </tr>
                                    <tr>
                                        <td>硬编码密钥</td>
                                        <td><span class="severity-badge high">高危</span></td>
                                        <td>JwtUtil.java:12</td>
                                    </tr>
                                    <tr>
                                        <td>存储型XSS</td>
                                        <td><span class="severity-badge medium">中危</span></td>
                                        <td>user-profile.html:23</td>
                                    </tr>
                                    <tr>
                                        <td>CSRF防护缺失</td>
                                        <td><span class="severity-badge medium">中危</span></td>
                                        <td>SecurityConfig.java:45</td>
                                    </tr>
                                    <tr>
                                        <td>敏感信息泄露</td>
                                        <td><span class="severity-badge medium">中危</span></td>
                                        <td>ErrorHandler.java:28</td>
                                    </tr>
                                    <tr>
                                        <td>不安全的随机数</td>
                                        <td><span class="severity-badge medium">中危</span></td>
                                        <td>TokenGenerator.java:15</td>
                                    </tr>
                                    <tr>
                                        <td>弱密码策略</td>
                                        <td><span class="severity-badge low">低危</span></td>
                                        <td>PasswordValidator.java:8</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="key-documents">
                            <h4>关键文档</h4>
                            <div class="doc-cards">
                                <div class="doc-card" data-doc-id="doc-3">
                                    <div class="doc-card-icon">📋</div>
                                    <div class="doc-card-content">
                                        <div class="doc-card-title">漏洞详细报告</div>
                                        <div class="doc-card-meta">8个漏洞 • 12 KB</div>
                                    </div>
                                    <button class="doc-card-action">查看</button>
                                </div>
                                <div class="doc-card" data-doc-id="doc-4">
                                    <div class="doc-card-icon">📊</div>
                                    <div class="doc-card-content">
                                        <div class="doc-card-title">安全评估报告</div>
                                        <div class="doc-card-meta">综合分析 • 18 KB</div>
                                    </div>
                                    <button class="doc-card-action">查看</button>
                                </div>
                                <div class="doc-card" data-doc-id="doc-2">
                                    <div class="doc-card-icon">🧠</div>
                                    <div class="doc-card-content">
                                        <div class="doc-card-title">工程记忆文件</div>
                                        <div class="doc-card-meta">项目分析 • 9 KB</div>
                                    </div>
                                    <button class="doc-card-action">查看</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入框（固定在对话区底部） -->
        <div class="chat-input-container" data-container-mode="fixed">
            <div class="chat-input-wrapper">
                <textarea
                    class="chat-input"
                    id="chatInput"
                    placeholder="您可以随时干预，提出建议或调整方向..."
                    rows="3"
                ></textarea>
                <div class="chat-input-toolbar">
                    <div class="chat-input-actions">
                        <button class="btn-icon" title="上传文件">📎</button>
                        <button class="btn-icon" title="插入图片">🖼️</button>
                        <button class="btn-icon" title="插入代码">💻</button>
                        <button class="btn-icon" title="插入表格">📊</button>
                    </div>
                    <button class="btn btn-primary chat-send" id="chatSend">
                        <span>发送</span>
                        <span class="send-shortcut">Shift+Enter</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function loadTaskDetail(taskId) {
    console.log('loadTaskDetail 被调用, taskId:', taskId);
    
    // 查找任务数据
    const task = mockTasks.find(t => t.id === taskId);
    if (!task) {
        console.error('未找到任务:', taskId);
        return;
    }
    
    console.log('找到任务:', task);
    
    const chatArea = document.querySelector('.chat-area');
    if (!chatArea) {
        console.error('未找到 .chat-area 元素');
        return;
    }
    
    console.log('准备更新 chatArea 内容');
    
    // 如果是 task-001，使用完整内容
    let taskDetailHTML;
    if (taskId === 'task-001') {
        taskDetailHTML = getTask001FullContent();
    } else {
        // 其他任务使用简化的任务详情
        const statusConfig = getStatusConfig(task.status);
        taskDetailHTML = `
        <div class="chat-header">
            <span class="chat-title">${task.name}</span>
            <span class="chat-time">${task.createTime}</span>
        </div>
        <div class="chat-messages" id="chatMessages">
            <!-- 系统消息 -->
            <div class="message message-system">
                <div class="message-avatar">🎯</div>
                <div class="message-content">
                    <div class="message-time">${task.createTime.split(' ')[1] || ''}</div>
                    <div class="message-text">任务已创建：${task.name}</div>
                </div>
            </div>
            <!-- 任务状态信息 -->
            <div class="message message-ai">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-time">${task.createTime.split(' ')[1] || ''}</div>
                    <div class="message-text">
                        <div class="task-status-info">
                            <span class="task-status-badge ${task.status}">${statusConfig.icon}</span>
                            <span class="task-status-text">${statusConfig.text}</span>
                        </div>
                        ${task.statistics && task.statistics.total > 0 ? `
                            <div class="task-statistics-info">
                                <p>统计信息：共 ${task.statistics.total} 项</p>
                                <div class="statistics-tags">
                                    ${task.statistics.typeA > 0 ? `<span class="statistics-item type-a">类型A ${task.statistics.typeA}</span>` : ''}
                                    ${task.statistics.typeB > 0 ? `<span class="statistics-item type-b">类型B ${task.statistics.typeB}</span>` : ''}
                                    ${task.statistics.typeC > 0 ? `<span class="statistics-item type-c">类型C ${task.statistics.typeC}</span>` : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入框（固定在对话区底部） -->
        <div class="chat-input-container" data-container-mode="fixed">
            <div class="chat-input-wrapper">
                <textarea
                    class="chat-input"
                    id="chatInput"
                    placeholder="您可以随时干预，提出建议或调整方向..."
                    rows="3"
                ></textarea>
                <div class="chat-input-toolbar">
                    <div class="chat-input-actions">
                        <button class="btn-icon" title="上传文件">📎</button>
                        <button class="btn-icon" title="插入图片">🖼️</button>
                        <button class="btn-icon" title="插入代码">💻</button>
                        <button class="btn-icon" title="插入表格">📊</button>
                    </div>
                    <button class="btn btn-primary chat-send" id="chatSend">
                        <span>发送</span>
                        <span class="send-shortcut">Shift+Enter</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    }

    // 替换对话区内容
    console.log('更新 chatArea 内容, HTML长度:', taskDetailHTML.length);
    chatArea.innerHTML = taskDetailHTML;

    // 重新初始化聊天输入框组件（因为HTML被替换了）
    initChatInput({
        selector: '.chat-area .chat-input-container',
        onSend: function(message) {
            console.log('发送消息:', message);
            // 这里可以添加消息到聊天区域
        }
    });
    console.log('chatArea 内容已更新, 当前内容长度:', chatArea.innerHTML.length);
    
    // 显示右侧工具面板
    const toolsPanel = document.querySelector('.tools-panel');
    if (toolsPanel) {
        toolsPanel.style.display = 'flex';
        console.log('右侧工具面板已显示');
    } else {
        console.warn('未找到右侧工具面板');
    }
    
    // 更新侧边栏任务项的active状态
    const taskItems = document.querySelectorAll('.recent-task-item');
    taskItems.forEach(item => {
        if (item.dataset.taskId === taskId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/* ==========================================
   新任务视图
   ========================================== */

function showNewTaskView() {
    const chatArea = document.querySelector('.chat-area');
    if (!chatArea) {
        console.error('未找到 .chat-area 元素');
        return;
    }
    
    // 生成新任务空状态页面（参考快速对话助手示例）
    const newTaskHTML = `
        <div class="empty-state-container">
            <!-- 智能体名称 -->
            <div class="empty-agent-name">
                <span class="agent-name-text">自规划任务执行助手</span>
            </div>
            
            <!-- 引导文案 -->
            <div class="empty-state-guide">
                <p class="empty-state-guide-text">开始给智能体分配任务</p>
            </div>
            
            <!-- 输入区域 -->
            <div class="chat-input-container" data-container-mode="empty">
                <div class="chat-input-wrapper">
                    <textarea
                        class="chat-input"
                        id="chatInput"
                        placeholder="输入您的问题或粘贴代码..."
                        rows="3"
                    ></textarea>
                    <div class="chat-input-toolbar">
                        <div class="chat-input-actions">
                            <button class="btn-icon" title="上传文件" data-action="upload">📎</button>
                            <button class="btn-icon" title="插入图片" data-action="image">🖼️</button>
                            <button class="btn-icon" title="插入代码" data-action="code">💻</button>
                            <button class="btn-icon" title="插入表格" data-action="table">📊</button>
                        </div>
                        <button class="btn btn-primary chat-send" id="chatSend">
                            <span>发送</span>
                            <span class="send-shortcut">Shift+Enter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 替换对话区内容
    chatArea.innerHTML = newTaskHTML;

    // 隐藏右侧工具面板
    const toolsPanel = document.querySelector('.tools-panel');
    if (toolsPanel) {
        toolsPanel.style.display = 'none';
    }

    // 移除所有任务项的active状态
    const taskItems = document.querySelectorAll('.recent-task-item');
    taskItems.forEach(item => {
        item.classList.remove('active');
    });

    // 使用组件初始化输入框
    initChatInput({
        selector: '.empty-state-container .chat-input-container',
        autoFocus: true,
        onSend: sendNewTask
    });
}

// initNewTaskInput 函数已废弃，由组件的 initChatInput 替代

function sendNewTask(message) {
    // 参数 message 由组件的 onSend 回调传入
    if (!message) {
        return;
    }

    console.log('发送新任务:', message);

    // 这里可以调用API创建新任务
    // 暂时模拟：创建任务后显示任务详情
    // 实际应该根据API返回的任务ID来加载任务详情

    // TODO: 实际应该调用API创建任务，然后根据返回的任务ID加载任务详情
    // 示例：loadTaskDetail(newTaskId);
}
