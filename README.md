# KL AI App

一个基于 React + TypeScript + Web3 的现代化 DApp 应用，集成了智能合约交互、钱包连接、课程市场等功能。

## 🚀 项目特性

- ⚡ **现代化技术栈**：React 19 + TypeScript + Webpack 5 + SWC
- 🎨 **优雅的UI设计**：Tailwind CSS + Lucide React 图标
- 🔗 **Web3集成**：Ethers.js + 智能合约交互
- 🧪 **完整测试覆盖**：Jest 单元测试 + Cypress E2E测试
- 📱 **响应式设计**：支持移动端、平板端、桌面端
- 🔧 **开发工具**：ESLint + Prettier + Husky + Biome
- 🚀 **CI/CD**：GitHub Actions 自动化测试和部署

## 📋 目录结构

```
kl-ai-app/
├── .github/                    # GitHub Actions 配置
│   ├── workflows/
│   │   └── ci.yml             # CI/CD 流水线
│   └── README.md              # CI 说明文档
├── cypress/                    # E2E 测试
│   ├── e2e/                   # 测试用例
│   ├── support/               # 测试支持文件
│   └── README.md              # 测试文档
├── docs/                      # 文档和报告
│   ├── jest-coverage/         # 测试覆盖率报告
│   └── jest-stare/            # Jest 测试报告
├── public/                    # 静态资源
├── src/                       # 源代码
│   ├── abis/                  # 智能合约 ABI
│   ├── components/            # React 组件
│   │   ├── common/           # 通用组件
│   │   └── test/             # 测试组件
│   ├── hooks/                 # 自定义 Hooks
│   ├── layouts/               # 布局组件
│   ├── pages/                 # 页面组件
│   ├── routes/                # 路由配置
│   ├── types/                 # TypeScript 类型定义
│   │   └── typechain-types/  # 智能合约类型
│   └── utils/                 # 工具函数
├── tests/                     # 测试文件
│   ├── e2e/                   # E2E 测试
│   ├── unit/                  # 单元测试
│   └── ui/                    # UI 测试
├── config/                    # 配置文件
├── dist/                      # 构建输出
└── scripts/                   # 脚本文件
```

## 🛠️ 技术栈

### 前端框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **React Router DOM** - 客户端路由

### 构建工具
- **Webpack 5** - 模块打包器
- **SWC** - 快速的 TypeScript/JavaScript 编译器
- **PostCSS** - CSS 后处理器
- **Tailwind CSS** - 原子化 CSS 框架

### Web3 技术
- **Ethers.js** - 以太坊 JavaScript 库
- **TypeChain** - 智能合约类型生成
- **智能合约** - 课程市场、代币交换等

### 状态管理
- **Jotai** - 原子化状态管理
- **Immer** - 不可变状态更新

### 测试框架
- **Jest** - 单元测试框架
- **Cypress** - E2E 测试框架
- **BackstopJS** - 视觉回归测试

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Biome** - 快速代码检查工具
- **Husky** - Git hooks 管理

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- Yarn >= 1.22.0
- Git

### 安装依赖

```bash
# 克隆项目
git clone <repository-url>
cd kl-ai-app

# 安装依赖
yarn install
```

### 开发模式

```bash
# 启动开发服务器
yarn client:dev

# 或者使用 webpack dev server
yarn client:server
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
# 构建生产版本
yarn client:prod

# 构建文件将输出到 dist/ 目录
```

## 🧪 测试

### 单元测试

```bash
# 运行单元测试
yarn test

# 运行单元测试（CI模式）
yarn test:ci

# 查看测试覆盖率
yarn test --coverage
```

### E2E 测试

```bash
# 交互模式运行 E2E 测试
yarn test:e2e

# 命令行模式运行 E2E 测试
yarn test:e2e:ci
```

### 视觉回归测试

```bash
# 初始化 BackstopJS
yarn test:ui

# 运行视觉回归测试
yarn test:uidiff
```

## 🔧 代码质量

### 代码检查

```bash
# 运行 ESLint 检查
yarn lint

# 自动修复 ESLint 问题
yarn lint:fix

# 运行 Biome 检查
yarn lint:staged
```

### 代码格式化

```bash
# 使用 Prettier 格式化代码
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
```

## 📱 功能特性

### 🏠 首页
- 响应式设计
- 现代化 UI 界面
- 钱包连接功能

### 🔗 DApp 功能
- 智能合约交互
- 钱包状态管理
- 实时数据更新

### 🎓 课程市场
- 课程浏览和购买
- 代币支付系统
- 用户权限管理

### 🔄 代币交换
- 代币兑换功能
- 价格实时更新
- 交易历史记录

## 🌐 智能合约

项目集成了多个智能合约：

- **CourseMarketplace** - 课程市场合约
- **CoursePurchase** - 课程购买合约
- **KLExchange** - 代币交换合约
- **KLchange** - 代币转换合约
- **RedPacket** - 红包功能合约
- **KlToken** - 项目代币合约

## 🚀 部署

### 构建生产版本

```bash
yarn client:prod
```

### 部署到静态托管

```bash
# 将 dist/ 目录部署到你的静态托管服务
# 例如：Netlify, Vercel, GitHub Pages 等
```

## 🔄 CI/CD

项目配置了完整的 CI/CD 流水线：

- **自动测试**：每次推送代码时自动运行单元测试和 E2E 测试
- **代码质量检查**：ESLint 和 Prettier 自动检查
- **分支保护**：只有测试通过才能合并到主分支
- **测试报告**：自动生成测试覆盖率和测试报告

详细配置请参考 [.github/README.md](.github/README.md)

## 📊 测试覆盖率

- **函数覆盖率**：95%
- **行覆盖率**：95%
- **语句覆盖率**：95%
- **分支覆盖率**：50%

测试报告位置：
- Jest 覆盖率报告：`docs/jest-coverage/`
- Jest 测试报告：`docs/jest-stare/`

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 为新功能编写测试
- 保持代码覆盖率在 95% 以上
- 使用语义化的提交信息

## 📝 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目链接：[https://github.com/your-username/kl-ai-app](https://github.com/your-username/kl-ai-app)
- 问题反馈：[Issues](https://github.com/your-username/kl-ai-app/issues)

## 🙏 致谢

感谢以下开源项目的支持：

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ethers.js](https://docs.ethers.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cypress](https://www.cypress.io/)
- [Jest](https://jestjs.io/)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
