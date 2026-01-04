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

    // 初始化知识库切换
    initKnowledgeBaseSwitch();

    // 初始化表格排序
    initTableSort();

    // 初始化上传功能
    initUploadModal();

    // 初始化聊天功能
    initChatFunction();

    // 初始化文件操作
    initFileActions();
});

// 模拟文件数据
let fileData = [
    {
        id: 1,
        name: 'FuzzEnFuzz.no_watermark.zh-CN.pdf',
        status: 'failed',
        time: '2026-01-04 16:29:02',
        size: '9B',
        timestamp: new Date('2026-01-04 16:29:02').getTime(),
        sizeBytes: 9
    }
];

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
            console.log('切换到知识库:', kbId);

            // 这里可以根据kbId加载不同的文件列表
            // loadKnowledgeBaseFiles(kbId);
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

    tbody.innerHTML = '';

    fileData.forEach(function(file) {
        const statusClass = file.status === 'success' ? 'status-success' :
                           file.status === 'failed' ? 'status-failed' :
                           'status-processing';

        const statusText = file.status === 'success' ? '成功' :
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
    const file = fileData.find(f => f.id === fileId);
    if (!file) return;

    console.log('下载文件:', file.name);
    alert(`下载文件: ${file.name}`);
}

// 删除文件
function deleteFile(fileId) {
    const file = fileData.find(f => f.id === fileId);
    if (!file) return;

    if (confirm(`确定要删除文件 "${file.name}" 吗？`)) {
        fileData = fileData.filter(f => f.id !== fileId);
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

            // 模拟上传
            selectedFiles.forEach(function(file) {
                const newFile = {
                    id: fileData.length + 1,
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
