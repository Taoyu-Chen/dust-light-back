/**
 * @description Freelancer designer login check middleware
 */

module.exports = async (ctx, next) => {
  const session = ctx.session
  if (session && session.userInfo && session.userInfo.type==="Freelancer Designer") {
    await next()
    return
  }
  ctx.body = {
    errno: -1,
    message: 'Freelancer designer login check failed'
  }
}