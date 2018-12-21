var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 获取当前环境
var env = config.build.env
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // 将.vue外部的css或css预处理器文件进行处理
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // 是否开启调试
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 定义在非入口文件引用的文件的名称
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // 定义一个在编译时间内可以使用的全局变量，用来关闭vue的所有警告功能
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 最小化所有JavaScript输出块，消除无作用的代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    // ExtractTextPlugin会将所有的「入口 chunk(entry chunks)」中的 require("style.css") 移动到独立分离的css文件。因此，样式不再内联到javascript里面，但会放到一个单独的css包文件 (styles.css)当中。 如果样式文件较大，这会更快，因为样式文件会跟javascript包并行加载
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // 压缩提取出来的CSS，并且进行css的复用以解决extract-text-webpack-plugin将css处理后会出现的css重复的情况
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 构建要编译输出的index.html,并在文件中嵌入资源文件
    new HtmlWebpackPlugin({
      // 输出的HTML文件名
      filename: config.build.index,
      // 模板文件路径
      template: 'index.html',
      // 设置为true或body可以将js代码放到<body>元素最后
      // 设置为head将js代码加到<head>里面
      // 设置为false所有静态资源css和JavaScript都不会注入到模板文件中
      inject: true,
      minify: {
        // 删除注释
        removeComments: true,
        // 合并空白
        collapseWhitespace: true,
        // 删除属性的引号
        removeAttributeQuotes: true
      },
      // 通过CommonsChunkPlugin控制chunks在html文件中添加的顺序  
      // 设置为dependency即按照它们之间的依赖关系添加
      chunksSortMode: 'dependency'
    }),
    // webpack将公共模块打包的vendor.js里面使用CommonsChunkPlugin将vendor.js分离到单独的文件
    new webpack.optimize.CommonsChunkPlugin({
      // 公共模块名字
      name: 'vendor',
      minChunks: function(module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 使用CommonsChunkPlugin可以保证如果我们的第三方插件没有变动，在打包的时候可以不被重新的打包
    // 待到上线后就不会重新的加载以达到缓存的目的
    // 我们会获得webpack执行时间和输出一份json文件保存chunk的id和最终引用它们的文件印射关系
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 复制static文件夹内的静态资源到打包好的文件中
    // 具体的路径是之前我们设置的"config.build.assetsSubDirectory"
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
  ]
})
// 如果开启了Gzip压缩，使用以下配置
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
// 如果开启了编译报告，使用以下配置
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig