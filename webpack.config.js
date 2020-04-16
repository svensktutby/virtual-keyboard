const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const scss = require('./webpack/scss');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const spriteSVG = require('./webpack/svg.sprite');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');
const lintJS = require('./webpack/js.lint');
const lintCSS = require('./webpack/scss.lint');
const babel = require('./webpack/babel');
const clean = require('./webpack/clean');

const NODE_ENV = process.env.NODE_ENV || 'development';

const PATH = {
  src: path.resolve(__dirname, './src/'),
  build: path.resolve(__dirname, './build/'),
};

const webpackConfig = merge(
  {
    mode: NODE_ENV,
    devtool: NODE_ENV === 'development' ? 'eval-sourcemap' : false,
    context: PATH.src,
    entry: {}, // will add below through forEach
    output: {
      path: PATH.build,
      filename: './js/[name].js',
    },
    plugins: [
      new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  babel(),
  pug(),
  images(),
  // spriteSVG()
  // fonts(),
  lintJS(),
  lintCSS(),
);

['index'].forEach((file) => {
  webpackConfig.entry[file] = `./pages/${file}/${file}.js`;

  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${file}.html`,
      template: `./pages/${file}/${file}.pug`,
      chunks: [file.replace(/-(\w)/g, (match, c) => c.toUpperCase()), 'common'],
    }),
  );
});

module.exports = () => {
  if (NODE_ENV === 'production') {
    return merge([webpackConfig, clean(), extractCSS(), uglifyJS(), favicon()]);
  }

  return merge([webpackConfig, devserver(), scss(), css()]);
};
