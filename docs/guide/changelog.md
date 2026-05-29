# 更新日志

所有显著的变更都会记录在此文件中。

本项目的版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。

## [1.0.0] - 2024-XX-XX

### 🎉 初始发布

#### 核心

- 新增 `@ltd-ui/core` 核心包，提供：
  - 公共 SCSS 变量系统（颜色、字体、尺寸、间距等）
  - BEM 命名 mixins
  - 常用工具函数（`generateId`、`classNames`、`debounce`、`throttle`）

#### 自研组件

- 新增 `@ltd-ui/button` Button 按钮组件：
  - 支持 `default`、`primary`、`success`、`warning`、`danger`、`info`、`text` 七种类型
  - 支持 `large`、`default`、`small` 三种尺寸
  - 支持 `plain`、`round`、`circle` 样式变体
  - 支持 `loading`、`disabled` 状态
  - 支持自定义图标和插槽

#### Element Plus 封装

- 新增 `@ltd-ui/table-pro` TablePro 高级表格组件：
  - 基于 Element Plus `el-table` 封装
  - 内置分页支持（服务端/本地）
  - 内置选择列、序号列
  - 内置操作列（编辑/删除）
  - 列设置功能（显示/隐藏列）
  - 工具栏插槽
  - 标签映射、格式化器等高级列配置

#### 文档

- 使用 Vitepress 搭建文档站点
- 包含完整的使用指南和 API 文档
- 支持本地搜索

#### 构建

- 支持 ESM 和 CJS 两种模块格式
- 支持按需引入和全量引入
- CSS 样式自动提取

## 版本号说明

| 版本变化 | 说明 | 示例 |
|----------|------|------|
| 主版本号 (MAJOR) | 不兼容的 API 修改 | `1.0.0` → `2.0.0` |
| 次版本号 (MINOR) | 向下兼容的功能新增 | `1.0.0` → `1.1.0` |
| 修订号 (PATCH) | 向下兼容的问题修复 | `1.0.0` → `1.0.1` |
