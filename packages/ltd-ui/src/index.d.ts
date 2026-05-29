/**
 * LTD UI - 全量入口包类型声明
 */

import type { App, Plugin } from 'vue'

export { LtdButton, type ButtonProps, type ButtonType } from '@ltd-ui/button'
export {
  LtdTablePro,
  type TableProProps,
  type TableColumn
} from '@ltd-ui/table-pro'
export { version } from '@ltd-ui/core'

declare const LtdUI: Plugin & {
  version: string
  install(app: App): void
}

export default LtdUI