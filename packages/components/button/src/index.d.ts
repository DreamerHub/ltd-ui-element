/**
 * LTD UI Button - 类型声明
 */

import type { App, DefineComponent } from 'vue'

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text'

export type ButtonSize = 'large' | 'default' | 'small'

export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 按钮类型 */
  type?: ButtonType
  /** 是否为朴素按钮 */
  plain?: boolean
  /** 是否为圆角按钮 */
  round?: boolean
  /** 是否为圆形按钮 */
  circle?: boolean
  /** 是否加载中 */
  loading?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 图标类名 */
  icon?: string
  /** 原生 type 属性 */
  nativeType?: ButtonNativeType
  /** 是否自动聚焦 */
  autofocus?: boolean
}

export interface ButtonEmits {
  /** 点击事件 */
  (e: 'click', event: MouseEvent): void
}

export interface ButtonSlots {
  /** 按钮内容 */
  default(): any
  /** 自定义图标 */
  icon(): any
}

export type ButtonInstance = InstanceType<typeof LtdButton>

export declare const LtdButton: DefineComponent<ButtonProps, ButtonEmits, ButtonSlots> & {
  install(app: App): void
}

export default LtdButton
