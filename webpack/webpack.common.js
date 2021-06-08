const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    kanban: "./src/kanban.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@js": path.resolve(__dirname, "../src/js/"),
      "@components": path.resolve(__dirname, "../src/js/components/"),
      "@constants": path.resolve(__dirname, "../src/js/constants/"),
      "@lib": path.resolve(__dirname, "../src/js/lib/"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "kanban.html",
      template: "./kanban.html",
      chunks: ["kanban"],
    }),
    new MiniCssExtractPlugin({ filename: "[name].[fullhash].css" }),
  ],
};
