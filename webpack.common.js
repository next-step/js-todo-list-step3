const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtarctPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const IS_PRODUCTION = process.env.NODE_ENV === 'PRODUCTION';
console.log('IS_PROD', IS_PRODUCTION);

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    alias: {
      reilly: path.resolve(__dirname, 'src/lib/reilly'),
      reillyDOM: path.resolve(__dirname, 'src/lib/reillyDOM'),
      utils: path.resolve(__dirname, 'src/utils'),
      components: path.resolve(__dirname, 'src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss/,
        use: [
          MiniCSSExtarctPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  mode: 'development',
  plugins: [
    new MiniCSSExtarctPlugin({
      filename: '[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      template: 'public/index.html',
      minify: IS_PRODUCTION
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: IS_PRODUCTION,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
