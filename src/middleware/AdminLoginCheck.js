/**
 * @description Administer login check middleware
 */

module.exports = async (ctx, next) => {
  const session = ctx.session
  if (session && session.userInfo && session.userInfo.type==="Administer") {
    await next()
    return
  }
  ctx.body = {
    errno: -1,
    message: 'Administer login check failed'
  }
}