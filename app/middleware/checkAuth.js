// 检查每个请求是否合法

module.exports = options => {
  return async function checkAuth(ctx, next) {
    console.log(ctx.session.openId)

    if (ctx.session.openId) {
      await next()
    } else {
      ctx.body = { message: '未登陆', success: false }
    }
  }
}