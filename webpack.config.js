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
      '@todoList': path.resolve(__dirname, 'src/components/TodoList/'),
      '@userList': path.resolve(__dirname, 'src/components/UserList/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@api': path.resolve(__dirname, 'src/api/'),
    },
    extensions: ['.js'],
  },
};
