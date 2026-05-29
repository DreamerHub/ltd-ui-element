# 开发指南

本文档面向 LTD UI 的贡献者，帮助您快速搭建开发环境并了解项目规范。

## 前置准备

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

```bash
# 安装 pnpm
npm install -g pnpm

# 克隆项目
git clone https://github.com/your-org/ltd-ui-element.git
cd ltd-ui-element

# 安装依赖
pnpm install
```

## 目录结构

```
ltd-ui-element/
├── packages/
│   ├── core/                    # 核心包（工具、样式变量）
│   ├── components/              # 自研组件
│   │   └── button/
│   │       ├── package.json     # 组件包配置
│   │       ├── vite.config.js   # 构建配置
│   │       └── src/
│   │           ├── index.js     # 入口文件
│   │           ├── button.vue   # 组件主体
│   │           └── button.scss  # 组件样式（内联在 .vue 中）
│   ├── element-wrappers/        # Element Plus 封装
│   │   └── table-pro/
│   │       ├── package.json
│   │       ├── vite.config.js
│   │       └── src/
│   │           ├── index.js
│   │           └── table-pro.vue
│   └── ltd-ui/                  # 全量入口包
│       ├── package.json
│       ├── vite.config.js
│       └── src/
│           └── index.js         # 聚合导出所有组件
├── docs/                        # Vitepress 文档
│   ├── .vitepress/
│   │   ├── config.js            # Vitepress 配置
│   │   └── theme/
│   ├── guide/                   # 指南文档
│   └── components/              # 组件文档
├── scripts/                     # 构建脚本
└── package.json                 # 根配置
```

## 常用命令

| 命令                    | 说明                     |
| ----------------------- | ------------------------ |
| `pnpm dev`              | 启动文档站点开发服务器   |
| `pnpm docs:build`       | 构建文档站点             |
| `pnpm build`            | 构建所有组件包           |
| `pnpm build:components` | 仅构建自研组件           |
| `pnpm build:wrappers`   | 仅构建封装组件           |
| `pnpm test`             | 运行单元测试             |
| `pnpm lint`             | 运行 ESLint              |
| `pnpm format`           | 运行 Prettier 格式化     |
| `pnpm changeset`        | 创建变更集（版本发布前） |
| `pnpm release`          | 构建并发布所有包         |

## 新增一个自研组件

以新增 `Input` 组件为例：

### 1. 创建目录结构

```bash
mkdir -p packages/components/input/src
```

### 2. 编写 package.json

```json
{
  "name": "@ltd-ui/input",
  "version": "1.0.0",
  "description": "LTD UI Input component",
  "main": "dist/index.cjs",
  "module": "dist/index.mjs",
  "style": "dist/style.css",
  "files": ["dist"],
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "style": "./dist/style.css"
    }
  },
  "scripts": {
    "build": "vite build"
  },
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  "dependencies": {
    "@ltd-ui/core": "workspace:*"
  },
  "devDependencies": {
    "@ltd-ui/core": "workspace:*",
    "vite": "^5.1.0"
  },
  "license": "MIT"
}
```

### 3. 编写 vite.config.js

复制 [packages/components/button/vite.config.js](../packages/components/button/vite.config.js) 并修改入口路径即可。

### 4. 编写组件

```vue
<!-- packages/components/input/src/input.vue -->
<template>
  <input
    :class="inputClasses"
    :value="modelValue"
    :disabled="disabled"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
export default {
  name: 'LtdInput'
}
</script>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'default' }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const inputClasses = computed(() => [
  'ltd-input',
  `ltd-input--${props.size}`,
  { 'is-disabled': props.disabled }
])

const handleInput = e => {
  emit('update:modelValue', e.target.value)
}

const handleBlur = e => {
  emit('blur', e)
}
</script>
```

### 5. 编写入口文件

```js
// packages/components/input/src/index.js
import LtdInput from './input.vue'

LtdInput.install = app => {
  app.component(LtdInput.name, LtdInput)
}

export { LtdInput }
export default LtdInput
```

### 6. 注册到全量包

在 `packages/ltd-ui/src/index.js` 中导入并注册新组件：

```js
import { LtdInput } from '@ltd-ui/input'
import '@ltd-ui/input/dist/style.css'

const components = [LtdButton, LtdTablePro, LtdInput] // 添加 LtdInput
```

### 7. 添加文档

在 `docs/components/` 下创建 `input.md`，并在 `docs/.vitepress/config.js` 的 sidebar 中添加导航。

### 8. 提交变更集

```bash
pnpm changeset
# 选择 @ltd-ui/input 包，选择 minor/patch，填写变更说明
```

## 新增一个 Element Plus 封装组件

流程与自研组件类似，区别在于：

1. 目录创建在 `packages/element-wrappers/` 下
2. `package.json` 需要添加 `element-plus` 作为 `peerDependencies`
3. 组件内部使用 `el-*` 组件
4. 在 vite.config.js 的 `external` 中添加 `element-plus`

参考现有 `table-pro` 组件即可。

## 代码规范

### Vue 组件规范

```vue
<!-- 1. 必须包含 name -->
<script>
export default {
  name: 'LtdComponentName'
}
</script>

<!-- 2. 使用 script setup + 单独的 script 定义 name -->
<script setup>
// 3. props 使用对象形式，添加注释说明
const props = defineProps({
  /** 属性说明 */
  propName: {
    type: String,
    default: ''
  }
})

// 4. emits 明确定义
const emit = defineEmits(['eventName'])
</script>

<!-- 5. 样式使用 scoped + lang="scss" -->
<style lang="scss" scoped>
.ltd-component-name {
  // BEM 命名
  &__element {
    // ...
  }

  &--modifier {
    // ...
  }

  // 状态类
  &.is-active {
    // ...
  }
}
</style>
```

### SCSS 命名规范（BEM）

- **Block**: `.ltd-button`
- **Element**: `.ltd-button__icon`
- **Modifier**: `.ltd-button--primary`
- **State**: `.ltd-button.is-disabled`

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

常用 type：

| 类型       | 说明                   |
| ---------- | ---------------------- |
| `feat`     | 新功能                 |
| `fix`      | Bug 修复               |
| `docs`     | 文档更新               |
| `style`    | 代码格式（不影响功能） |
| `refactor` | 重构                   |
| `perf`     | 性能优化               |
| `test`     | 测试相关               |
| `chore`    | 构建/工具链            |

示例：

```bash
git commit -m "feat(button): add loading state support"
git commit -m "fix(table-pro): pagination not sync with props"
git commit -m "docs: update installation guide"
```

## 调试技巧

### 本地调试组件

文档站点会自动热更新组件修改：

```bash
pnpm dev
```

然后访问 `http://localhost:5173` 查看文档和组件效果。

### 在项目中本地联调

使用 `pnpm link` 或 workspace 引用：

```bash
# 在项目目录下
cd your-project
pnpm link ../ltd-ui-element/packages/button
```

## 发布流程

```bash
# 1. 确保所有改动已提交
git status

# 2. 创建变更集
pnpm changeset

# 3. 提升版本号
pnpm version-packages

# 4. 构建
pnpm build

# 5. 发布
pnpm release
```
