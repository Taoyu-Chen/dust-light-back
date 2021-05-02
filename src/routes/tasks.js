const router = require('koa-router')()
const {
    getTaskById,
    getAllTaskList,
    getAllBidderableTaskList,
    createTask,
    getTaskByBPUsername,
    getTaskByFDUsername,
    cancelTask,
    bidTask,
    returnTask,
    acceptTask,
    submitTask,
    selectTaskFD,
    deleteTaskFD
} = require('../controller/tasks')
const loginCheck = require('../middleware/loginCheck')
const BPLoginCheck = require('../middleware/BPLoginCheck')
const FDLoginCheck = require('../middleware/FDLoginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/tasks')

//get all tasks
router.get('/', loginCheck, async (ctx, next) => {
  const taskList = await getAllTaskList()
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

//get task by id
router.get('/:id', loginCheck, async (ctx, next) => {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const task = await getTaskById(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get a task by id`)
  }
})

//get bidderable tasks
router.get('/bid/list', FDLoginCheck, async (ctx, next) => {
  const taskList = await getAllBidderableTaskList()
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

//get tasks by business people username
router.get('/bp/lists', BPLoginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const taskList = await getTaskByBPUsername(username)
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10012, `Can't get business people tasks`)
  }
})

// get task by freelancer designer username
router.get('/fd/task', FDLoginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const task = await getTaskByFDUsername(username)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10013, `Can't get freelancer designer task`)
  }
})

// select freelancer designer bidder
router.post('/bp/selectFD/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id 
  const { fdUsername } = ctx.request.body
  const task = await selectTaskFD(fdUsername, id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10014, `Can't select freelancer designer to do the task`)
  }
})

// delete freelancer designer bidder
router.post('/bp/deleteFD/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id 
  const { fdUsername } = ctx.request.body
  const task = await deleteTaskFD(fdUsername, id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10014, `Can't select freelancer designer to do the task`)
  }
})

//cancel task
router.get('/bp/cancel/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await cancelTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10015, `Can't cancel task`)
  }
})

//submit task
router.post('/fd/submit/:id', FDLoginCheck,async (ctx, next) => {
  const id = ctx.params.id
  const { description } = ctx.request.body
  const task = await submitTask(id, description)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't submit task`)
  }
})

//accept task
router.get('/bp/accept/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await acceptTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10017, `Can't accept task`)
  }
})

//return task
router.get('/bp/return/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await returnTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't return task`)
  }
})

// bid tasks
router.get('/fd/bid/:id', FDLoginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const id = ctx.params.id 
  const fdUsername = userInfo.username
  const task = await bidTask(fdUsername, id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't bid task`)
  }
})

//create task
router.post('/create', BPLoginCheck, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const data = ctx.request.body
  try {
    const newTask = await createTask(userInfo.username, data)
    // return success message
    if (newTask) {
      ctx.body = new SuccessModel(newTask)
    } else {
      ctx.body = new ErrorModel(10023, `create task failed`)
    }
  } catch (ex) {
    console.error(ex)
    // Return failed message
    ctx.body = new ErrorModel(10017, `create task - ${ex.message}`)
  }
})

module.exports = router
