const router = require('koa-router')()
const {
  getAnnouncementById,
  getAnnouncementList,
  createAnnouncement
} = require('../controller/announcements')
const loginCheck = require('../middleware/loginCheck')
const AdminLoginCheck = require('../middleware/AdminLoginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

/**
 * @swagger
 * definitions:
 *   Announcement:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       title:
 *         type: string  
 *       type:
 *         type: string   
 *       text:
 *         type: string
 */

router.prefix('/api/announcements')

/**
 * @swagger
 * /api/announcements: 
 *   get: 
 *     description: get announcement list
 *     tags: [Announcement]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Announcement"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/', loginCheck, async function (ctx, next) {
  const announcementList = await getAnnouncementList()
  if (announcementList) {
    ctx.body = new SuccessModel(announcementList)
  } else {
    ctx.body = new ErrorModel(10005, `Can't get announcements`)
  }
})

/**
 * @swagger
 * /api/announcements/{announcementId}: 
 *   get: 
 *     description: get announcement by id
 *     tags: [Announcement]
 *     parameters:
 *       - name: announcementId
 *         description: announcement id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Announcement"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const announcement = await getAnnouncementById(id)
  if (announcement) {
    ctx.body = new SuccessModel(announcement)
  } else {
    ctx.body = new ErrorModel(10006, `Can't get a announcement by id`)
  }
})

/**
 * @swagger
 * /api/announcements: 
 *   post: 
 *     description: publish a announcement
 *     tags: [Announcement]
 *     parameters:
 *       - name: title
 *         description: announcement title
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: type
 *         description: announcement type
 *         in: formData
 *         required: true
 *         type: string
 *       - name: text
 *         description: announcement text
 *         in: formData
 *         required: true
 *         type: string 
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Announcement"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.post('/', AdminLoginCheck, async function (ctx, next) {
  const data = ctx.request.body
  try {
    const newAnnouncement = await createAnnouncement(data)
    ctx.body = new SuccessModel(newAnnouncement)
  } catch (ex) {
    console.error(ex)
    // Return failure
    ctx.body = new ErrorModel(10007, `Create announcement failed`)
  }
})

module.exports = router
