module.exports = function () {
  return {
    module: {
      rules: [
        {
          // eslint-disable-next-line no-useless-escape
          test: /fonts[\\\/].+\.(otf|eot|svg|ttf|woff|woff2)$/i,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            esModule: false,
          },
        },
      ],
    },
  };
};
