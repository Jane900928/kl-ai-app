/// <reference types="cypress" />

describe('Navigation and Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate between pages correctly', () => {
    // 从首页导航到DApp页面
    cy.get('nav a[href="/dapp"]').first().click();
    cy.url().should('include', '/dapp');
    cy.contains('DappTest').should('be.visible');
    
    // 从DApp页面导航回首页
    cy.get('nav a[href="/"]').first().click();
    cy.url().should('not.include', '/dapp');
    cy.contains('HomePage').should('be.visible');
  });

  it('should highlight active navigation item', () => {
    // 检查首页导航高亮
    cy.get('nav a[href="/"]')
      .first()
      .should('have.class', 'text-blue-600')
      .should('have.class', 'font-medium');
    
    cy.get('nav a[href="/dapp"]')
      .first()
      .should('not.have.class', 'text-blue-600');
    
    // 导航到DApp页面并检查高亮
    cy.get('nav a[href="/dapp"]').first().click();
    cy.get('nav a[href="/dapp"]')
      .first()
      .should('have.class', 'text-blue-600')
      .should('have.class', 'font-medium');
    
    cy.get('nav a[href="/"]')
      .first()
      .should('not.have.class', 'text-blue-600');
  });

  it('should handle direct URL navigation', () => {
    // 直接访问DApp页面
    cy.visit('/dapp');
    cy.url().should('include', '/dapp');
    cy.contains('DappTest').should('be.visible');
    
    // 直接访问首页
    cy.visit('/');
    cy.url().should('not.include', '/dapp');
    cy.contains('HomePage').should('be.visible');
  });

  it('should maintain header state during navigation', () => {
    // 检查Header在导航过程中保持一致
    cy.get('header').should('be.visible');
    cy.contains('www.yidengfe.com').should('be.visible');
    cy.contains('连接钱包').should('be.visible');
    
    // 导航到DApp页面
    cy.get('nav a[href="/dapp"]').first().click();
    cy.get('header').should('be.visible');
    cy.contains('www.yidengfe.com').should('be.visible');
    cy.contains('连接钱包').should('be.visible');
    
    // 导航回首页
    cy.get('nav a[href="/"]').first().click();
    cy.get('header').should('be.visible');
    cy.contains('www.yidengfe.com').should('be.visible');
    cy.contains('连接钱包').should('be.visible');
  });

  it('should handle browser back and forward navigation', () => {
    // 导航到DApp页面
    cy.get('nav a[href="/dapp"]').first().click();
    cy.url().should('include', '/dapp');
    
    // 使用浏览器后退
    cy.go('back');
    cy.url().should('not.include', '/dapp');
    cy.contains('HomePage').should('be.visible');
    
    // 使用浏览器前进
    cy.go('forward');
    cy.url().should('include', '/dapp');
    cy.contains('DappTest').should('be.visible');
  });
  
});
