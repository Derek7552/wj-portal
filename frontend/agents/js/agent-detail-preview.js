/**
 * 信息预览/对话模式交互脚本
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 文件上传功能
    // ==========================================
    const fileInput = document.getElementById('fileInput');
    const btnUploadFile = document.getElementById('btnUploadFile');
    const uploadedFiles = document.getElementById('uploadedFiles');
    const uploadedFilesList = document.getElementById('uploadedFilesList');
    const filesCount = document.getElementById('filesCount');
    const btnClearFiles = document.getElementById('btnClearFiles');
    const previewEmptyState = document.getElementById('previewEmptyState');
    const previewTaskDetail = document.getElementById('previewTaskDetail');
    
    let selectedFiles = [];

    // 点击上传按钮触发文件选择
    if (btnUploadFile && fileInput) {
        btnUploadFile.addEventListener('click', function() {
            fileInput.click();
        });
    }

    // 文件选择
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            handleFiles(files);
            // 清空input值，允许重复选择同一文件
            fileInput.value = '';
        });
    }

    // 处理文件
    function handleFiles(files) {
        files.forEach(file => {
            // 检查文件是否已存在
            if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
            }
        });
        
        updateFileList();
        updateStartButton();
    }

    // 更新文件列表显示
    function updateFileList() {
        if (selectedFiles.length === 0) {
            uploadedFiles.style.display = 'none';
            return;
        }

        uploadedFiles.style.display = 'block';
        filesCount.textContent = selectedFiles.length;
        
        uploadedFilesList.innerHTML = '';
        
        selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'uploaded-file-item';
            
            const fileIcon = getFileIcon(file.name);
            const fileSize = formatFileSize(file.size);
            
            fileItem.innerHTML = `
                <div class="file-item-icon">${fileIcon}</div>
                <div class="file-item-info">
                    <p class="file-item-name">${escapeHtml(file.name)}</p>
                    <p class="file-item-size">${fileSize}</p>
                </div>
                <button class="file-item-remove" data-index="${index}" title="移除">✕</button>
            `;
            
            uploadedFilesList.appendChild(fileItem);
        });

        // 绑定移除按钮
        document.querySelectorAll('.file-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                selectedFiles.splice(index, 1);
                updateFileList();
                updateStartButton();
            });
        });
    }

    // 清空文件
    if (btnClearFiles) {
        btnClearFiles.addEventListener('click', function() {
            selectedFiles = [];
            fileInput.value = '';
            updateFileList();
            updateStartButton();
        });
    }

    // 获取文件图标
    function getFileIcon(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'txt': '📄',
            'md': '📝',
            'py': '🐍',
            'js': '📜',
            'java': '☕',
            'cpp': '⚙️',
            'c': '⚙️',
            'html': '🌐',
            'css': '🎨'
        };
        return iconMap[ext] || '📎';
    }

    // 格式化文件大小
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // 更新开始分析按钮状态（已移除，保留函数以防其他地方调用）
    function updateStartButton() {
        // 不再需要更新按钮状态
    }

    // 显示文档内容
    function displayDocumentContent(file) {
        const documentViewerContent = document.getElementById('documentViewerContent');
        if (!documentViewerContent) return;
        
        // 如果是文本文件，尝试读取内容
        if (file.type.startsWith('text/') || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                documentViewerContent.innerHTML = `
                    <div class="document-content">
                        <pre style="white-space: pre-wrap; font-family: inherit; line-height: 1.6;">${escapeHtml(e.target.result)}</pre>
                    </div>
                `;
            };
            reader.readAsText(file);
        } else {
            // 其他文件类型显示预览信息
            documentViewerContent.innerHTML = `
                <div class="document-content">
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">${getFileIcon(file.name)}</div>
                        <h4 style="margin: 0 0 8px 0; color: #262626;">${escapeHtml(file.name)}</h4>
                        <p style="color: #8c8c8c; margin: 0;">文件大小: ${formatFileSize(file.size)}</p>
                        <p style="color: #8c8c8c; margin: 8px 0 0 0;">文件类型: ${file.type || '未知'}</p>
                        <p style="color: #bfbfbf; margin: 16px 0 0 0; font-size: 13px;">此文件类型暂不支持在线预览，请下载后查看</p>
                    </div>
                </div>
            `;
        }
    }

    // ==========================================
    // 主Tab切换（文档内容 / 分析产物）
    // ==========================================
    const mainTabButtons = document.querySelectorAll('.main-tab-btn');
    const mainTabContents = document.querySelectorAll('.main-tab-content');
    
    mainTabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-main-tab');
            
            // 移除所有活动状态
            mainTabButtons.forEach(b => b.classList.remove('active'));
            mainTabContents.forEach(c => c.classList.remove('active'));
            
            // 激活当前标签页
            this.classList.add('active');
            const targetTab = document.getElementById('mainTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // ==========================================
    // 分析产物标签页切换（摘要 / 洞察 / 建议）
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 激活当前标签页
            this.classList.add('active');
            const targetTab = document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // ==========================================
    // AI对话功能
    // ==========================================
    // 注意：chatInput 和 chatSend 在空状态页面和任务详情页面都存在
    // chatMessages 只在任务详情页面存在
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages'); // 可能为null（在空状态页面时）
    const clearChat = document.getElementById('clearChat');

    if (chatInput && chatSend) {
        // 发送消息
        function sendMessage() {
            const message = chatInput.value.trim();
            
            // 如果有文件或消息，则处理
            if (selectedFiles.length > 0 || message) {
                // 如果有文件且还没有显示任务详情，先切换到任务详情页面
                if (selectedFiles.length > 0 && previewEmptyState && previewEmptyState.style.display !== 'none') {
                    // 显示加载状态
                    if (chatSend) {
                        chatSend.disabled = true;
                        const originalText = chatSend.innerHTML;
                        chatSend.innerHTML = '<span>⏳</span><span>分析中...</span>';
                        
                        // 模拟分析过程（实际应该调用API）
                        setTimeout(() => {
                            // 切换到任务详情页面
                            previewEmptyState.style.display = 'none';
                            if (previewTaskDetail) {
                                previewTaskDetail.style.display = 'flex';
                            }
                            
                            // 更新任务标题
                            const taskTitle = document.getElementById('taskTitle');
                            if (taskTitle && selectedFiles.length > 0) {
                                taskTitle.textContent = selectedFiles[0].name + ' 分析任务';
                            }
                            
                            // 更新任务时间
                            const taskTime = document.getElementById('taskTime');
                            if (taskTime) {
                                const now = new Date();
                                taskTime.textContent = now.toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });
                            }
                            
                            // 显示文档内容（模拟）
                            displayDocumentContent(selectedFiles[0]);
                            
                            // 如果有消息，添加到对话中
                            // 注意：此时已经切换到任务详情页面，chatMessages应该存在
                            if (message) {
                                // 重新获取chatMessages元素（因为页面已经切换）
                                const taskChatMessages = document.getElementById('chatMessages');
                                if (taskChatMessages) {
                                    // 使用临时函数添加消息
                                    const addTaskMessage = (text, type) => {
                                        const messageDiv = document.createElement('div');
                                        messageDiv.className = `message message-${type}`;
                                        const currentTime = new Date().toLocaleString('zh-CN', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        });
                                        messageDiv.innerHTML = `
                                            <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
                                            <div class="message-content">
                                                <div class="message-time">${currentTime}</div>
                                                <div class="message-bubble">
                                                    <p>${escapeHtml(text)}</p>
                                                </div>
                                            </div>
                                        `;
                                        taskChatMessages.appendChild(messageDiv);
                                        taskChatMessages.scrollTop = taskChatMessages.scrollHeight;
                                    };
                                    
                                    addTaskMessage(message, 'user');
                                    setTimeout(() => {
                                        addTaskMessage('这是AI的回复示例。在实际应用中，这里会调用API获取智能体的回复。', 'ai');
                                    }, 1000);
                                }
                            }
                            
                            // 重置按钮状态
                            chatSend.disabled = false;
                            chatSend.innerHTML = originalText;
                        }, 2000);
                        
                        // 清空输入框
                        chatInput.value = '';
                        chatInput.style.height = 'auto';
                        return;
                    }
                } else if (message) {
                    // 如果已经在任务详情页面，直接发送消息
                    // 需要确保chatMessages存在（在任务详情页面中）
                    if (chatMessages) {
                        addMessage(message, 'user');
                        
                        // 清空输入框
                        chatInput.value = '';
                        chatInput.style.height = 'auto';
                        
                        // 模拟AI回复
                        setTimeout(() => {
                            addMessage('这是AI的回复示例。在实际应用中，这里会调用API获取智能体的回复。', 'ai');
                        }, 1000);
                    } else {
                        console.warn('chatMessages元素不存在，无法发送消息。请先切换到任务详情页面。');
                    }
                }
            }
        }

        // 添加消息到聊天区
        function addMessage(text, type) {
            // 重新获取chatMessages元素（可能在页面切换后需要重新获取）
            const messagesContainer = document.getElementById('chatMessages');
            if (!messagesContainer) {
                console.warn('chatMessages元素不存在，无法添加消息');
                return;
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message message-${type}`;

            const currentTime = new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            messageDiv.innerHTML = `
                <div class="message-avatar">${type === 'user' ? '👤' : '🤖'}</div>
                <div class="message-content">
                    <div class="message-time">${currentTime}</div>
                    <div class="message-bubble">
                        <p>${escapeHtml(text)}</p>
                    </div>
                </div>
            `;

            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // 点击发送按钮
        chatSend.addEventListener('click', sendMessage);

        // Shift+Enter 发送
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // 自动调整输入框高度
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 150) + 'px';
        });
    }

    // 清空对话
    if (clearChat) {
        clearChat.addEventListener('click', function() {
            // 重新获取chatMessages元素
            const messagesContainer = document.getElementById('chatMessages');
            if (!messagesContainer) {
                console.warn('chatMessages元素不存在，无法清空对话');
                return;
            }
            
            if (confirm('确定要清空所有对话记录吗？')) {
                messagesContainer.innerHTML = `
                    <div class="message message-ai">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <div class="message-time">${new Date().toLocaleString('zh-CN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</div>
                            <div class="message-bubble">
                                <p>您好！我已经完成了文档分析，可以为您解答关于文档的任何问题。</p>
                                <p>您可以向我提问，例如：</p>
                                <ul>
                                    <li>文档中的关键要点是什么？</li>
                                    <li>如何实施文档中提到的安全措施？</li>
                                    <li>文档中提到的风险有哪些？</li>
                                    <li>有哪些最佳实践建议？</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }

    // ==========================================
    // 新任务按钮
    // ==========================================
    const btnNewTask = document.getElementById('btnNewTask');
    const btnNewChat = document.querySelector('.btn-new-chat');
    
    // 处理新任务按钮点击（信息预览页面自己的逻辑）
    function handleNewTask() {
        // 重置状态
        selectedFiles = [];
        if (fileInput) fileInput.value = '';
        updateFileList();
        updateStartButton();
        
        // 清空输入框
        if (chatInput) {
            chatInput.value = '';
            chatInput.style.height = 'auto';
        }
        
        // 移除所有任务项的active状态
        document.querySelectorAll('.recent-task-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 切换到空状态页
        if (previewEmptyState) {
            previewEmptyState.style.display = 'flex';
        }
        if (previewTaskDetail) {
            previewTaskDetail.style.display = 'none';
        }
    }
    
    // 绑定事件（使用捕获阶段确保优先执行）
    if (btnNewChat) {
        btnNewChat.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleNewTask();
        }, true);
    }
    
    if (btnNewTask) {
        btnNewTask.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleNewTask();
        }, true);
    }

    // ==========================================
    // 近期任务点击处理
    // ==========================================
    const recentTaskItems = document.querySelectorAll('.recent-task-item');
    recentTaskItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有任务项的active状态
            recentTaskItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前任务项的active状态
            this.classList.add('active');
            
            // 获取任务数据
            const taskId = this.getAttribute('data-task-id');
            const taskName = this.getAttribute('data-task-name');
            const taskTime = this.getAttribute('data-task-time');
            const taskStatus = this.getAttribute('data-task-status');
            
            // 加载任务详情
            loadTaskDetail(taskId, taskName, taskTime, taskStatus);
        });
    });

    // 加载任务详情
    function loadTaskDetail(taskId, taskName, taskTime, taskStatus) {
        // 更新任务标题
        const taskTitle = document.getElementById('taskTitle');
        if (taskTitle) {
            taskTitle.textContent = taskName;
        }
        
        // 更新任务时间
        const taskTimeEl = document.getElementById('taskTime');
        if (taskTimeEl) {
            taskTimeEl.textContent = taskTime;
        }
        
        // 更新任务状态
        const taskStatusBadge = document.querySelector('.task-status-badge');
        if (taskStatusBadge) {
            taskStatusBadge.className = 'task-status-badge ' + taskStatus;
            const statusText = {
                'completed': '已完成',
                'running': '进行中',
                'failed': '失败'
            };
            taskStatusBadge.textContent = statusText[taskStatus] || '未知';
        }
        
        // 切换到任务详情页面
        if (previewEmptyState) {
            previewEmptyState.style.display = 'none';
        }
        if (previewTaskDetail) {
            previewTaskDetail.style.display = 'flex';
        }
        
        // 模拟加载任务数据（实际应该调用API）
        // 这里可以根据taskId加载对应的文档内容和对话记录
        loadTaskContent(taskId);
    }

    // 加载任务内容（文档和对话）
    function loadTaskContent(taskId) {
        // 模拟加载文档内容
        const documentViewerContent = document.getElementById('documentViewerContent');
        if (documentViewerContent) {
            // 这里可以根据taskId从API获取文档内容
            // 暂时显示占位内容
            documentViewerContent.innerHTML = `
                <div class="document-content">
                    <div style="text-align: center; padding: 40px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
                        <h4 style="margin: 0 0 8px 0; color: #262626;">任务 #${taskId} 的文档内容</h4>
                        <p style="color: #8c8c8c; margin: 0;">文档内容将在这里显示</p>
                    </div>
                </div>
            `;
        }
        
        // 清空并重置对话记录（实际应该从API加载历史对话）
        // 重新获取chatMessages元素
        const messagesContainer = document.getElementById('chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = `
                <div class="message message-ai">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-time">${new Date().toLocaleString('zh-CN', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</div>
                        <div class="message-bubble">
                            <p>您好！我已经完成了文档分析，可以为您解答关于文档的任何问题。</p>
                            <p>您可以向我提问，例如：</p>
                            <ul>
                                <li>文档中的关键要点是什么？</li>
                                <li>如何实施文档中提到的安全措施？</li>
                                <li>文档中提到的风险有哪些？</li>
                                <li>有哪些最佳实践建议？</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // ==========================================
    // 页面初始化 - 确保默认显示空状态页面
    // ==========================================
    // 页面加载时，确保显示空状态页面
    if (previewEmptyState) {
        previewEmptyState.style.display = 'flex';
    }
    if (previewTaskDetail) {
        previewTaskDetail.style.display = 'none';
    }
    
    // 移除所有任务项的active状态（默认不选中任何任务）
    recentTaskItems.forEach(item => {
        item.classList.remove('active');
    });

    // ==========================================
    // 工具函数
    // ==========================================
    
    // HTML转义
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
