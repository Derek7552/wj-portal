// 安全智库智能体页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化用户信息
    initUserInfo();
    
    // 初始化收藏功能（使用dashboard.js中的函数）
    if (typeof window.initFavorites === 'function') {
        window.initFavorites();
    }
    
    // 初始化首页菜单位置（使用dashboard.js中的函数）
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }
    
    // 初始化退出登录
    initLogout();
    
    // 初始化对话功能
    initChat();
    
    // 初始化任务记录
    initTasks();
    
    // 初始化标签页切换
    initTabs();
    
    // 初始化设置
    initSettings();
    
    // 初始化知识库广场
    initKnowledgeBasePlaza();
});

// 初始化用户信息
function initUserInfo() {
    const userEmail = localStorage.getItem('userEmail') || 'test@seccortex.com';
    const userName = localStorage.getItem('userName') || getUserNameFromEmail(userEmail);
    
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
    
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        const firstChar = userName.charAt(0).toUpperCase();
        userAvatar.textContent = firstChar;
    }
}

// 从邮箱获取用户名
function getUserNameFromEmail(email) {
    if (!email) return '用户';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1) + '用户';
}

// 初始化退出登录
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('favorites');
            localStorage.removeItem('favoriteData');
            window.location.href = 'index.html';
        });
    }
}

// 对话功能
let chatHistory = JSON.parse(localStorage.getItem('knowledgeChatHistory') || '[]');
let currentTaskId = null;

function initChat() {
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const saveChatBtn = document.getElementById('saveChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    
    // 加载历史对话
    loadChatHistory();
    
    // 发送消息
    chatSendBtn.addEventListener('click', sendMessage);
    
    // 输入框回车发送
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 自动调整输入框高度
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
    
    // 清空对话
    clearChatBtn.addEventListener('click', function() {
        if (confirm('确定要清空当前对话吗？')) {
            chatHistory = [];
            chatMessages.innerHTML = '';
            addWelcomeMessage();
            initExampleQuestions();
            saveChatHistory();
            updateTasksList();
        }
    });
    
    // 保存对话
    saveChatBtn.addEventListener('click', function() {
        if (chatHistory.length > 0) {
            saveCurrentTask();
            alert('对话已保存到任务记录');
        } else {
            alert('当前没有对话内容可保存');
        }
    });
    
    // 初始化示例问题按钮
    initExampleQuestions();
}

function initExampleQuestions() {
    const exampleButtons = document.querySelectorAll('.example-question-btn');
    const chatInput = document.getElementById('chatInput');
    
    exampleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            if (question) {
                // 设置输入框内容
                chatInput.value = question;
                chatInput.focus();
                // 自动发送
                sendMessage();
            }
        });
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // 创建新任务（如果还没有）
    if (!currentTaskId) {
        currentTaskId = 'task_' + Date.now();
    }
    
    // 添加用户消息
    addMessage('user', message);
    
    // 清空输入框
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // 显示加载动画
    const loadingId = addLoadingMessage();
    
    // 模拟AI回复（实际应该调用API）
    setTimeout(() => {
        removeLoadingMessage(loadingId);
        const response = generateResponse(message);
        addMessage('assistant', response);
        
        // 保存到历史
        chatHistory.push({
            role: 'user',
            content: message,
            time: new Date().toISOString()
        });
        chatHistory.push({
            role: 'assistant',
            content: response,
            time: new Date().toISOString()
        });
        saveChatHistory();
        updateTasksList();
    }, 1000 + Math.random() * 1000);
}

function addMessage(role, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${role}`;
    
    const avatar = role === 'user' ? '👤' : '🧠';
    const time = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-text">${formatMessage(content)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatMessage(content) {
    // 简单的Markdown格式化
    return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
}

function addLoadingMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    const loadingId = 'loading_' + Date.now();
    loadingDiv.id = loadingId;
    loadingDiv.className = 'message message-assistant';
    
    loadingDiv.innerHTML = `
        <div class="message-avatar">🧠</div>
        <div class="message-content">
            <div class="message-text">
                <div class="message-loading">
                    <div class="message-loading-dot"></div>
                    <div class="message-loading-dot"></div>
                    <div class="message-loading-dot"></div>
                </div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingId;
}

function removeLoadingMessage(loadingId) {
    const loadingDiv = document.getElementById(loadingId);
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function addWelcomeMessage() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message message-assistant">
            <div class="message-avatar">🧠</div>
            <div class="message-content">
                <div class="message-text">
                    <p><strong>您好！我是安全智库智能体</strong></p>
                    <p>我专注于安全知识库与最佳实践指南，可以为您提供专业的安全咨询和知识服务。</p>
                    <p><strong>我可以帮您：</strong></p>
                    <ul>
                        <li>查询安全防护知识和最佳实践</li>
                        <li>解答安全技术和管理问题</li>
                        <li>提供安全方案设计和实施建议</li>
                        <li>分享行业经验与案例分析</li>
                        <li>解读安全标准和合规要求</li>
                    </ul>
                    <p>您可以直接在下方输入问题，或点击下方示例问题快速开始对话。</p>
                </div>
            </div>
        </div>
        <div class="example-questions" id="exampleQuestions">
            <div class="example-questions-title">💡 试试这些问题：</div>
            <div class="example-questions-grid">
                <button class="example-question-btn" data-question="如何建立完善的安全防护体系？">
                    如何建立完善的安全防护体系？
                </button>
                <button class="example-question-btn" data-question="Web应用常见的安全漏洞有哪些？如何防护？">
                    Web应用常见的安全漏洞有哪些？如何防护？
                </button>
                <button class="example-question-btn" data-question="数据安全合规需要注意哪些要点？">
                    数据安全合规需要注意哪些要点？
                </button>
                <button class="example-question-btn" data-question="安全事件应急响应流程是什么？">
                    安全事件应急响应流程是什么？
                </button>
                <button class="example-question-btn" data-question="如何评估和选择安全产品？">
                    如何评估和选择安全产品？
                </button>
                <button class="example-question-btn" data-question="云安全最佳实践有哪些？">
                    云安全最佳实践有哪些？
                </button>
            </div>
        </div>
    `;
    // 初始化示例问题按钮
    initExampleQuestions();
}

function generateResponse(userMessage) {
    // 模拟AI回复（实际应该调用API）
    const responses = [
        `关于"${userMessage}"，我为您整理了以下信息：\n\n1. **核心概念**：这是安全领域的重要概念，涉及多个方面。\n\n2. **最佳实践**：建议您采用以下最佳实践方案：\n   - 定期更新安全策略\n   - 实施多层防护\n   - 建立监控机制\n\n3. **注意事项**：在实际应用中，需要注意以下几点。\n\n希望这些信息对您有帮助。如果您需要更详细的信息，请继续提问。`,
        `针对您的问题"${userMessage}"，我建议：\n\n**方案一：基础方案**\n适用于小型组织，成本较低。\n\n**方案二：进阶方案**\n适用于中型组织，提供更全面的保护。\n\n**方案三：企业级方案**\n适用于大型组织，提供最高级别的安全保障。\n\n您可以根据实际需求选择合适的方案。`,
        `关于"${userMessage}"，这是一个很好的问题。让我为您详细解答：\n\n首先，我们需要理解这个问题的核心。然后，我们可以从以下几个角度来分析：\n\n1. 技术层面\n2. 管理层面\n3. 合规层面\n\n每个层面都有其独特的考虑因素。如果您需要针对某个特定层面的详细说明，请告诉我。`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function loadChatHistory() {
    if (chatHistory.length === 0) {
        addWelcomeMessage();
        return;
    }
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    chatHistory.forEach(msg => {
        addMessage(msg.role, msg.content);
    });
}

function saveChatHistory() {
    localStorage.setItem('knowledgeChatHistory', JSON.stringify(chatHistory));
}

// 任务记录功能
let tasks = JSON.parse(localStorage.getItem('knowledgeTasks') || '[]');

function initTasks() {
    updateTasksList();
}

function updateTasksList() {
    const tasksList = document.getElementById('tasksList');
    const tasksEmpty = tasksList.querySelector('.tasks-empty');
    
    if (tasks.length === 0 && chatHistory.length === 0) {
        if (tasksEmpty) {
            tasksEmpty.style.display = 'flex';
        }
        return;
    }
    
    if (tasksEmpty) {
        tasksEmpty.style.display = 'none';
    }
    
    // 如果有当前对话但未保存，显示临时任务
    let displayTasks = [...tasks];
    if (chatHistory.length > 0 && currentTaskId) {
        const existingTask = tasks.find(t => t.id === currentTaskId);
        if (!existingTask) {
            displayTasks.unshift({
                id: currentTaskId,
                title: chatHistory[0]?.content?.substring(0, 30) || '新任务',
                preview: chatHistory[chatHistory.length - 1]?.content?.substring(0, 50) || '',
                time: new Date().toISOString(),
                isTemporary: true
            });
        }
    }
    
    tasksList.innerHTML = displayTasks.map(task => {
        const time = new Date(task.time).toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        const tempBadge = task.isTemporary ? '<span style="font-size: 10px; color: var(--text-secondary);">(未保存)</span>' : '';
        
        return `
            <div class="task-item" data-task-id="${task.id}">
                <div class="task-item-header">
                    <h4 class="task-item-title">${task.title}${tempBadge}</h4>
                    <span class="task-item-time">${time}</span>
                </div>
                <div class="task-item-preview">${task.preview}</div>
            </div>
        `;
    }).join('');
    
    // 绑定点击事件
    tasksList.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', function() {
            const taskId = this.dataset.taskId;
            loadTask(taskId);
        });
    });
}

function saveCurrentTask() {
    if (!currentTaskId || chatHistory.length === 0) return;
    
    const existingTaskIndex = tasks.findIndex(t => t.id === currentTaskId);
    const taskData = {
        id: currentTaskId,
        title: chatHistory[0]?.content?.substring(0, 30) || '新任务',
        preview: chatHistory[chatHistory.length - 1]?.content?.substring(0, 50) || '',
        time: new Date().toISOString(),
        history: [...chatHistory]
    };
    
    if (existingTaskIndex >= 0) {
        tasks[existingTaskIndex] = taskData;
    } else {
        tasks.unshift(taskData);
    }
    
    // 限制任务数量
    if (tasks.length > 50) {
        tasks = tasks.slice(0, 50);
    }
    
    localStorage.setItem('knowledgeTasks', JSON.stringify(tasks));
    updateTasksList();
}

function loadTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task || !task.history) return;
    
    chatHistory = task.history;
    currentTaskId = taskId;
    loadChatHistory();
    
    // 切换到对话标签（如果有）
    const chatTab = document.querySelector('.knowledge-tab[data-tab="chat"]');
    if (chatTab) {
        chatTab.click();
    }
}

// 标签页切换
function initTabs() {
    const tabs = document.querySelectorAll('.knowledge-tab');
    const tabContents = document.querySelectorAll('.knowledge-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 更新标签状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容显示
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab + 'Tab') {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 设置功能
function initSettings() {
    // 加载设置
    const settings = JSON.parse(localStorage.getItem('knowledgeSettings') || '{}');
    
    // 模型版本
    const modelVersion = document.getElementById('modelVersion');
    if (modelVersion) {
        modelVersion.value = settings.modelVersion || 'v1.0.3';
    }
    
    // 温度参数
    const temperature = document.getElementById('temperature');
    const temperatureValue = document.getElementById('temperatureValue');
    if (temperature) {
        temperature.value = settings.temperature || 0.7;
        if (temperatureValue) {
            temperatureValue.textContent = temperature.value;
        }
        temperature.addEventListener('input', function() {
            if (temperatureValue) {
                temperatureValue.textContent = this.value;
            }
        });
    }
    
    // 最大回复长度
    const maxTokens = document.getElementById('maxTokens');
    if (maxTokens) {
        maxTokens.value = settings.maxTokens || 2000;
    }
    
    // 对话设置
    const enableHistory = document.getElementById('enableHistory');
    if (enableHistory) {
        enableHistory.checked = settings.enableHistory !== false;
    }
    
    const autoSave = document.getElementById('autoSave');
    if (autoSave) {
        autoSave.checked = settings.autoSave !== false;
    }
    
    const showTimestamps = document.getElementById('showTimestamps');
    if (showTimestamps) {
        showTimestamps.checked = settings.showTimestamps || false;
    }
    
    // 知识库设置
    const knowledgeScope = document.getElementById('knowledgeScope');
    if (knowledgeScope) {
        knowledgeScope.value = settings.knowledgeScope || 'all';
    }
    
    const retrievalDepth = document.getElementById('retrievalDepth');
    const retrievalDepthValue = document.getElementById('retrievalDepthValue');
    if (retrievalDepth) {
        retrievalDepth.value = settings.retrievalDepth || 5;
        if (retrievalDepthValue) {
            retrievalDepthValue.textContent = retrievalDepth.value;
        }
        retrievalDepth.addEventListener('input', function() {
            if (retrievalDepthValue) {
                retrievalDepthValue.textContent = this.value;
            }
        });
    }
    
    // 保存设置
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', saveSettings);
    }
    
    // 重置设置
    const resetSettingsBtn = document.getElementById('resetSettingsBtn');
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', resetSettings);
    }
}

function saveSettings() {
    const settings = {
        modelVersion: document.getElementById('modelVersion').value,
        temperature: parseFloat(document.getElementById('temperature').value),
        maxTokens: parseInt(document.getElementById('maxTokens').value),
        enableHistory: document.getElementById('enableHistory').checked,
        autoSave: document.getElementById('autoSave').checked,
        showTimestamps: document.getElementById('showTimestamps').checked,
        knowledgeScope: document.getElementById('knowledgeScope').value,
        retrievalDepth: parseInt(document.getElementById('retrievalDepth').value)
    };
    
    localStorage.setItem('knowledgeSettings', JSON.stringify(settings));
    alert('设置已保存');
}

function resetSettings() {
    if (confirm('确定要重置所有设置为默认值吗？')) {
        localStorage.removeItem('knowledgeSettings');
        location.reload();
    }
}

// 知识库广场功能
let favoriteKnowledgeBases = JSON.parse(localStorage.getItem('favoriteKnowledgeBases') || '[]');
let allKnowledgeBases = [
    {
        id: 'best-practices',
        name: '最佳实践',
        icon: '⭐',
        desc: '安全防护最佳实践指南，涵盖各类安全场景的标准化解决方案',
        tags: ['最佳实践', '安全防护', '标准化'],
        docs: 1250,
        updated: '2024-12-15'
    },
    {
        id: 'case-studies',
        name: '案例分析',
        icon: '📖',
        desc: '真实安全事件案例分析，深入剖析攻击手法与防护策略',
        tags: ['案例分析', '安全事件', '攻击手法'],
        docs: 856,
        updated: '2024-12-10'
    },
    {
        id: 'technical-docs',
        name: '技术文档',
        icon: '📄',
        desc: '安全技术文档与规范，包含API文档、配置指南、技术标准',
        tags: ['技术文档', 'API', '配置指南'],
        docs: 2340,
        updated: '2024-12-20'
    },
    {
        id: 'threat-intel',
        name: '威胁情报',
        icon: '🛡️',
        desc: '最新威胁情报与攻击手法，实时更新APT组织活动与漏洞信息',
        tags: ['威胁情报', 'APT', '漏洞'],
        docs: 1890,
        updated: '2024-12-22'
    },
    {
        id: 'compliance',
        name: '合规标准',
        icon: '📋',
        desc: '安全合规标准与要求，涵盖等保、ISO27001、GDPR等标准',
        tags: ['合规', '等保', 'ISO27001'],
        docs: 642,
        updated: '2024-12-18'
    },
    {
        id: 'incident-response',
        name: '应急响应',
        icon: '🚨',
        desc: '安全事件应急响应流程与处置方案，包含预案、演练、复盘',
        tags: ['应急响应', '事件处置', '预案'],
        docs: 523,
        updated: '2024-12-12'
    },
    {
        id: 'security-testing',
        name: '安全测试',
        icon: '🔍',
        desc: '安全测试方法与工具，包含渗透测试、代码审计、漏洞扫描',
        tags: ['安全测试', '渗透测试', '代码审计'],
        docs: 987,
        updated: '2024-12-16'
    },
    {
        id: 'security-architecture',
        name: '安全架构',
        icon: '🏗️',
        desc: '安全架构设计与最佳实践，涵盖零信任、纵深防御等架构模式',
        tags: ['安全架构', '零信任', '纵深防御'],
        docs: 756,
        updated: '2024-12-14'
    },
    {
        id: 'data-security',
        name: '数据安全',
        icon: '🔐',
        desc: '数据安全防护与隐私保护，包含数据分类、加密、脱敏等',
        tags: ['数据安全', '隐私保护', '加密'],
        docs: 1123,
        updated: '2024-12-19'
    },
    {
        id: 'cloud-security',
        name: '云安全',
        icon: '☁️',
        desc: '云安全最佳实践，涵盖AWS、Azure、阿里云等云平台安全配置',
        tags: ['云安全', 'AWS', 'Azure'],
        docs: 1456,
        updated: '2024-12-21'
    }
];

function initKnowledgeBasePlaza() {
    const plazaBtn = document.getElementById('knowledgeBasePlazaBtn');
    const plazaModal = document.getElementById('kbPlazaModal');
    const plazaClose = document.getElementById('kbPlazaClose');
    const kbSearchInput = document.getElementById('kbSearchInput');
    const kbSearchReset = document.getElementById('kbSearchReset');
    const kbIndicatorBtn = document.getElementById('kbIndicatorBtn');
    
    // 打开知识库广场
    if (plazaBtn) {
        plazaBtn.addEventListener('click', function() {
            if (plazaModal) {
                plazaModal.classList.add('active');
                renderKnowledgeBases();
            }
        });
    }
    
    // 关闭知识库广场
    if (plazaClose) {
        plazaClose.addEventListener('click', function() {
            if (plazaModal) {
                plazaModal.classList.remove('active');
            }
        });
    }
    
    // 点击遮罩层关闭
    if (plazaModal) {
        const overlay = plazaModal.querySelector('.kb-plaza-overlay');
        if (overlay) {
            overlay.addEventListener('click', function() {
                plazaModal.classList.remove('active');
            });
        }
    }
    
    // 搜索功能
    if (kbSearchInput) {
        kbSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            performKbSearch(searchTerm);
            toggleKbSearchReset(searchTerm);
        });
    }
    
    // 重置搜索
    if (kbSearchReset) {
        kbSearchReset.addEventListener('click', function() {
            if (kbSearchInput) {
                kbSearchInput.value = '';
                performKbSearch('');
                toggleKbSearchReset('');
            }
        });
    }
    
    // 指示器管理按钮
    if (kbIndicatorBtn) {
        kbIndicatorBtn.addEventListener('click', function() {
            if (plazaModal) {
                plazaModal.classList.add('active');
                renderKnowledgeBases();
            }
        });
    }
    
    // 初始化显示
    updateKbIndicator();
    renderKnowledgeBases();
}

function renderKnowledgeBases() {
    renderFavoriteKbGrid();
    renderAllKbGrid();
}

function renderFavoriteKbGrid() {
    const favoriteGrid = document.getElementById('favoriteKbGrid');
    const favoriteCount = document.getElementById('favoriteKbCount');
    
    if (!favoriteGrid) return;
    
    const favoriteKbs = allKnowledgeBases.filter(kb => favoriteKnowledgeBases.includes(kb.id));
    
    if (favoriteCount) {
        favoriteCount.textContent = favoriteKbs.length;
    }
    
    if (favoriteKbs.length === 0) {
        favoriteGrid.innerHTML = `
            <div class="kb-plaza-empty">
                <p>暂无收藏的知识库</p>
                <p class="kb-empty-hint">在下方知识库列表中点击星标即可收藏</p>
            </div>
        `;
    } else {
        favoriteGrid.innerHTML = favoriteKbs.map(kb => createKbCard(kb, true)).join('');
        bindKbCardEvents(favoriteGrid);
    }
}

function renderAllKbGrid() {
    const allGrid = document.getElementById('allKbGrid');
    const allCount = document.getElementById('allKbCount');
    
    if (!allGrid) return;
    
    if (allCount) {
        allCount.textContent = allKnowledgeBases.length;
    }
    
    allGrid.innerHTML = allKnowledgeBases.map(kb => {
        const isFavorite = favoriteKnowledgeBases.includes(kb.id);
        return createKbCard(kb, isFavorite);
    }).join('');
    
    bindKbCardEvents(allGrid);
}

function createKbCard(kb, isFavorite) {
    return `
        <div class="kb-card" data-kb-id="${kb.id}">
            <div class="kb-card-header">
                <div class="kb-card-icon">${kb.icon}</div>
                <button class="kb-card-favorite ${isFavorite ? 'active' : ''}" data-favorite="${isFavorite}" data-kb-id="${kb.id}">⭐</button>
            </div>
            <div class="kb-card-content">
                <h3 class="kb-card-name">${kb.name}</h3>
                <p class="kb-card-desc">${kb.desc}</p>
                <div class="kb-card-tags">
                    ${kb.tags.map(tag => `<span class="kb-card-tag">${tag}</span>`).join('')}
                </div>
                <div class="kb-card-stats">
                    <span class="kb-card-stat">
                        <span>📄</span>
                        <span>${kb.docs} 文档</span>
                    </span>
                    <span class="kb-card-stat">
                        <span>🕒</span>
                        <span>${kb.updated}</span>
                    </span>
                </div>
            </div>
        </div>
    `;
}

function bindKbCardEvents(container) {
    // 收藏按钮事件
    container.querySelectorAll('.kb-card-favorite').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const kbId = this.dataset.kbId;
            toggleKbFavorite(kbId);
        });
    });
}

function toggleKbFavorite(kbId) {
    const index = favoriteKnowledgeBases.indexOf(kbId);
    
    if (index >= 0) {
        // 取消收藏
        favoriteKnowledgeBases.splice(index, 1);
    } else {
        // 添加收藏
        favoriteKnowledgeBases.push(kbId);
    }
    
    localStorage.setItem('favoriteKnowledgeBases', JSON.stringify(favoriteKnowledgeBases));
    
    // 重新渲染
    renderKnowledgeBases();
    
    // 更新指示器
    updateKbIndicator();
    
    // 显示提示
    const kb = allKnowledgeBases.find(k => k.id === kbId);
    if (kb) {
        const action = index >= 0 ? '已取消收藏' : '已收藏';
        addSystemMessage(`${action}知识库：${kb.name}`);
    }
}

function performKbSearch(searchTerm) {
    const allGrid = document.getElementById('allKbGrid');
    if (!allGrid) return;
    
    const cards = allGrid.querySelectorAll('.kb-card');
    
    if (!searchTerm) {
        cards.forEach(card => card.style.display = '');
        return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    cards.forEach(card => {
        const kbId = card.dataset.kbId;
        const kb = allKnowledgeBases.find(k => k.id === kbId);
        if (!kb) return;
        
        const searchText = `${kb.name} ${kb.desc} ${kb.tags.join(' ')}`.toLowerCase();
        if (searchText.includes(lowerSearchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function toggleKbSearchReset(searchTerm) {
    const resetBtn = document.getElementById('kbSearchReset');
    if (resetBtn) {
        resetBtn.style.display = searchTerm ? 'flex' : 'none';
    }
}

function updateKbIndicator() {
    const indicator = document.getElementById('chatKbIndicator');
    const indicatorCount = document.getElementById('kbIndicatorCount');
    
    if (!indicator || !indicatorCount) return;
    
    const count = favoriteKnowledgeBases.length;
    
    if (count > 0) {
        indicator.style.display = 'block';
        indicatorCount.textContent = count;
    } else {
        indicator.style.display = 'none';
    }
}

function addSystemMessage(text) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message message-system';
    messageDiv.style.cssText = 'width: 100%; margin-bottom: 12px;';
    messageDiv.innerHTML = `
        <div class="message-content" style="width: 100%;">
            <div class="message-text" style="background: rgba(37, 99, 235, 0.1); border: 1px solid rgba(37, 99, 235, 0.2); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: var(--primary-color); text-align: center; margin: 0;">
                ${text}
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

