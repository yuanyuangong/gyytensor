// vue.config.js
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://yuanyuangong.github.io/gyytensor/dist/' : '';
module.exports = {
    // 选项...
    publicPath: baseUrl,
  
}