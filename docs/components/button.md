# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <ltd-button>默认按钮</ltd-button>
  <ltd-button type="primary">主要按钮</ltd-button>
  <ltd-button type="success">成功按钮</ltd-button>
  <ltd-button type="warning">警告按钮</ltd-button>
  <ltd-button type="danger">危险按钮</ltd-button>
  <ltd-button type="info">信息按钮</ltd-button>
</div>

:::

```vue
<template>
  <ltd-button>默认按钮</ltd-button>
  <ltd-button type="primary">主要按钮</ltd-button>
  <ltd-button type="success">成功按钮</ltd-button>
  <ltd-button type="warning">警告按钮</ltd-button>
  <ltd-button type="danger">危险按钮</ltd-button>
  <ltd-button type="info">信息按钮</ltd-button>
</template>
```

## 朴素按钮

按钮的朴素样式。

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <ltd-button plain>朴素按钮</ltd-button>
  <ltd-button type="primary" plain>主要按钮</ltd-button>
  <ltd-button type="success" plain>成功按钮</ltd-button>
  <ltd-button type="warning" plain>警告按钮</ltd-button>
  <ltd-button type="danger" plain>危险按钮</ltd-button>
</div>

:::

```vue
<template>
  <ltd-button plain>朴素按钮</ltd-button>
  <ltd-button type="primary" plain>主要按钮</ltd-button>
  <ltd-button type="success" plain>成功按钮</ltd-button>
  <ltd-button type="warning" plain>警告按钮</ltd-button>
  <ltd-button type="danger" plain>危险按钮</ltd-button>
</template>
```

## 圆角按钮

使用 `round` 属性定义圆角按钮。

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <ltd-button round>圆角按钮</ltd-button>
  <ltd-button type="primary" round>主要按钮</ltd-button>
  <ltd-button type="success" round>成功按钮</ltd-button>
  <ltd-button type="warning" round>警告按钮</ltd-button>
  <ltd-button type="danger" round>危险按钮</ltd-button>
</div>

:::

```vue
<template>
  <ltd-button round>圆角按钮</ltd-button>
  <ltd-button type="primary" round>主要按钮</ltd-button>
  <ltd-button type="success" round>成功按钮</ltd-button>
  <ltd-button type="warning" round>警告按钮</ltd-button>
  <ltd-button type="danger" round>危险按钮</ltd-button>
</template>
```

## 加载状态

点击按钮进行数据加载操作。

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <ltd-button type="primary" loading>加载中</ltd-button>
</div>

:::

```vue
<template>
  <ltd-button type="primary" loading>加载中</ltd-button>
</template>
```

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸。

::: raw

<div style="padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; margin-bottom: 16px;">
  <ltd-button size="large">大型按钮</ltd-button>
  <ltd-button>默认按钮</ltd-button>
  <ltd-button size="small">小型按钮</ltd-button>
</div>

:::

```vue
<template>
  <ltd-button size="large">大型按钮</ltd-button>
  <ltd-button>默认按钮</ltd-button>
  <ltd-button size="small">小型按钮</ltd-button>
</template>
```

## API

### Props

| 属性         | 说明           | 类型      | 可选值                                                                     | 默认值    |
| ------------ | -------------- | --------- | -------------------------------------------------------------------------- | --------- |
| `size`       | 尺寸           | `string`  | `large` / `default` / `small`                                              | `default` |
| `type`       | 类型           | `string`  | `default` / `primary` / `success` / `warning` / `danger` / `info` / `text` | `default` |
| `plain`      | 是否朴素按钮   | `boolean` | —                                                                          | `false`   |
| `round`      | 是否圆角按钮   | `boolean` | —                                                                          | `false`   |
| `circle`     | 是否圆形按钮   | `boolean` | —                                                                          | `false`   |
| `loading`    | 是否加载中状态 | `boolean` | —                                                                          | `false`   |
| `disabled`   | 是否禁用状态   | `boolean` | —                                                                          | `false`   |
| `icon`       | 图标类名       | `string`  | —                                                                          | —         |
| `nativeType` | 原生 type 属性 | `string`  | `button` / `submit` / `reset`                                              | `button`  |
| `autofocus`  | 是否默认聚焦   | `boolean` | —                                                                          | `false`   |

### Events

| 事件名  | 说明           | 回调参数              |
| ------- | -------------- | --------------------- |
| `click` | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名    | 说明       |
| --------- | ---------- |
| `default` | 按钮内容   |
| `icon`    | 自定义图标 |
