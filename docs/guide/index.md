# 介绍

LTD UI 是一套基于 Vue 3 的中后台组件库，采用 **Monorepo** 架构管理，包含自研组件和对 Element Plus 的高级封装组件。

## 设计哲学

- **按需引入**：每个组件都是一个独立的 npm 包，用户可按需安装，避免引入无用代码
- **双轨并行**：自研组件提供独特能力，Element Plus 封装组件提供更便捷的使用体验
- **主题一致**：统一的设计令牌（Design Tokens），保持视觉风格一致
- **开发友好**：完善的类型提示、文档和示例，降低学习成本

## 项目结构

```
ltd-ui-element/
├── packages/
│   ├── core/                    # 核心工具、公共样式变量
│   ├── components/              # 自研组件
│   │   └── button/              # Button 按钮
│   ├── element-wrappers/        # Element Plus 封装
│   │   └── table-pro/           # TablePro 高级表格
│   └── ltd-ui/                  # 全量入口包
├── docs/                        # Vitepress 文档站点
└── scripts/                     # 构建脚本
```

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | >= 88 |
| Firefox | >= 78 |
| Safari | >= 14 |
| Edge | >= 88 |

## 相关链接

- [Vue 3 官方文档](https://vuejs.org/)
- [Element Plus 官方文档](https://element-plus.org/)
- [Vitepress 官方文档](https://vitepress.dev/)
