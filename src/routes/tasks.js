const router = require('koa-router')()
const {
    getTaskById,
    getAllTaskList,
    getAllBidderableTaskList,
    createTask,
    updateTask,
    getTaskByBPUsername,
    getTaskByFDUsername,
    cancelTask,
    bidTask,
    returnTask,
    acceptTask,
    submitTask,
    selectTaskFD
} = require('../controller/tasks')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/tasks')

//get all tasks
router.get('/', async (ctx, next) => {
  const taskList = await getAllTaskList()
  ctx.body = new SuccessModel(taskList)
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

//get bidderable tasks
router.get('/bid/list', async (ctx, next) => {
  const taskList = await getAllBidderableTaskList()
  ctx.body = new SuccessModel(taskList)
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

//get tasks by business people username
router.get('/bp/lists', loginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  if (userInfo.type == "Business People") {
    const taskList = await getTaskByBPUsername(username)
    console.log(taskList)
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10012, `Can't get business people tasks`)
  }
})

//bid tasks by freelancer designer username
router.get('/fd/task', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  if (userInfo.type == "Freelancer Designer") {
    const taskList = await getTaskByFDUsername(username)
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10013, `Can't get freelancer designer task`)
  }
})

//select freelancer designer
router.post('/bp/selectFD', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { username, name } = ctx.request.body
  if (userInfo.type == "Business People") {
    const task = await selectTaskFD(username, name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10014, `Can't select freelancer designer to do the task`)
  }
})

//cancel task
router.get('/bp/cancel', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { name } = ctx.request.body
  if (userInfo.type == "Business People") {
    const task = await cancelTask(name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10015, `Can't cancel task`)
  }
})

//submit task
router.post('/fd/submit', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { name } = ctx.request.body
  if (userInfo.type == "Business People") {
    const task = await submitTask(name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't submit task`)
  }
})

//accept task
router.get('/bp/accept', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { name } = ctx.request.body
  if (userInfo.type == "Business People") {
    const task = await acceptTask(name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10017, `Can't accept task`)
  }
})

//return task
router.get('/bp/return', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { name } = ctx.request.body
  if (userInfo.type == "Business People") {
    const task = await returnTask(name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't return task`)
  }
})

//bid tasks
router.post('/fd/bid', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { name, username } = ctx.request.body
  if (userInfo.type == "Freelancer Designer") {
    const task = await bidTask(username, name)
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't bid task`)
  }
})

//create task
router.post('/create', async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const data = ctx.request.body
  if (userInfo.type == "Business People") {
    try {
      const newTask = await createTask(userInfo.username, data)
      // return success message
      ctx.body = new SuccessModel(newTask)
    } catch (ex) {
      console.error(ex)
      // Return failed message
      ctx.body = new ErrorModel(10017, `create task - ${ex.message}`)
    }
  }
})

module.exports = router
