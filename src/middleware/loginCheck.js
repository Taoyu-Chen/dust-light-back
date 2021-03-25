/**
 * @description Login check middleware
 */

module.exports = async (ctxx, next) => {
  const session = ctx.session
  if (session && session.userInfo) {
    await next()
    return
  }
  ctx.body = {
    errno: -1,
    message: 'Login check failed'
  }
}