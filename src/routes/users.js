const router = require('koa-router')()
const { register, login, lock, deleteUser, unlock, getAllBPList, getAllFDList } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const AdminLoginCheck = require('../middleware/AdminLoginCheck')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

router.post('/register', async function(ctx, next) {
  const userInfo = ctx.request.body
  try {
    const newUser = await register(userInfo)
    // return success message
    ctx.body = new SuccessModel(newUser)
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
  console.log(res)
  const { email, telephone, personalSignature, _id } = res;
  const userId = _id;
  if (res) {
    // Verification is successful, set session.userInfo
    ctx.session.userInfo = {
      username,
      type,
      email,
      telephone,
      personalSignature,
      userId
    }
    // return success message
    ctx.body = new SuccessModel(ctx.session.userInfo)
  } else {
    // return failure message
    ctx.body = new ErrorModel(10002, `login failed`)
  }
})

router.get('/lock/:id', AdminLoginCheck, async function(ctx, next) {
  const id = ctx.params.id 
  // ban user
  const res = await lock(id)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10003, `Lock user failed`)
  }
})

router.get('/unlock/:id', AdminLoginCheck, async function(ctx, next) {
  const id = ctx.params.id 
  // unlock user
  const res = await unlock(id)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10003, `Lock user failed`)
  }
})

router.get('/logout', loginCheck, async function (ctx, next) {
  ctx.session.userInfo = undefined
  if (!ctx.session.userInfo) {
    ctx.body = new SuccessModel(ctx.session.userInfo)
  }
  else {
    // return failure message
    ctx.body = new ErrorModel(10002, `logout failed`)
  }
})

router.post('/unlock', AdminLoginCheck, async function(ctx, next) {
  const { username } = ctx.request.body
  // ban user
  const res = await unlock(username)
  if (res) {
    // return successful  message
    ctx.body = new SuccessModel(res)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10004, `Unlock user failed`)
  }
})

router.get('/user_info', loginCheck, function (ctx, next) {
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    ctx.body = new SuccessModel(userInfo)
  } else {
    ctx.body = new ErrorModel(10019, `Can't get user info`)
  }
})

router.get('/bp', AdminLoginCheck, async function (ctx, next) {
  const bpList = await getAllBPList()
  if (bpList) {
    ctx.body = new SuccessModel(bpList)
  } else {
    ctx.body = new ErrorModel(10020, `Can't get all business people users`)
  }
})

router.get('/fd', AdminLoginCheck, async function (ctx, next) {
  const fdList = await getAllFDList()
  if (fdList) {
    ctx.body = new SuccessModel(fdList)
  } else {
    ctx.body = new ErrorModel(10021, `Can't get all freelancer designer users`)
  }
})

// delete user by id
router.get('/delete/:id', AdminLoginCheck, async function(ctx, next) {
  const id = ctx.params.id 
  // ban user
  const res = await deleteUser(id)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10022, `Delete user failed`)
  }
})

module.exports = router
