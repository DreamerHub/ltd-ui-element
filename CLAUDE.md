# CLAUDE.md - LTD UI 项目速查

> 本文档面向 AI 助手和新加入的开发者，帮助快速理解项目结构和开发模式。

## 项目概览

LTD UI 是一个基于 Vue 3 + SCSS 的组件库，采用 **Monorepo (pnpm workspace)** 架构。

| 属性     | 说明                         |
| -------- | ---------------------------- |
| 技术栈   | Vue 3, SCSS, Vite, Vitepress |
| 包管理   | pnpm workspace               |
| 组件类型 | 自研 + Element Plus 封装     |
| 发布方式 | 每个组件独立 npm 包          |
| 文档     | Vitepress                    |

## 目录结构速查

```
ltd-ui-element/
├── packages/
│   ├── core/                    # ⭐ 核心：工具函数 + SCSS 变量 + mixins
│   ├── components/              # ⭐ 自研组件（Button, Input, ...）
│   │   └── <component-name>/
│   │       ├── package.json     # 独立 npm 包配置
│   │       ├── vite.config.js   # 库模式构建配置
│   │       └── src/
│   │           ├── index.js     # 入口：导出组件 + install 方法
│   │           └── *.vue        # 组件 SFC（样式内联在 .vue 中）
│   ├── element-wrappers/        # ⭐ Element Plus 封装（TablePro, ...）
│   │   └── <wrapper-name>/
│   │       └── ...（结构同 components）
│   └── ltd-ui/                  # ⭐ 全量入口：聚合所有组件
│       └── src/index.js         # import 所有组件并统一导出
├── docs/                        # Vitepress 文档
│   ├── .vitepress/config.js     # 文档导航配置
│   ├── guide/                   # 指南文档
│   └── components/              # 组件 API 文档
├── package.json                 # 根配置：workspace + scripts
└── pnpm-workspace.yaml          # workspace 定义
```

## 新增组件的标准流程

```bash
# 1. 创建目录
mkdir -p packages/components/<name>/src

# 2. 复制模板（从 button 复制）
cp -r packages/components/button/* packages/components/<name>/
# 然后修改：package.json 中的 name、vite.config.js 入口、组件 .vue 文件

# 3. 在全量包注册
# 编辑 packages/ltd-ui/src/index.js，添加 import 和注册

# 4. 添加文档
# 编辑 docs/.vitepress/config.js 导航
# 创建 docs/components/<name>.md

# 5. 创建变更集
pnpm changeset
```

## 关键约定

### 组件命名

| 层级          | 格式                   | 示例             |
| ------------- | ---------------------- | ---------------- |
| npm 包名      | `@ltd-ui/<kebab-name>` | `@ltd-ui/button` |
| Vue 组件 name | `Ltd<PascalCase>`      | `LtdButton`      |
| DOM class     | `ltd-<kebab-name>`     | `.ltd-button`    |

### 每个组件包的必备结构

```
<component>/
├── package.json          # 必须有 main/module/style/exports
├── vite.config.js        # external: ['vue'] 至少
└── src/
    ├── index.js          # export + install 方法
    └── <name>.vue        # <script>name + <script setup> + scoped scss
```

### package.json 关键字段

```json
{
  "name": "@ltd-ui/button",
  "main": "dist/index.cjs", // CJS 入口
  "module": "dist/index.mjs", // ESM 入口
  "style": "dist/style.css", // CSS 入口（Vite 提取）
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "style": "./dist/style.css"
    }
  },
  "peerDependencies": { "vue": "^3.3.0" }
}
```

### Vite 构建配置要点

```js
// vite.config.js
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js',
      formats: ['es', 'cjs'],
      fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['vue', 'element-plus', '@ltd-ui/core']
      // element-plus 只在 wrappers 中需要
    },
    cssCodeSplit: false // 样式合并到单个文件
  }
})
```

## 样式系统

### 设计令牌（SCSS 变量）

所有变量定义在 `packages/core/styles/variables.scss`：

```scss
// 颜色
$ltd-color-primary: #409eff;
$ltd-color-success: #67c23a;
// ...

// 尺寸
$ltd-height-large: 40px;
$ltd-height-default: 32px;
$ltd-height-small: 24px;
```

### BEM + scoped 混合

组件样式写在 `.vue` 文件内，使用 `scoped` + BEM 命名：

```scss
<style lang="scss" scoped>
.ltd-button {
  &__icon { }
  &--primary { }
  &.is-loading { }
}
</style>
```

## 常用命令

| 命令             | 用途              |
| ---------------- | ----------------- |
| `pnpm dev`       | 启动文档站点      |
| `pnpm build`     | 构建所有包        |
| `pnpm changeset` | 创建版本变更记录  |
| `pnpm release`   | 构建 + 发布到 npm |

## 调试提示

- 文档站点 `pnpm dev` 会自动热更新组件修改
- 组件样式直接改 `.vue` 文件中的 `<style>` 即可
- 新增组件后需要在 `packages/ltd-ui/src/index.js` 中注册才会出现在全量包里
- 文档导航需要手动更新 `docs/.vitepress/config.js`

## 发布流程

```
开发完成 → pnpm changeset → pnpm version-packages → pnpm build → pnpm release
```
