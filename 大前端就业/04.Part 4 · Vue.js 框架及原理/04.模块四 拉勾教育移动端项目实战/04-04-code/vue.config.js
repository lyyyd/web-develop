module.exports = {
  // 生产环境不生成 .map
  productionSourceMap: false,
  // 不单独打包 css
  css: {
    extract: false
  },
  configureWebpack: {
    // 通过 CDN 引入
    externals: {
      vue: 'Vue',
      vant: 'vant'
    }
  },
  chainWebpack: config => {
    // 图片压缩 loader 配置
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end()
  }
}
