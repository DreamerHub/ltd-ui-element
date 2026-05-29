import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { LtdButton } from '../src/index.js'

describe('LtdButton', () => {
  it('renders default slot content', () => {
    const wrapper = mount(LtdButton, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('has correct default props', () => {
    const wrapper = mount(LtdButton)
    expect(wrapper.classes()).toContain('ltd-button')
    expect(wrapper.classes()).toContain('ltd-button--default')
  })

  it('applies type classes correctly', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info', 'text']
    types.forEach((type) => {
      const wrapper = mount(LtdButton, {
        props: { type }
      })
      expect(wrapper.classes()).toContain(`ltd-button--${type}`)
    })
  })

  it('applies size classes correctly', () => {
    const sizes = ['large', 'small']
    sizes.forEach((size) => {
      const wrapper = mount(LtdButton, {
        props: { size }
      })
      expect(wrapper.classes()).toContain(`ltd-button--${size}`)
    })
  })

  it('applies modifier classes correctly', () => {
    const wrapper = mount(LtdButton, {
      props: {
        plain: true,
        round: true,
        circle: true
      }
    })
    expect(wrapper.classes()).toContain('is-plain')
    expect(wrapper.classes()).toContain('is-round')
    expect(wrapper.classes()).toContain('is-circle')
  })

  it('handles disabled state', () => {
    const wrapper = mount(LtdButton, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('handles loading state', () => {
    const wrapper = mount(LtdButton, {
      props: { loading: true }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.ltd-button__loading-icon').exists()).toBe(true)
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(LtdButton, {
      slots: { default: 'Button' }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(LtdButton, {
      props: { disabled: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(LtdButton, {
      props: { loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders icon when provided', () => {
    const wrapper = mount(LtdButton, {
      props: { icon: 'my-icon' },
      slots: { default: 'Button' }
    })
    expect(wrapper.find('.ltd-button__icon').exists()).toBe(true)
    expect(wrapper.find('.ltd-button__icon span').classes()).toContain('my-icon')
  })

  it('has correct native type attribute', () => {
    const wrapper = mount(LtdButton, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.element.getAttribute('type')).toBe('submit')
  })

  it('install method works', () => {
    const app = {
      component: vi.fn()
    }
    LtdButton.install(app)
    expect(app.component).toHaveBeenCalledWith('LtdButton', LtdButton)
  })
})
