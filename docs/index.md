---
layout: home

hero:
  name: 'LTD UI'
  text: 'Vue 3 组件库'
  tagline: 自研组件与 Element Plus 封装的高效组合，支持按需引入，助力中后台开发
  image:
    src: /logo.svg
    alt: LTD UI
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 组件列表
      link: /components/button
    - theme: alt
      text: GitHub
      link: https://github.com/your-org/ltd-ui-element

features:
  - icon: 🚀
    title: 按需引入
    details: 每个组件独立发布为 npm 包，支持单独安装使用，包体积极小
  - icon: 🎨
    title: 双轨设计
    details: 自研组件 + Element Plus 高级封装，灵活应对不同场景需求
  - icon: 📦
    title: Monorepo 架构
    details: pnpm workspace 管理，组件解耦，独立迭代，版本灵活控制
  - icon: 🛠️
    title: Vue 3 + SCSS
    details: 基于 Vue 3 Composition API 开发，SCSS 预处理，CSS 变量主题定制
  - icon: 📚
    title: 完整文档
    details: Vitepress 驱动的文档站点，组件示例、API 说明一应俱全
  - icon: 🧪
    title: 易于扩展
    details: 完善的开发指南和脚手架，新增组件只需复制模板即可快速上手
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #409eff 30%, #67c23a);
}
</style>
