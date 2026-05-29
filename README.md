# LTD UI

[![npm](https://img.shields.io/npm/v/@ltd-ui/ltd-ui)](https://www.npmjs.com/package/@ltd-ui/ltd-ui)
[![license](https://img.shields.io/npm/l/@ltd-ui/ltd-ui)](./LICENSE)
[![vue](https://img.shields.io/badge/vue-3.3%2B-brightgreen)](https://vuejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-8%2B-orange)](https://pnpm.io/)

一套基于 Vue 3 的中后台组件库，包含自研组件和 Element Plus 高级封装组件，支持按需引入。

## ✨ 特性

- 🚀 **按需引入** — 每个组件独立发布，包体积极小
- 🎨 **双轨设计** — 自研组件 + Element Plus 封装，灵活应对不同场景
- 📦 **Monorepo 架构** — pnpm workspace 管理，组件解耦，独立迭代
- 🛠️ **Vue 3 + SCSS** — Composition API，CSS 变量主题定制
- 📚 **完整文档** — Vitepress 驱动的文档站点

## 📦 安装

### 全量安装

```bash
pnpm add @ltd-ui/ltd-ui element-plus
```

### 按需安装（推荐）

```bash
# 只安装需要的组件
pnpm add @ltd-ui/button
pnpm add @ltd-ui/table-pro element-plus
```

## 🚀 快速开始

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

```vue
<template>
  <ltd-button type="primary">主要按钮</ltd-button>
  <ltd-table-pro :data="data" :columns="columns" />
</template>
```

## 📁 项目结构

```
ltd-ui-element/
├── packages/
│   ├── core/                    # 核心工具、公共样式变量
│   ├── components/              # 自研组件
│   │   └── button/
│   ├── element-wrappers/        # Element Plus 封装
│   │   └── table-pro/
│   └── ltd-ui/                  # 全量入口包
├── docs/                        # Vitepress 文档站点
└── scripts/                     # 构建脚本
```

## 🔗 相关链接

- [文档站点](https://your-docs-site.com)
- [更新日志](./CHANGELOG.md)
- [开发指南](./DEVELOPMENT.md)
- [贡献指南](./CONTRIBUTING.md)
- [项目配置清单](./PROJECT_STATUS.md) - 已完成内容与推荐配置
- [开发路线图](./ROADMAP.md) - 后续开发计划与排期

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！请参阅 [贡献指南](./CONTRIBUTING.md)。

## 📄 许可证

[MIT](./LICENSE) © LTD Team
