// 缺陷研判智能体页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化上传功能
    initUpload();
    
    // 初始化任务筛选
    initTaskFilters();
    
    // 初始化用户信息
    initUserInfo();
    
    // 初始化收藏功能（使用本地函数，但也要更新首页菜单）
    initFavorites();
    
    // 更新首页菜单中的收藏列表（如果函数存在）
    if (typeof window.updateHomeMenuFavorites === 'function') {
        window.updateHomeMenuFavorites();
    }
    
    // 初始化退出登录
    initLogout();
    
    // 初始化首页菜单位置（使用dashboard.js中的函数）
    if (typeof window.initHomeMenuPosition === 'function') {
        window.initHomeMenuPosition();
    }
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
        userAvatar.textContent = userName.charAt(0).toUpperCase();
    }
}

function getUserNameFromEmail(email) {
    return email.split('@')[0];
}

// 初始化上传功能
function initUpload() {
    const reportUploadArea = document.getElementById('reportUploadArea');
    const sourceUploadArea = document.getElementById('sourceUploadArea');
    const reportFileInput = document.getElementById('reportFileInput');
    const sourceFileInput = document.getElementById('sourceFileInput');
    const submitBtn = document.getElementById('submitTaskBtn');
    
    let reportFile = null;
    let sourceFile = null;
    
    // 检测报告上传
    if (reportUploadArea && reportFileInput) {
        // 点击上传
        reportUploadArea.addEventListener('click', () => {
            reportFileInput.click();
        });
        
        // 文件选择
        reportFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                reportFile = file;
                displayFileInfo('report', file);
                checkSubmitButton();
            }
        });
        
        // 拖拽上传
        setupDragAndDrop(reportUploadArea, reportFileInput, (file) => {
            reportFile = file;
            displayFileInfo('report', file);
            checkSubmitButton();
        });
        
        // 移除文件
        const reportFileRemove = document.getElementById('reportFileRemove');
        if (reportFileRemove) {
            reportFileRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                reportFile = null;
                reportFileInput.value = '';
                hideFileInfo('report');
                checkSubmitButton();
            });
        }
    }
    
    // 源代码包上传
    if (sourceUploadArea && sourceFileInput) {
        // 点击上传
        sourceUploadArea.addEventListener('click', () => {
            sourceFileInput.click();
        });
        
        // 文件选择
        sourceFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                sourceFile = file;
                displayFileInfo('source', file);
                checkSubmitButton();
            }
        });
        
        // 拖拽上传
        setupDragAndDrop(sourceUploadArea, sourceFileInput, (file) => {
            sourceFile = file;
            displayFileInfo('source', file);
            checkSubmitButton();
        });
        
        // 移除文件
        const sourceFileRemove = document.getElementById('sourceFileRemove');
        if (sourceFileRemove) {
            sourceFileRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                sourceFile = null;
                sourceFileInput.value = '';
                hideFileInfo('source');
                checkSubmitButton();
            });
        }
    }
    
    // 检查提交按钮状态
    function checkSubmitButton() {
        if (submitBtn) {
            if (reportFile || sourceFile) {
                submitBtn.disabled = false;
            } else {
                submitBtn.disabled = true;
            }
        }
    }
    
    // 提交任务
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (!reportFile && !sourceFile) {
                alert('请至少上传一个文件');
                return;
            }
            
            // 创建任务
            createTask(reportFile, sourceFile);
        });
    }
}

// 显示文件信息
function displayFileInfo(type, file) {
    const fileInfo = document.getElementById(type + 'FileInfo');
    const fileName = document.getElementById(type + 'FileName');
    const fileSize = document.getElementById(type + 'FileSize');
    const uploadPlaceholder = document.querySelector(`#${type}UploadArea .upload-placeholder`);
    
    if (fileInfo && fileName && fileSize) {
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.style.display = 'flex';
        if (uploadPlaceholder) {
            uploadPlaceholder.style.display = 'none';
        }
    }
}

// 隐藏文件信息
function hideFileInfo(type) {
    const fileInfo = document.getElementById(type + 'FileInfo');
    const uploadPlaceholder = document.querySelector(`#${type}UploadArea .upload-placeholder`);
    
    if (fileInfo) {
        fileInfo.style.display = 'none';
    }
    if (uploadPlaceholder) {
        uploadPlaceholder.style.display = 'flex';
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// 设置拖拽上传
function setupDragAndDrop(uploadArea, fileInput, callback) {
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            // 验证文件类型
            const acceptTypes = fileInput.accept.split(',').map(t => t.trim());
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (acceptTypes.some(type => file.name.toLowerCase().endsWith(type.replace('.', '')))) {
                fileInput.files = files;
                callback(file);
            } else {
                alert('不支持的文件格式，请上传 ' + acceptTypes.join('、') + ' 格式的文件');
            }
        }
    });
}

// 创建任务
function createTask(reportFile, sourceFile) {
    // 这里应该调用后端API创建任务
    // 现在先模拟创建任务
    console.log('创建任务:', {
        reportFile: reportFile?.name,
        sourceFile: sourceFile?.name
    });
    
    // 显示成功提示
    alert('任务已创建，正在处理中...');
    
    // 清空文件
    if (reportFile) {
        document.getElementById('reportFileInput').value = '';
        hideFileInfo('report');
    }
    if (sourceFile) {
        document.getElementById('sourceFileInput').value = '';
        hideFileInfo('source');
    }
    
    // 禁用提交按钮
    const submitBtn = document.getElementById('submitTaskBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
    }
    
    // 刷新任务列表（实际应该从后端获取）
    // refreshTasksList();
}

// 初始化任务筛选
function initTaskFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taskCards = document.querySelectorAll('.task-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // 筛选任务卡片
            taskCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const status = card.dataset.status;
                    if (filter === 'pending' && status === 'pending') {
                        card.style.display = 'block';
                    } else if (filter === 'completed' && status === 'completed') {
                        card.style.display = 'block';
                    } else if (filter === 'failed' && status === 'failed') {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// 初始化收藏功能
function initFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesList = document.getElementById('favoritesItems');
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    
    if (!favoritesList || !favoritesEmpty) return;
    
    if (favorites.length === 0) {
        favoritesList.style.display = 'none';
        favoritesEmpty.style.display = 'block';
    } else {
        favoritesEmpty.style.display = 'none';
        favoritesList.style.display = 'block';
        favoritesList.innerHTML = '';
        
        favorites.forEach(fav => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerHTML = `
                <span class="favorite-item-icon">${getAgentIcon(fav.id)}</span>
                <span class="favorite-item-name">${fav.name}</span>
            `;
            item.addEventListener('click', () => {
                window.location.href = getAgentUrl(fav.id);
            });
            favoritesList.appendChild(item);
        });
    }
}

function getAgentIcon(id) {
    const icons = {
        1: '🎯',
        2: '📚',
        3: '📰',
        4: '🧠',
        5: '⚖️',
        6: '🌐'
    };
    return icons[id] || '🤖';
}

function getAgentUrl(id) {
    if (id === 3) return 'agent-news.html';
    if (id === 5) return 'agent-defect.html';
    return 'dashboard.html';
}

// 初始化退出登录
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const userNavItem = document.getElementById('userNavItem');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = 'index.html';
        });
    }
    
    // 用户菜单悬停显示
    if (userNavItem) {
        userNavItem.addEventListener('mouseenter', () => {
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = 'block';
            }
        });
        
        const userMenuWrapper = document.querySelector('.nav-item-user-wrapper');
        if (userMenuWrapper) {
            userMenuWrapper.addEventListener('mouseleave', () => {
                const userMenu = document.getElementById('userMenu');
                if (userMenu) {
                    userMenu.style.display = 'none';
                }
            });
        }
    }
}

