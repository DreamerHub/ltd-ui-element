<template>
  <div class="ltd-table-pro">
    <!-- 工具栏 -->
    <div v-if="showToolbar" class="ltd-table-pro__toolbar">
      <div class="ltd-table-pro__toolbar-left">
        <slot name="toolbar-left" />
      </div>
      <div class="ltd-table-pro__toolbar-right">
        <slot name="toolbar-right" />
        <!-- 列设置 -->
        <el-popover v-if="showColumnSetting" placement="bottom" width="200" trigger="click">
          <template #reference>
            <el-button :icon="Setting" size="small">列设置</el-button>
          </template>
          <el-checkbox-group v-model="visibleColumns">
            <el-checkbox
              v-for="col in columnOptions"
              :key="col.prop"
              :label="col.prop"
              :disabled="col.required"
            >
              {{ col.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-popover>
      </div>
    </div>

    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="tableData"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :size="size"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
      @row-click="handleRowClick"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
        align="center"
        :selectable="selectable"
      />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :index="indexMethod"
        width="60"
        align="center"
        label="序号"
      />

      <!-- 动态列 -->
      <template v-for="col in displayedColumns" :key="col.prop">
        <el-table-column
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :align="col.align || 'left'"
          :sortable="col.sortable"
          :fixed="col.fixed"
          :show-overflow-tooltip="col.showOverflowTooltip !== false"
        >
          <template #default="scope">
            <!-- 自定义渲染 -->
            <slot :name="col.prop" v-bind="scope">
              <!-- 格式化器 -->
              <template v-if="col.formatter">
                {{ col.formatter(scope.row, col, scope.row[col.prop], scope.$index) }}
              </template>
              <!-- 标签映射 -->
              <template v-else-if="col.tagMap">
                <el-tag :type="col.tagMap[scope.row[col.prop]]?.type || 'info'" :size="size">
                  {{ col.tagMap[scope.row[col.prop]]?.label || scope.row[col.prop] }}
                </el-tag>
              </template>
              <!-- 默认显示 -->
              <template v-else>
                {{ scope.row[col.prop] }}
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>

      <!-- 操作列 -->
      <el-table-column
        v-if="showAction"
        label="操作"
        :width="actionWidth"
        :fixed="actionFixed"
        align="center"
      >
        <template #default="scope">
          <slot name="action" v-bind="scope">
            <el-button
              v-if="showEdit"
              link
              type="primary"
              :size="size"
              @click="handleEdit(scope.row, scope.$index)"
            >
              编辑
            </el-button>
            <el-button
              v-if="showDelete"
              link
              type="danger"
              :size="size"
              @click="handleDelete(scope.row, scope.$index)"
            >
              删除
            </el-button>
          </slot>
        </template>
      </el-table-column>

      <!-- 空数据 -->
      <template #empty>
        <slot name="empty">
          <el-empty :description="emptyText" />
        </slot>
      </template>
    </el-table>

    <!-- 分页 -->
    <div v-if="showPagination && total > 0" class="ltd-table-pro__pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        :layout="paginationLayout"
        :background="paginationBackground"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LtdTablePro'
}
</script>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Setting } from '@element-plus/icons-vue'

const props = defineProps({
  /** 表格数据 */
  data: {
    type: Array,
    default: () => []
  },
  /** 列配置 */
  columns: {
    type: Array,
    default: () => []
  },
  /** 加载状态 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否显示斑马纹 */
  stripe: {
    type: Boolean,
    default: false
  },
  /** 表格高度 */
  height: {
    type: [String, Number],
    default: null
  },
  /** 最大高度 */
  maxHeight: {
    type: [String, Number],
    default: null
  },
  /** 表格尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 是否高亮当前行 */
  highlightCurrentRow: {
    type: Boolean,
    default: false
  },
  /** 是否显示选择列 */
  showSelection: {
    type: Boolean,
    default: false
  },
  /** 是否显示序号列 */
  showIndex: {
    type: Boolean,
    default: false
  },
  /** 是否可选中的回调 */
  selectable: {
    type: Function,
    default: () => true
  },
  /** 是否显示操作列 */
  showAction: {
    type: Boolean,
    default: false
  },
  /** 操作列宽度 */
  actionWidth: {
    type: [String, Number],
    default: 150
  },
  /** 操作列固定位置 */
  actionFixed: {
    type: [Boolean, String],
    default: 'right'
  },
  /** 是否显示编辑按钮 */
  showEdit: {
    type: Boolean,
    default: true
  },
  /** 是否显示删除按钮 */
  showDelete: {
    type: Boolean,
    default: true
  },
  /** 是否显示工具栏 */
  showToolbar: {
    type: Boolean,
    default: false
  },
  /** 是否显示列设置 */
  showColumnSetting: {
    type: Boolean,
    default: false
  },
  /** 是否显示分页 */
  showPagination: {
    type: Boolean,
    default: true
  },
  /** 数据总数 */
  total: {
    type: Number,
    default: 0
  },
  /** 当前页 */
  page: {
    type: Number,
    default: 1
  },
  /** 每页条数 */
  limit: {
    type: Number,
    default: 10
  },
  /** 每页条数选项 */
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  /** 分页布局 */
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  /** 分页背景 */
  paginationBackground: {
    type: Boolean,
    default: true
  },
  /** 空数据文字 */
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  /** 是否分页（本地数据） */
  localPagination: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'selection-change',
  'current-change',
  'sort-change',
  'row-click',
  'edit',
  'delete',
  'page-change',
  'size-change'
])

const tableRef = ref(null)
const currentPage = ref(props.page)
const pageSize = ref(props.limit)
const selectedRows = ref([])

// 列可见性控制
const visibleColumns = ref([])

const columnOptions = computed(() => {
  return props.columns.map(col => ({
    prop: col.prop,
    label: col.label,
    required: col.required || false
  }))
})

const displayedColumns = computed(() => {
  if (!props.showColumnSetting || visibleColumns.value.length === 0) {
    return props.columns
  }
  return props.columns.filter(col => visibleColumns.value.includes(col.prop))
})

// 本地分页数据
const tableData = computed(() => {
  if (props.localPagination && props.showPagination) {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return props.data.slice(start, end)
  }
  return props.data
})

// 序号计算方法
const indexMethod = index => {
  if (props.localPagination || !props.showPagination) {
    return index + 1
  }
  return (currentPage.value - 1) * pageSize.value + index + 1
}

// 事件处理
const handleSelectionChange = val => {
  selectedRows.value = val
  emit('selection-change', val)
}

const handleCurrentChange = val => {
  emit('current-change', val)
}

const handleSortChange = val => {
  emit('sort-change', val)
}

const handleRowClick = (row, column, event) => {
  emit('row-click', row, column, event)
}

const handleEdit = (row, index) => {
  emit('edit', row, index)
}

const handleDelete = (row, index) => {
  emit('delete', row, index)
}

const handleSizeChange = val => {
  pageSize.value = val
  currentPage.value = 1
  emit('size-change', val)
  emit('page-change', { page: 1, limit: val })
}

const handlePageChange = val => {
  currentPage.value = val
  emit('page-change', { page: val, limit: pageSize.value })
}

// 暴露方法
const clearSelection = () => tableRef.value?.clearSelection()
const toggleRowSelection = (row, selected) => tableRef.value?.toggleRowSelection(row, selected)
const toggleAllSelection = () => tableRef.value?.toggleAllSelection()
const getSelectionRows = () => tableRef.value?.getSelectionRows()

defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  getSelectionRows,
  selectedRows
})

// 初始化列可见性
onMounted(() => {
  visibleColumns.value = props.columns.map(col => col.prop)
})

// 监听外部 page/limit 变化
watch(
  () => props.page,
  val => {
    currentPage.value = val
  }
)

watch(
  () => props.limit,
  val => {
    pageSize.value = val
  }
)
</script>

<style lang="scss" scoped>
.ltd-table-pro {
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    &-left,
    &-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  &__pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
  }

  :deep(.el-table) {
    // 可以覆盖 Element Plus 默认样式
  }
}
</style>
