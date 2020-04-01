const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: './img/_sprite.svg',
                symbolId: 'sprite-[name]',
                runtimeCompat: true,
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                svgo: {
                  plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: true },
                    { removeAttrs: { attrs: ['version'] } },
                    { removeUselessStrokeAndFill: false },
                    { convertPathData: false },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new SpriteLoaderPlugin({
        plainSprite: true,
      }),
    ],
  };
};
