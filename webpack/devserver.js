module.exports = function () {
  return {
    devServer: {
      port: 9000,
      stats: 'errors-only',
      overlay: true,
    },
  };
};