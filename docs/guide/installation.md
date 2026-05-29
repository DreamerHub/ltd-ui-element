# 安装

## 环境要求

- [Node.js](https://nodejs.org/) >= 18.0.0
- [pnpm](https://pnpm.io/) >= 8.0.0（推荐）
- [Vue](https://vuejs.org/) ^3.3.0
- [Element Plus](https://element-plus.org/) ^2.5.0（封装组件需要）

## 包管理器

本项目使用 **pnpm workspace** 管理，强烈建议使用 pnpm：

```bash
# 安装 pnpm
npm install -g pnpm

# 验证版本
pnpm --version
```

## 安装方式

### 全量安装

安装完整的组件库：

::: code-group

```bash [pnpm]
pnpm add @ltd-ui/ltd-ui element-plus
```

```bash [npm]
npm install @ltd-ui/ltd-ui element-plus
```

```bash [yarn]
yarn add @ltd-ui/ltd-ui element-plus
```

:::

### 按需安装（推荐）

只安装需要的组件，包体积更小：

::: code-group

```bash [pnpm]
# 安装自研组件
pnpm add @ltd-ui/button

# 安装 Element Plus 封装
pnpm add @ltd-ui/table-pro element-plus

# 安装核心样式（可选）
pnpm add @ltd-ui/core
```

```bash [npm]
npm install @ltd-ui/button
npm install @ltd-ui/table-pro element-plus
```

```bash [yarn]
yarn add @ltd-ui/button
yarn add @ltd-ui/table-pro element-plus
```

:::

## 版本说明

| 包名 | 说明 | 版本 |
|------|------|------|
| `@ltd-ui/ltd-ui` | 全量入口包 | ![npm](https://img.shields.io/npm/v/@ltd-ui/ltd-ui) |
| `@ltd-ui/core` | 核心工具和样式 | ![npm](https://img.shields.io/npm/v/@ltd-ui/core) |
| `@ltd-ui/button` | 按钮组件 | ![npm](https://img.shields.io/npm/v/@ltd-ui/button) |
| `@ltd-ui/table-pro` | 高级表格 | ![npm](https://img.shields.io/npm/v/@ltd-ui/table-pro) |
