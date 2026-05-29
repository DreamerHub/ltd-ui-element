<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="nativeType"
    @click="handleClick"
  >
    <span v-if="loading" class="ltd-button__loading-icon">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L692.48 692.992a32 32 0 0 1 0-45.248zM240.448 828.8a32 32 0 0 1 0-45.248L331.008 692.48a32 32 0 0 1 45.248 45.248L240.448 874.048a32 32 0 0 1 0 45.248zM828.8 195.2a32 32 0 0 1 45.248 45.248L692.992 421.504a32 32 0 0 1-45.248-45.248L828.8 195.2z"
        />
      </svg>
    </span>
    <span v-if="icon &amp;&amp; !loading" class="ltd-button__icon">
      <slot name="icon">
        <span :class="icon"></span>
      </slot>
    </span>
    <span class="ltd-button__content">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'LtdButton'
}
</script>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** 按钮尺寸 */
  size: {
    type: String,
    default: 'default',
    validator: val => ['large', 'default', 'small'].includes(val)
  },
  /** 按钮类型 */
  type: {
    type: String,
    default: 'default',
    validator: val =>
      ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'].includes(val)
  },
  /** 是否为朴素按钮 */
  plain: {
    type: Boolean,
    default: false
  },
  /** 是否为圆角按钮 */
  round: {
    type: Boolean,
    default: false
  },
  /** 是否为圆形按钮 */
  circle: {
    type: Boolean,
    default: false
  },
  /** 是否加载中 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 图标类名 */
  icon: {
    type: String,
    default: ''
  },
  /** 原生 type 属性 */
  nativeType: {
    type: String,
    default: 'button',
    validator: val => ['button', 'submit', 'reset'].includes(val)
  },
  /** 是否自动聚焦 */
  autofocus: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  return [
    'ltd-button',
    `ltd-button--${props.type}`,
    props.size !== 'default' && `ltd-button--${props.size}`,
    {
      'is-plain': props.plain,
      'is-round': props.round,
      'is-circle': props.circle,
      'is-loading': props.loading,
      'is-disabled': props.disabled
    }
  ]
})

const handleClick = evt => {
  if (props.loading || props.disabled) return
  emit('click', evt)
}
</script>

<style lang="scss" scoped>
.ltd-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 4px;

  & + .ltd-button {
    margin-left: 12px;
  }

  &:hover,
  &:focus {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }

  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: none;
  }

  &__content {
    display: inline-flex;
    align-items: center;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
  }

  &__loading-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
    animation: ltd-rotate 1s linear infinite;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  // 尺寸
  &--large {
    height: 40px;
    padding: 12px 19px;
    font-size: 14px;
    border-radius: 4px;
  }

  &--small {
    height: 24px;
    padding: 5px 11px;
    font-size: 12px;
    border-radius: 3px;

    & [class*='ltd-icon'] {
      font-size: 12px;
    }
  }

  // 类型变体
  &--primary {
    color: #ffffff;
    background-color: #409eff;
    border-color: #409eff;

    &:hover,
    &:focus {
      background-color: #66b1ff;
      border-color: #66b1ff;
      color: #ffffff;
    }

    &:active {
      background-color: #3a8ee6;
      border-color: #3a8ee6;
      color: #ffffff;
    }

    &.is-plain {
      color: #409eff;
      background-color: #ecf5ff;
      border-color: #a0cfff;

      &:hover,
      &:focus {
        background-color: #409eff;
        border-color: #409eff;
        color: #ffffff;
      }
    }
  }

  &--success {
    color: #ffffff;
    background-color: #67c23a;
    border-color: #67c23a;

    &:hover,
    &:focus {
      background-color: #85ce61;
      border-color: #85ce61;
      color: #ffffff;
    }

    &.is-plain {
      color: #67c23a;
      background-color: #f0f9eb;
      border-color: #b3e19d;

      &:hover,
      &:focus {
        background-color: #67c23a;
        border-color: #67c23a;
        color: #ffffff;
      }
    }
  }

  &--warning {
    color: #ffffff;
    background-color: #e6a23c;
    border-color: #e6a23c;

    &:hover,
    &:focus {
      background-color: #ebb563;
      border-color: #ebb563;
      color: #ffffff;
    }

    &.is-plain {
      color: #e6a23c;
      background-color: #fdf6ec;
      border-color: #f3d19e;

      &:hover,
      &:focus {
        background-color: #e6a23c;
        border-color: #e6a23c;
        color: #ffffff;
      }
    }
  }

  &--danger {
    color: #ffffff;
    background-color: #f56c6c;
    border-color: #f56c6c;

    &:hover,
    &:focus {
      background-color: #f78989;
      border-color: #f78989;
      color: #ffffff;
    }

    &.is-plain {
      color: #f56c6c;
      background-color: #fef0f0;
      border-color: #fab6b6;

      &:hover,
      &:focus {
        background-color: #f56c6c;
        border-color: #f56c6c;
        color: #ffffff;
      }
    }
  }

  &--info {
    color: #ffffff;
    background-color: #909399;
    border-color: #909399;

    &:hover,
    &:focus {
      background-color: #a6a9ad;
      border-color: #a6a9ad;
      color: #ffffff;
    }

    &.is-plain {
      color: #909399;
      background-color: #f4f4f5;
      border-color: #c8c9cc;

      &:hover,
      &:focus {
        background-color: #909399;
        border-color: #909399;
        color: #ffffff;
      }
    }
  }

  &--text {
    border-color: transparent;
    color: #409eff;
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover,
    &:focus {
      color: #66b1ff;
      border-color: transparent;
      background-color: transparent;
    }
  }

  // 形状变体
  &.is-round {
    border-radius: 20px;
    padding-left: 23px;
    padding-right: 23px;
  }

  &.is-circle {
    border-radius: 50%;
    padding: 8px;
    width: 32px;
    height: 32px;

    &--large {
      width: 40px;
      height: 40px;
      padding: 12px;
    }

    &--small {
      width: 24px;
      height: 24px;
      padding: 5px;
    }
  }

  // 状态
  &.is-loading {
    position: relative;
    pointer-events: none;

    &::before {
      pointer-events: none;
      content: '';
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }

  &.is-disabled,
  &.is-disabled:hover,
  &.is-disabled:focus,
  &[disabled] {
    color: #a8abb2;
    cursor: not-allowed;
    background-image: none;
    background-color: #ffffff;
    border-color: #e4e7ed;
  }
}

@keyframes ltd-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
