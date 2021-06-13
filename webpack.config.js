const path = require('path');

module.exports = {
  entry: {
    team: './src/team.js',
    kanban: './src/kanban.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@template': path.resolve(__dirname, 'src/template/'),
    },
    extensions: ['.js'],
  },
};
