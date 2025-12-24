/* ==========================================
   任务数据 Mock
   ========================================== */

export const tasks = {};

export const taskStatuses = {
    pending: { label: '待执行', icon: '⏸️', color: '#94A3B8' },
    running: { label: '执行中', icon: '⏳', color: '#3B82F6' },
    completed: { label: '已完成', icon: '✅', color: '#10B981' },
    failed: { label: '异常终止', icon: '❌', color: '#EF4444' }
};
