/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page correctly', () => {
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

  it('should display home page content', () => {
    // 检查首页内容
    cy.contains('HomePage').should('be.visible');
  });

  it('should have proper navigation highlighting', () => {
    // 检查首页导航项是否高亮
    cy.get('nav a[href="/"]')
      .first()
      .should('have.class', 'text-blue-600')
      .should('have.class', 'font-medium');
  });

});
