# 更新设计系统

同步更新设计系统内的所有相关文档，确保文档之间的一致性。

## 功能说明

此命令会：
1. 打开设计系统目录，方便编辑任意文档
2. 检测文档变更，自动同步更新相关文档
3. 确保文档之间的引用和描述保持一致

## 设计系统文档结构

```
.designsystem/
├── tokens.json              # Design Token 定义（JSON 格式）
├── README.md               # 设计系统完整文档
├── QUICK_REFERENCE.md      # 快速参考指南 - 常用模式和示例
├── CODE_CHECKLIST.md       # 代码规范检查清单
├── SPACING.md              # 间距设计规范
└── .cursorrules            # AI 助手规范
```

## 文档同步关系

### 核心文档
- **README.md** - 主文档，包含完整的设计系统说明
- **QUICK_REFERENCE.md** - 快速参考，应与 README.md 保持一致
- **SPACING.md** - 间距规范，QUICK_REFERENCE.md 中应引用

### 配置文件
- **tokens.json** - Design Tokens 定义，所有文档应引用此文件
- **.cursorrules** - AI 规范，应与 QUICK_REFERENCE.md 保持一致

### 同步更新规则

1. **修改 tokens.json 时**：
   - 检查 README.md 中的 token 列表是否完整
   - 更新 QUICK_REFERENCE.md 中的变量引用
   - 确保 .cursorrules 中的变量说明准确

2. **修改 QUICK_REFERENCE.md 时**：
   - 检查 README.md 中的相关内容是否同步
   - 确保 .cursorrules 中的规范说明一致
   - 验证 SPACING.md 的引用是否正确

3. **修改 SPACING.md 时**：
   - 更新 QUICK_REFERENCE.md 中的间距部分
   - 检查 README.md 中的间距说明

4. **修改 .cursorrules 时**：
   - 确保与 QUICK_REFERENCE.md 中的规范一致
   - 检查 README.md 中的相关说明

## 使用方式

1. 在 Cursor 中按 `Cmd/Ctrl + Shift + P` 打开命令面板
2. 输入 `update-design-system`
3. 选择要编辑的文档，系统会自动检测并提示需要同步更新的相关文档

## 注意事项

- 修改文档后，系统会提示需要同步更新的相关文档
- 修改 `tokens.json` 后，需要重新生成 `frontend/css/tokens.css`
- 修改 `.cursorrules` 后，需要重启 Cursor 使更改生效
- 所有文档修改应遵循设计系统规范，保持一致性

