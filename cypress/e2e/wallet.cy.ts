describe('Wallet Connection', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display wallet connection button', () => {
    // 检查钱包连接按钮是否显示
    cy.get('button')
      .contains('连接钱包')
      .should('be.visible')
      .should('be.enabled');
  });

  it('should have proper wallet button styling', () => {
    // 检查未连接状态下的按钮样式
    cy.get('button')
      .contains('连接钱包')
      .should('have.class', 'bg-blue-600')
      .should('have.class', 'text-white')
      .should('have.class', 'hover:bg-blue-700');
  });

  it('should toggle wallet connection state', () => {
    // 点击连接钱包按钮
    cy.get('button').contains('连接钱包').click();
    
    // 检查按钮文本和样式变化
    cy.get('button')
      .contains('已连接钱包')
      .should('be.visible')
      .should('have.class', 'bg-green-50')
      .should('have.class', 'text-green-700')
      .should('have.class', 'hover:bg-green-100');
    
    // 再次点击断开连接
    cy.get('button').contains('已连接钱包').click();
    
    // 检查按钮回到初始状态
    cy.get('button')
      .contains('连接钱包')
      .should('be.visible')
      .should('have.class', 'bg-blue-600')
      .should('have.class', 'text-white');
  });

  it('should maintain wallet state during navigation', () => {
    // 连接钱包
    cy.get('button').contains('连接钱包').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
    
    // 导航到DApp页面
    cy.get('a[href="/dapp"]').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
    
    // 导航回首页
    cy.get('a[href="/"]').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
  });

  it('should have wallet icon in button', () => {
    // 检查按钮中的钱包图标
    cy.get('button')
      .contains('连接钱包')
      .within(() => {
        cy.get('svg').should('be.visible');
      });
  });

  it('should handle multiple rapid clicks', () => {
    // 测试快速多次点击
    cy.get('button').contains('连接钱包').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
    
    cy.get('button').contains('已连接钱包').click();
    cy.get('button').contains('连接钱包').should('be.visible');
    
    cy.get('button').contains('连接钱包').click();
    cy.get('button').contains('已连接钱包').should('be.visible');
  });

  it('should be accessible with keyboard navigation', () => {
    // 测试键盘导航
    cy.get('button').contains('连接钱包').focus();
    cy.get('button').contains('连接钱包').should('be.focused');
    
    // 使用Enter键激活按钮
    cy.get('button').contains('连接钱包').type('{enter}');
    cy.get('button').contains('已连接钱包').should('be.visible');
    
    // 使用Space键激活按钮
    cy.get('button').contains('已连接钱包').type(' ');
    cy.get('button').contains('连接钱包').should('be.visible');
  });

  it('should have proper button dimensions and spacing', () => {
    // 检查按钮的尺寸和间距
    cy.get('button')
      .contains('连接钱包')
      .should('have.class', 'px-4')
      .should('have.class', 'py-2')
      .should('have.class', 'rounded-lg');
  });
});
