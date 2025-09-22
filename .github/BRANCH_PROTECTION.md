# 分支保护规则设置指南

为了确保代码质量，需要在GitHub仓库中设置分支保护规则。以下是详细的设置步骤：

## 1. 进入仓库设置

1. 打开你的GitHub仓库
2. 点击 "Settings" 标签
3. 在左侧菜单中点击 "Branches"

## 2. 添加分支保护规则

1. 点击 "Add rule" 按钮
2. 在 "Branch name pattern" 中输入 `master` 或 `main`（根据你的主分支名称）
3. 勾选以下选项：

### 必需的状态检查
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- 在状态检查列表中选择：
  - `Unit Tests` (单元测试)
  - `E2E Tests` (端到端测试)
  - `Build Check` (构建检查)

### 其他推荐设置
- ✅ Require pull request reviews before merging
  - 设置最少审查者数量：1
- ✅ Dismiss stale reviews when new commits are pushed
- ✅ Require review from code owners
- ✅ Restrict pushes that create files
- ✅ Require linear history
- ✅ Include administrators

## 3. 保存设置

点击 "Create" 按钮保存设置。

## 4. 验证设置

1. 创建一个新的分支
2. 进行一些更改
3. 创建Pull Request到master分支
4. 确认CI检查必须通过才能合并

## 注意事项

- 确保所有CI检查都通过才能合并代码
- 如果测试失败，需要修复问题后重新推送
- 管理员也需要遵循这些规则（除非取消勾选"Include administrators"）

## CI检查说明

- **Unit Tests**: 运行Jest单元测试，包括代码覆盖率检查
- **E2E Tests**: 运行Cypress端到端测试
- **Build Check**: 验证项目能够成功构建
