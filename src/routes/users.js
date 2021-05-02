const router = require('koa-router')()
const { register, login, lock, deleteUser, unlock, getAllBPList, getAllFDList } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const AdminLoginCheck = require('../middleware/AdminLoginCheck')
const loginCheck = require('../middleware/loginCheck')

/**
 * @swagger
 * definitions:
 *   User:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       username:
 *         type: string  
 *       password:
 *         type: string  
 *       type:
 *         type: string   
 *       telephone:
 *         type: string   
 *       email:
 *         type: string  
 *       personalSignature:
 *         type: string
 */
router.prefix('/api/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a user response!'
})

/**
 * @swagger
 * /api/users/register: 
 *   post: 
 *     description: user register
 *     tags: [User]
 *     parameters:
 *       - name: username
 *         description: user username
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: password
 *         description: user password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: type
 *         description: user type
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: telephone
 *         description: user telephone number
 *         in: formData
 *         required: true
 *         type: number 
 *       - name: email
 *         description: user email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: personalSignature
 *         description: user personal signature
 *         in: formData
 *         type: string 
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */
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

/**
 * @swagger
 * /api/users/login: 
 *   post: 
 *     description: user login
 *     tags: [User]
 *     parameters:
 *       - name: username
 *         description: user username
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: password
 *         description: user password
 *         in: formData
 *         required: true
 *         type: string
 *       - name: type
 *         description: user type
 *         in: formData
 *         required: true
 *         type: string 
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.post('/login', async function(ctx, next) {
  const { username, password, type } = ctx.request.body

  // login check
  const res = await login(username, password, type)
  console.log(res)
  const { email, telephone, personalSignature, _id } = res;
  if (res) {
    // Verification is successful, set session.userInfo
    ctx.session.userInfo = {
      username,
      type,
      email,
      telephone,
      personalSignature
    }
    // return success message
    ctx.body = new SuccessModel(ctx.session.userInfo)
  } else {
    // return failure message
    ctx.body = new ErrorModel(10002, `login failed`)
  }
})

/**
 * @swagger
 * /api/users/lock/{userId}: 
 *   get: 
 *     description: lock user
 *     tags: [Manage User]
 *     parameters:
 *       - name: userId
 *         description: user id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */
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

/**
 * @swagger
 * /api/users/unlock/{userId}: 
 *   get: 
 *     description: unlock user
 *     tags: [Manage User]
 *     parameters:
 *       - name: userId
 *         description: user id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/unlock/:id', AdminLoginCheck, async function(ctx, next) {
  const id = ctx.params.id 
  // unlock user
  const res = await unlock(id)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    // return failure  message
    ctx.body = new ErrorModel(10004, `Unlock user failed`)
  }
})

/**
 * @swagger
 * /api/users/logout: 
 *   get: 
 *     description: user logout
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/users/user_info: 
 *   get: 
 *     description: get user info
 *     tags: [User]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/user_info', loginCheck, function (ctx, next) {
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    ctx.body = new SuccessModel(userInfo)
  } else {
    ctx.body = new ErrorModel(10019, `Can't get user info`)
  }
})

/**
 * @swagger
 * /api/users/bp: 
 *   get: 
 *     description: get business people list
 *     tags: [Manage User]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/bp', AdminLoginCheck, async function (ctx, next) {
  const bpList = await getAllBPList()
  if (bpList) {
    ctx.body = new SuccessModel(bpList)
  } else {
    ctx.body = new ErrorModel(10020, `Can't get all business people users`)
  }
})

/**
 * @swagger
 * /api/users/fd: 
 *   get: 
 *     description: get freelancer designer list
 *     tags: [Manage User]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/fd', AdminLoginCheck, async function (ctx, next) {
  const fdList = await getAllFDList()
  if (fdList) {
    ctx.body = new SuccessModel(fdList)
  } else {
    ctx.body = new ErrorModel(10021, `Can't get all freelancer designer users`)
  }
})

/**
 * @swagger
 * /api/users/{userId}: 
 *   delete: 
 *     description: delete user
 *     tags: [Manage User]
 *     parameters:
 *       - name: userId
 *         description: user id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/User"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.delete('/:id', AdminLoginCheck, async function(ctx, next) {
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
