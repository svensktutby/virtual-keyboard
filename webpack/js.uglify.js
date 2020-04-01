const TerserPlugin = require('terser-webpack-plugin');

module.exports = function () {
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
        }),
      ],
    },
  };
};