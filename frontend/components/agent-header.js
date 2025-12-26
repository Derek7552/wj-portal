/* ==========================================
   Agent Header 组件 JavaScript
   用于初始化和配置智能体头部
   ========================================== */

/**
 * 初始化智能体头部组件
 * @param {Object} options - 配置选项
 * @param {string} options.icon - 智能体图标 (emoji 或 HTML)
 * @param {string} options.title - 智能体标题
 * @param {string} options.type - 智能体类型（如：基础类、高级类、进阶类）
 * @param {string} options.version - 版本号（如：v1.0.0）
 * @param {string} options.description - 描述文本
 * @param {Array} options.actions - 操作按钮配置数组
 * @param {boolean} options.compact - 是否使用简化版（无描述）
 * @param {string} options.container - 容器选择器（默认：'.agent-header'）
 * @returns {HTMLElement} - 创建的 header 元素
 */
function initAgentHeader(options) {
    const defaults = {
        icon: '🤖',
        title: '智能体',
        type: '基础类',
        version: 'v1.0.0',
        description: '智能体描述',
        actions: [],
        compact: false,
        container: '.agent-header'
    };

    const config = { ...defaults, ...options };

    // 查找容器
    const container = typeof config.container === 'string'
        ? document.querySelector(config.container)
        : config.container;

    if (!container) {
        console.error('❌ Agent Header: 未找到容器', config.container);
        return null;
    }

    // 构建 HTML
    const headerHTML = `
        <div class="agent-header-main">
            <div class="agent-icon">${config.icon}</div>
            <div class="agent-info">
                <div class="agent-title-wrapper">
                    <h2 class="agent-title">${config.title}</h2>
                    <span class="agent-type">${config.type}</span>
                    <span class="agent-version">${config.version}</span>
                </div>
                ${!config.compact ? `<p class="agent-description">${config.description}</p>` : ''}
            </div>
        </div>
        ${config.actions.length > 0 ? `
        <div class="agent-header-actions">
            ${config.actions.map(action => createActionButton(action)).join('')}
        </div>
        ` : ''}
    `;

    container.innerHTML = headerHTML;

    // 添加 compact 类
    if (config.compact) {
        container.classList.add('agent-header-compact');
    } else {
        container.classList.remove('agent-header-compact');
    }

    // 绑定按钮事件
    bindActionEvents(container, config.actions);

    console.log('✅ Agent Header 初始化成功:', config.title);
    return container;
}

/**
 * 创建操作按钮 HTML
 * @param {Object} action - 按钮配置
 * @param {string} action.icon - 按钮图标
 * @param {string} action.text - 按钮文本
 * @param {number} action.count - 计数（可选）
 * @param {string} action.type - 按钮类型（'default' 或 'primary'）
 * @param {Function} action.onClick - 点击回调
 * @returns {string} - 按钮 HTML
 */
function createActionButton(action) {
    const defaults = {
        icon: '',
        text: '',
        count: null,
        type: 'default',
        title: '',
        onClick: null
    };

    const btn = { ...defaults, ...action };

    if (btn.type === 'primary') {
        return `
            <button class="btn btn-primary btn-sm" title="${btn.title || btn.text}" data-action="${btn.id || ''}">
                <span>${btn.icon}</span>
                <span>${btn.text}</span>
            </button>
        `;
    }

    return `
        <button class="btn-agent-action" title="${btn.title || btn.text}" data-action="${btn.id || ''}">
            <span class="action-icon">${btn.icon}</span>
            <span class="action-text">${btn.text}</span>
            ${btn.count !== null ? `<span class="action-count">(${btn.count})</span>` : ''}
        </button>
    `;
}

/**
 * 绑定按钮事件
 * @param {HTMLElement} container - 容器元素
 * @param {Array} actions - 按钮配置数组
 */
function bindActionEvents(container, actions) {
    const buttons = container.querySelectorAll('[data-action]');

    buttons.forEach((button, index) => {
        const action = actions[index];
        if (action && typeof action.onClick === 'function') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                action.onClick.call(this, e);
            });
        }
    });
}

/**
 * 更新智能体头部信息
 * @param {string} container - 容器选择器
 * @param {Object} updates - 需要更新的字段
 */
function updateAgentHeader(container, updates) {
    const headerEl = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!headerEl) {
        console.error('❌ Agent Header: 未找到容器');
        return;
    }

    // 更新标题
    if (updates.title) {
        const titleEl = headerEl.querySelector('.agent-title');
        if (titleEl) titleEl.textContent = updates.title;
    }

    // 更新图标
    if (updates.icon) {
        const iconEl = headerEl.querySelector('.agent-icon');
        if (iconEl) iconEl.innerHTML = updates.icon;
    }

    // 更新类型
    if (updates.type) {
        const typeEl = headerEl.querySelector('.agent-type');
        if (typeEl) typeEl.textContent = updates.type;
    }

    // 更新版本
    if (updates.version) {
        const versionEl = headerEl.querySelector('.agent-version');
        if (versionEl) versionEl.textContent = updates.version;
    }

    // 更新描述
    if (updates.description) {
        const descEl = headerEl.querySelector('.agent-description');
        if (descEl) descEl.textContent = updates.description;
    }

    console.log('✅ Agent Header 更新成功');
}

/**
 * 从 HTML 元素中提取配置（用于已有的 HTML 结构）
 * @param {string|HTMLElement} container - 容器选择器或元素
 * @returns {Object} - 配置对象
 */
function extractAgentHeaderConfig(container) {
    const headerEl = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!headerEl) {
        console.error('❌ Agent Header: 未找到容器');
        return null;
    }

    return {
        icon: headerEl.querySelector('.agent-icon')?.innerHTML || '',
        title: headerEl.querySelector('.agent-title')?.textContent || '',
        type: headerEl.querySelector('.agent-type')?.textContent || '',
        version: headerEl.querySelector('.agent-version')?.textContent || '',
        description: headerEl.querySelector('.agent-description')?.textContent || '',
        compact: headerEl.classList.contains('agent-header-compact')
    };
}

// 导出函数（如果使用模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAgentHeader,
        updateAgentHeader,
        extractAgentHeaderConfig
    };
}
