<template>
  <div class="playground">
    <!-- 组件选择器 -->
    <div class="playground-header">
      <div class="component-select">
        <label>选择组件：</label>
        <select v-model="currentComponent">
          <option v-for="c in componentList" :key="c.name" :value="c.name">
            {{ c.label }}
          </option>
        </select>
      </div>
      <p class="component-desc">{{ currentConfig?.description }}</p>
    </div>

    <div class="playground-body">
      <!-- 预览区域 -->
      <div class="preview-area">
        <h4>预览</h4>
        <div class="preview-content">
          <LtdButton v-if="currentComponent === 'Button'" v-bind="buttonProps">
            {{ buttonProps.text || 'Button' }}
          </LtdButton>

          <LtdTablePro v-if="currentComponent === 'TablePro'" v-bind="tableProProps" />
        </div>
      </div>

      <!-- 属性控制面板 -->
      <div class="props-panel">
        <h4>属性配置</h4>

        <!-- Button 属性 -->
        <template v-if="currentComponent === 'Button'">
          <div v-for="field in buttonFields" :key="field.prop" class="prop-item">
            <label>{{ field.label }}</label>

            <!-- 字符串输入 -->
            <input
              v-if="field.type === 'string'"
              v-model="buttonProps[field.prop]"
              type="text"
              :placeholder="field.default"
            />

            <!-- 下拉选择 -->
            <select v-else-if="field.type === 'select'" v-model="buttonProps[field.prop]">
              <option v-for="opt in field.options" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>

            <!-- 布尔开关 -->
            <label v-else-if="field.type === 'boolean'" class="switch-label">
              <input v-model="buttonProps[field.prop]" type="checkbox" />
              <span>{{ buttonProps[field.prop] ? '是' : '否' }}</span>
            </label>
          </div>
        </template>

        <!-- TablePro 属性 -->
        <template v-if="currentComponent === 'TablePro'">
          <div v-for="field in tableProFields" :key="field.prop" class="prop-item">
            <label>{{ field.label }}</label>

            <!-- 布尔开关 -->
            <label v-if="field.type === 'boolean'" class="switch-label">
              <input v-model="tableProProps[field.prop]" type="checkbox" />
              <span>{{ tableProProps[field.prop] ? '是' : '否' }}</span>
            </label>

            <!-- 数字输入 -->
            <input
              v-else-if="field.type === 'number'"
              v-model.number="tableProProps[field.prop]"
              type="number"
            />

            <!-- 字符串输入 -->
            <input
              v-else-if="field.type === 'string'"
              v-model="tableProProps[field.prop]"
              type="text"
            />
          </div>
        </template>
      </div>
    </div>

    <!-- 代码展示 -->
    <div class="code-area">
      <div class="code-header" @click="showCode = !showCode">
        <span>{{ showCode ? '▼' : '▶' }} 代码</span>
        <button class="copy-btn" @click.stop="copyCode">复制</button>
      </div>
      <pre v-show="showCode" class="code-block"><code>{{ generatedCode }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const currentComponent = ref('Button')
const showCode = ref(true)

const componentList = [
  { name: 'Button', label: 'Button 按钮', description: '基础按钮组件，支持多种类型、尺寸和状态' },
  {
    name: 'TablePro',
    label: 'TablePro 高级表格',
    description: '基于 Element Plus Table 封装的高级表格组件'
  }
]

const currentConfig = computed(() => componentList.find(c => c.name === currentComponent.value))

// ========== Button ==========
const buttonProps = ref({
  text: 'Button',
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  loading: false,
  disabled: false,
  icon: '',
  nativeType: 'button'
})

const buttonFields = [
  { prop: 'text', label: '按钮文字', type: 'string', default: 'Button' },
  {
    prop: 'type',
    label: '类型',
    type: 'select',
    options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text']
  },
  { prop: 'size', label: '尺寸', type: 'select', options: ['large', 'default', 'small'] },
  { prop: 'plain', label: '朴素按钮', type: 'boolean' },
  { prop: 'round', label: '圆角按钮', type: 'boolean' },
  { prop: 'circle', label: '圆形按钮', type: 'boolean' },
  { prop: 'loading', label: '加载中', type: 'boolean' },
  { prop: 'disabled', label: '禁用', type: 'boolean' },
  { prop: 'icon', label: '图标类名', type: 'string', default: '' },
  { prop: 'nativeType', label: '原生类型', type: 'select', options: ['button', 'submit', 'reset'] }
]

// ========== TablePro ==========
const mockData = [
  { id: 1, name: '张三', age: 28, address: '北京市' },
  { id: 2, name: '李四', age: 32, address: '上海市' },
  { id: 3, name: '王五', age: 24, address: '广州市' }
]

const mockColumns = [
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 100 },
  { prop: 'address', label: '地址' }
]

const tableProProps = ref({
  data: mockData,
  columns: mockColumns,
  border: true,
  stripe: false,
  showPagination: true,
  showSelection: false,
  showIndex: false,
  showAction: false,
  showToolbar: false,
  page: 1,
  limit: 10,
  total: 3,
  emptyText: '暂无数据',
  localPagination: false,
  showColumnSetting: false
})

const tableProFields = [
  { prop: 'border', label: '边框', type: 'boolean' },
  { prop: 'stripe', label: '斑马纹', type: 'boolean' },
  { prop: 'showPagination', label: '显示分页', type: 'boolean' },
  { prop: 'showSelection', label: '显示选择列', type: 'boolean' },
  { prop: 'showIndex', label: '显示序号列', type: 'boolean' },
  { prop: 'showAction', label: '显示操作列', type: 'boolean' },
  { prop: 'showToolbar', label: '显示工具栏', type: 'boolean' },
  { prop: 'page', label: '当前页', type: 'number' },
  { prop: 'limit', label: '每页条数', type: 'number' },
  { prop: 'total', label: '总条数', type: 'number' },
  { prop: 'emptyText', label: '空数据提示', type: 'string' },
  { prop: 'localPagination', label: '本地分页', type: 'boolean' },
  { prop: 'showColumnSetting', label: '列设置', type: 'boolean' }
]

// ========== 代码生成 ==========
const generatedCode = computed(() => {
  if (currentComponent.value === 'Button') {
    const props = Object.entries(buttonProps.value)
      .filter(([k, v]) => {
        if (k === 'text') return false
        if (typeof v === 'boolean') return v
        if (typeof v === 'string') return v && v !== ''
        return true
      })
      .map(([k, v]) => {
        if (typeof v === 'boolean') return `${k}`
        if (typeof v === 'string') return `${k}="${v}"`
        return `${k}="${v}"`
      })
      .join(' ')

    const text = buttonProps.value.text || 'Button'
    return props ? `<ltd-button ${props}>${text}</ltd-button>` : `<ltd-button>${text}</ltd-button>`
  }

  if (currentComponent.value === 'TablePro') {
    const props = Object.entries(tableProProps.value)
      .filter(([k, v]) => {
        if (['data', 'columns'].includes(k)) return false
        if (typeof v === 'boolean') return v !== (k === 'border')
        if (typeof v === 'number') return v !== 1 && v !== 10 && v !== 3
        if (typeof v === 'string') return v !== '暂无数据'
        return false
      })
      .map(([k, v]) => {
        if (typeof v === 'boolean') return `:${k}="${v}"`
        if (typeof v === 'number') return `:${k}="${v}"`
        return `${k}="${v}"`
      })
      .join('\n  ')

    const base = `<ltd-table-pro
  :data="tableData"
  :columns="tableColumns"${props ? '\n  ' + props : ''}
/>`
    return (
      base +
      '\n\n<!-- 数据定义 -->\nconst tableData = [\n  { id: 1, name: "张三", age: 28, address: "北京市" },\n  ...\n]\n\nconst tableColumns = [\n  { prop: "name", label: "姓名", width: 120 },\n  ...\n]'
    )
  }

  return ''
})

function copyCode() {
  navigator.clipboard.writeText(generatedCode.value).then(() => {
    alert('代码已复制到剪贴板')
  })
}

// 切换组件时重置代码展开状态
watch(currentComponent, () => {
  showCode.value = true
})
</script>

<style scoped>
.playground {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
}

.playground-header {
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.component-select {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.component-select label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.component-select select {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  cursor: pointer;
  min-width: 200px;
}

.component-desc {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

.playground-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  min-height: 300px;
}

@media (max-width: 768px) {
  .playground-body {
    grid-template-columns: 1fr;
  }
}

.preview-area {
  padding: 20px;
  border-right: 1px solid var(--vp-c-divider);
}

@media (max-width: 768px) {
  .preview-area {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}

.preview-area h4,
.props-panel h4 {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.preview-content {
  padding: 24px;
  background: var(--vp-c-bg);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.props-panel {
  padding: 20px;
  background: var(--vp-c-bg-soft);
  overflow-y: auto;
  max-height: 500px;
}

.prop-item {
  margin-bottom: 16px;
}

.prop-item label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.prop-item input[type='text'],
.prop-item input[type='number'],
.prop-item select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
}

.switch-label {
  display: flex !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.switch-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.switch-label span {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.code-area {
  border-top: 1px solid var(--vp-c-divider);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.code-header:hover {
  background: var(--vp-c-bg-mute);
}

.copy-btn {
  padding: 4px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 12px;
  cursor: pointer;
}

.copy-btn:hover {
  background: var(--vp-c-bg-mute);
}

.code-block {
  margin: 0;
  padding: 16px 20px;
  background: var(--vp-code-block-bg);
  color: var(--vp-code-block-color);
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}
</style>
