const package = require('./package.json').name;

module.exports = {
  // 按需加载
  babel: {
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, // 设置为 true 即是 less
        },
      ],
    ],
  },
  webpack: {
    configure: webpackConfig => {
      // qiankun 配置
      // 微应用的包名，这里与主应用中注册的微应用名称一致
      webpackConfig.output.library = package;
      // 将你的 library 暴露为所有的模块定义下都可运行的方式
      webpackConfig.output.libraryTarget = 'umd';
      // 按需加载相关，设置为 webpackJsonp_** 即可
      webpackConfig.output.jsonpFunction = `webpackJsonp_${package}`;
      webpackConfig.output.globalObject = 'window';
      return webpackConfig;
    },
  },
  devServer: {
    // qiankun 配置
    // 配置跨域请求头，解决开发环境的跨域问题
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // 配置 history 模式
    historyApiFallback: true,
    hot: false,
    liveReload: false,
    watchContentBase: false,
    port: 3010,
  },
};
