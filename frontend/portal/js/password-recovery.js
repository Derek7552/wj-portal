/**
 * 密码找回功能 - 交互逻辑
 * 处理忘记密码和密码重置的所有交互
 */

(function() {
    'use strict';

    // ============================================
    // 工具函数
    // ============================================

    /**
     * 邮箱格式验证
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 邮箱脱敏显示
     * user@example.com -> u***@example.com
     */
    function maskEmail(email) {
        if (!email || !isValidEmail(email)) return email;

        const [localPart, domain] = email.split('@');
        const maskedLocal = localPart[0] + '***';
        return `${maskedLocal}@${domain}`;
    }

    /**
     * 检查密码强度
     * 返回: { level: 'weak'|'medium'|'strong', score: 0-3 }
     */
    function checkPasswordStrength(password) {
        let score = 0;

        // 长度检查
        if (password.length >= 8) score++;

        // 包含字母和数字
        if (/[a-z]/.test(password) && /[0-9]/.test(password)) score++;

        // 包含大小写字母
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;

        // 包含特殊字符
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

        // 根据分数返回等级
        if (score <= 1) return { level: 'weak', score: 1 };
        if (score === 2 || score === 3) return { level: 'medium', score: 2 };
        return { level: 'strong', score: 3 };
    }

    /**
     * 显示错误提示
     */
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    /**
     * 清除错误提示
     */
    function clearError(inputElement, errorElement) {
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    /**
     * 切换视图显示
     */
    function showView(viewId) {
        const views = document.querySelectorAll('.auth-card');
        views.forEach(view => {
            view.style.display = 'none';
        });

        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.style.display = 'block';
        }
    }

    // ============================================
    // 忘记密码页面逻辑
    // ============================================

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const sendEmailBtn = document.getElementById('sendEmailBtn');
        let isSubmitting = false;

        // 表单提交
        forgotPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (isSubmitting) return;

            const email = emailInput.value.trim();

            // 验证邮箱格式
            if (!isValidEmail(email)) {
                showError(emailInput, emailError, '请输入有效的邮箱地址');
                return;
            }

            clearError(emailInput, emailError);

            // 检查频率限制
            const lastSendTime = localStorage.getItem('passwordResetLastSend');
            const now = Date.now();
            if (lastSendTime) {
                const timeDiff = now - parseInt(lastSendTime);
                const remainingTime = 60000 - timeDiff; // 60秒 = 60000毫秒

                if (remainingTime > 0) {
                    const seconds = Math.ceil(remainingTime / 1000);
                    showError(emailInput, emailError, `请求过于频繁，请 ${seconds} 秒后重试`);
                    return;
                }
            }

            // 显示加载状态
            isSubmitting = true;
            sendEmailBtn.disabled = true;
            sendEmailBtn.querySelector('.btn-text').style.display = 'none';
            sendEmailBtn.querySelector('.btn-loading').style.display = 'inline-flex';

            try {
                // TODO: 调用实际的API发送重置邮件
                // const response = await fetch('/api/password/forgot', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email })
                // });

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 保存发送时间
                localStorage.setItem('passwordResetLastSend', now.toString());
                localStorage.setItem('passwordResetEmail', email);

                // 显示成功视图
                showView('emailSentView');

                // 显示脱敏邮箱
                const maskedEmailElement = document.getElementById('maskedEmail');
                if (maskedEmailElement) {
                    maskedEmailElement.textContent = maskEmail(email);
                }

                // 启动重新发送倒计时
                startResendCountdown();

            } catch (error) {
                console.error('发送重置邮件失败:', error);
                showError(emailInput, emailError, '发送失败，请稍后重试');
            } finally {
                isSubmitting = false;
                sendEmailBtn.disabled = false;
                sendEmailBtn.querySelector('.btn-text').style.display = 'inline';
                sendEmailBtn.querySelector('.btn-loading').style.display = 'none';
            }
        });

        // 实时验证邮箱格式
        emailInput.addEventListener('input', function() {
            if (emailError.classList.contains('show')) {
                clearError(emailInput, emailError);
            }
        });
    }

    /**
     * 重新发送倒计时
     */
    function startResendCountdown() {
        const resendBtn = document.getElementById('resendBtn');
        const resendCountdown = document.getElementById('resendCountdown');

        if (!resendBtn || !resendCountdown) return;

        const lastSendTime = parseInt(localStorage.getItem('passwordResetLastSend'));
        const now = Date.now();
        const elapsed = now - lastSendTime;
        let remainingSeconds = Math.max(0, Math.ceil((60000 - elapsed) / 1000));

        if (remainingSeconds > 0) {
            resendBtn.disabled = true;
            resendCountdown.textContent = `(${remainingSeconds}s)`;

            const countdownInterval = setInterval(function() {
                remainingSeconds--;

                if (remainingSeconds <= 0) {
                    clearInterval(countdownInterval);
                    resendBtn.disabled = false;
                    resendCountdown.textContent = '';
                } else {
                    resendCountdown.textContent = `(${remainingSeconds}s)`;
                }
            }, 1000);
        }

        // 重新发送点击事件
        resendBtn.addEventListener('click', function() {
            const email = localStorage.getItem('passwordResetEmail');
            if (email) {
                // 清除频率限制，允许重新发送
                localStorage.removeItem('passwordResetLastSend');

                // 回到邮箱输入视图
                showView('emailInputView');

                // 填充邮箱并自动提交
                const emailInput = document.getElementById('email');
                if (emailInput) {
                    emailInput.value = email;
                    setTimeout(() => {
                        forgotPasswordForm.dispatchEvent(new Event('submit'));
                    }, 100);
                }
            }
        });
    }

    // ============================================
    // 密码重置页面逻辑
    // ============================================

    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordError = document.getElementById('passwordError');
        const confirmError = document.getElementById('confirmError');
        const submitBtn = document.getElementById('submitBtn');
        const passwordStrength = document.getElementById('passwordStrength');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        const passwordMatch = document.getElementById('passwordMatch');

        let isSubmitting = false;

        // 密码可见性切换
        setupPasswordToggle('toggleNewPassword', 'newPassword');
        setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

        // 实时密码强度检查
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;

            if (password.length === 0) {
                passwordStrength.style.display = 'none';
                clearError(newPasswordInput, passwordError);
                return;
            }

            passwordStrength.style.display = 'block';
            const { level } = checkPasswordStrength(password);

            // 更新强度样式
            passwordStrength.className = 'password-strength ' + level;

            // 更新文本
            const levelText = {
                'weak': '密码强度: 弱',
                'medium': '密码强度: 中等',
                'strong': '密码强度: 强'
            };
            strengthText.textContent = levelText[level];

            // 验证最小长度
            if (password.length < 8) {
                showError(newPasswordInput, passwordError, '密码至少需要8位');
            } else {
                clearError(newPasswordInput, passwordError);
            }

            // 检查密码匹配
            checkPasswordMatch();
        });

        // 实时密码匹配检查
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);

        function checkPasswordMatch() {
            const password = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (confirmPassword.length === 0) {
                passwordMatch.classList.remove('show');
                clearError(confirmPasswordInput, confirmError);
                return;
            }

            if (password === confirmPassword) {
                passwordMatch.classList.add('show');
                clearError(confirmPasswordInput, confirmError);
            } else {
                passwordMatch.classList.remove('show');
                showError(confirmPasswordInput, confirmError, '两次输入的密码不一致');
            }
        }

        // 表单提交
        resetPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (isSubmitting) return;

            const password = newPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // 验证密码
            if (password.length < 8) {
                showError(newPasswordInput, passwordError, '密码至少需要8位');
                newPasswordInput.focus();
                return;
            }

            if (password !== confirmPassword) {
                showError(confirmPasswordInput, confirmError, '两次输入的密码不一致');
                confirmPasswordInput.focus();
                return;
            }

            // 获取token
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');

            if (!token) {
                showView('invalidTokenView');
                return;
            }

            // 显示加载状态
            isSubmitting = true;
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').style.display = 'none';
            submitBtn.querySelector('.btn-loading').style.display = 'inline-flex';

            try {
                // TODO: 调用实际的API重置密码
                // const response = await fetch('/api/password/reset', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ token, password })
                // });

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 清除本地存储的数据
                localStorage.removeItem('passwordResetLastSend');
                localStorage.removeItem('passwordResetEmail');

                // 显示成功视图
                showView('successView');

                // 启动跳转倒计时
                startRedirectCountdown();

            } catch (error) {
                console.error('密码重置失败:', error);
                showError(newPasswordInput, passwordError, '重置失败，请稍后重试');
            } finally {
                isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline';
                submitBtn.querySelector('.btn-loading').style.display = 'none';
            }
        });
    }

    /**
     * 设置密码可见性切换
     */
    function setupPasswordToggle(toggleBtnId, inputId) {
        const toggleBtn = document.getElementById(toggleBtnId);
        const input = document.getElementById(inputId);

        if (!toggleBtn || !input) return;

        toggleBtn.addEventListener('click', function() {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';

            const iconEye = toggleBtn.querySelector('.icon-eye');
            const iconEyeOff = toggleBtn.querySelector('.icon-eye-off');

            if (iconEye && iconEyeOff) {
                iconEye.style.display = isPassword ? 'none' : 'block';
                iconEyeOff.style.display = isPassword ? 'block' : 'none';
            }

            toggleBtn.setAttribute('aria-label', isPassword ? '隐藏密码' : '显示密码');
        });
    }

    /**
     * 验证重置token
     */
    function verifyResetToken(token) {
        if (!token) {
            showView('invalidTokenView');
            return;
        }

        // TODO: 调用实际的API验证token
        // fetch(`/api/password/verify-token?token=${token}`)
        //     .then(response => {
        //         if (response.ok) {
        //             showView('resetPasswordView');
        //         } else {
        //             showView('invalidTokenView');
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Token验证失败:', error);
        //         showView('invalidTokenView');
        //     });

        // 模拟token验证 - 简单的长度检查
        if (token.length > 10) {
            showView('resetPasswordView');
        } else {
            showView('invalidTokenView');
        }
    }

    /**
     * 重置成功后的跳转倒计时
     */
    function startRedirectCountdown() {
        const countdownElement = document.getElementById('redirectCountdown');
        if (!countdownElement) return;

        let seconds = 3;
        countdownElement.textContent = `${seconds} 秒后自动跳转登录页...`;

        const countdownInterval = setInterval(function() {
            seconds--;

            if (seconds <= 0) {
                clearInterval(countdownInterval);
                window.location.href = 'login.html';
            } else {
                countdownElement.textContent = `${seconds} 秒后自动跳转登录页...`;
            }
        }, 1000);
    }

    // 导出供外部使用
    window.PasswordRecovery = {
        verifyResetToken: verifyResetToken,
        showView: showView
    };

})();
