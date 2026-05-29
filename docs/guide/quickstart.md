# 快速开始

## 完整引入

如果你需要用到 LTD UI 的所有组件，可以完整引入：

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import LtdUI from '@ltd-ui/ltd-ui'

const app = createApp(App)
app.use(ElementPlus)
app.use(LtdUI)
app.mount('#app')
```

## 按需引入

### 手动按需引入

```vue
<template>
  <ltd-button type="primary">主要按钮</ltd-button>
  <ltd-table-pro :data="tableData" :columns="columns" />
</template>

<script setup>
import { LtdButton } from '@ltd-ui/button'
import '@ltd-ui/button/dist/style.css'

import { LtdTablePro } from '@ltd-ui/table-pro'
import '@ltd-ui/table-pro/dist/style.css'

const tableData = [
  { name: '张三', age: 28, address: '北京市' },
  { name: '李四', age: 32, address: '上海市' }
]

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' }
]
</script>
```

### 自动按需引入（推荐）

使用 `unplugin-vue-components` 和 `unplugin-auto-import` 实现自动按需引入：

#### 1. 安装插件

```bash
pnpm add -D unplugin-vue-components unplugin-auto-import
```

#### 2. 配置 Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 自动导入 LTD UI 组件
      resolvers: [
        (name) => {
          // 匹配 ltd- 开头的组件
          if (name.startsWith('Ltd')) {
            const componentName = name.slice(3).toLowerCase()
            return {
              name: name,
              from: `@ltd-ui/${componentName}`
            }
          }
        }
      ]
    }),
    AutoImport({
      imports: ['vue']
    })
  ]
})
```

#### 3. 直接使用组件

```vue
<template>
  <!-- 无需手动 import，自动按需加载 -->
  <ltd-button type="primary">自动引入的按钮</ltd-button>
</template>
```

## 全局配置

### 主题色配置

在项目的入口 CSS 文件中覆盖 CSS 变量：

```css
/* styles/vars.css */
:root {
  --ltd-color-primary: #409eff;
  --ltd-color-success: #67c23a;
  --ltd-color-warning: #e6a23c;
  --ltd-color-danger: #f56c6c;
  --ltd-color-info: #909399;
}
```

### SCSS 变量覆盖

如果你使用 SCSS，可以直接覆盖变量：

```scss
// styles/index.scss
$ltd-color-primary: #409eff;

@import '@ltd-ui/core/styles/variables.scss';
```

## 在 Nuxt 3 中使用

```js
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['element-plus/dist/index.css'],
  build: {
    transpile: ['@ltd-ui/ltd-ui', 'element-plus']
  }
})
```

```vue
<!-- app.vue -->
<template>
  <NuxtPage />
</template>

<script setup>
import { LtdButton } from '@ltd-ui/button'
</script>
```
