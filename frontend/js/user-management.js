// 用户管理页面脚本

document.addEventListener('DOMContentLoaded', function() {
    // 选项卡切换
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // 移除所有活动状态
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');
            const targetPanel = document.getElementById(`tab-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 编辑资料按钮
    const editProfileBtn = document.getElementById('editProfileBtn');
    const usernameInput = document.getElementById('usernameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const bioInput = document.getElementById('bioInput');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // 切换输入框的可编辑状态
            const isReadonly = usernameInput.hasAttribute('readonly');
            
            if (isReadonly) {
                usernameInput.removeAttribute('readonly');
                emailInput.removeAttribute('readonly');
                phoneInput.removeAttribute('readonly');
                this.textContent = '保存更改';
            } else {
                // 保存逻辑
                saveProfile();
                usernameInput.setAttribute('readonly', 'readonly');
                emailInput.setAttribute('readonly', 'readonly');
                this.textContent = '编辑资料';
            }
        });
    }

    // 保存个人资料
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            saveProfile();
        });
    }

    function saveProfile() {
        const email = emailInput.value;
        const phone = phoneInput.value;
        const bio = bioInput.value;

        // 这里可以添加实际的保存逻辑
        console.log('保存个人资料:', { email, phone, bio });
        
        // 显示成功提示
        showNotification('个人资料已保存', 'success');
    }

    // 修改密码
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // 验证密码
            if (!currentPassword || !newPassword || !confirmPassword) {
                showNotification('请填写所有密码字段', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                showNotification('两次输入的新密码不一致', 'error');
                return;
            }

            if (newPassword.length < 6) {
                showNotification('密码长度至少为6位', 'error');
                return;
            }

            // 这里可以添加实际的修改密码逻辑
            console.log('修改密码');
            
            // 清空输入框
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';

            showNotification('密码修改成功', 'success');
        });
    }

    // 偏好设置保存
    const themeSelect = document.getElementById('themeSelect');
    const languageSelect = document.getElementById('languageSelect');
    const emailNotification = document.getElementById('emailNotification');
    const systemNotification = document.getElementById('systemNotification');

    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            savePreferences();
        });
    }

    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            savePreferences();
        });
    }

    if (emailNotification) {
        emailNotification.addEventListener('change', function() {
            savePreferences();
        });
    }

    if (systemNotification) {
        systemNotification.addEventListener('change', function() {
            savePreferences();
        });
    }

    function savePreferences() {
        const preferences = {
            theme: themeSelect ? themeSelect.value : 'light',
            language: languageSelect ? languageSelect.value : 'zh-CN',
            emailNotification: emailNotification ? emailNotification.checked : true,
            systemNotification: systemNotification ? systemNotification.checked : true
        };

        // 这里可以添加实际的保存逻辑
        console.log('保存偏好设置:', preferences);
        
        // 可以显示一个小的提示
        showNotification('设置已保存', 'success');
    }

    // 显示通知
    function showNotification(message, type = 'success') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 加载用户数据（示例）
    function loadUserData() {
        // 这里可以从 API 加载用户数据
        // 示例：从 localStorage 加载
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            try {
                const userData = JSON.parse(savedUserData);
                if (userData.name) {
                    const nameElements = document.querySelectorAll('#userInfoName, #userName');
                    nameElements.forEach(el => {
                        if (el) el.textContent = userData.name;
                    });
                }
                if (userData.email) {
                    const emailElements = document.querySelectorAll('#userInfoEmail, #emailInput');
                    emailElements.forEach(el => {
                        if (el) el.value = userData.email;
                    });
                }
                if (userData.phone) {
                    if (phoneInput) phoneInput.value = userData.phone;
                }
                if (userData.bio) {
                    if (bioInput) bioInput.value = userData.bio;
                }
            } catch (e) {
                console.error('加载用户数据失败:', e);
            }
        }
    }

    // 初始化加载用户数据
    loadUserData();
});

