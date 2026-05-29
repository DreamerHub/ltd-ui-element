# LTD UI 文档站点

本文档站点基于 [Vitepress](https://vitepress.dev/) 构建。

## 本地开发

```bash
# 在项目根目录
pnpm dev

# 或在 docs 目录下
cd docs
pnpm dev
```

文档站点将在 `http://localhost:5173` 启动。

## 构建

```bash
pnpm docs:build
```

构建产物输出到 `docs/.vitepress/dist/` 目录。

## 预览

```bash
pnpm docs:preview
```

## 文档规范

### 组件文档结构

每个组件文档应包含以下部分：

1. **标题** - 组件名称 + 中文名
2. **基础用法** - 最简单的使用示例
3. **功能示例** - 按功能分类的示例（plain、round、loading 等）
4. **API** - Props、Events、Methods、Slots

### 示例代码规范

````md
## 功能标题

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <!-- 交互示例 -->
</div>

:::

```vue
<!-- 代码示例 -->
```
````

````

### API 表格格式

```md
### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| `propName` | 属性说明 | `string` | — | `''` |
````
