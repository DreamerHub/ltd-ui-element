// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'

// 引入 LTD UI 组件
import { LtdButton, LtdTablePro } from '@ltd-ui/ltd-ui'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册 Element Plus
    app.use(ElementPlus)
    // 注册 LTD UI 组件
    app.component('LtdButton', LtdButton)
    app.component('LtdTablePro', LtdTablePro)
  }
}
