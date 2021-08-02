const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'src/lib/React'),
      reactDOM: path.resolve(__dirname, 'src/lib/ReactDOM'),
      redux: path.resolve(__dirname, 'src/lib/Redux'),
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'index.html' })],
  devtool: 'source-map',
  mode: 'development',
};
