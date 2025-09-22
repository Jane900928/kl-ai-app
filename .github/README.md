# GitHub CI/CD 设置

本项目已配置GitHub Actions CI/CD流水线，确保代码质量和测试覆盖率。

## 🚀 CI流水线功能

### 自动触发条件
- 推送到 `master` 或 `main` 分支
- 创建Pull Request到 `master` 或 `main` 分支

### 执行的检查

#### 1. 单元测试 (Unit Tests)
- 运行Jest单元测试
- 生成代码覆盖率报告
- 上传覆盖率数据到Codecov
- 设置覆盖率阈值：95% (函数、行、语句)，50% (分支)

#### 2. 端到端测试 (E2E Tests)
- 构建生产版本应用
- 启动本地服务器
- 运行Cypress E2E测试
- 自动截图和录屏（测试失败时）
- 上传测试结果和截图

#### 3. 构建检查 (Build Check)
- 验证项目能够成功构建
- 检查构建产物完整性

## 📁 文件结构

```
.github/
├── workflows/
│   └── ci.yml              # CI流水线配置
├── BRANCH_PROTECTION.md    # 分支保护规则设置指南
└── README.md              # 本文档
```

## 🔧 本地开发

### 运行测试
```bash
# 运行单元测试
yarn test

# 运行单元测试（CI模式）
yarn test:ci

# 运行E2E测试（交互模式）
yarn test:e2e

# 运行E2E测试（CI模式）
yarn test:e2e:ci

# 运行代码检查
yarn lint
```

### 构建项目
```bash
# 开发模式构建
yarn client:dev

# 生产模式构建
yarn client:prod
```

## 🛡️ 分支保护

为了确保代码质量，建议设置以下分支保护规则：

1. 要求状态检查通过才能合并
2. 要求分支在合并前是最新的
3. 要求Pull Request审查
4. 限制直接推送到主分支

详细设置步骤请参考 [BRANCH_PROTECTION.md](./BRANCH_PROTECTION.md)

## 📊 测试覆盖率

- 当前覆盖率阈值：
  - 函数：95%
  - 行：95%
  - 语句：95%
  - 分支：50%

覆盖率报告生成在 `docs/jest-coverage/` 目录下。

## 🔍 故障排除

### 常见问题

1. **测试失败**
   - 检查本地测试是否通过：`yarn test:ci`
   - 查看GitHub Actions日志获取详细错误信息

2. **E2E测试失败**
   - 检查应用是否正常构建：`yarn client:prod`
   - 检查本地E2E测试：`yarn test:e2e:ci`

3. **构建失败**
   - 检查依赖是否正确安装：`yarn install`
   - 检查TypeScript类型错误：`yarn lint`

### 获取帮助

如果遇到问题，请：
1. 查看GitHub Actions的详细日志
2. 在本地重现问题
3. 检查相关配置文件是否正确
