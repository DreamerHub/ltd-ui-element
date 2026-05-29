# 主题定制

LTD UI 使用 CSS 变量（CSS Custom Properties）和 SCSS 变量双轨制，支持灵活的主题定制。

## CSS 变量方式（运行时）

在项目的全局 CSS 文件中覆盖变量，无需重新编译：

```css
/* styles/theme.css */
:root {
  /* 主色调 */
  --ltd-color-primary: #409eff;
  --ltd-color-success: #67c23a;
  --ltd-color-warning: #e6a23c;
  --ltd-color-danger: #f56c6c;
  --ltd-color-info: #909399;

  /* 文字颜色 */
  --ltd-color-text-primary: #303133;
  --ltd-color-text-regular: #606266;
  --ltd-color-text-secondary: #909399;

  /* 边框颜色 */
  --ltd-color-border: #dcdfe6;
  --ltd-color-border-light: #e4e7ed;

  /* 圆角 */
  --ltd-border-radius-base: 4px;
  --ltd-border-radius-small: 2px;

  /* 字体 */
  --ltd-font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

/* 暗色主题 */
.dark {
  --ltd-color-text-primary: #e0e0e0;
  --ltd-color-text-regular: #b0b0b0;
  --ltd-color-bg: #1a1a1a;
}
```

## SCSS 变量方式（编译时）

在构建时覆盖 SCSS 变量，可以获得更小的包体积：

```scss
// styles/variables.scss
$ltd-color-primary: #409eff;
$ltd-color-success: #67c23a;
$ltd-border-radius-base: 8px;

// 引入核心样式
@use '@ltd-ui/core/styles' with (
  $ltd-color-primary: #409eff,
  $ltd-border-radius-base: 8px
);
```

## Element Plus 主题同步

LTD UI 的封装组件基于 Element Plus，建议保持两者主题一致：

```js
// main.js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'

const app = createApp(App)

// Element Plus 主题配置
app.use(ElementPlus, {
  zIndex: 3000,
  size: 'default',
  button: {
    autoInsertSpace: true
  }
})
```

## 预设主题

未来我们将提供以下预设主题，通过 npm 包直接引入：

| 主题 | 包名 | 状态 |
|------|------|------|
| 默认蓝 | `@ltd-ui/theme-default` | 内置 |
| 深空黑 | `@ltd-ui/theme-dark` | 计划中 |
| 活力橙 | `@ltd-ui/theme-orange` | 计划中 |
| 自然绿 | `@ltd-ui/theme-green` | 计划中 |

## 在线换肤

通过 JS 动态切换主题：

```js
// utils/theme.js
export function setTheme(themeName) {
  const themes = {
    default: { primary: '#409eff', success: '#67c23a' },
    dark: { primary: '#409eff', success: '#67c23a' },
    orange: { primary: '#ff6b35', success: '#2ecc71' }
  }

  const theme = themes[themeName]
  if (!theme) return

  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--ltd-color-${key}`, value)
  })
}
```
