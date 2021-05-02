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

/**
 * @swagger
 * definitions:
 *   Task:
 *     type: 'object'
 *     properties:
 *       name:
 *         type: string
 *       budget:
 *         type: number
 *       type:
 *         type: string
 *       deadline:
 *         type: string
 *       bidNumber:
 *         type: Number
 *       uploader:
 *         type: "Array"
 *       detail:
 *         type: string
 *       status:
 *         type: number
 *       biddingList:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Bidder"
 *       fdUsername:
 *         type: string
 *       bpUsername:
 *         type: string
 *       isCanceled:
 *         type: boolean
 *       work: 
 *         $ref: "#/definitions/Work"
 *   Bidder:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       bidder_username:
 *         type: string
 *   Work:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       uploader_file:
 *         type: string
 *       uploader_description:
 *         type: string
 */

router.prefix('/api/tasks')

/**
 * @swagger
 * /api/tasks: 
 *   get: 
 *     description: get all task list
 *     tags: [Task]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/', loginCheck, async (ctx, next) => {
  const taskList = await getAllTaskList()
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

/**
 * @swagger
 * /api/tasks/{taskId}: 
 *   get: 
 *     description: get task by id
 *     tags: [Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/:id', loginCheck, async (ctx, next) => {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const task = await getTaskById(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get a task by id`)
  }
})

/**
 * @swagger
 * /api/tasks/bid/list: 
 *   get: 
 *     description: get all bidderable task list
 *     tags: [Task]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/bid/list', FDLoginCheck, async (ctx, next) => {
  const taskList = await getAllBidderableTaskList()
  if (taskList) {
    ctx.body = new SuccessModel(taskList)
  } else {
    ctx.body = new ErrorModel(10011, `Can't get all tasks`)
  }
})

/**
 * @swagger
 * /api/tasks/bp/lists: 
 *   get: 
 *     description: get tasks by business people username
 *     tags: [Buniness People Task]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/tasks/fd/task: 
 *   get: 
 *     description: get task by freelancer designer username
 *     tags: [Freelancer Designer Task]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/tasks/bp/selectFD/{taskId}: 
 *   post: 
 *     description: select freelancer designer bidder
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *       - name: fdUsername
 *         description: freelancer designer username
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/tasks/bp/deleteFD/{taskId}: 
 *   delete: 
 *     description: delete freelancer designer bidder
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *       - name: fdUsername
 *         description: freelancer designer username
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.delete('/bp/deleteFD/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const { fdUsername } = ctx.request.body
  const task = await deleteTaskFD(fdUsername, id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10014, `Can't select freelancer designer to do the task`)
  }
})

/**
 * @swagger
 * /api/tasks/bp/cancel/{taskId}: 
 *   get: 
 *     description: cancel task by id
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/bp/cancel/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await cancelTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10015, `Can't cancel task`)
  }
})

/**
 * @swagger
 * /api/tasks/fd/submit/{taskId}: 
 *   post: 
 *     description: submit task by id
 *     tags: [Freelancer Designer Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *       - name: description
 *         description: work description
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/tasks/bp/accept/{taskId}: 
 *   get: 
 *     description: accept task by id
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/bp/accept/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await acceptTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10017, `Can't accept task`)
  }
})

/**
 * @swagger
 * /api/tasks/bp/return/{taskId}: 
 *   get: 
 *     description: return task by id
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/bp/return/:id', BPLoginCheck, async (ctx, next) => {
  const id = ctx.params.id
  const task = await returnTask(id)
  if (task) {
    ctx.body = new SuccessModel(task)
  } else {
    ctx.body = new ErrorModel(10016, `Can't return task`)
  }
})

/**
 * @swagger
 * /api/tasks/fd/bid/{taskId}: 
 *   get: 
 *     description: bid task by id
 *     tags: [Freelancer Designer Task]
 *     parameters:
 *       - name: taskId
 *         description: task id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Task"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/tasks/create: 
 *   post: 
 *     description: publish a task
 *     tags: [Buniness People Task]
 *     parameters:
 *       - name: name
 *         description: task name
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: budget
 *         description: task budget
 *         in: formData
 *         required: true
 *         type: number
 *       - name: bidNumber
 *         description: task bid number
 *         in: formData
 *         required: true
 *         type: number
 *       - name: type
 *         description: task type
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: deadline
 *         description: task deadline
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: detail
 *         description: task detail
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
