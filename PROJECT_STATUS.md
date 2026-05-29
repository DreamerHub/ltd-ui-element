# LTD UI 项目配置清单

> 本文档记录项目已完成的内容和推荐的后续配置项，用于跟踪项目状态和规划后续工作。

---

## ✅ 已完成内容

### 1. 项目架构

| 配置项 | 状态 | 说明 |
|--------|------|------|
| Monorepo 架构 | ✅ | pnpm workspace 管理多包 |
| 根 package.json | ✅ | 工作区配置、scripts、engines |
| pnpm-workspace.yaml | ✅ | 定义 workspace 包范围 |
| .gitignore | ✅ | 排除 node_modules、dist、IDE 配置等 |

### 2. 核心包（packages/core）

| 配置项 | 状态 | 说明 |
|--------|------|------|
| package.json | ✅ | 独立包配置，支持 ESM/CJS 导出 |
| vite.config.js | ✅ | 库模式构建配置 |
| 工具函数 | ✅ | generateId、classNames、debounce、throttle |
| SCSS 变量系统 | ✅ | 颜色、字体、尺寸、间距、动画、z-index |
| SCSS Mixins | ✅ | BEM 命名辅助、clearfix、ellipsis、flex-center |
| 样式入口 | ✅ | variables.scss + mixins.scss 统一转发 |

### 3. 自研组件（packages/components/button）

| 配置项 | 状态 | 说明 |
|--------|------|------|
| package.json | ✅ | 独立 npm 包配置 |
| vite.config.js | ✅ | 库模式 + external vue |
| 组件实现 | ✅ | Button.vue（7种类型、3种尺寸、plain/round/circle/loading/disabled） |
| 入口文件 | ✅ | index.js（导出 + install 方法） |
| 组件样式 | ✅ | scoped SCSS，BEM 命名 |

### 4. Element Plus 封装（packages/element-wrappers/table-pro）

| 配置项 | 状态 | 说明 |
|--------|------|------|
| package.json | ✅ | 独立 npm 包，peerDependencies 包含 element-plus |
| vite.config.js | ✅ | 库模式 + external vue/element-plus |
| 组件实现 | ✅ | TablePro.vue（分页、选择、序号、操作列、列设置、工具栏） |
| 入口文件 | ✅ | index.js（导出 + install 方法） |
| 组件样式 | ✅ | scoped SCSS |

### 5. 全量入口包（packages/ltd-ui）

| 配置项 | 状态 | 说明 |
|--------|------|------|
| package.json | ✅ | 聚合所有组件作为依赖 |
| vite.config.js | ✅ | 库模式构建 |
| 入口文件 | ✅ | index.js（统一注册所有组件 + 样式） |

### 6. 文档站点（docs/）

| 配置项 | 状态 | 说明 |
|--------|------|------|
| package.json | ✅ | Vitepress 文档站点依赖 |
| Vitepress 配置 | ✅ | config.js（导航、侧边栏、搜索、主题色） |
| 自定义主题 | ✅ | theme/index.js（注册 Element Plus + LTD UI 组件） |
| 主题样式 | ✅ | theme/style.css（VP 变量覆盖、API 表格优化） |
| 首页 | ✅ | index.md（Hero + Features） |
| 指南文档 | ✅ | 介绍、安装、快速开始、主题定制、开发指南、更新日志、贡献指南 |
| 组件文档 | ✅ | Button、TablePro 完整 API 文档 |
| 文档 README | ✅ | 本地开发/构建说明 |

### 7. 项目文档（根目录）

| 文档 | 状态 | 用途 |
|------|------|------|
| README.md | ✅ | 项目总览、徽章、快速开始、项目结构 |
| CLAUDE.md | ✅ | AI/新开发者速查手册 |
| CONTRIBUTING.md | ✅ | 贡献流程、分支命名、提交规范 |
| DEVELOPMENT.md | ✅ | 环境搭建、新增组件详细流程、代码规范 |
| CHANGELOG.md | ✅ | 版本变更记录（初始版本） |
| CODE_OF_CONDUCT.md | ✅ | 社区行为准则 |
| LICENSE | ✅ | MIT 许可证 |

### 8. GitHub 模板

| 模板 | 状态 | 用途 |
|------|------|------|
| PULL_REQUEST_TEMPLATE.md | ✅ | PR 提交模板 |
| ISSUE_TEMPLATE/bug_report.md | ✅ | Bug 报告模板 |
| ISSUE_TEMPLATE/feature_request.md | ✅ | 功能请求模板 |

### 9. 构建脚本

| 脚本 | 状态 | 说明 |
|------|------|------|
| scripts/build.mjs | ✅ | 遍历所有包自动构建 |

---

## 🔧 推荐后续配置

### 高优先级（建议近期完成）

| 配置项 | 优先级 | 说明 | 参考文件/命令 |
|--------|--------|------|--------------|
| ESLint 配置 | 🔴 P0 | 统一代码风格，自动检测问题 | 创建 `.eslintrc.js` + `eslint-plugin-vue` |
| Prettier 配置 | 🔴 P0 | 统一代码格式化 | 创建 `.prettierrc` |
| TypeScript 支持 | 🟡 P1 | 为组件添加类型声明文件（.d.ts） | 每个包的 `dist/index.d.ts` |
| Vitest 单元测试 | 🟡 P1 | 组件单元测试覆盖 | 创建 `vitest.config.js` + `__tests__/` 目录 |
| GitHub Actions CI | 🟡 P1 | 自动化测试 + 构建 + 发布 | 创建 `.github/workflows/ci.yml` |
| Changesets 配置 | 🟡 P1 | 版本管理和发布流程 | 运行 `pnpm changeset init` |

### 中优先级（建议 1-2 个月内完成）

| 配置项 | 优先级 | 说明 | 参考 |
|--------|--------|------|------|
| 代码覆盖率 | 🟢 P2 | 测试覆盖率报告（c8/v8） | Vitest 内置覆盖率 |
| Husky + lint-staged | 🟢 P2 | 提交前自动 lint 和格式化 | `husky` + `lint-staged` |
| Commitizen | 🟢 P2 | 交互式提交信息规范 | `commitizen` + `cz-conventional-changelog` |
| 组件按需引入插件 | 🟢 P2 | unplugin 插件自动解析 | 参考 `unplugin-vue-components` |
| 视觉回归测试 | 🟢 P2 | 防止 UI 意外变更 | Playwright / Chromatic |
| Bundle 分析 | 🟢 P2 | 分析包体积 | `rollup-plugin-visualizer` |

### 低优先级（长期规划）

| 配置项 | 优先级 | 说明 | 参考 |
|--------|--------|------|------|
| 暗色主题 | 🔵 P3 | 完整的 dark mode 支持 | CSS 变量 + `prefers-color-scheme` |
| 国际化 (i18n) | 🔵 P3 | 多语言支持 | Vue I18n |
| SSR 支持 | 🔵 P3 | Nuxt 3 / 服务端渲染兼容 | 组件避免使用 `window`/`document` |
| CDN 构建 | 🔵 P3 | UMD 格式浏览器直接引入 | Vite `formats: ['umd']` |
| 在线 Playground | 🔵 P3 | 浏览器中实时编辑组件 | WebContainer / CodeSandbox |
| Figma 设计令牌同步 | 🔵 P3 | 设计稿与代码变量同步 | Design Tokens / Style Dictionary |

---

## 📊 当前进度概览

```
项目架构        ████████████████████ 100% ✅
核心包          ████████████████████ 100% ✅
自研组件        ████████████████████ 100% ✅ (1个示例)
Element封装      ████████████████████ 100% ✅ (1个示例)
全量入口包       ████████████████████ 100% ✅
文档站点         ████████████████████ 100% ✅
项目文档         ████████████████████ 100% ✅
GitHub模板       ████████████████████ 100% ✅
代码规范(ESLint) ░░░░░░░░░░░░░░░░░░░░   0% ⏳
代码格式化       ░░░░░░░░░░░░░░░░░░░░   0% ⏳
TypeScript      ░░░░░░░░░░░░░░░░░░░░   0% ⏳
单元测试         ░░░░░░░░░░░░░░░░░░░░   0% ⏳
CI/CD           ░░░░░░░░░░░░░░░░░░░░   0% ⏳
```

---

## 📝 使用说明

1. **跟踪进度**：完成某项配置后，在此文档中更新状态
2. **新增推荐项**：发现需要补充的配置时，添加到"推荐后续配置"表格
3. **定期回顾**：建议每两周 review 一次此文档，调整优先级
