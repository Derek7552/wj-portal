/**
 * 通用任务记录列表组件
 * Task Record List Component
 * 支持简单/复杂布局、分页、多种操作按钮
 */

(function() {
    'use strict';

    /**
     * 预设配置
     */
    const PRESETS = {
        // AI漏洞猎人 - Type-C 双行布局（状态+标题+标签+统计+时间+终止/删除互斥）
        'vulnerability-hunter': {
            layout: 'type-c',
            showTag: true,
            showVulnCount: true,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 缺陷研判 - Type-B 双行布局（状态+标题+时间+下载+终止/删除互斥）
        'defect-analysis': {
            layout: 'type-b',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],              // 分析中 → 可终止
                analyzing: ['terminate'],            // 分析中（别名）
                completed: ['download', 'delete'],   // 已完成 → 可下载+删除
                terminated: ['delete'],              // 已终止 → 可删除
                error: ['delete'],                   // 错误 → 可删除
                failed: ['delete']                   // 错误（别名）
            }
        },
        // 安全论文检索 - 简单配置
        'paper-search': {
            layout: 'simple',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 安全智库 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'security-knowledge': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 漏洞情报 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'vulnerability-intelligence': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 漏洞通告 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'vulnerability-notification': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // CTF竞赛 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'ctf-competition': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 论文翻译 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'paper-translation': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 论文研读 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'paper-reading': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 文档速读 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'document-reading': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // pcap包分析 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'pcap-analysis': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 攻击面检查 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'attack-surface-check': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 社工钓鱼 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'phishing-detection': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 安全论文检索 - Type-A 双行布局（状态+标题+时间+终止/删除互斥）
        'security-paper-search': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        },
        // 默认配置 - Type-A 双行布局
        'default': {
            layout: 'type-a',
            showTag: false,
            showVulnCount: false,
            showStatistics: false,
            pagination: true,
            pageSize: 10,
            buttons: {
                running: ['terminate'],      // 分析中 → 可终止
                analyzing: ['terminate'],    // 分析中（别名）
                completed: ['delete'],       // 已完成 → 可删除
                terminated: ['delete'],      // 已终止 → 可删除
                error: ['delete'],           // 错误 → 可删除
                failed: ['delete']           // 错误（别名）
            }
        }
    };

    /**
     * 状态图标映射
     * 根据 spec.md 规范：
     * - 分析中 (◐/⏳) - 任务正在执行
     * - 已完成 (✓/✅) - 任务成功完成
     * - 已终止 (✕/⏹️) - 用户主动终止
     * - 错误 (❌) - 任务执行失败
     */
    const STATUS_ICONS = {
        'running': '⏳',      // 分析中
        'analyzing': '⏳',    // 分析中（别名）
        'completed': '✅',    // 已完成
        'terminated': '⏹️',   // 已终止
        'error': '❌',        // 错误
        'failed': '❌',       // 错误（别名，保持向后兼容）
        'pending': '🕐'       // 等待中
    };

    /**
     * 来源配置
     */
    const SOURCE_CONFIG = {
        'local': { icon: '💻', text: '本地', class: 'trl-badge-local' },
        'repo': { icon: '📦', text: '仓库', class: 'trl-badge-repo' }
    };

    /**
     * 创建任务记录列表
     * @param {Object} options - 配置选项
     * @param {string} options.container - 容器选择器
     * @param {string} options.preset - 预设名称
     * @param {Array} options.tasks - 任务数据
     * @param {Function} options.onCardClick - 卡片点击回调
     * @param {Function} options.onView - 查看回调
     * @param {Function} options.onTerminate - 终止回调
     * @param {Function} options.onDownload - 下载回调
     * @param {Function} options.onDelete - 删除回调
     * @param {Object} options.customConfig - 自定义配置（覆盖预设）
     */
    function TaskRecordList(options) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;

        // 合并预设配置和自定义配置
        var presetConfig = PRESETS[options.preset] || PRESETS['default'];
        this.config = Object.assign({}, presetConfig, options.customConfig || {});

        this.allTasks = options.tasks || [];
        this.currentPage = 1;
        this.pageSize = this.config.pageSize || 10;

        this.callbacks = {
            onCardClick: options.onCardClick || function() {},
            onView: options.onView || options.onCardClick || function() {},
            onTerminate: options.onTerminate || function() {},
            onDownload: options.onDownload || function() {},
            onDelete: options.onDelete || function() {}
        };

        if (this.container) {
            this.render();
        }
    }

    /**
     * 获取当前页的任务
     */
    TaskRecordList.prototype.getCurrentPageTasks = function() {
        if (!this.config.pagination) {
            return this.allTasks;
        }
        var start = (this.currentPage - 1) * this.pageSize;
        var end = start + this.pageSize;
        return this.allTasks.slice(start, end);
    };

    /**
     * 获取总页数
     */
    TaskRecordList.prototype.getTotalPages = function() {
        return Math.ceil(this.allTasks.length / this.pageSize);
    };

    /**
     * 渲染列表
     */
    TaskRecordList.prototype.render = function() {
        var tasks = this.getCurrentPageTasks();
        var html = '<div class="trl-container">';
        html += '<div class="trl-header"><h2 class="trl-title">全部任务记录</h2></div>';
        html += '<div class="trl-content">';

        if (this.allTasks.length === 0) {
            html += this.renderEmpty();
        } else {
            for (var i = 0; i < tasks.length; i++) {
                html += this.renderCard(tasks[i]);
            }
        }

        html += '</div>';

        // 分页
        if (this.config.pagination && this.getTotalPages() > 1) {
            html += this.renderPagination();
        }

        html += '</div>';
        this.container.innerHTML = html;
        this.bindEvents();
    };

    /**
     * 渲染空状态
     */
    TaskRecordList.prototype.renderEmpty = function() {
        return '<div class="trl-empty">' +
            '<div class="trl-empty-icon">📋</div>' +
            '<p class="trl-empty-text">暂无任务记录</p>' +
            '</div>';
    };

    /**
     * 渲染单个卡片
     */
    TaskRecordList.prototype.renderCard = function(task) {
        var statusIcon = STATUS_ICONS[task.status] || '📋';
        var layout = this.config.layout;
        var cardClass = 'trl-card';

        if (layout === 'complex') {
            cardClass += ' trl-card-complex';
        } else if (layout === 'type-a') {
            cardClass += ' trl-card-type-a';
        } else if (layout === 'type-b') {
            cardClass += ' trl-card-type-b';
        } else if (layout === 'type-c') {
            cardClass += ' trl-card-type-c';
        }

        var html = '<div class="' + cardClass + '" data-task-id="' + task.id + '">';

        if (layout === 'complex') {
            html += this.renderComplexCard(task, statusIcon);
        } else if (layout === 'type-a') {
            html += this.renderTypeACard(task, statusIcon);
        } else if (layout === 'type-b') {
            html += this.renderTypeBCard(task, statusIcon);
        } else if (layout === 'type-c') {
            html += this.renderTypeCCard(task, statusIcon);
        } else {
            html += this.renderSimpleCard(task, statusIcon);
        }

        html += '</div>';
        return html;
    };

    /**
     * 渲染简单布局卡片（单行）
     */
    TaskRecordList.prototype.renderSimpleCard = function(task, statusIcon) {
        var html = '';

        // 状态图标
        html += '<div class="trl-status">' + statusIcon + '</div>';

        // 标题区域
        html += '<div class="trl-title-area">';
        html += '<span class="trl-task-name">' + this.escapeHtml(task.name) + '</span>';

        // 徽章组
        html += '<div class="trl-badges">';
        html += this.renderBadges(task);
        html += '</div>';
        html += '</div>';

        // 右侧区域
        html += '<div class="trl-right-area">';
        html += '<div class="trl-time">' + (task.time || task.createTime || '') + '</div>';
        html += this.renderActions(task);
        html += '</div>';

        return html;
    };

    /**
     * 渲染 Type-A 双行布局卡片
     * 主行：状态图标 + 标题
     * 副行：时间（左侧） + 操作按钮（右侧，hover显示）
     */
    TaskRecordList.prototype.renderTypeACard = function(task, statusIcon) {
        var html = '';

        // 主行：状态 + 标题
        html += '<div class="trl-card-main-row">';
        html += '<div class="trl-status">' + statusIcon + '</div>';
        html += '<span class="trl-task-name">' + this.escapeHtml(task.name) + '</span>';
        html += '</div>';

        // 副行：时间 + 操作按钮
        html += '<div class="trl-card-sub-row">';
        html += '<span class="trl-time">' + (task.time || task.createTime || '') + '</span>';
        html += this.renderActions(task);
        html += '</div>';

        return html;
    };

    /**
     * 渲染 Type-B 双行布局卡片（缺陷研判专用）
     * 主行：状态图标 + 标题
     * 副行：时间（左侧） + 下载/删除按钮（右侧，hover显示）
     */
    TaskRecordList.prototype.renderTypeBCard = function(task, statusIcon) {
        var html = '';

        // 主行：状态 + 标题
        html += '<div class="trl-card-main-row">';
        html += '<div class="trl-status">' + statusIcon + '</div>';
        html += '<span class="trl-task-name">' + this.escapeHtml(task.name) + '</span>';
        html += '</div>';

        // 副行：时间 + 操作按钮
        html += '<div class="trl-card-sub-row">';
        html += '<span class="trl-time">' + (task.time || task.createTime || '') + '</span>';
        html += this.renderActions(task);
        html += '</div>';

        return html;
    };

    /**
     * 渲染 Type-C 双行布局卡片（AI漏洞猎人专用）
     * 主行：状态图标 + 标题
     * 副行：标签 · 统计 · 时间 + 操作按钮（hover显示）
     */
    TaskRecordList.prototype.renderTypeCCard = function(task, statusIcon) {
        var html = '';

        // 主行：状态 + 标题
        html += '<div class="trl-card-main-row">';
        html += '<div class="trl-status">' + statusIcon + '</div>';
        html += '<span class="trl-task-name">' + this.escapeHtml(task.name) + '</span>';
        html += '</div>';

        // 副行：标签 · 统计 · 时间（文本拼接） + 操作按钮
        html += '<div class="trl-card-sub-row">';

        // 左侧：文本内容（标签 · 统计 · 时间）
        html += '<div class="trl-sub-left">';
        var subRowParts = [];

        // 1. 来源标签（本地/仓库）
        if (this.config.showTag && task.source) {
            var sourceConfig = SOURCE_CONFIG[task.source] || SOURCE_CONFIG['local'];
            subRowParts.push(sourceConfig.text);
        }

        // 2. 漏洞数量统计
        if (this.config.showVulnCount) {
            var vulnCount = task.vulnerabilities || task.vulnCount || 0;
            if (task.status === 'running' || task.status === 'analyzing') {
                subRowParts.push('漏洞 --');
            } else {
                subRowParts.push('漏洞 ' + vulnCount + ' 个');
            }
        }

        // 3. 时间
        var timeStr = task.time || task.createTime || '';
        if (timeStr) {
            subRowParts.push(timeStr);
        }

        // 拼接副行文本，使用 · 分隔
        html += subRowParts.join(' · ');
        html += '</div>';

        // 右侧：操作按钮（hover显示）
        html += this.renderActions(task);

        html += '</div>';

        return html;
    };

    /**
     * 渲染复杂布局卡片（两行）
     */
    TaskRecordList.prototype.renderComplexCard = function(task, statusIcon) {
        var html = '';

        // 左侧区域
        html += '<div class="trl-card-left">';

        // 第一行：状态 + 名称 + 来源标签
        html += '<div class="trl-card-header">';
        html += '<div class="trl-status">' + statusIcon + '</div>';
        html += '<span class="trl-task-name">' + this.escapeHtml(task.name) + '</span>';

        // 来源标签
        if (this.config.showTag && task.source) {
            var sourceConfig = SOURCE_CONFIG[task.source] || SOURCE_CONFIG['local'];
            html += '<span class="trl-badge ' + sourceConfig.class + '">';
            html += sourceConfig.icon + ' ' + sourceConfig.text;
            html += '</span>';
        }
        html += '</div>';

        // 第二行：统计信息 + 漏洞数量
        html += '<div class="trl-card-statistics">';

        if (this.config.showStatistics) {
            html += '<span class="trl-stat-label">统计信息</span>';
            if (task.statistics && task.statistics.total > 0) {
                html += '<span class="trl-stat-value">共 ' + task.statistics.total + ' 项</span>';
            } else if (task.messageCount) {
                html += '<span class="trl-stat-value">共 ' + task.messageCount + ' 条消息</span>';
            } else {
                html += '<span class="trl-stat-value">暂无数据</span>';
            }
        }

        // 漏洞数量徽章
        if (this.config.showVulnCount) {
            var vulnCount = task.vulnerabilities || task.vulnCount || 0;
            var vulnClass = vulnCount === 0
                ? (task.status === 'completed' ? 'trl-badge-vuln-zero-success' : 'trl-badge-vuln-zero')
                : 'trl-badge-vuln';
            html += '<span class="trl-badge ' + vulnClass + '">';
            html += '<span class="trl-badge-vuln-icon">🐛</span>';
            html += '漏洞 ' + vulnCount + ' 个';
            html += '</span>';
        }

        html += '</div>';
        html += '</div>';

        // 右侧区域
        html += '<div class="trl-card-right">';
        html += '<div class="trl-time">' + (task.time || task.createTime || '') + '</div>';
        html += this.renderActions(task);
        html += '</div>';

        return html;
    };

    /**
     * 渲染徽章
     */
    TaskRecordList.prototype.renderBadges = function(task) {
        var html = '';

        // 来源标签
        if (this.config.showTag && task.source) {
            var sourceConfig = SOURCE_CONFIG[task.source] || SOURCE_CONFIG['local'];
            html += '<span class="trl-badge ' + sourceConfig.class + '">';
            html += sourceConfig.icon + ' ' + sourceConfig.text;
            html += '</span>';
        }

        // 漏洞数量
        if (this.config.showVulnCount && typeof task.vulnCount === 'number') {
            html += '<span class="trl-badge trl-badge-vuln">';
            html += '<span class="trl-badge-vuln-icon">🐛</span>';
            html += task.vulnCount + ' 个';
            html += '</span>';
        }

        return html;
    };

    /**
     * 渲染操作按钮
     */
    TaskRecordList.prototype.renderActions = function(task) {
        var buttons = this.config.buttons[task.status] || [];
        if (buttons.length === 0) return '<div class="trl-actions"></div>';

        var html = '<div class="trl-actions">';

        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i];
            switch (btn) {
                case 'view':
                    html += '<button class="trl-btn trl-btn-view" data-action="view">查看</button>';
                    break;
                case 'terminate':
                    html += '<button class="trl-btn trl-btn-terminate" data-action="terminate">终止</button>';
                    break;
                case 'download':
                    html += '<button class="trl-btn trl-btn-download" data-action="download">下载</button>';
                    break;
                case 'delete':
                    html += '<button class="trl-btn trl-btn-delete" data-action="delete">删除</button>';
                    break;
            }
        }

        html += '</div>';
        return html;
    };

    /**
     * 渲染分页
     */
    TaskRecordList.prototype.renderPagination = function() {
        var totalPages = this.getTotalPages();
        var html = '<div class="trl-pagination">';

        // 上一页
        html += '<button class="trl-page-btn trl-page-prev" ' +
            (this.currentPage === 1 ? 'disabled' : '') + '>上一页</button>';

        // 页码
        html += '<div class="trl-page-numbers">';

        if (totalPages <= 7) {
            for (var i = 1; i <= totalPages; i++) {
                html += this.renderPageButton(i);
            }
        } else {
            // 复杂分页逻辑
            if (this.currentPage <= 3) {
                for (var i = 1; i <= 4; i++) {
                    html += this.renderPageButton(i);
                }
                html += '<span class="trl-page-ellipsis">...</span>';
                html += this.renderPageButton(totalPages);
            } else if (this.currentPage >= totalPages - 2) {
                html += this.renderPageButton(1);
                html += '<span class="trl-page-ellipsis">...</span>';
                for (var i = totalPages - 3; i <= totalPages; i++) {
                    html += this.renderPageButton(i);
                }
            } else {
                html += this.renderPageButton(1);
                html += '<span class="trl-page-ellipsis">...</span>';
                for (var i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    html += this.renderPageButton(i);
                }
                html += '<span class="trl-page-ellipsis">...</span>';
                html += this.renderPageButton(totalPages);
            }
        }

        html += '</div>';

        // 下一页
        html += '<button class="trl-page-btn trl-page-next" ' +
            (this.currentPage === totalPages ? 'disabled' : '') + '>下一页</button>';

        html += '</div>';
        return html;
    };

    /**
     * 渲染单个页码按钮
     */
    TaskRecordList.prototype.renderPageButton = function(page) {
        var activeClass = page === this.currentPage ? ' active' : '';
        return '<button class="trl-page-num' + activeClass + '" data-page="' + page + '">' + page + '</button>';
    };

    /**
     * 绑定事件
     */
    TaskRecordList.prototype.bindEvents = function() {
        var self = this;
        var cards = this.container.querySelectorAll('.trl-card');

        cards.forEach(function(card) {
            // 卡片点击
            card.addEventListener('click', function(e) {
                if (e.target.closest('.trl-btn')) return;
                var taskId = card.getAttribute('data-task-id');
                var task = self.findTask(taskId);
                if (task) {
                    self.callbacks.onCardClick(task);
                }
            });

            // 按钮点击
            var buttons = card.querySelectorAll('.trl-btn');
            buttons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var action = btn.getAttribute('data-action');
                    var taskId = card.getAttribute('data-task-id');
                    var task = self.findTask(taskId);

                    if (task) {
                        switch (action) {
                            case 'view':
                                self.callbacks.onView(task);
                                break;
                            case 'terminate':
                                self.callbacks.onTerminate(task);
                                break;
                            case 'download':
                                self.callbacks.onDownload(task);
                                break;
                            case 'delete':
                                self.callbacks.onDelete(task);
                                break;
                        }
                    }
                });
            });
        });

        // 分页事件
        this.bindPaginationEvents();
    };

    /**
     * 绑定分页事件
     */
    TaskRecordList.prototype.bindPaginationEvents = function() {
        var self = this;

        // 上一页
        var prevBtn = this.container.querySelector('.trl-page-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                if (self.currentPage > 1) {
                    self.goToPage(self.currentPage - 1);
                }
            });
        }

        // 下一页
        var nextBtn = this.container.querySelector('.trl-page-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                if (self.currentPage < self.getTotalPages()) {
                    self.goToPage(self.currentPage + 1);
                }
            });
        }

        // 页码按钮
        var pageNums = this.container.querySelectorAll('.trl-page-num');
        pageNums.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var page = parseInt(btn.getAttribute('data-page'), 10);
                self.goToPage(page);
            });
        });
    };

    /**
     * 跳转到指定页
     */
    TaskRecordList.prototype.goToPage = function(page) {
        if (page < 1 || page > this.getTotalPages()) return;
        this.currentPage = page;
        this.render();
    };

    /**
     * 查找任务
     */
    TaskRecordList.prototype.findTask = function(taskId) {
        for (var i = 0; i < this.allTasks.length; i++) {
            if (String(this.allTasks[i].id) === String(taskId)) {
                return this.allTasks[i];
            }
        }
        return null;
    };

    /**
     * 更新任务列表
     */
    TaskRecordList.prototype.updateTasks = function(tasks) {
        this.allTasks = tasks;
        this.currentPage = 1;
        this.render();
    };

    /**
     * HTML转义
     */
    TaskRecordList.prototype.escapeHtml = function(str) {
        if (!str) return '';
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    };

    /**
     * 销毁实例
     */
    TaskRecordList.prototype.destroy = function() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    };

    // 暴露到全局
    window.TaskRecordList = TaskRecordList;
    window.TaskRecordListPresets = PRESETS;

})();
