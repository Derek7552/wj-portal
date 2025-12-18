# UI 页面设计

按照 Clouditera 设计系统规范，对用户的设计诉求进行页面设计和实现。

## 🎯 核心要求

**必须严格遵循 Clouditera 设计系统规范**，所有设计实现必须使用设计系统变量，禁止硬编码。

## 📚 设计系统文档引用

在进行 UI 设计前，必须先查阅以下设计系统文档：

### 必读文档
1. **快速参考指南**：`.designsystem/QUICK_REFERENCE.md`
   - 包含颜色、间距、组件的使用规范和代码示例
   - 快速查找设计系统变量的使用方式

2. **AI 助手规范**：`.designsystem/.cursorrules`
   - 包含设计系统的核心原则和代码编写规范
   - 明确禁止事项和必须遵循的规则

3. **间距设计规范**：`.designsystem/SPACING.md`
   - 包含间距体系和使用规范
   - 页面利用率优化建议

4. **Design Tokens**：`.designsystem/tokens.json`
   - 所有可用的设计系统变量定义
   - 颜色、间距、字体等变量的完整列表

### 设计系统规范要点

所有具体的设计系统规范内容，请查阅对应的设计系统文档：

- **颜色使用规范**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"颜色使用规范"章节
- **间距使用规范**：参考 `.designsystem/SPACING.md` 和 `.designsystem/QUICK_REFERENCE.md` 中的"间距使用规范"章节
- **文本颜色规范**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"文本颜色"章节
- **组件模式**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"常用组件模式"章节
- **禁止事项**：参考 `.designsystem/.cursorrules` 和 `.designsystem/QUICK_REFERENCE.md` 中的"禁止事项"章节

## 🎨 设计原则

### 整体风格
1. **专业可信**：体现产品的专业性和技术感
2. **简洁清晰**：信息层次分明，避免视觉干扰
3. **现代科技**：采用现代化的设计语言，突出技术属性
4. **用户友好**：操作直观，降低学习成本
5. **空间高效**：优先考虑页面利用率，采用紧凑布局（参考 `.designsystem/SPACING.md` 中的"页面利用率优化"章节）

## 设计实现要求

### 必须遵循的设计系统规范

在进行设计实现前，必须查阅以下文档获取具体规范：

1. **颜色变量**：参考 `.designsystem/QUICK_REFERENCE.md` 和 `.designsystem/.cursorrules`
   - 查看颜色使用规范和变量列表

2. **间距规范**：参考 `.designsystem/SPACING.md` 和 `.designsystem/QUICK_REFERENCE.md`
   - 查看间距体系和使用规范
   - 查看页面利用率优化建议

3. **文本颜色**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"文本颜色"章节
   - 查看文本颜色优先级体系和使用场景映射

4. **页面利用率**：参考 `.designsystem/SPACING.md` 中的"页面利用率优化"章节
   - 查看紧凑布局的最佳实践

5. **信息层级**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"文本颜色优先级体系"
   - 查看如何通过字体大小、字重和颜色建立层次

### 标准结构模板

```markdown
# [页面/功能名称] UI 设计

## 设计规范遵循

### 颜色使用
参考 `.designsystem/QUICK_REFERENCE.md` 中的"颜色使用规范"章节
- 使用设计系统变量：`var(--clouditera-*)`
- 禁止硬编码颜色值

### 间距使用
参考 `.designsystem/SPACING.md` 和 `.designsystem/QUICK_REFERENCE.md` 中的"间距使用规范"章节
- 使用 8px 倍数（small: 8px, default: 12px, large: 16px）
- 优先考虑页面利用率

### 文本层级
参考 `.designsystem/QUICK_REFERENCE.md` 中的"文本颜色优先级体系"
- 仅使用 `text-primary` 和 `text-secondary`
- 通过字重建立层次

## 页面结构设计

### 全局导航区
#### 布局要求
- [导航栏位置和结构要求]
- [导航菜单展示方式]
- [用户入口位置]

#### 交互要求
- [导航交互反馈要求]
- [当前页面状态指示]
- [快速跳转支持]

## 功能模块界面设计

### 1. [模块名称]
#### 列表页设计（如适用）
- **布局方式**：[卡片式/列表式/网格式等]
- **信息展示**：[需要展示的信息项和展示要求]
- **分页/加载**：[分页器或无限滚动要求]

#### 详情页设计（如适用）
- **内容区域**：[正文内容展示要求]
- **元信息展示**：[标题、时间、标签等信息展示]
- **导航支持**：[返回、上一篇/下一篇等导航]

#### 交互要求
- [列表项交互反馈]
- [点击跳转逻辑]
- [筛选和搜索功能]

[继续添加其他模块...]

## 响应式设计要求

### 桌面端（≥1200px）
- [多列布局、侧边栏等要求]

### 平板端（768px-1199px）
- [中等屏幕适配要求]

### 移动端（<768px）
- [单列布局、汉堡菜单等要求]

## SEO友好的界面设计

### 页面结构
- 使用语义化HTML标签
- 标题层级清晰
- 内容结构符合搜索引擎爬虫解析

### 内容展示
- 重要内容优先展示在页面可见区域
- 避免关键内容被JavaScript动态加载隐藏
- 图片使用alt属性，支持无障碍访问

### 链接设计
- 内链使用有意义的锚文本
- 相关推荐链接清晰可见
- 分类和标签链接便于搜索引擎发现

## 用户体验优化

### 加载体验
- 首屏内容快速加载
- 使用骨架屏或加载动画提升等待体验
- 图片懒加载，优化页面性能

### 交互反馈
- 按钮和链接提供明确的交互反馈
- 操作结果有明确的提示（成功、失败、加载中等）
- 错误状态有友好的提示信息

### 信息架构
- 信息层次清晰，重要信息优先展示
- 导航路径清晰，用户能快速找到目标内容
- 支持搜索功能，快速定位内容
```

## 设计实现步骤

1. **分析用户诉求**：理解用户的设计需求和功能要求
2. **应用设计系统**：严格按照 Clouditera 设计系统规范进行设计
3. **选择设计变量**：从设计系统中选择合适的颜色、间距、字体变量
4. **设计页面结构**：规划布局，优先考虑空间利用率
5. **实现代码**：编写 HTML/CSS，确保使用设计系统变量
6. **验证规范**：检查是否符合设计系统规范，无硬编码

## 代码实现要求

### CSS 编写规范

编写 CSS 代码时，必须参考以下文档：

1. **颜色使用**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"颜色使用规范"和 `.designsystem/.cursorrules` 中的"颜色使用规范"
2. **间距使用**：参考 `.designsystem/SPACING.md` 和 `.designsystem/QUICK_REFERENCE.md` 中的"间距使用规范"
3. **组件模式**：参考 `.designsystem/QUICK_REFERENCE.md` 中的"常用组件模式"

### 代码示例

参考 `.designsystem/QUICK_REFERENCE.md` 中的代码示例部分，查看：
- 正确的颜色变量使用方式
- 正确的间距使用方式
- 常用组件的实现模式

**核心原则**（详细说明请参考 `.designsystem/.cursorrules` 和 `.designsystem/QUICK_REFERENCE.md`）：
- ✅ 使用设计系统变量
- ✅ 遵循间距规范
- ❌ 禁止硬编码
- ❌ 禁止违反设计系统规范

## 必须遵循的规范

### ✅ 必须使用
参考 `.designsystem/.cursorrules` 和 `.designsystem/QUICK_REFERENCE.md` 获取完整的规范列表和具体变量名称。

### ❌ 禁止使用
参考 `.designsystem/.cursorrules` 和 `.designsystem/QUICK_REFERENCE.md` 中的"禁止事项"章节，查看完整的禁止列表。

## 设计实现要点

### 布局设计
参考 `.designsystem/SPACING.md` 中的"页面利用率优化"章节：
- **优先横向布局**：相关信息放在同一行，减少垂直空间浪费
- **紧凑间距**：使用设计系统定义的间距值，避免过度留白
- **信息层级**：通过字体大小、字重和颜色建立层次（参考 `.designsystem/QUICK_REFERENCE.md` 中的"文本颜色优先级体系"）

### 颜色使用
参考 `.designsystem/QUICK_REFERENCE.md` 中的"颜色使用规范"和 `.designsystem/.cursorrules` 获取：
- 颜色变量的完整列表和使用方式
- 文本颜色的使用规范
- 背景色的使用规范

### 间距使用
参考 `.designsystem/SPACING.md` 和 `.designsystem/QUICK_REFERENCE.md` 中的"间距使用规范"获取：
- 间距体系和使用规范
- 页面利用率优化建议

### 响应式设计
- 使用 `flex-wrap` 确保小屏幕下自动换行
- 保持设计系统变量的一致性
- 不同屏幕尺寸下保持相同的视觉规范

## 实现示例

参考 `.designsystem/QUICK_REFERENCE.md` 中的"常用组件模式"章节，包含：
- 按钮、卡片、输入框等组件的正确实现方式
- 正确的颜色和间距使用示例

## 检查清单

实现完成后，参考 `.designsystem/CODE_CHECKLIST.md` 进行代码检查：
- [ ] 所有颜色使用设计系统变量，无硬编码（参考 `.designsystem/.cursorrules`）
- [ ] 所有间距是 8px 的倍数（参考 `.designsystem/SPACING.md`）
- [ ] 文本颜色仅使用 `text-primary` 和 `text-secondary`（参考 `.designsystem/QUICK_REFERENCE.md`）
- [ ] 页面背景使用 `background-primary`，卡片使用 `background-white`
- [ ] 布局紧凑，优先横向排列（参考 `.designsystem/SPACING.md` 中的"页面利用率优化"）
- [ ] 信息层级通过字体大小、字重和颜色建立（参考 `.designsystem/QUICK_REFERENCE.md`）

