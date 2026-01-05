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
     * 新规则:
     * - 弱: 纯数字
     * - 中: 数字+字母(单一大小写)
     * - 强: 数字+小写+大写
     * 返回: { level: 'weak'|'medium'|'strong', score: 1-3 }
     */
    function checkPasswordStrength(password) {
        // 检查是否包含空格
        if (/\s/.test(password)) {
            return { level: 'weak', score: 1 };
        }

        const hasNumber = /[0-9]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);

        // 弱: 纯数字
        if (hasNumber && !hasLowerCase && !hasUpperCase) {
            return { level: 'weak', score: 1 };
        }

        // 强: 数字+小写+大写
        if (hasNumber && hasLowerCase && hasUpperCase) {
            return { level: 'strong', score: 3 };
        }

        // 中: 数字+字母(单一大小写)
        if (hasNumber && (hasLowerCase || hasUpperCase)) {
            return { level: 'medium', score: 2 };
        }

        // 其他情况视为弱(例如纯字母)
        return { level: 'weak', score: 1 };
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

        // 重新发送点击事件(只绑定一次)
        if (!resendBtn.hasAttribute('data-listener-attached')) {
            resendBtn.setAttribute('data-listener-attached', 'true');
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
    }

    // ============================================
    // 验证码验证逻辑
    // ============================================

    const verifyCodeForm = document.getElementById('verifyCodeForm');
    if (verifyCodeForm) {
        const codeInput = document.getElementById('verificationCode');
        const codeError = document.getElementById('codeError');
        const verifyCodeBtn = document.getElementById('verifyCodeBtn');
        let isVerifying = false;

        // 验证码输入限制(只允许数字)
        codeInput.addEventListener('input', function() {
            // 只保留数字
            this.value = this.value.replace(/[^0-9]/g, '');

            // 清除错误提示
            if (codeError.classList.contains('show')) {
                clearError(codeInput, codeError);
            }
        });

        // 表单提交
        verifyCodeForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (isVerifying) return;

            const code = codeInput.value.trim();

            // 验证码格式检查
            if (code.length !== 6) {
                showError(codeInput, codeError, '请输入6位验证码');
                return;
            }

            if (!/^\d{6}$/.test(code)) {
                showError(codeInput, codeError, '验证码只能包含数字');
                return;
            }

            clearError(codeInput, codeError);

            // 显示加载状态
            isVerifying = true;
            verifyCodeBtn.disabled = true;
            verifyCodeBtn.querySelector('.btn-text').style.display = 'none';
            verifyCodeBtn.querySelector('.btn-loading').style.display = 'inline-flex';

            try {
                // TODO: 调用实际的API验证验证码
                // const response = await fetch('/api/password/verify-code', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         email: localStorage.getItem('passwordResetEmail'),
                //         code: code
                //     })
                // });

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1000));

                // 模拟验证结果(实际应从API返回)
                // 这里简单判断:验证码为 123456 时通过
                const isValid = code === '123456';

                if (!isValid) {
                    showError(codeInput, codeError, '验证码错误，请重新输入');
                    return;
                }

                // 验证成功，保存验证状态
                localStorage.setItem('passwordResetCodeVerified', 'true');

                // 显示密码重置表单
                showView('resetPasswordView');

            } catch (error) {
                console.error('验证码验证失败:', error);
                showError(codeInput, codeError, '验证失败，请稍后重试');
            } finally {
                isVerifying = false;
                verifyCodeBtn.disabled = false;
                verifyCodeBtn.querySelector('.btn-text').style.display = 'inline';
                verifyCodeBtn.querySelector('.btn-loading').style.display = 'none';
            }
        });
    }

    // ============================================
    // 页面内密码重置表单逻辑
    // ============================================

    const resetPasswordFormInPage = document.getElementById('resetPasswordFormInPage');
    if (resetPasswordFormInPage) {
        const newPasswordInput = document.getElementById('newPassword');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordError = document.getElementById('passwordError');
        const confirmError = document.getElementById('confirmError');
        const submitResetBtn = document.getElementById('submitResetBtn');
        const passwordStrength = document.getElementById('passwordStrength');
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

            // 验证最小长度和不能包含空格
            if (password.length < 8) {
                showError(newPasswordInput, passwordError, '密码至少需要8位');
            } else if (/\s/.test(password)) {
                showError(newPasswordInput, passwordError, '密码不能包含空格');
            } else if (!/[0-9]/.test(password)) {
                showError(newPasswordInput, passwordError, '密码必须包含数字');
            } else if (!/[a-zA-Z]/.test(password)) {
                showError(newPasswordInput, passwordError, '密码必须包含字母');
            } else {
                clearError(newPasswordInput, passwordError);
            }

            // 检查密码匹配
            checkPasswordMatchInPage();
        });

        // 实时密码匹配检查
        confirmPasswordInput.addEventListener('input', checkPasswordMatchInPage);

        function checkPasswordMatchInPage() {
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
        resetPasswordFormInPage.addEventListener('submit', async function(e) {
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

            if (/\s/.test(password)) {
                showError(newPasswordInput, passwordError, '密码不能包含空格');
                newPasswordInput.focus();
                return;
            }

            if (!/[0-9]/.test(password)) {
                showError(newPasswordInput, passwordError, '密码必须包含数字');
                newPasswordInput.focus();
                return;
            }

            if (!/[a-zA-Z]/.test(password)) {
                showError(newPasswordInput, passwordError, '密码必须包含字母');
                newPasswordInput.focus();
                return;
            }

            if (password !== confirmPassword) {
                showError(confirmPasswordInput, confirmError, '两次输入的密码不一致');
                confirmPasswordInput.focus();
                return;
            }

            // 检查是否已验证验证码
            const isCodeVerified = localStorage.getItem('passwordResetCodeVerified');
            if (!isCodeVerified) {
                showView('emailSentView');
                return;
            }

            // 显示加载状态
            isSubmitting = true;
            submitResetBtn.disabled = true;
            submitResetBtn.querySelector('.btn-text').style.display = 'none';
            submitResetBtn.querySelector('.btn-loading').style.display = 'inline-flex';

            try {
                // TODO: 调用实际的API重置密码
                // const response = await fetch('/api/password/reset', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         email: localStorage.getItem('passwordResetEmail'),
                //         password: password
                //     })
                // });

                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 1500));

                // 清除本地存储的数据
                localStorage.removeItem('passwordResetLastSend');
                localStorage.removeItem('passwordResetEmail');
                localStorage.removeItem('passwordResetCodeVerified');

                // 显示成功视图
                showView('successView');

                // 启动跳转倒计时
                startRedirectCountdown();

            } catch (error) {
                console.error('密码重置失败:', error);
                showError(newPasswordInput, passwordError, '重置失败，请稍后重试');
            } finally {
                isSubmitting = false;
                submitResetBtn.disabled = false;
                submitResetBtn.querySelector('.btn-text').style.display = 'inline';
                submitResetBtn.querySelector('.btn-loading').style.display = 'none';
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
