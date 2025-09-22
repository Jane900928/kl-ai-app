/// <reference types="cypress" />
describe('404 Page', () => {
  it('should display 404 page for non-existent routes', () => {
    // 访问不存在的路由
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    
    // 检查404页面内容
    cy.contains('404').should('be.visible');
  });


  it('should handle deep nested non-existent routes', () => {
    // 测试深层嵌套的不存在路由
    cy.visit('/deep/nested/non-existent/route', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
  });


});
