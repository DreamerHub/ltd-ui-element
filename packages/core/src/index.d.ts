/**
 * LTD UI Core - 类型声明
 */

export interface CoreVersion {
  version: string
}

/**
 * 生成唯一 ID
 * @param prefix - 前缀
 */
export function generateId(prefix?: string): string

/**
 * 判断是否为合法字符串
 */
export function isString(val: unknown): val is string

/**
 * 判断是否为合法数组
 */
export function isArray(val: unknown): val is unknown[]

/**
 * 合并 class 名称
 */
export function classNames(
  ...args: (string | Record<string, boolean> | unknown[])[]
): string

/**
 * 防抖函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay?: number
): (...args: Parameters<T>) => void

/**
 * 节流函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit?: number
): (...args: Parameters<T>) => void

/**
 * 版本号
 */
export const version: string
