describe('Application Integration Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  it('should complete full user journey', () => {
    // 1. 检查首页加载
    cy.checkPageTitle('kl-ai-app');
    cy.contains('HomePage').should('be.visible');
    cy.checkActiveNavigation('/');
    cy.checkWalletState(false);

    // 2. 连接钱包
    cy.connectWallet();
    cy.checkWalletState(true);

    // 3. 导航到DApp页面
    cy.navigateTo('/dapp');
    cy.contains('DappTest').should('be.visible');
    cy.checkActiveNavigation('/dapp');
    cy.checkWalletState(true);

    // 4. 断开钱包连接
    cy.disconnectWallet();
    cy.checkWalletState(false);

    // 5. 导航回首页
    cy.navigateTo('/');
    cy.contains('HomePage').should('be.visible');
    cy.checkActiveNavigation('/');
    cy.checkWalletState(false);
  });

  it('should maintain state across page refreshes', () => {
    // 连接钱包
    cy.connectWallet();
    cy.checkWalletState(true);

    // 刷新页面
    cy.reload();
    cy.waitForPageLoad();

    // 钱包状态应该重置（因为这是前端状态）
    cy.checkWalletState(false);
  });

  it('should handle browser navigation correctly', () => {
    // 导航到DApp页面
    cy.navigateTo('/dapp');
    cy.contains('DappTest').should('be.visible');

    // 使用浏览器后退
    cy.go('back');
    cy.contains('HomePage').should('be.visible');
    cy.checkActiveNavigation('/');

    // 使用浏览器前进
    cy.go('forward');
    cy.contains('DappTest').should('be.visible');
    cy.checkActiveNavigation('/dapp');
  });

  it('should be responsive across all devices', () => {
    // 测试桌面端
    cy.checkResponsiveLayout('desktop');
    cy.contains('www.yidengfe.com').should('be.visible');

    // 测试平板端
    cy.checkResponsiveLayout('tablet');
    cy.contains('www.yidengfe.com').should('be.visible');

    // 测试移动端
    cy.checkResponsiveLayout('mobile');
    cy.contains('www.yidengfe.com').should('be.visible');
  });

  it('should handle wallet interaction during navigation', () => {
    // 在首页连接钱包
    cy.connectWallet();
    cy.checkWalletState(true);

    // 导航到DApp页面，钱包状态应该保持
    cy.navigateTo('/dapp');
    cy.checkWalletState(true);

    // 在DApp页面断开钱包
    cy.disconnectWallet();
    cy.checkWalletState(false);

    // 导航回首页，钱包状态应该保持
    cy.navigateTo('/');
    cy.checkWalletState(false);
  });

  it('should handle rapid navigation and wallet interactions', () => {
    // 快速导航和钱包交互
    cy.connectWallet();
    cy.navigateTo('/dapp');
    cy.disconnectWallet();
    cy.navigateTo('/');
    cy.connectWallet();
    cy.navigateTo('/dapp');
    cy.disconnectWallet();
    cy.navigateTo('/');

    // 最终状态检查
    cy.contains('HomePage').should('be.visible');
    cy.checkActiveNavigation('/');
    cy.checkWalletState(false);
  });

  it('should maintain accessibility throughout the journey', () => {
    // 检查键盘导航
    cy.get('a[href="/dapp"]').focus();
    cy.get('a[href="/dapp"]').should('be.focused');
    cy.get('a[href="/dapp"]').type('{enter}');
    cy.url().should('include', '/dapp');

    // 检查钱包按钮的键盘导航
    cy.get('button').contains('连接钱包').focus();
    cy.get('button').contains('连接钱包').should('be.focused');
    cy.get('button').contains('连接钱包').type('{enter}');
    cy.checkWalletState(true);

    // 使用Tab键导航
    cy.get('button').contains('已连接钱包').tab();
    cy.get('a[href="/"]').should('be.focused');
  });
});
