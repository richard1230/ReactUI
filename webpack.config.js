const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  //输入, 这是入口文件
  entry: {
    index: './lib/index.tsx'
  },
  //输出:
  output: {
    //__dirname表示当前目录,dist是我们要去的目录
    path: path.resolve(__dirname, 'dist/lib'),
    library: 'FUI',
    //输出格式
    libraryTarget: 'umd',
  },
  module: {
    rules:[
      {
        // \ 为转义符号
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]

}