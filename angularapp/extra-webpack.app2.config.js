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
    library: `${packageName}2`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}2`,
    globalObject: 'window',
  },
};
