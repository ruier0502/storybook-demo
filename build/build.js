// 检查node和npm的版本
require('./check-versions')()
process.env.NODE_ENV = 'production'
  // 引入ora模块，可以在控制台显示编译信息
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
  // 可以配置编译信息在控制台的显示样式
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var spinner = ora('building for production...')
  // 开始显示编译信息
spinner.start()
  // 清空静态资源的二级目录下所有内容
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function(err, stats) {
    // 停止编译信息的显示
    spinner.stop()
      // 如果出错，抛出错误
    if (err) throw err
      // 配置编译信息的显示样式
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
});
