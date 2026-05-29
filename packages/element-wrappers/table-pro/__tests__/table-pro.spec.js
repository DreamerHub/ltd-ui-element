import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { LtdTablePro } from '../src/index.js'

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

describe('LtdTablePro', () => {
  it('renders with correct component name', () => {
    expect(LtdTablePro.name).toBe('LtdTablePro')
  })

  it('install method works', () => {
    const app = {
      component: vi.fn()
    }
    LtdTablePro.install(app)
    expect(app.component).toHaveBeenCalledWith('LtdTablePro', LtdTablePro)
  })

  it('accepts data and columns props', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })
    expect(wrapper.props('data')).toEqual(mockData)
    expect(wrapper.props('columns')).toEqual(mockColumns)
  })

  it('has correct default props', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })
    expect(wrapper.props('border')).toBe(true)
    expect(wrapper.props('stripe')).toBe(false)
    expect(wrapper.props('showPagination')).toBe(true)
    expect(wrapper.props('showSelection')).toBe(false)
    expect(wrapper.props('showIndex')).toBe(false)
    expect(wrapper.props('showAction')).toBe(false)
    expect(wrapper.props('showToolbar')).toBe(false)
    expect(wrapper.props('page')).toBe(1)
    expect(wrapper.props('limit')).toBe(10)
    expect(wrapper.props('total')).toBe(0)
    expect(wrapper.props('emptyText')).toBe('暂无数据')
  })

  it('computes displayedColumns correctly', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        showColumnSetting: false
      }
    })
    // When showColumnSetting is false, all columns should be displayed
    expect(wrapper.vm.displayedColumns).toEqual(mockColumns)
  })

  it('emits page-change event', async () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        total: 100,
        showPagination: true
      }
    })

    // Simulate page change
    wrapper.vm.handlePageChange(2)
    await wrapper.vm.$nextTick

    expect(wrapper.emitted()).toHaveProperty('page-change')
    expect(wrapper.emitted('page-change')[0]).toEqual([{ page: 2, limit: 10 }])
  })

  it('emits size-change event', async () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        total: 100
      }
    })

    wrapper.vm.handleSizeChange(20)
    await wrapper.vm.$nextTick

    expect(wrapper.emitted()).toHaveProperty('size-change')
    expect(wrapper.emitted('size-change')[0]).toEqual([20])
  })

  it('handles edit event', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        showAction: true
      }
    })

    wrapper.vm.handleEdit(mockData[0], 0)
    expect(wrapper.emitted()).toHaveProperty('edit')
    expect(wrapper.emitted('edit')[0]).toEqual([mockData[0], 0])
  })

  it('handles delete event', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        showAction: true
      }
    })

    wrapper.vm.handleDelete(mockData[1], 1)
    expect(wrapper.emitted()).toHaveProperty('delete')
    expect(wrapper.emitted('delete')[0]).toEqual([mockData[1], 1])
  })

  it('computes local pagination data correctly', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + i
    }))

    const wrapper = mount(LtdTablePro, {
      props: {
        data: largeData,
        columns: mockColumns,
        localPagination: true,
        showPagination: true,
        limit: 10
      }
    })

    // Page 1 should show first 10 items
    expect(wrapper.vm.tableData).toHaveLength(10)
    expect(wrapper.vm.tableData[0].id).toBe(1)
    expect(wrapper.vm.tableData[9].id).toBe(10)
  })

  it('exposes correct methods', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    expect(typeof wrapper.vm.clearSelection).toBe('function')
    expect(typeof wrapper.vm.toggleRowSelection).toBe('function')
    expect(typeof wrapper.vm.toggleAllSelection).toBe('function')
    expect(typeof wrapper.vm.getSelectionRows).toBe('function')
  })

  it('initializes visible columns on mount', () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    expect(wrapper.vm.visibleColumns).toEqual(['name', 'age', 'address'])
  })

  it('watches page prop changes', async () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        page: 1
      }
    })

    await wrapper.setProps({ page: 5 })
    expect(wrapper.vm.currentPage).toBe(5)
  })

  it('watches limit prop changes', async () => {
    const wrapper = mount(LtdTablePro, {
      props: {
        data: mockData,
        columns: mockColumns,
        limit: 10
      }
    })

    await wrapper.setProps({ limit: 50 })
    expect(wrapper.vm.pageSize).toBe(50)
  })
})
