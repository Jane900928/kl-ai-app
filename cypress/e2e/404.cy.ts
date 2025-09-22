describe('404 Page', () => {
  it('should display 404 page for non-existent routes', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 检查404页面内容
    cy.contains('404').should('be.visible');
    cy.contains('Page Not Found').should('be.visible');
  });

  it('should maintain header on 404 page', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 检查Header组件仍然显示
    cy.get('header').should('be.visible');
    cy.contains('www.yidengfe.com').should('be.visible');
    cy.contains('连接钱包').should('be.visible');
  });

  it('should allow navigation from 404 page', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 从404页面导航到首页
    cy.get('a[href="/"]').click();
    cy.url().should('not.include', '/non-existent-page');
    cy.contains('HomePage').should('be.visible');
    
    // 从404页面导航到DApp页面
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    cy.get('a[href="/dapp"]').click();
    cy.url().should('include', '/dapp');
    cy.contains('DappTest').should('be.visible');
  });

  it('should handle deep nested non-existent routes', () => {
    // 测试深层嵌套的不存在路由
    cy.visit('/deep/nested/non-existent/route', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
  });

  it('should handle special characters in non-existent routes', () => {
    // 测试包含特殊字符的不存在路由
    cy.visit('/test@#$%^&*()', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
  });

  it('should maintain layout consistency on 404 page', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 检查布局一致性
    cy.get('main').should('be.visible');
    cy.get('main').should('have.class', 'mx-auto');
    cy.get('main').should('have.class', 'px-4');
  });

  it('should be accessible on 404 page', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 基本的可访问性检查
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
    
    // 检查导航链接是否可点击
    cy.get('a[href="/"]').should('be.visible');
    cy.get('a[href="/dapp"]').should('be.visible');
  });
});
