const path = require('path');

module.exports = {
  entry: path.join(__dirname, './client/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jp(e*)g|svg|git)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[hash]-[name].[ext]',
          },
        },
      },
    ],
  },
};
