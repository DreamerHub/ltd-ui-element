// LTD UI Core - 公共工具函数和常量

/**
 * 生成唯一 ID
 * @param {string} prefix - 前缀
 * @returns {string}
 */
export function generateId(prefix = 'ltd') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * 判断是否为合法字符串
 * @param {*} val
 * @returns {boolean}
 */
export function isString(val) {
  return typeof val === 'string'
}

/**
 * 判断是否为合法数组
 * @param {*} val
 * @returns {boolean}
 */
export function isArray(val) {
  return Array.isArray(val)
}

/**
 * 合并 class 名称
 * @param {...(string|Object|Array)} args
 * @returns {string}
 */
export function classNames(...args) {
  const classes = []
  args.forEach((arg) => {
    if (!arg) return
    if (isString(arg)) {
      classes.push(arg)
    } else if (isArray(arg)) {
      classes.push(classNames(...arg))
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) classes.push(key)
      })
    }
  })
  return classes.join(' ')
}

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
export function throttle(fn, limit = 300) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 版本号
export const version = '1.0.0'
