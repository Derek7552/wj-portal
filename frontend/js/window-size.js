// 窗口尺寸显示工具（调试用）
(function() {
    // 创建显示窗口尺寸的元素
    const sizeDisplay = document.createElement('div');
    sizeDisplay.id = 'window-size-display';
    sizeDisplay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    `;
    
    function updateSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        sizeDisplay.textContent = `窗口: ${width} × ${height}px`;
        
        // 根据宽度显示布局提示
        let layout = '';
        if (width < 768) {
            layout = ' (移动端 - 单列)';
        } else if (width >= 769 && width <= 1024) {
            layout = ' (平板端 - 三列)';
        } else {
            layout = ' (桌面端 - 三列)';
        }
        sizeDisplay.textContent += layout;
    }
    
    // 初始显示
    updateSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', updateSize);
    
    // 添加到页面
    document.body.appendChild(sizeDisplay);
    
    // 按 ESC 键可以隐藏/显示
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            sizeDisplay.style.display = sizeDisplay.style.display === 'none' ? 'block' : 'none';
        }
    });
})();

