describe('Performance Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load home page within acceptable time', () => {
    // 检查页面加载时间
    cy.window().then((win) => {
      const startTime = win.performance.timing.navigationStart;
      const loadTime = win.performance.timing.loadEventEnd - startTime;
      
      // 页面应该在3秒内加载完成
      expect(loadTime).to.be.lessThan(3000);
    });

    // 检查关键元素是否快速渲染
    cy.get('header').should('be.visible');
    cy.contains('www.yidengfe.com').should('be.visible');
  });

  it('should have fast navigation between pages', () => {
    const startTime = Date.now();
    
    // 导航到DApp页面
    cy.get('a[href="/dapp"]').click();
    cy.url().should('include', '/dapp');
    
    const navigationTime = Date.now() - startTime;
    
    // 导航应该在1秒内完成
    expect(navigationTime).to.be.lessThan(1000);
    
    // 检查页面内容是否快速渲染
    cy.contains('DappTest').should('be.visible');
  });

  it('should handle wallet interactions responsively', () => {
    const startTime = Date.now();
    
    // 连接钱包
    cy.get('button').contains('连接钱包').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
    
    const walletConnectTime = Date.now() - startTime;
    
    // 钱包连接应该在500ms内完成
    expect(walletConnectTime).to.be.lessThan(500);
  });

  it('should maintain performance during rapid interactions', () => {
    // 快速连续操作
    cy.get('button').contains('连接钱包').click();
    cy.get('a[href="/dapp"]').click();
    cy.get('button').contains('已连接钱包').click();
    cy.get('a[href="/"]').click();
    cy.get('button').contains('连接钱包').click();
    
    // 所有操作完成后，页面应该仍然响应
    cy.contains('HomePage').should('be.visible');
    cy.get('button').contains('已连接钱包').should('be.visible');
  });

  it('should have efficient memory usage', () => {
    // 检查内存使用情况（如果支持）
    cy.window().then((win) => {
      if ((win.performance as any).memory) {
        const memory = (win.performance as any).memory;
        const usedMemory = memory.usedJSHeapSize;
        const totalMemory = memory.totalJSHeapSize;
        
        // 内存使用率应该合理
        const memoryUsage = (usedMemory / totalMemory) * 100;
        expect(memoryUsage).to.be.lessThan(80);
      }
    });
  });

  it('should load resources efficiently', () => {
    // 检查资源加载情况
    cy.window().then((win) => {
      const resources = win.performance.getEntriesByType('resource');
      
      // 检查是否有失败的资源加载
      const failedResources = resources.filter((resource: any) => 
        resource.transferSize === 0 && resource.decodedBodySize === 0
      );
      
      expect(failedResources).to.have.length(0);
    });
  });

  it('should handle large viewport efficiently', () => {
    // 测试大屏幕下的性能
    cy.viewport(1920, 1080);
    
    const startTime = Date.now();
    cy.visit('/');
    cy.get('header').should('be.visible');
    const loadTime = Date.now() - startTime;
    
    // 大屏幕下也应该快速加载
    expect(loadTime).to.be.lessThan(2000);
  });

  it('should maintain performance across multiple page loads', () => {
    const loadTimes: number[] = [];
    
    // 多次加载页面并记录时间
    for (let i = 0; i < 3; i++) {
      const startTime = Date.now();
      cy.visit('/');
      cy.get('header').should('be.visible');
      const loadTime = Date.now() - startTime;
      loadTimes.push(loadTime);
    }
    
    // 所有加载时间都应该在合理范围内
    loadTimes.forEach((time) => {
      expect(time).to.be.lessThan(2000);
    });
  });
});
