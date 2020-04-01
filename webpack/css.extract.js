const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../' },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: [
                      'last 3 version',
                      '> 1%',
                      'ie 9',
                    ],
                    cascade: true,
                  }),
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './css/[name].css',
      }),
    ],
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false, // set to false if you want CSS source maps
            },
          },
        }),
      ],
    },
  };
};
