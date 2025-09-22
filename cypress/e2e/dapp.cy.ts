describe('DApp Page', () => {
  beforeEach(() => {
    cy.visit('/dapp');
  });

  it('should display the DApp page correctly', () => {
    // 检查页面标题
    cy.title().should('not.be.empty');
    
    // 检查Header组件是否渲染
    cy.get('header').should('be.visible');
    
    // 检查Logo是否显示
    cy.contains('www.yidengfe.com').should('be.visible');
    
    // 检查导航菜单是否显示
    cy.get('nav').should('be.visible');
    cy.contains('首页').should('be.visible');
    cy.contains('DApp').should('be.visible');
    
    // 检查钱包连接按钮
    cy.contains('连接钱包').should('be.visible');
  });

  it('should display DApp page content', () => {
    // 检查DApp页面内容
    cy.contains('DappTest--1112').should('be.visible');
  });

  it('should have proper navigation highlighting for DApp page', () => {
    // 检查DApp导航项是否高亮
    cy.get('a[href="/dapp"]')
      .should('have.class', 'text-blue-600')
      .should('have.class', 'font-medium');
  });

  it('should maintain layout consistency', () => {
    // 检查布局一致性
    cy.get('main').should('be.visible');
    cy.get('main').should('have.class', 'mx-auto');
    cy.get('main').should('have.class', 'px-4');
  });

  it('should be accessible', () => {
    // 基本的可访问性检查
    cy.get('header').should('be.visible');
    cy.get('main').should('be.visible');
    
    // 检查链接是否可点击
    cy.get('a[href="/"]').should('be.visible');
    cy.get('a[href="/dapp"]').should('be.visible');
    
    // 检查按钮是否可点击
    cy.get('button').should('be.visible');
  });
});
