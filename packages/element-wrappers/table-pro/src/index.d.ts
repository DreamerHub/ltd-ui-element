/**
 * LTD UI TablePro - 类型声明
 */

import type { App, DefineComponent } from 'vue'

export type TableSize = 'large' | 'default' | 'small'

export type SortOrder = 'ascending' | 'descending' | null

export interface TableColumn {
  /** 字段名 */
  prop: string
  /** 列标题 */
  label: string
  /** 列宽度 */
  width?: string | number
  /** 最小宽度 */
  minWidth?: string | number
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 是否可排序 */
  sortable?: boolean
  /** 是否固定 */
  fixed?: boolean | 'left' | 'right'
  /** 超出显示省略号 */
  showOverflowTooltip?: boolean
  /** 格式化函数 */
  formatter?: (
    row: Record<string, any>,
    column: TableColumn,
    cellValue: any,
    index: number
  ) => string
  /** 标签映射 */
  tagMap?: Record<
    string,
    {
      label: string
      type: string
    }
  >
  /** 列设置中不可隐藏 */
  required?: boolean
}

export interface TableProProps {
  /** 表格数据 */
  data?: Record<string, any>[]
  /** 列配置 */
  columns?: TableColumn[]
  /** 加载状态 */
  loading?: boolean
  /** 是否显示边框 */
  border?: boolean
  /** 是否显示斑马纹 */
  stripe?: boolean
  /** 表格高度 */
  height?: string | number
  /** 最大高度 */
  maxHeight?: string | number
  /** 表格尺寸 */
  size?: TableSize
  /** 是否高亮当前行 */
  highlightCurrentRow?: boolean
  /** 是否显示选择列 */
  showSelection?: boolean
  /** 是否显示序号列 */
  showIndex?: boolean
  /** 是否可选中的回调 */
  selectable?: (row: Record<string, any>, index: number) => boolean
  /** 是否显示操作列 */
  showAction?: boolean
  /** 操作列宽度 */
  actionWidth?: string | number
  /** 操作列固定位置 */
  actionFixed?: boolean | 'left' | 'right'
  /** 是否显示编辑按钮 */
  showEdit?: boolean
  /** 是否显示删除按钮 */
  showDelete?: boolean
  /** 是否显示工具栏 */
  showToolbar?: boolean
  /** 是否显示列设置 */
  showColumnSetting?: boolean
  /** 是否显示分页 */
  showPagination?: boolean
  /** 数据总数 */
  total?: number
  /** 当前页 */
  page?: number
  /** 每页条数 */
  limit?: number
  /** 每页条数选项 */
  pageSizes?: number[]
  /** 分页布局 */
  paginationLayout?: string
  /** 分页背景 */
  paginationBackground?: boolean
  /** 空数据文字 */
  emptyText?: string
  /** 是否本地分页 */
  localPagination?: boolean
}

export interface TableProEmits {
  /** 选择项变化 */
  (e: 'selection-change', selection: Record<string, any>[]): void
  /** 当前行变化 */
  (e: 'current-change', currentRow: Record<string, any> | null): void
  /** 排序变化 */
  (
    e: 'sort-change',
    payload: { column: any; prop: string; order: SortOrder }
  ): void
  /** 行点击 */
  (e: 'row-click', row: Record<string, any>, column: any, event: Event): void
  /** 编辑按钮点击 */
  (e: 'edit', row: Record<string, any>, index: number): void
  /** 删除按钮点击 */
  (e: 'delete', row: Record<string, any>, index: number): void
  /** 页码变化 */
  (
    e: 'page-change',
    payload: { page: number; limit: number }
  ): void
  /** 每页条数变化 */
  (e: 'size-change', size: number): void
}

export interface TableProSlots {
  /** 工具栏左侧 */
  'toolbar-left'(): any
  /** 工具栏右侧 */
  'toolbar-right'(): any
  /** 自定义列内容 */
  [key: string]: (scope: {
    row: Record<string, any>
    $index: number
  }) => any
  /** 操作列内容 */
  action(scope: { row: Record<string, any>; $index: number }): any
  /** 空数据内容 */
  empty(): any
}

export type TableProInstance = InstanceType<typeof LtdTablePro>

export declare const LtdTablePro: DefineComponent<
  TableProProps,
  TableProEmits,
  TableProSlots
> & {
  install(app: App): void
}

export default LtdTablePro