const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

PATH_APP = path.join(__dirname, 'app')
PATH_BUILD = path.join(__dirname, 'build')

module.exports = {
  entry: [
    path.join(PATH_APP, 'index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(PATH_BUILD, 'static'),
    publicPath: '/static/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index_template.ejs'
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: PATH_APP,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
