# 任务无法点击 - 故障排查指南

## 📋 请按照以下步骤检查

### 步骤 1：查看浏览器控制台输出

1. 按 `F12` 打开开发者工具
2. 点击 **Console** 标签
3. 刷新页面（Ctrl + F5）
4. **复制所有输出**并告诉我

**我需要看到的关键日志：**
```
✅ 开始初始化侧导航组件
✅ 侧导航任务数据: [...]
✅ initAgentSidebar 被调用
✅ 找到侧导航容器
✅ renderTasks 被调用
✅ 生成任务 task-002 的HTML，href=template-planning-error.html
✅ 找到 4 个任务项，开始绑定点击事件
✅ 绑定第 2 个任务项的点击事件: task-002
```

**如果没有这些日志**，说明侧导航没有正确初始化。

---

### 步骤 2：检查元素是否存在

1. 在开发者工具中，点击 **Elements** 标签
2. 按 `Ctrl + F` 打开搜索
3. 搜索：`task-002`
4. 看看是否能找到这个任务元素

**期望结果：**
```html
<a href="template-planning-error.html"
   class="recent-task-item"
   data-task-id="task-002">
    <span class="task-status-icon failed">❌</span>
    <div class="task-name">源代码漏洞挖掘任务</div>
</a>
```

**如果找不到**，说明任务列表没有渲染。

---

### 步骤 3：检查元素是否可点击

1. 右键点击"源代码漏洞挖掘任务"
2. 选择"检查元素"
3. 在右侧 Styles 面板中，查看：
   - `pointer-events` 是否为 `none`（禁用）
   - `z-index` 是否为负数
   - 是否有其他元素覆盖

**常见问题：**
- ❌ `pointer-events: none;` - 点击被禁用
- ❌ `z-index: -1;` - 元素在后面
- ❌ 其他元素覆盖（如空状态容器）

---

### 步骤 4：手动测试链接

在浏览器地址栏输入：
```
你的路径/frontend/templates/pages/template-planning-error.html
```

**如果能打开**，说明文件存在，问题在于点击事件。

---

### 步骤 5：查看 Network 请求

1. 开发者工具切换到 **Network** 标签
2. 刷新页面
3. 检查以下文件是否成功加载（状态码 200）：
   - ✅ `tokens.css`
   - ✅ `agent-sidebar.css`
   - ✅ `agent-sidebar.js`
   - ✅ `template-planning.js`

**如果有文件 404**，说明路径错误。

---

## 🔍 最可能的原因

### 原因 1：侧导航没有正确初始化

**症状**：控制台没有任何初始化日志

**解决**：检查 JS 文件加载顺序
```html
<script src="../../components/agent-sidebar.js"></script>
<script src="../js/template-planning.js"></script>
```

---

### 原因 2：空状态容器覆盖了侧导航

**症状**：能看到任务列表，但鼠标点击没反应

**检查**：
```css
.empty-state-container {
    position: absolute; /* 可能覆盖了左侧 */
    width: 100%;
    height: 100%;
}
```

**解决**：调整 z-index 或布局

---

### 原因 3：事件被其他代码阻止

**症状**：控制台显示绑定成功，但点击没输出

**检查**：是否有全局事件监听器阻止了点击

---

## 🛠️ 临时解决方案

如果上述方法都不行，**直接在地址栏输入**：
```
frontend/templates/pages/template-planning-error.html
```

这样可以直接访问异常页面，绕过点击问题。

---

## 📞 需要我帮助？

请提供以下信息：

1. **控制台完整输出**（最重要！）
2. **Elements 标签中搜索 task-002 的结果截图**
3. **右键检查元素后的 Styles 面板截图**
4. **浏览器和版本**（Chrome、Firefox等）
5. **是否有任何红色错误？**

把这些信息告诉我，我就能准确定位问题！
