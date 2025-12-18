#!/usr/bin/env node

/**
 * Clouditera Design System 快速更新工具
 * 在 Cursor 中可以通过 npm run ds:quick 等命令快速调用
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DESIGN_SYSTEM_DIR = path.join(__dirname, '..', '.designsystem');
const EDITOR = process.env.EDITOR || 'code'; // 默认使用 VS Code

const fileMap = {
  quick: 'QUICK_REFERENCE.md',
  spacing: 'SPACING.md',
  readme: 'README.md',
  checklist: 'CODE_CHECKLIST.md',
  tokens: 'tokens.json',
  rules: '.cursorrules'
};

function openFile(fileKey) {
  const fileName = fileMap[fileKey];
  if (!fileName) {
    console.error(`❌ 未知文件: ${fileKey}`);
    console.log('\n可用文件:');
    Object.keys(fileMap).forEach(key => {
      console.log(`  - ${key}: ${fileMap[key]}`);
    });
    process.exit(1);
  }

  const filePath = path.join(DESIGN_SYSTEM_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${filePath}`);
    process.exit(1);
  }

  console.log(`📝 打开文件: ${fileName}`);
  exec(`${EDITOR} "${filePath}"`, (error) => {
    if (error) {
      console.error(`❌ 打开文件失败: ${error.message}`);
      process.exit(1);
    }
  });
}

function listFiles() {
  console.log('📚 设计系统文档列表:\n');
  Object.keys(fileMap).forEach(key => {
    const filePath = path.join(DESIGN_SYSTEM_DIR, fileMap[key]);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const size = (stats.size / 1024).toFixed(2);
      console.log(`  ✓ ${key.padEnd(12)} → ${fileMap[key]} (${size} KB)`);
    } else {
      console.log(`  ✗ ${key.padEnd(12)} → ${fileMap[key]} (不存在)`);
    }
  });
}

function openDirectory() {
  console.log(`📂 打开设计系统目录: ${DESIGN_SYSTEM_DIR}`);
  exec(`${EDITOR} "${DESIGN_SYSTEM_DIR}"`, (error) => {
    if (error) {
      console.error(`❌ 打开目录失败: ${error.message}`);
      process.exit(1);
    }
  });
}

function showHelp() {
  console.log(`
🎨 Clouditera Design System 快速更新工具

用法:
  npm run ds:<command> [文件]

命令:
  ds:quick     编辑快速参考指南
  ds:spacing   编辑间距规范
  ds:readme   编辑设计系统文档
  ds:checklist 编辑代码检查清单
  ds:tokens    编辑 Design Tokens
  ds:rules     编辑 AI 助手规范
  ds:list      列出所有文档
  ds:open      打开设计系统目录

示例:
  npm run ds:quick      # 编辑快速参考指南
  npm run ds:list        # 列出所有文档
  npm run ds:open        # 打开设计系统目录
`);
}

// 主逻辑
const command = process.argv[2];

switch (command) {
  case 'quick':
  case 'spacing':
  case 'readme':
  case 'checklist':
  case 'tokens':
  case 'rules':
    openFile(command);
    break;
  case 'list':
    listFiles();
    break;
  case 'open':
    openDirectory();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    if (command) {
      console.error(`❌ 未知命令: ${command}`);
    }
    showHelp();
    process.exit(command ? 1 : 0);
}

