module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 2,
      viewportUnit: 'vw',
      selectorBlackList: ['tab-bar', 'tab-bar-item'],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
}