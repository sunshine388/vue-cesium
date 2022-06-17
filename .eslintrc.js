/**
 * eslint + prettier 校验代码
 * 1. [eslint rules](http://eslint.cn/docs/rules/)
 * 2. [prettier rules](https://prettier.io/docs/en/options.html)
 * @description
 * *** 注意：这里的配置修改时，需要将该配置拷贝至 ./.vscode/settings.json/eslint.options 下 ***
 */
module.exports = {
  root: true,

  env: {
    node: true
  },
  globals: {
    Cesium: true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier'],

  rules: {
    'prettier/prettier': [
      'warn',
      // 这里自定义 prettier 的规则
      require('./prettier.config.js')
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 'off',
    eqeqeq: ['error', 'always']
  },

  parserOptions: {
    parser: '@babel/eslint-parser'
  }
};
