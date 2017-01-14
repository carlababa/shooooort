var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  devtool: 'source-map',
  debug: true,
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module : {
    loaders : [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css-loader',
        ],
      },
      {
        test : /.jsx?$/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
