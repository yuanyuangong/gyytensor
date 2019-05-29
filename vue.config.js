// vue.config.js
const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '';
module.exports = {
    // 选项...
    publicPath: baseUrl,
    // assetsDir:'./'
}