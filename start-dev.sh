#!/bin/bash

# 云脑门户页开发服务器启动脚本

cd "$(dirname "$0")"

echo "🚀 正在启动开发服务器..."
echo ""

# 检查是否已安装 live-server
if ! command -v live-server &> /dev/null; then
    echo "📦 检测到未安装 live-server，正在安装..."
    npm install
    echo ""
fi

echo "✅ 开发服务器启动中..."
echo "📍 访问地址: http://localhost:8080"
echo "💡 修改代码后，浏览器会自动刷新"
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

# 启动开发服务器
npx live-server frontend --port=8080 --open=/index.html --watch=frontend

