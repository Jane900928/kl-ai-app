# E2E 测试文档

本项目使用 Cypress 进行端到端测试，确保应用程序的功能完整性和用户体验。

## 📁 测试文件结构

```
cypress/
├── e2e/
│   ├── home.cy.ts              # 首页测试
│   ├── dapp.cy.ts              # DApp页面测试
│   ├── navigation.cy.ts        # 导航和路由测试
│   ├── wallet.cy.ts            # 钱包连接测试
│   ├── 404.cy.ts               # 404页面测试
│   └── performance.cy.ts       # 性能测试
├── support/
│   ├── commands.ts             # 自定义命令
│   └── e2e.ts                  # 支持文件
└── README.md                   # 本文档
```

## 🚀 运行测试

### 交互模式（开发调试）
```bash
# 打开Cypress测试运行器
yarn test:e2e

# 或者使用npx
npx cypress open
```

### 命令行模式（CI环境）
```bash
# 运行所有E2E测试
yarn test:e2e:ci

# 或者使用npx
npx cypress run
```

### 运行特定测试文件
```bash
# 运行首页测试
npx cypress run --spec "cypress/e2e/home.cy.ts"

# 运行钱包相关测试
npx cypress run --spec "cypress/e2e/wallet.cy.ts"
```

## 📋 测试覆盖范围

### 1. 首页测试 (home.cy.ts)
- ✅ 页面正确显示
- ✅ Header组件渲染
- ✅ 导航菜单显示
- ✅ 钱包连接按钮
- ✅ 响应式设计（移动端、平板端）

### 2. DApp页面测试 (dapp.cy.ts)
- ✅ 页面正确显示
- ✅ 导航高亮状态
- ✅ 布局一致性
- ✅ 可访问性检查

### 3. 导航测试 (navigation.cy.ts)
- ✅ 页面间导航
- ✅ 导航高亮状态
- ✅ 直接URL访问
- ✅ 浏览器前进/后退
- ✅ 悬停效果

### 4. 钱包连接测试 (wallet.cy.ts)
- ✅ 钱包连接/断开
- ✅ 按钮状态变化
- ✅ 导航状态保持
- ✅ 键盘导航
- ✅ 快速点击处理

### 5. 404页面测试 (404.cy.ts)
- ✅ 404页面显示
- ✅ Header保持显示
- ✅ 导航功能
- ✅ 布局一致性

### 6. 集成测试 (integration.cy.ts)
- ✅ 完整用户流程
- ✅ 状态保持
- ✅ 浏览器导航
- ✅ 响应式设计
- ✅ 可访问性

### 7. 性能测试 (performance.cy.ts)
- ✅ 页面加载时间
- ✅ 导航响应时间
- ✅ 钱包交互响应
- ✅ 内存使用
- ✅ 资源加载效率

## 🛠️ 自定义命令

项目提供了以下自定义命令，可以在测试中重复使用：

### 基础命令
- `cy.waitForPageLoad()` - 等待页面加载完成
- `cy.navigateTo(path)` - 导航到指定页面
- `cy.checkPageTitle(title)` - 检查页面标题

### 钱包相关命令
- `cy.connectWallet()` - 连接钱包
- `cy.disconnectWallet()` - 断开钱包连接
- `cy.checkWalletState(connected)` - 检查钱包状态

### 导航相关命令
- `cy.checkActiveNavigation(path)` - 检查导航高亮状态
- `cy.checkResponsiveLayout(device)` - 检查响应式布局

## 📊 测试配置

### 浏览器支持
- Chrome (默认)
- Firefox
- Edge
- Electron

### 视口设置
- 默认：1280x720
- 移动端：375x812 (iPhone X)
- 平板端：768x1024 (iPad)

### 超时设置
- 默认命令超时：10秒
- 请求超时：10秒
- 响应超时：10秒
- 页面加载超时：30秒

## 🔧 调试技巧

### 1. 查看测试截图
测试失败时，截图会自动保存在 `cypress/screenshots/` 目录。

### 2. 查看测试视频
测试运行时会自动录制视频，保存在 `cypress/videos/` 目录。

### 3. 调试特定测试
```bash
# 只运行失败的测试
npx cypress run --spec "cypress/e2e/home.cy.ts" --headed
```

### 4. 使用浏览器开发者工具
在交互模式下，可以打开浏览器开发者工具进行调试。

## 📝 编写新测试

### 1. 创建测试文件
```typescript
describe('新功能测试', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('应该正确显示新功能', () => {
    // 测试代码
  });
});
```

### 2. 使用自定义命令
```typescript
it('应该能够导航到新页面', () => {
  cy.navigateTo('/new-page');
  cy.contains('新页面内容').should('be.visible');
});
```

### 3. 测试最佳实践
- 使用描述性的测试名称
- 保持测试独立，不依赖其他测试
- 使用数据属性而不是CSS类选择器
- 等待异步操作完成
- 清理测试数据

## 🚨 常见问题

### 1. 测试超时
- 检查网络连接
- 增加超时时间
- 使用 `cy.wait()` 等待特定条件

### 2. 元素未找到
- 检查选择器是否正确
- 等待元素加载完成
- 使用 `cy.get().should('be.visible')`

### 3. 测试不稳定
- 避免使用固定延迟
- 使用适当的等待条件
- 检查测试环境一致性

## 📈 持续集成

测试已集成到GitHub Actions CI/CD流水线中：

- 每次推送到master分支时自动运行
- 测试失败会阻止代码合并
- 自动生成测试报告和截图

详细配置请参考 `.github/workflows/ci.yml` 文件。
