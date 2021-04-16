const router = require('koa-router')()
const { register, login, lock, unlock } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

router.post('/register', async function(ctx, next) {
  const userInfo = ctx.request.body
  try {
    await register(userInfo)
    // return success message
    ctx.body = new SuccessModel()
  } catch (ex) {
    console.error(ex)
    // Return failed message
    ctx.body = new ErrorModel(10001, `register - ${ex.message}`)
  }
})

router.post('/login', async function(ctx, next) {
  const { username, password, type } = ctx.request.body

  // login check
  const res = await login(username, password, type)
  if (res) {
    // Verification is successful, set session.userInfo
    ctx.session.userInfo = {
      username,
      type,
    }

    // return success message
    ctx.body = new SuccessModel(ctx.session.userInfo)
  } else {
    // return failure message
    ctx.body = new ErrorModel(10002, `login failed`)
  }
})

router.post('/lock', async function(ctx, next) {
  const { username } = ctx.request.body
  // ban user
  const res = await lock(username)
  if (res) {
    // Verification is successful, set session.userInfo
    ctx.session.userInfo = {
      username
    }

    // return success message
    ctx.body = new SuccessModel(ctx.session.userInfo)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10003, `Lock user failed`)
  }
})

router.post('/unlock', async function(ctx, next) {
  const { username } = ctx.request.body
  // ban user
  const res = await unlock(username)
  if (res) {
    // Verification is successful, set session.userInfo
    ctx.session.userInfo = {
      username
    }

    // return successful  message
    ctx.body = new SuccessModel(ctx.session.userInfo)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10004, `Unlock user failed`)
  }
})

module.exports = router
