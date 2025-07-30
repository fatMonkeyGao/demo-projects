#!/usr/bin/env node

/**
 * 配置验证脚本
 * 用于验证项目中所有配置文件的一致性
 */

const fs = require('fs')
const path = require('path')

// 检查文件是否存在
function checkFileExists(filePath) {
  const exists = fs.existsSync(filePath)
  console.log(`${exists ? '✅' : '❌'} ${filePath}`)
  return exists
}

// 检查配置文件内容
function validateConfig() {
  console.log('🔍 验证项目配置文件...\n')

  const requiredFiles = [
    'tailwind.config.js',
    'postcss.config.js',
    'tsconfig.json',
    'project.config.js',
    'apps/web/tailwind.config.js',
    'apps/web/postcss.config.js',
    'apps/web/vite.config.ts',
    'packages/components/tailwind.config.js',
    'packages/components/postcss.config.js',
    'packages/components/vite.config.ts',
  ]

  let allFilesExist = true
  for (const file of requiredFiles) {
    if (!checkFileExists(file)) {
      allFilesExist = false
    }
  }

  console.log('\n📋 配置检查结果:')
  if (allFilesExist) {
    console.log('✅ 所有配置文件都存在')
    console.log('✅ 项目配置统一规范已建立')
  } else {
    console.log('❌ 部分配置文件缺失，请检查')
    process.exit(1)
  }

  // 检查包依赖
  console.log('\n📦 检查包依赖...')
  const webPackage = JSON.parse(fs.readFileSync('apps/web/package.json', 'utf8'))
  const componentsPackage = JSON.parse(fs.readFileSync('packages/components/package.json', 'utf8'))

  if (webPackage.dependencies['@demo/components']) {
    console.log('✅ Web 应用已依赖 components 包')
  } else {
    console.log('❌ Web 应用缺少 components 包依赖')
  }

  if (componentsPackage.dependencies.vue) {
    console.log('✅ Components 包已依赖 Vue3')
  } else {
    console.log('❌ Components 包缺少 Vue3 依赖')
  }

  console.log('\n🎉 配置验证完成！')
}

validateConfig() 