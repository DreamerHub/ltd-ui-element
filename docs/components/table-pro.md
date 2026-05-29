# TablePro 高级表格

基于 Element Plus `el-table` 封装的高级表格组件，内置分页、列设置、选择列、操作列等常用功能。

## 基础用法

基础的数据展示表格。

```vue
<template>
  <ltd-table-pro :data="tableData" :columns="columns" />
</template>

<script setup>
const tableData = [
  { name: '张三', age: 28, address: '北京市朝阳区', status: 'active' },
  { name: '李四', age: 32, address: '上海市浦东新区', status: 'inactive' },
  { name: '王五', age: 24, address: '广州市天河区', status: 'active' },
  { name: '赵六', age: 35, address: '深圳市南山区', status: 'pending' }
]

const columns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100, sortable: true },
  { prop: 'address', label: '地址' },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    tagMap: {
      active: { label: '正常', type: 'success' },
      inactive: { label: '禁用', type: 'info' },
      pending: { label: '待审核', type: 'warning' }
    }
  }
]
</script>
```

## 带分页

配合后端分页使用。

```vue
<template>
  <ltd-table-pro
    :data="tableData"
    :columns="columns"
    :total="total"
    :page="page"
    :limit="limit"
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
const total = ref(0)
const page = ref(1)
const limit = ref(10)

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' }
]

const fetchData = async () => {
  // 请求数据
  // const res = await api.getList({ page: page.value, limit: limit.value })
}

const handlePageChange = ({ page, limit }) => {
  page.value = page
  limit.value = limit
  fetchData()
}

const handleSizeChange = (size) => {
  limit.value = size
  fetchData()
}
</script>
```

## 本地分页

对前端已有的数据进行分页。

```vue
<template>
  <ltd-table-pro
    :data="allData"
    :columns="columns"
    local-pagination
    show-pagination
  />
</template>

<script setup>
const allData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `用户${i + 1}`,
  age: 20 + (i % 30),
  address: `地址${i + 1}`
}))

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' }
]
</script>
```

## 带选择列

启用多选功能。

```vue
<template>
  <div>
    <ltd-table-pro
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      show-selection
      @selection-change="handleSelectionChange"
    />
    <p>已选择: {{ selectedCount }} 条</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableRef = ref(null)
const selectedCount = ref(0)

const tableData = [
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 }
]

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
]

const handleSelectionChange = (rows) => {
  selectedCount.value = rows.length
}
</script>
```

## 带操作列

内置编辑/删除操作按钮。

```vue
<template>
  <ltd-table-pro
    :data="tableData"
    :columns="columns"
    show-action
    action-width="180"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <template #action="{ row }">
      <el-button link type="primary" @click="handleView(row)">查看</el-button>
      <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
      <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
    </template>
  </ltd-table-pro>
</template>

<script setup>
const tableData = [
  { id: 1, name: '张三', age: 28 },
  { id: 2, name: '李四', age: 32 }
]

const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'age', label: '年龄' }
]

const handleEdit = (row, index) => {
  console.log('编辑', row, index)
}

const handleDelete = (row, index) => {
  console.log('删除', row, index)
}

const handleView = (row) => {
  console.log('查看', row)
}
</script>
```

## 列设置

用户可以自定义显示哪些列。

```vue
<template>
  <ltd-table-pro
    :data="tableData"
    :columns="columns"
    show-toolbar
    show-column-setting
  />
</template>

<script setup>
const tableData = [
  { name: '张三', age: 28, address: '北京', email: 'zhangsan@example.com' },
  { name: '李四', age: 32, address: '上海', email: 'lisi@example.com' }
]

const columns = [
  { prop: 'name', label: '姓名', required: true },
  { prop: 'age', label: '年龄' },
  { prop: 'address', label: '地址' },
  { prop: 'email', label: '邮箱' }
]
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `data` | 表格数据 | `array` | `[]` |
| `columns` | 列配置 | `array` | `[]` |
| `loading` | 加载状态 | `boolean` | `false` |
| `border` | 是否显示边框 | `boolean` | `true` |
| `stripe` | 是否显示斑马纹 | `boolean` | `false` |
| `height` | 表格高度 | `string / number` | — |
| `maxHeight` | 表格最大高度 | `string / number` | — |
| `size` | 表格尺寸 | `string` | `'default'` |
| `highlightCurrentRow` | 是否高亮当前行 | `boolean` | `false` |
| `showSelection` | 是否显示选择列 | `boolean` | `false` |
| `showIndex` | 是否显示序号列 | `boolean` | `false` |
| `selectable` | 是否可选中的回调 | `function` | `() => true` |
| `showAction` | 是否显示操作列 | `boolean` | `false` |
| `actionWidth` | 操作列宽度 | `string / number` | `150` |
| `actionFixed` | 操作列固定位置 | `boolean / string` | `'right'` |
| `showEdit` | 是否显示编辑按钮 | `boolean` | `true` |
| `showDelete` | 是否显示删除按钮 | `boolean` | `true` |
| `showToolbar` | 是否显示工具栏 | `boolean` | `false` |
| `showColumnSetting` | 是否显示列设置 | `boolean` | `false` |
| `showPagination` | 是否显示分页 | `boolean` | `true` |
| `total` | 数据总数 | `number` | `0` |
| `page` | 当前页 | `number` | `1` |
| `limit` | 每页条数 | `number` | `10` |
| `pageSizes` | 每页条数选项 | `array` | `[10, 20, 50, 100]` |
| `paginationLayout` | 分页布局 | `string` | `'total, sizes, prev, pager, next, jumper'` |
| `paginationBackground` | 分页是否有背景 | `boolean` | `true` |
| `emptyText` | 空数据提示 | `string` | `'暂无数据'` |
| `localPagination` | 是否本地分页 | `boolean` | `false` |

### Columns 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `prop` | 字段名 | `string` | 必填 |
| `label` | 列标题 | `string` | 必填 |
| `width` | 列宽度 | `string / number` | — |
| `minWidth` | 最小宽度 | `string / number` | — |
| `align` | 对齐方式 | `string` | `'left'` |
| `sortable` | 是否可排序 | `boolean` | `false` |
| `fixed` | 是否固定 | `boolean / string` | — |
| `showOverflowTooltip` | 超出显示省略号 | `boolean` | `true` |
| `formatter` | 格式化函数 | `function` | — |
| `tagMap` | 标签映射 | `object` | — |
| `required` | 列设置中不可隐藏 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| `selection-change` | 选择项变化 | `(selection: array)` |
| `current-change` | 当前行变化 | `(currentRow: object)` |
| `sort-change` | 排序变化 | `{ column, prop, order }` |
| `row-click` | 行点击 | `(row, column, event)` |
| `edit` | 编辑按钮点击 | `(row, index)` |
| `delete` | 删除按钮点击 | `(row, index)` |
| `page-change` | 页码变化 | `{ page, limit }` |
| `size-change` | 每页条数变化 | `(size: number)` |

### Methods

| 方法名 | 说明 |
|--------|------|
| `clearSelection` | 清空选择 |
| `toggleRowSelection` | 切换某行选择状态 |
| `toggleAllSelection` | 切换全选 |
| `getSelectionRows` | 获取已选行数据 |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| `toolbar-left` | 工具栏左侧 | — |
| `toolbar-right` | 工具栏右侧 | — |
| `[prop]` | 自定义列内容 | `{ row, $index }` |
| `action` | 操作列内容 | `{ row, $index }` |
| `empty` | 空数据内容 | — |
