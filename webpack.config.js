var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: {
      mod: './src/js/modules/mod1',
      common: ['jquery', 'dialog']
  },
  output: {
    path: path.join(__dirname, './assets/js'),
    publicPath: 'http://localhost:3000/js',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.js?$/, loader: 'babel-loader', exclude: [node_modules_dir] }

    ]
  },
  resolve:{//查找module的话从这里开始查找
      //绝对路径
        root: './src/',
      //
      //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
      extensions: ['', '.js', '.json', '.scss'],

      //模块别名定义，方便后续直接引用别名，无须多写长长的地址
      alias: {
                jquery: path.resolve('./src/js/lib/jquery.js'),
                dialog: path.resolve('./src/js/lib/jquery.dialog.js')
            }

  },
  plugins:[
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        "window.jQuery": "jquery"
    })
  ]


};
