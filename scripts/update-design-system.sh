#!/bin/bash

# Clouditera Design System 更新工具
# 用于快速更新设计系统文档

DESIGN_SYSTEM_DIR=".designsystem"
EDITOR="${EDITOR:-code}"  # 默认使用 VS Code，可以通过环境变量修改

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 显示帮助信息
show_help() {
    echo -e "${BLUE}Clouditera Design System 更新工具${NC}"
    echo ""
    echo "用法: ./scripts/update-design-system.sh [选项] [文件]"
    echo ""
    echo "选项:"
    echo "  -h, --help          显示帮助信息"
    echo "  -l, --list          列出所有设计系统文档"
    echo "  -o, --open          打开设计系统目录"
    echo "  -c, --check         检查设计系统文档格式"
    echo "  -v, --validate      验证 tokens.json 格式"
    echo ""
    echo "文件:"
    echo "  quick               快速参考指南 (QUICK_REFERENCE.md)"
    echo "  spacing             间距规范 (SPACING.md)"
    echo "  readme              设计系统文档 (README.md)"
    echo "  checklist           代码检查清单 (CODE_CHECKLIST.md)"
    echo "  tokens              Design Tokens (tokens.json)"
    echo "  rules               AI 助手规范 (.cursorrules)"
    echo ""
    echo "示例:"
    echo "  ./scripts/update-design-system.sh quick      # 编辑快速参考指南"
    echo "  ./scripts/update-design-system.sh -l        # 列出所有文档"
    echo "  ./scripts/update-design-system.sh -o         # 打开设计系统目录"
}

# 列出所有文档
list_files() {
    echo -e "${BLUE}设计系统文档列表:${NC}"
    echo ""
    if [ -d "$DESIGN_SYSTEM_DIR" ]; then
        for file in "$DESIGN_SYSTEM_DIR"/*.md "$DESIGN_SYSTEM_DIR"/*.json "$DESIGN_SYSTEM_DIR"/.cursorrules; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                size=$(du -h "$file" | cut -f1)
                echo -e "  ${GREEN}✓${NC} $filename ($size)"
            fi
        done
    else
        echo -e "${YELLOW}警告: 设计系统目录不存在${NC}"
    fi
}

# 打开设计系统目录
open_directory() {
    if [ -d "$DESIGN_SYSTEM_DIR" ]; then
        echo -e "${BLUE}打开设计系统目录: $DESIGN_SYSTEM_DIR${NC}"
        if command -v code &> /dev/null; then
            code "$DESIGN_SYSTEM_DIR"
        elif command -v nautilus &> /dev/null; then
            nautilus "$DESIGN_SYSTEM_DIR"
        else
            echo "请手动打开: $DESIGN_SYSTEM_DIR"
        fi
    else
        echo -e "${YELLOW}警告: 设计系统目录不存在${NC}"
    fi
}

# 检查文档格式
check_format() {
    echo -e "${BLUE}检查设计系统文档格式...${NC}"
    echo ""
    
    errors=0
    
    # 检查 Markdown 文件
    for file in "$DESIGN_SYSTEM_DIR"/*.md; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            # 检查是否有基本的 Markdown 结构
            if ! grep -q "^#" "$file"; then
                echo -e "${YELLOW}⚠${NC} $filename: 缺少标题"
                errors=$((errors + 1))
            else
                echo -e "${GREEN}✓${NC} $filename: 格式正确"
            fi
        fi
    done
    
    # 检查 JSON 文件
    if [ -f "$DESIGN_SYSTEM_DIR/tokens.json" ]; then
        if command -v jq &> /dev/null; then
            if jq empty "$DESIGN_SYSTEM_DIR/tokens.json" 2>/dev/null; then
                echo -e "${GREEN}✓${NC} tokens.json: JSON 格式正确"
            else
                echo -e "${YELLOW}⚠${NC} tokens.json: JSON 格式错误"
                errors=$((errors + 1))
            fi
        else
            echo -e "${YELLOW}⚠${NC} tokens.json: 需要 jq 工具来验证 JSON 格式"
        fi
    fi
    
    echo ""
    if [ $errors -eq 0 ]; then
        echo -e "${GREEN}所有文档格式检查通过${NC}"
    else
        echo -e "${YELLOW}发现 $errors 个问题${NC}"
    fi
}

# 验证 tokens.json
validate_tokens() {
    if [ -f "$DESIGN_SYSTEM_DIR/tokens.json" ]; then
        echo -e "${BLUE}验证 tokens.json...${NC}"
        if command -v jq &> /dev/null; then
            if jq empty "$DESIGN_SYSTEM_DIR/tokens.json" 2>/dev/null; then
                echo -e "${GREEN}✓ tokens.json 格式正确${NC}"
                echo ""
                echo "Token 统计:"
                jq -r 'paths(scalars) as $p | {path: $p | join("."), value: getpath($p)} | "  \(.path): \(.value)"' "$DESIGN_SYSTEM_DIR/tokens.json" | head -20
            else
                echo -e "${YELLOW}⚠ tokens.json 格式错误${NC}"
                jq . "$DESIGN_SYSTEM_DIR/tokens.json" 2>&1 | head -10
            fi
        else
            echo -e "${YELLOW}需要安装 jq 工具来验证 JSON${NC}"
            echo "安装: sudo apt-get install jq 或 brew install jq"
        fi
    else
        echo -e "${YELLOW}警告: tokens.json 不存在${NC}"
    fi
}

# 打开指定文件
open_file() {
    local file_key=$1
    local file_path=""
    
    case "$file_key" in
        quick)
            file_path="$DESIGN_SYSTEM_DIR/QUICK_REFERENCE.md"
            ;;
        spacing)
            file_path="$DESIGN_SYSTEM_DIR/SPACING.md"
            ;;
        readme)
            file_path="$DESIGN_SYSTEM_DIR/README.md"
            ;;
        checklist)
            file_path="$DESIGN_SYSTEM_DIR/CODE_CHECKLIST.md"
            ;;
        tokens)
            file_path="$DESIGN_SYSTEM_DIR/tokens.json"
            ;;
        rules)
            file_path="$DESIGN_SYSTEM_DIR/.cursorrules"
            ;;
        *)
            echo -e "${YELLOW}未知文件: $file_key${NC}"
            echo "使用 -h 查看帮助"
            exit 1
            ;;
    esac
    
    if [ -f "$file_path" ]; then
        echo -e "${BLUE}打开文件: $file_path${NC}"
        $EDITOR "$file_path"
    else
        echo -e "${YELLOW}警告: 文件不存在: $file_path${NC}"
        exit 1
    fi
}

# 主逻辑
main() {
    case "$1" in
        -h|--help)
            show_help
            ;;
        -l|--list)
            list_files
            ;;
        -o|--open)
            open_directory
            ;;
        -c|--check)
            check_format
            ;;
        -v|--validate)
            validate_tokens
            ;;
        "")
            show_help
            ;;
        *)
            open_file "$1"
            ;;
    esac
}

main "$@"

