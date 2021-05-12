const packageName = require('./package.json').name;

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: false,
    hot: false,
    watchContentBase: false,
    liveReload: false,
    injectClient: false,
  },
  output: {
    library: `${packageName}1`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}1`,
    globalObject: 'window',
  },
};
