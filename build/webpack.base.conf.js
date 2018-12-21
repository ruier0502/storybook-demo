var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
// 获取根目录
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  // 定义入口文件
  entry: {
    app: './src/main.js'
  },
  output: {
    // 输出路径
    path: config.build.assetsRoot,
    // 输出文件名称（name为entry中定义的key值）
    filename: '[name].js',
    // 静态资源路径（判断目前所处的环境）
    // 在开发环境下，路径为根目录
    // 在生产环境下，路径为根目录下的static文件夹
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动解析拓展，可以在引用文件的时候不用写后缀
    extensions: ['.js', '.vue', '.json'],
    // 配置别名，避免在结构嵌套过深的情况下出现../../../../xxx这种写法
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    // 配置不同模块处理规则
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    }, {
      // 对于图片资源，当文件体积小于10kb时，将其生成为base64，直接插入html中
      // 当大于10kb时，将图片名称进行按照命名规则进行更改
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    }, {
      // 字体资源打包规则，与图片资源相同
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  }
};
