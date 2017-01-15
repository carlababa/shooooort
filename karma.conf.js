const path = require('path');

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      './test/config.js',
    ],

    preprocessors: {
      './test/config.js': ['webpack', 'sourcemap'],
    },

    client: {
      mocha: {},
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: path.resolve(__dirname, 'node_modules'),
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
        ],
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
    },

    webpackServer: {
      noInfo: true, // avoid console spam
    },

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-phantomjs-launcher',
    ],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
  });
};
