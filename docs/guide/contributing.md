# 贡献指南

感谢您愿意为 LTD UI 做出贡献！

## 如何贡献

### 报告 Bug

如果您发现了 Bug，请通过 [GitHub Issues](https://github.com/your-org/ltd-ui-element/issues) 提交，并遵循以下模板：

- 使用清晰的标题描述问题
- 描述复现步骤
- 提供最小可复现示例
- 说明期望行为和实际行为
- 提供环境信息（Vue 版本、浏览器等）

### 提交功能请求

如果您有新功能的想法：

1. 先搜索已有的 Issues，避免重复
2. 详细描述功能的用途和使用场景
3. 如果可能，提供 API 设计建议

### 提交代码

#### 1. Fork 仓库

点击 GitHub 右上角的 "Fork" 按钮。

#### 2. 克隆并创建分支

```bash
git clone https://github.com/your-username/ltd-ui-element.git
cd ltd-ui-element
git checkout -b feat/your-feature-name
```

分支命名规范：

| 类型     | 命名示例               |
| -------- | ---------------------- |
| 新功能   | `feat/button-loading`  |
| Bug 修复 | `fix/table-pagination` |
| 文档     | `docs/install-guide`   |
| 重构     | `refactor/core-utils`  |

#### 3. 开发

```bash
# 安装依赖
pnpm install

# 启动文档站点进行调试
pnpm dev
```

请确保：

- 代码通过 ESLint 检查：`pnpm lint`
- 代码通过 Prettier 格式化：`pnpm format`
- 新增的组件有对应的文档和示例

#### 4. 创建变更集

```bash
pnpm changeset
```

按照提示选择受影响的包、版本类型（patch/minor/major）和变更说明。

#### 5. 提交 Pull Request

```bash
git add .
git commit -m "feat(button): add loading state support"
git push origin feat/your-feature-name
```

然后在 GitHub 上创建 Pull Request，填写 PR 模板中的信息。

## 代码审查

所有提交都需要经过代码审查。审查者会关注：

- 代码是否符合项目规范
- 是否有足够的测试覆盖
- 文档是否完整
- 是否引入了破坏性变更

## 行为准则

- 尊重每一位贡献者
- 接受建设性的批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 许可证

通过向本项目贡献代码，您同意将其在 [MIT 许可证](../LICENSE) 下发布。
