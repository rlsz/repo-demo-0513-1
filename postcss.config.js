module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16,
      propWhiteList: [],
      minPixelValue: 1,
      selectorBlackList: [/^html$/]
    }
  }
}
