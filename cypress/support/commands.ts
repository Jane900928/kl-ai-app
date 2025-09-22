/// <reference types="cypress" />

// ***********************************************
// Custom commands for the kl-ai-app project
// ***********************************************

// 等待页面加载完成的命令
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.get('header').should('be.visible');
});

// 连接钱包的命令
Cypress.Commands.add('connectWallet', () => {
  cy.get('button').contains('连接钱包').click();
  cy.get('button').contains('已连接钱包').should('be.visible');
});

// 断开钱包连接的命令
Cypress.Commands.add('disconnectWallet', () => {
  cy.get('button').contains('已连接钱包').click();
  cy.get('button').contains('连接钱包').should('be.visible');
});

// 导航到指定页面的命令
Cypress.Commands.add('navigateTo', (path: string) => {
  cy.get(`a[href="${path}"]`).click();
  cy.url().should('include', path);
});

// 检查页面标题的命令
Cypress.Commands.add('checkPageTitle', (expectedTitle: string) => {
  cy.title().should('contain', expectedTitle);
});

// 检查响应式布局的命令
Cypress.Commands.add('checkResponsiveLayout', (device: 'mobile' | 'tablet' | 'desktop') => {
  const viewports = {
    mobile: 'iphone-x',
    tablet: 'ipad-2',
    desktop: 'macbook-15'
  };
  
  cy.viewport(viewports[device]);
  cy.get('header').should('be.visible');
  cy.get('main').should('be.visible');
});

// 检查导航高亮的命令
Cypress.Commands.add('checkActiveNavigation', (path: string) => {
  cy.get(`a[href="${path}"]`)
    .should('have.class', 'text-blue-600')
    .should('have.class', 'font-medium');
});

// 检查钱包状态的命令
Cypress.Commands.add('checkWalletState', (connected: boolean) => {
  if (connected) {
    cy.get('button').contains('已连接钱包').should('be.visible');
  } else {
    cy.get('button').contains('连接钱包').should('be.visible');
  }
});

// 声明全局类型
declare global {
  namespace Cypress {
    interface Chainable {
      waitForPageLoad(): Chainable<void>;
      connectWallet(): Chainable<void>;
      disconnectWallet(): Chainable<void>;
      navigateTo(path: string): Chainable<void>;
      checkPageTitle(expectedTitle: string): Chainable<void>;
      checkResponsiveLayout(device: 'mobile' | 'tablet' | 'desktop'): Chainable<void>;
      checkActiveNavigation(path: string): Chainable<void>;
      checkWalletState(connected: boolean): Chainable<void>;
    }
  }
}