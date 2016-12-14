const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const resolve = require('../utils/resolve');
const write = require('../utils/write');

const babelrc = require(resolve('config/babelrc.js'));
const postcss = require(resolve('config/postcss.js'));
const stylelintignore = require(resolve('config/stylelintignore.js'));

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx', '.es6', '.css', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      favicon: 'template/favicon.ico',
      inject: 'body',
      xhtml: true,
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss,
        // We need to pass the correct context.
        // https://github.com/webpack/webpack/issues/2684
        context: __dirname,
      },
    }),
    new StyleLintPlugin({
      configFile: resolve('config/stylelintrc.js'),
      ignorePath: write.ignoreToCache('stylelintignore', stylelintignore),
      // allowEmptyInput: true,
      files: '**/*.css',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$|\.es6$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',  // needs to be a loader, not use
        query: {
          configFile: resolve('config/eslintrc.js'),
        },
      },
      {
        test: /\.jsx?$|\.es6$/,
        exclude: /node_modules/,
        use: `babel-loader?${JSON.stringify(babelrc)}`,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        exclude: [
          /\.html?$/,   // needed for HtmlWebpackPlugin to work
          /\.jsx?$/,
          /\.es6$/,
          /\.css$/,
          /\.json$/,
        ],
        use: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/[name]_[hash:8].[ext]',
        },
      },
    ],
  },
};