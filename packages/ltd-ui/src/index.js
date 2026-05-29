import { version } from '@ltd-ui/core'
import { LtdButton } from '@ltd-ui/button'
import { LtdTablePro } from '@ltd-ui/table-pro'

// 引入所有组件样式（构建时会被提取）
import '@ltd-ui/button/dist/style.css'
import '@ltd-ui/table-pro/dist/style.css'

const components = [LtdButton, LtdTablePro]

const install = app => {
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export { LtdButton, LtdTablePro, version }

export default {
  version,
  install
}
