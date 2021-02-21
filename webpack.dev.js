const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
  mode: 'development',
  devServer: {
    open: true,
    overlay: true,
    hot: true,
    compress: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
  },
};

module.exports = merge(common, config);
