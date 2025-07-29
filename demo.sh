#!/bin/bash

echo "🚀 Demo Projects - 项目演示"
echo "================================"

# 检查 pnpm 是否安装
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，请先安装 pnpm:"
    echo "npm install -g pnpm"
    exit 1
fi

echo "📦 安装依赖..."
pnpm install

echo ""
echo "🔨 构建所有包..."
pnpm build

echo ""
echo "📋 项目结构:"
echo "├── packages/shared/     # 共享工具和类型"
echo "├── apps/web/           # Vue3 Web 应用"
echo "├── apps/node/          # Node.js 后端应用"
echo "└── tools/cli/          # 命令行工具"

echo ""
echo "🌐 启动 Web 应用 (端口 3000)..."
echo "访问: http://localhost:3000"
cd apps/web && pnpm dev &
WEB_PID=$!

echo ""
echo "🔧 启动 Node.js 应用 (端口 3001)..."
echo "API: http://localhost:3001"
cd ../node && pnpm dev &
NODE_PID=$!

echo ""
echo "⚡ 等待服务启动..."
sleep 5

echo ""
echo "📊 测试 API 端点..."
curl -s http://localhost:3001/ | jq '.' 2>/dev/null || echo "API 服务正在启动..."

echo ""
echo "🛠️  CLI 工具演示..."
cd ../tools/cli
pnpm build
node dist/index.js info

echo ""
echo "✅ 演示完成！"
echo ""
echo "📝 可用命令:"
echo "  pnpm dev          # 启动所有应用"
echo "  pnpm build        # 构建所有包"
echo "  pnpm type-check   # 类型检查"
echo ""
echo "🌐 应用地址:"
echo "  Web 应用: http://localhost:3000"
echo "  API 服务: http://localhost:3001"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
trap "echo ''; echo '🛑 停止所有服务...'; kill $WEB_PID $NODE_PID 2>/dev/null; exit" INT
wait 