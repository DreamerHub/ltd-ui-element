import { defineConfig } from 'vitepress'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'LTD UI',
  description: 'A Vue 3 component library with original components and Element Plus wrappers',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#409eff' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
      { text: '预览', link: '/playground' },
      {
        text: '1.0.0',
        items: [
          { text: '更新日志', link: '/guide/changelog' },
          { text: '贡献指南', link: '/guide/contributing' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          collapsed: false,
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' }
          ]
        },
        {
          text: '进阶',
          collapsed: false,
          items: [
            { text: '主题定制', link: '/guide/theme' },
            { text: '开发指南', link: '/guide/development' },
            { text: '更新日志', link: '/guide/changelog' },
            { text: '贡献指南', link: '/guide/contributing' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          collapsed: false,
          items: [{ text: 'Button 按钮', link: '/components/button' }]
        },
        {
          text: 'Element Plus 封装',
          collapsed: false,
          items: [{ text: 'TablePro 高级表格', link: '/components/table-pro' }]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/your-org/ltd-ui-element' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present LTD Team'
    },

    editLink: {
      pattern: 'https://github.com/your-org/ltd-ui-element/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    search: {
      provider: 'local'
    }
  },

  vite: {
    plugins: [vue()],
    resolve: {
      alias: {
        '@ltd-ui/core': resolve(__dirname, '../../packages/core/src/index.js'),
        '@ltd-ui/button': resolve(__dirname, '../../packages/components/button/src/index.js'),
        '@ltd-ui/table-pro': resolve(
          __dirname,
          '../../packages/element-wrappers/table-pro/src/index.js'
        ),
        '@ltd-ui/ltd-ui': resolve(__dirname, '../../packages/ltd-ui/src/index.js')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@ltd-ui/core/styles/variables.scss" as *;`
        }
      }
    }
  },

  markdown: {
    lineNumbers: true,
    config: md => {
      // 可以在这里注册自定义 markdown 插件
    }
  }
})
