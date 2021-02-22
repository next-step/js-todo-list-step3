const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const config = {
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'venders',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = merge(common, config);
