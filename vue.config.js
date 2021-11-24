module.exports = {
  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        // ws: true,
        changeOrigin: true,
      },
      '/apollo': {
        target: 'https://m.maoyan.com',
        // ws: true,
        changeOrigin: true,
      },
    },
  },
}
