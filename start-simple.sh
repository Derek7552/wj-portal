#!/bin/bash

# 使用Python简单HTTP服务器（无需安装依赖）

cd "$(dirname "$0")/frontend"

echo "🚀 正在启动简单HTTP服务器..."
echo "📍 访问地址: http://localhost:8080"
echo "💡 注意：此服务器不支持自动刷新，需要手动刷新浏览器"
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

python3 -m http.server 8080

