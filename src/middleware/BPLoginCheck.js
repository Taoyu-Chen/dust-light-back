/**
 * @description Business people login check middleware
 */

module.exports = async (ctx, next) => {
  const session = ctx.session
  if (session && session.userInfo && session.userInfo.type==="Business People") {
    await next()
    return
  }
  ctx.body = {
    errno: -1,
    message: 'Business people login check failed'
  }
}