#!/usr/bin/env node
/**
 * 统一构建脚本
 * 遍历 packages 下的所有子包并执行构建
 */
import { execSync } from 'child_process'
import { readdirSync, statSync, existsSync } from 'fs'
import { resolve } from 'path'

const packagesDir = resolve(process.cwd(), 'packages')

/**
 * 获取所有需要构建的包路径
 */
function getPackages() {
  const packages = []

  // 直接子包
  const topDirs = readdirSync(packagesDir)
  for (const dir of topDirs) {
    const fullPath = resolve(packagesDir, dir)
    if (!statSync(fullPath).isDirectory()) continue

    // 检查是否有 package.json
    if (existsSync(resolve(fullPath, 'package.json'))) {
      packages.push(fullPath)
    }

    // 检查二级目录（components/*, element-wrappers/*）
    try {
      const subDirs = readdirSync(fullPath)
      for (const subDir of subDirs) {
        const subPath = resolve(fullPath, subDir)
        if (!statSync(subPath).isDirectory()) continue
        if (existsSync(resolve(subPath, 'package.json'))) {
          packages.push(subPath)
        }
      }
    } catch {
      // 忽略
    }
  }

  return packages
}

/**
 * 构建单个包
 */
function buildPackage(pkgPath) {
  const pkgName = pkgPath.split(/[\\/]/).pop()
  console.log(`\n🔨 Building @ltd-ui/${pkgName}...`)

  try {
    execSync('pnpm run build', {
      cwd: pkgPath,
      stdio: 'inherit'
    })
    console.log(`✅ @ltd-ui/${pkgName} built successfully`)
  } catch (error) {
    console.error(`❌ @ltd-ui/${pkgName} build failed`)
    process.exit(1)
  }
}

// 主流程
console.log('🚀 Starting build process...\n')

const packages = getPackages()
console.log(`Found ${packages.length} packages to build:\n`)

for (const pkgPath of packages) {
  buildPackage(pkgPath)
}

console.log('\n🎉 All packages built successfully!')
