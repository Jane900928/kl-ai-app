// 带界面不带界面的
const Rize = require('rize');
const rize = new Rize();
console.log(rize)
rize
  .goto('https://github.com/')
  .type('input.header-search-input', 'node')
  .press('Enter')
  .waitForNavigation()
  .assertSee('Node.js')
  .end();