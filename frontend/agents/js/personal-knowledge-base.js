// 个人知识库页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化收藏功能（使用dashboard.js中的函数）
    if (typeof window.initFavorites === 'function') {
        window.initFavorites();
    }

    // 初始化首页菜单位置（使用dashboard.js中的函数）
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }

    // 渲染知识库列表
    renderKbList();

    // 渲染我管理的知识库
    renderManagedKbList();

    // 渲染已收藏的知识库
    renderFavoriteKbList();

    // 初始化中间栏标题
    updateMiddleColumnTitle();

    // 初始化表格排序
    initTableSort();

    // 初始化上传功能
    initUploadModal();

    // 初始化聊天功能
    initChatFunction();

    // 初始化文件操作
    initFileActions();

    // 初始化新建知识库弹窗
    initCreateKbModal();

    // 初始化目录菜单
    initDirectoryMenu();

    // 初始化知识库广场跳转按钮
    initKnowledgeSquareButton();
});

// 知识库数据
let knowledgeBases = [
    {
        id: 'kb-1',
        name: '日常资料1',
        description: '',
        createdAt: '2026-01-04 10:00:00'
    }
];

// 我管理的知识库(团队共享)
let managedKnowledgeBases = [
    {
        id: 'managed-1',
        name: '团队安全规范',
        description: '公司安全开发规范文档',
        createdAt: '2026-01-10 14:30:00'
    },
    {
        id: 'managed-2',
        name: '漏洞库',
        description: '历史漏洞案例收集',
        createdAt: '2026-01-12 09:15:00'
    }
];

// 已收藏的知识库(从localStorage加载)
let favoriteKnowledgeBases = JSON.parse(localStorage.getItem('favoriteKnowledgeBasesData') || '[]');

// 当前选中的知识库ID
let currentKbId = 'kb-1';

// 知识库最大数量
const MAX_KB_COUNT = 3;

// 模拟文件数据 - 按知识库ID存储
// 状态值按照 spec.md 规范：running(分析中), completed(已完成/success), terminated(已终止), error(错误)
let fileDataByKb = {
    'kb-1': [
        {
            id: 1,
            name: 'FuzzEnFuzz.no_watermark.zh-CN.pdf',
            status: 'error',
            time: '2026-01-04 16:29:02',
            size: '9B',
            timestamp: new Date('2026-01-04 16:29:02').getTime(),
            sizeBytes: 9
        }
    ]
};

// 获取当前知识库的文件数据
function getCurrentFileData() {
    if (!fileDataByKb[currentKbId]) {
        fileDataByKb[currentKbId] = [];
    }
    return fileDataByKb[currentKbId];
}

// 渲染知识库列表
function renderKbList() {
    const kbList = document.querySelector('.kb-list');
    const kbSection = document.querySelector('.kb-section');
    if (!kbList || !kbSection) return;

    // 清空现有列表
    kbList.innerHTML = '';

    // 计算进度
    const currentCount = knowledgeBases.length;
    const progressPercent = (currentCount / MAX_KB_COUNT) * 100;

    // 渲染每个知识库（不包含进度条）
    knowledgeBases.forEach(function(kb) {
        const isActive = kb.id === currentKbId;

        const item = document.createElement('div');
        item.className = `kb-item ${isActive ? 'active' : ''}`;
        item.setAttribute('data-kb-id', kb.id);
        item.innerHTML = `
            <span class="kb-item-icon">📦</span>
            <div class="kb-item-name">${kb.name}</div>
        `;

        kbList.appendChild(item);
    });

    // 移除旧的总进度条（如果存在）
    const oldProgress = kbSection.querySelector('.kb-section-progress');
    if (oldProgress) {
        oldProgress.remove();
    }

    // 渲染总进度条（在列表下方）
    const progressDiv = document.createElement('div');
    progressDiv.className = 'kb-section-progress';
    progressDiv.innerHTML = `
        <div class="kb-quota-bar">
            <div class="kb-quota-fill" style="width: ${progressPercent}%"></div>
        </div>
        <span class="kb-quota-text">${currentCount}/${MAX_KB_COUNT}</span>
    `;

    // 插入到 kb-list 之后
    kbList.parentNode.insertBefore(progressDiv, kbList.nextSibling);

    // 绑定点击事件
    initKnowledgeBaseSwitch();
}

// 渲染我管理的知识库列表
function renderManagedKbList() {
    const section = document.querySelector('#managedKbSection');
    if (!section) return;

    // 查找或创建列表容器
    let listContainer = section.querySelector('.kb-list');
    if (!listContainer) {
        // 移除空状态
        const emptyState = section.querySelector('.kb-empty-state');
        if (emptyState) emptyState.remove();

        // 创建列表容器
        listContainer = document.createElement('div');
        listContainer.className = 'kb-list';
        section.appendChild(listContainer);
    }

    listContainer.innerHTML = '';

    // 如果没有数据,显示空状态
    if (managedKnowledgeBases.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'kb-empty-state';
        emptyState.innerHTML = '<p class="empty-text">暂无管理的知识库</p>';
        listContainer.appendChild(emptyState);
        return;
    }

    // 渲染知识库列表
    managedKnowledgeBases.forEach(function(kb) {
        const isActive = kb.id === currentKbId;
        const item = document.createElement('div');
        item.className = `kb-item ${isActive ? 'active' : ''}`;
        item.setAttribute('data-kb-id', kb.id);
        item.innerHTML = `
            <span class="kb-item-icon">📦</span>
            <div class="kb-item-name">${kb.name}</div>
        `;
        listContainer.appendChild(item);
    });

    // 绑定点击事件
    initKnowledgeBaseSwitch();
}

// 渲染已收藏的知识库列表
function renderFavoriteKbList() {
    const section = document.querySelector('#favoriteKbSection');
    if (!section) return;

    // 查找或创建列表容器
    let listContainer = section.querySelector('.kb-list');
    if (!listContainer) {
        // 移除空状态
        const emptyState = section.querySelector('.kb-empty-state');
        if (emptyState) emptyState.remove();

        // 创建列表容器
        listContainer = document.createElement('div');
        listContainer.className = 'kb-list';
        section.appendChild(listContainer);
    }

    listContainer.innerHTML = '';

    // 如果没有数据,显示空状态
    if (favoriteKnowledgeBases.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'kb-empty-state with-icon';
        emptyState.innerHTML = `
            <div class="empty-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="35" fill="#E8F4FF"/>
                    <path d="M40 25L45 35H55L47 42L50 52L40 45L30 52L33 42L25 35H35L40 25Z" fill="#D0E8FF"/>
                    <rect x="30" y="50" width="20" height="15" rx="2" fill="#B8DBFF"/>
                </svg>
            </div>
            <p class="empty-text">您还未有收藏的知识库，快去收藏吧~</p>
            <button class="btn-collect-kb" id="goToKnowledgeSquareBtn2">⭐ 知识库广场</button>
        `;
        listContainer.appendChild(emptyState);

        // 绑定按钮事件
        const btn = listContainer.querySelector('#goToKnowledgeSquareBtn2');
        if (btn) {
            btn.addEventListener('click', function() {
                window.location.href = 'knowledge-square.html';
            });
        }
        return;
    }

    // 渲染知识库列表
    favoriteKnowledgeBases.forEach(function(kb) {
        const isActive = kb.id === currentKbId;
        const item = document.createElement('div');
        item.className = `kb-item ${isActive ? 'active' : ''}`;
        item.setAttribute('data-kb-id', kb.id);
        item.innerHTML = `
            <span class="kb-item-icon">⭐</span>
            <div class="kb-item-name">${kb.name}</div>
        `;
        listContainer.appendChild(item);
    });

    // 绑定点击事件
    initKnowledgeBaseSwitch();
}

// 初始化知识库切换
function initKnowledgeBaseSwitch() {
    const kbItems = document.querySelectorAll('.kb-item');

    kbItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 移除所有active状态
            kbItems.forEach(function(i) {
                i.classList.remove('active');
            });

            // 添加当前项active状态
            this.classList.add('active');

            const kbId = this.getAttribute('data-kb-id');
            currentKbId = kbId;
            console.log('切换到知识库:', kbId);

            // 更新中间栏标题
            updateMiddleColumnTitle();

            // 刷新文件列表
            renderFileTable();
        });
    });
}

// 初始化表格排序
function initTableSort() {
    const sortableHeaders = document.querySelectorAll('.sortable');

    sortableHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            const currentOrder = this.getAttribute('data-order') || 'asc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            // 移除其他列的排序状态
            sortableHeaders.forEach(function(h) {
                h.removeAttribute('data-order');
                const icon = h.querySelector('.sort-icon');
                if (icon) icon.textContent = '⇅';
            });

            // 设置当前列的排序状态
            this.setAttribute('data-order', newOrder);
            const icon = this.querySelector('.sort-icon');
            if (icon) {
                icon.textContent = newOrder === 'asc' ? '↑' : '↓';
            }

            // 排序文件数据
            sortFileData(sortType, newOrder);
        });
    });
}

// 排序文件数据
function sortFileData(sortType, order) {
    const fileData = getCurrentFileData();
    fileData.sort(function(a, b) {
        let compareA, compareB;

        if (sortType === 'time') {
            compareA = a.timestamp;
            compareB = b.timestamp;
        } else if (sortType === 'size') {
            compareA = a.sizeBytes;
            compareB = b.sizeBytes;
        }

        if (order === 'asc') {
            return compareA - compareB;
        } else {
            return compareB - compareA;
        }
    });

    // 重新渲染表格
    renderFileTable();
}

// 渲染文件表格
function renderFileTable() {
    const tbody = document.getElementById('fileTableBody');
    if (!tbody) return;

    const fileData = getCurrentFileData();
    tbody.innerHTML = '';

    // 如果没有文件,显示空状态
    if (fileData.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.className = 'empty-state-row';
        emptyRow.innerHTML = `
            <td colspan="5" class="empty-state-cell">
                <div class="kb-empty-state">
                    <div class="empty-icon">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                            <circle cx="40" cy="40" r="35" fill="#F3F4F6"/>
                            <path d="M30 25H50C51.1 25 52 25.9 52 27V53C52 54.1 51.1 55 50 55H30C28.9 55 28 54.1 28 53V27C28 25.9 28.9 25 30 25Z" fill="#D1D5DB"/>
                            <rect x="33" y="30" width="14" height="2" rx="1" fill="#9CA3AF"/>
                            <rect x="33" y="35" width="10" height="2" rx="1" fill="#9CA3AF"/>
                            <rect x="33" y="40" width="12" height="2" rx="1" fill="#9CA3AF"/>
                        </svg>
                    </div>
                    <p class="empty-text">暂无文件,点击上方"上传文档"按钮添加文件</p>
                </div>
            </td>
        `;
        tbody.appendChild(emptyRow);
        return;
    }

    fileData.forEach(function(file) {
        // 状态值按照 spec.md 规范：success(已完成), error(错误), processing(处理中)
        const statusClass = file.status === 'success' ? 'status-success' :
                           file.status === 'error' ? 'status-failed' :
                           file.status === 'failed' ? 'status-failed' :
                           'status-processing';

        const statusText = file.status === 'success' ? '成功' :
                          file.status === 'error' ? '失败' :
                          file.status === 'failed' ? '失败' :
                          '处理中';

        const row = document.createElement('tr');
        row.className = 'file-row';
        row.innerHTML = `
            <td class="col-name">
                <span class="file-icon">📄</span>
                <span class="file-name">${file.name}</span>
            </td>
            <td class="col-status">
                <span class="status-badge ${statusClass}">${statusText}</span>
            </td>
            <td class="col-time">${file.time}</td>
            <td class="col-size">${file.size}</td>
            <td class="col-actions">
                <button class="btn-file-action" data-action="download" data-file-id="${file.id}" title="下载">📥</button>
                <button class="btn-file-action" data-action="delete" data-file-id="${file.id}" title="删除">🗑️</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    // 重新初始化文件操作
    initFileActions();
}

// 初始化文件操作
function initFileActions() {
    const actionButtons = document.querySelectorAll('.btn-file-action');

    actionButtons.forEach(function(button) {
        // 移除旧的事件监听
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);

        newButton.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const fileId = parseInt(this.getAttribute('data-file-id'));

            if (action === 'download') {
                downloadFile(fileId);
            } else if (action === 'delete') {
                deleteFile(fileId);
            }
        });
    });
}

// 下载文件
function downloadFile(fileId) {
    const fileData = getCurrentFileData();
    const file = fileData.find(f => f.id === fileId);
    if (!file) return;

    console.log('下载文件:', file.name);
    alert(`下载文件: ${file.name}`);
}

// 删除文件
function deleteFile(fileId) {
    const fileData = getCurrentFileData();
    const file = fileData.find(f => f.id === fileId);
    if (!file) return;

    if (confirm(`确定要删除文件 "${file.name}" 吗？`)) {
        const index = fileData.findIndex(f => f.id === fileId);
        if (index !== -1) {
            fileData.splice(index, 1);
        }
        renderFileTable();
        console.log('删除文件:', file.name);
    }
}

// 初始化上传对话框
function initUploadModal() {
    const uploadBtn = document.getElementById('uploadBtn');
    const modal = document.getElementById('uploadModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelUploadBtn = document.getElementById('cancelUploadBtn');
    const confirmUploadBtn = document.getElementById('confirmUploadBtn');
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const uploadList = document.getElementById('uploadList');

    let selectedFiles = [];

    // 打开对话框
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            modal.classList.add('show');
        });
    }

    // 关闭对话框
    function closeModal() {
        modal.classList.remove('show');
        selectedFiles = [];
        uploadList.innerHTML = '';
        uploadList.classList.remove('show');
        fileInput.value = '';
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelUploadBtn) {
        cancelUploadBtn.addEventListener('click', closeModal);
    }

    // 点击上传区域
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
    }

    // 文件选择
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            handleFiles(e.target.files);
        });
    }

    // 拖拽上传
    if (uploadArea) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
    }

    // 处理文件
    function handleFiles(files) {
        if (!files || files.length === 0) return;

        Array.from(files).forEach(function(file) {
            // 检查文件类型
            const validTypes = ['.pdf', '.doc', '.docx', '.txt'];
            const fileExt = '.' + file.name.split('.').pop().toLowerCase();

            if (!validTypes.includes(fileExt)) {
                alert(`不支持的文件格式: ${file.name}`);
                return;
            }

            // 检查文件大小（10MB）
            if (file.size > 10 * 1024 * 1024) {
                alert(`文件过大: ${file.name} (最大10MB)`);
                return;
            }

            selectedFiles.push(file);
        });

        renderUploadList();
    }

    // 渲染上传列表
    function renderUploadList() {
        if (selectedFiles.length === 0) {
            uploadList.classList.remove('show');
            return;
        }

        uploadList.classList.add('show');
        uploadList.innerHTML = '';

        selectedFiles.forEach(function(file, index) {
            const item = document.createElement('div');
            item.className = 'upload-item';
            item.innerHTML = `
                <span class="upload-item-icon">📄</span>
                <div class="upload-item-info">
                    <div class="upload-item-name">${file.name}</div>
                    <div class="upload-item-size">${formatFileSize(file.size)}</div>
                </div>
                <button class="upload-item-remove" data-index="${index}">×</button>
            `;

            uploadList.appendChild(item);
        });

        // 移除文件
        const removeButtons = uploadList.querySelectorAll('.upload-item-remove');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                selectedFiles.splice(index, 1);
                renderUploadList();
            });
        });
    }

    // 确认上传
    if (confirmUploadBtn) {
        confirmUploadBtn.addEventListener('click', function() {
            if (selectedFiles.length === 0) {
                alert('请先选择文件');
                return;
            }

            console.log('上传文件:', selectedFiles);

            const fileData = getCurrentFileData();

            // 模拟上传
            selectedFiles.forEach(function(file) {
                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    status: 'processing',
                    time: new Date().toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).replace(/\//g, '-'),
                    size: formatFileSize(file.size),
                    timestamp: Date.now(),
                    sizeBytes: file.size
                };

                fileData.unshift(newFile);

                // 模拟处理成功
                setTimeout(function() {
                    newFile.status = 'success';
                    renderFileTable();
                }, 2000);
            });

            renderFileTable();
            closeModal();

            alert(`成功上传 ${selectedFiles.length} 个文件`);
        });
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// 初始化聊天功能
function initChatFunction() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearChat = document.getElementById('clearChat');
    const chatMessages = document.getElementById('chatMessages');

    // 发送消息
    function sendMessage() {
        if (!chatInput || !chatMessages) return;

        const message = chatInput.value.trim();
        if (!message) return;

        // 添加用户消息
        const userMessage = document.createElement('div');
        userMessage.className = 'message-item user-message';
        userMessage.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(userMessage);

        // 清空输入框
        chatInput.value = '';

        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 模拟AI回复
        setTimeout(function() {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message-item ai-message';
            aiMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>我收到了你的问题："${message}"</p>
                    <p>让我帮你查找知识库中的相关内容...</p>
                </div>
            `;
            chatMessages.appendChild(aiMessage);

            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }

    // 发送按钮点击
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // 键盘事件
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // 清空对话
    if (clearChat) {
        clearChat.addEventListener('click', function() {
            if (!chatMessages) return;

            if (confirm('确定要清空所有对话吗？')) {
                chatMessages.innerHTML = `
                    <div class="message-item ai-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p>你好！我是AI智能助手，可以帮你分析和理解知识库中的文档内容。</p>
                            <p>你可以问我：</p>
                            <ul>
                                <li>总结某个文档的核心内容</li>
                                <li>解释专业术语</li>
                                <li>查找相关知识点</li>
                            </ul>
                        </div>
                    </div>
                `;
            }
        });
    }
}

// 初始化新建知识库对话框
function initCreateKbModal() {
    const addKbBtn = document.querySelector('.btn-add-kb');
    const modal = document.getElementById('createKbModal');
    const closeModalBtn = document.getElementById('closeCreateKbModalBtn');
    const cancelBtn = document.getElementById('cancelCreateKbBtn');
    const confirmBtn = document.getElementById('confirmCreateKbBtn');
    const kbNameInput = document.getElementById('kbNameInput');
    const kbDescInput = document.getElementById('kbDescInput');
    const kbNameCount = document.getElementById('kbNameCount');
    const kbDescCount = document.getElementById('kbDescCount');

    // 打开对话框
    if (addKbBtn) {
        addKbBtn.addEventListener('click', function() {
            // 检查是否达到最大数量
            if (knowledgeBases.length >= MAX_KB_COUNT) {
                alert(`最多只能创建 ${MAX_KB_COUNT} 个知识库`);
                return;
            }

            modal.classList.add('show');
            // 聚焦到名称输入框
            setTimeout(function() {
                if (kbNameInput) kbNameInput.focus();
            }, 100);
        });
    }

    // 关闭对话框
    function closeModal() {
        modal.classList.remove('show');
        // 重置表单
        if (kbNameInput) {
            kbNameInput.value = '';
            kbNameCount.textContent = '0';
        }
        if (kbDescInput) {
            kbDescInput.value = '';
            kbDescCount.textContent = '0';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // 点击遮罩层关闭
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // 名称输入框字符计数
    if (kbNameInput && kbNameCount) {
        kbNameInput.addEventListener('input', function() {
            const length = this.value.length;
            kbNameCount.textContent = length;
        });
    }

    // 描述输入框字符计数
    if (kbDescInput && kbDescCount) {
        kbDescInput.addEventListener('input', function() {
            const length = this.value.length;
            kbDescCount.textContent = length;
        });
    }

    // 确认创建
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const name = kbNameInput ? kbNameInput.value.trim() : '';
            const desc = kbDescInput ? kbDescInput.value.trim() : '';

            // 验证必填项
            if (!name) {
                alert('请输入知识库名称');
                if (kbNameInput) kbNameInput.focus();
                return;
            }

            // 检查是否达到最大数量
            if (knowledgeBases.length >= MAX_KB_COUNT) {
                alert(`最多只能创建 ${MAX_KB_COUNT} 个知识库`);
                return;
            }

            // 创建新知识库
            const newKb = {
                id: 'kb-' + (knowledgeBases.length + 1),
                name: name,
                description: desc,
                createdAt: new Date().toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                }).replace(/\//g, '-')
            };

            // 添加到数组
            knowledgeBases.push(newKb);

            // 设置为当前选中
            currentKbId = newKb.id;

            // 刷新知识库列表
            renderKbList();

            // 更新中间栏标题
            updateMiddleColumnTitle();

            // 显示空状态
            renderFileTable();

            console.log('创建知识库:', newKb);
            alert(`成功创建知识库：${name}`);
            closeModal();
        });
    }
}

// ==========================================
// 目录下拉菜单功能
// ==========================================

function initDirectoryMenu() {
    const directoryMenuBtn = document.getElementById('directoryMenuBtn');
    const directoryMenu = document.getElementById('directoryMenu');
    const docManageMenuItem = document.getElementById('docManageMenuItem');
    const kbSettingsMenuItem = document.getElementById('kbSettingsMenuItem');
    const deleteKbMenuItem = document.getElementById('deleteKbMenuItem');

    // 打开/关闭下拉菜单
    if (directoryMenuBtn && directoryMenu) {
        directoryMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            directoryMenu.classList.toggle('show');

            // 更新删除知识库按钮状态
            if (deleteKbMenuItem) {
                deleteKbMenuItem.disabled = knowledgeBases.length <= 1;
            }
        });

        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!directoryMenu.contains(e.target) && e.target !== directoryMenuBtn) {
                directoryMenu.classList.remove('show');
            }
        });
    }

    // ==========================================
    // 文档管理模式
    // ==========================================

    let isManageMode = false;

    const fileTable = document.querySelector('.file-table');
    const docManageActions = document.getElementById('docManageActions');
    const cancelManageBtn = document.getElementById('cancelManageBtn');
    const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');

    // 进入文档管理模式
    if (docManageMenuItem) {
        docManageMenuItem.addEventListener('click', function() {
            isManageMode = true;
            enterManageMode();
            directoryMenu.classList.remove('show');
        });
    }

    // 退出文档管理模式
    if (cancelManageBtn) {
        cancelManageBtn.addEventListener('click', function() {
            isManageMode = false;
            exitManageMode();
        });
    }

    // 进入管理模式
    function enterManageMode() {
        if (fileTable) {
            fileTable.classList.add('manage-mode');
        }

        // 显示复选框列
        const checkboxCols = document.querySelectorAll('.col-checkbox');
        checkboxCols.forEach(function(col) {
            col.style.display = 'table-cell';
        });

        // 显示管理操作按钮，隐藏文件夹按钮
        if (docManageActions) {
            docManageActions.style.display = 'flex';
        }
        if (directoryMenuBtn) {
            directoryMenuBtn.parentElement.style.display = 'none';
        }

        updateDeleteButtonState();
    }

    // 退出管理模式
    function exitManageMode() {
        if (fileTable) {
            fileTable.classList.remove('manage-mode');
        }

        // 隐藏复选框列
        const checkboxCols = document.querySelectorAll('.col-checkbox');
        checkboxCols.forEach(function(col) {
            col.style.display = 'none';
        });

        // 清空所有选中
        const checkboxes = document.querySelectorAll('.file-checkbox');
        checkboxes.forEach(function(cb) {
            cb.checked = false;
        });

        // 隐藏管理操作按钮，显示文件夹按钮
        if (docManageActions) {
            docManageActions.style.display = 'none';
        }
        if (directoryMenuBtn) {
            directoryMenuBtn.parentElement.style.display = 'block';
        }
    }

    // 全选/取消全选
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const fileCheckboxes = document.querySelectorAll('.file-checkbox:not(#selectAllCheckbox)');
            fileCheckboxes.forEach(function(cb) {
                cb.checked = selectAllCheckbox.checked;
            });
            updateDeleteButtonState();
        });
    }

    // 监听单个复选框变化
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('file-checkbox') && e.target.id !== 'selectAllCheckbox') {
            updateDeleteButtonState();
            updateSelectAllState();
        }
    });

    // 更新删除按钮状态
    function updateDeleteButtonState() {
        if (!deleteSelectedBtn) return;

        const fileCheckboxes = document.querySelectorAll('.file-checkbox:not(#selectAllCheckbox)');
        const checkedCount = Array.from(fileCheckboxes).filter(function(cb) { return cb.checked; }).length;

        deleteSelectedBtn.disabled = checkedCount === 0;
    }

    // 更新全选复选框状态
    function updateSelectAllState() {
        if (!selectAllCheckbox) return;

        const fileCheckboxes = document.querySelectorAll('.file-checkbox:not(#selectAllCheckbox)');
        const checkedCount = Array.from(fileCheckboxes).filter(function(cb) { return cb.checked; }).length;

        if (checkedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCount === fileCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }

    // 删除选中文件
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', function() {
            const fileCheckboxes = document.querySelectorAll('.file-checkbox:not(#selectAllCheckbox)');
            const checkedBoxes = Array.from(fileCheckboxes).filter(function(cb) { return cb.checked; });

            if (checkedBoxes.length === 0) {
                return;
            }

            const confirmMsg = `确定要删除选中的 ${checkedBoxes.length} 个文件吗？`;
            if (confirm(confirmMsg)) {
                checkedBoxes.forEach(function(cb) {
                    const row = cb.closest('.file-row');
                    if (row) {
                        row.remove();
                    }
                });

                alert('删除成功');
                exitManageMode();
            }
        });
    }

    // ==========================================
    // 知识库设置（编辑知识库）
    // ==========================================

    if (kbSettingsMenuItem) {
        kbSettingsMenuItem.addEventListener('click', function() {
            directoryMenu.classList.remove('show');
            openEditKbModal();
        });
    }

    // ==========================================
    // 删除知识库
    // ==========================================

    if (deleteKbMenuItem) {
        deleteKbMenuItem.addEventListener('click', function() {
            if (knowledgeBases.length <= 1) {
                alert('至少需要保留一个知识库');
                return;
            }

            directoryMenu.classList.remove('show');

            const currentKb = knowledgeBases.find(function(kb) { return kb.id === currentKbId; });
            const kbName = currentKb ? currentKb.name : '当前知识库';

            if (confirm(`确定要删除知识库"${kbName}"吗？删除后无法恢复。`)) {
                // 从数组中移除
                const index = knowledgeBases.findIndex(function(kb) { return kb.id === currentKbId; });
                if (index !== -1) {
                    knowledgeBases.splice(index, 1);
                }

                // 切换到第一个知识库
                if (knowledgeBases.length > 0) {
                    currentKbId = knowledgeBases[0].id;
                }

                // 刷新列表和标题
                renderKbList();
                updateMiddleColumnTitle();

                alert('删除成功');
            }
        });
    }
}

// ==========================================
// 辅助函数:更新中间栏标题
// ==========================================

function updateMiddleColumnTitle() {
    const titleElement = document.querySelector('.kb-content-title');
    const descElement = document.querySelector('.kb-content-description');

    // 查找当前知识库(从三个数据源中查找)
    let currentKb = knowledgeBases.find(function(kb) { return kb.id === currentKbId; });
    if (!currentKb) {
        currentKb = managedKnowledgeBases.find(function(kb) { return kb.id === currentKbId; });
    }
    if (!currentKb) {
        currentKb = favoriteKnowledgeBases.find(function(kb) { return kb.id === currentKbId; });
    }

    if (titleElement && currentKb) {
        titleElement.textContent = currentKb.name;
    }

    if (descElement && currentKb) {
        if (currentKb.description && currentKb.description.trim()) {
            descElement.textContent = currentKb.description;
            descElement.style.display = 'block';
        } else {
            descElement.style.display = 'none';
        }
    }
}

// ==========================================
// 辅助函数：打开编辑知识库弹窗
// ==========================================

function openEditKbModal() {
    const modal = document.getElementById('createKbModal');
    const modalTitle = document.querySelector('.modal-title');
    const kbNameInput = document.getElementById('kbNameInput');
    const kbDescInput = document.getElementById('kbDescInput');

    if (!modal || !modalTitle || !kbNameInput) return;

    // 找到当前知识库
    const currentKb = knowledgeBases.find(function(kb) { return kb.id === currentKbId; });
    if (!currentKb) return;

    // 修改弹窗标题和按钮文本
    modalTitle.textContent = '知识库设置';
    const confirmBtn = document.getElementById('confirmCreateBtn');
    if (confirmBtn) {
        confirmBtn.textContent = '保存';
    }

    // 填充当前值
    kbNameInput.value = currentKb.name;
    if (kbDescInput) {
        kbDescInput.value = currentKb.description || '';
    }

    // 更新字符计数
    const kbNameCount = document.getElementById('kbNameCount');
    const kbDescCount = document.getElementById('kbDescCount');
    if (kbNameCount) {
        kbNameCount.textContent = currentKb.name.length;
    }
    if (kbDescCount) {
        kbDescCount.textContent = (currentKb.description || '').length;
    }

    // 显示弹窗
    modal.classList.add('show');

    // 临时替换确认按钮的事件处理
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', function() {
        const name = kbNameInput.value.trim();
        const desc = kbDescInput ? kbDescInput.value.trim() : '';

        if (!name) {
            alert('请输入知识库名称');
            kbNameInput.focus();
            return;
        }

        // 更新知识库信息
        currentKb.name = name;
        currentKb.description = desc;

        // 刷新列表和标题
        renderKbList();
        updateMiddleColumnTitle();

        alert('保存成功');

        // 关闭模态框
        modal.classList.remove('show');

        // 恢复原始状态
        restoreModalForCreate();
    });
}

// ==========================================
// 辅助函数：恢复弹窗为创建模式
// ==========================================

function restoreModalForCreate() {
    const modalTitle = document.querySelector('.modal-title');
    const confirmBtn = document.getElementById('confirmCreateBtn');

    if (modalTitle) {
        modalTitle.textContent = '新建知识库';
    }
    if (confirmBtn) {
        confirmBtn.textContent = '创建';
    }
}

// ==========================================
// 知识库广场跳转功能
// ==========================================

function initKnowledgeSquareButton() {
    const goToSquareBtn = document.getElementById('goToKnowledgeSquareBtn');

    if (goToSquareBtn) {
        goToSquareBtn.addEventListener('click', function() {
            window.location.href = 'knowledge-square.html';
        });
    }
}
