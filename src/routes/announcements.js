const router = require('koa-router')()
const {
  getAnnouncementById,
  getAnnouncementList,
  createAnnouncement
} = require('../controller/announcements')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/announcements')

router.get('/', loginCheck, async function (ctx, next) {
  const announcementList = await getAnnouncementList()
  ctx.body = new SuccessModel(announcementList)
  if (announcementList) {
    ctx.body = new SuccessModel(announcementList)
  } else {
    ctx.body = new ErrorModel(10005, `Can't get announcements`)
    }
})

router.get('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const announcement = await getAnnouncementById(id)
  if (announcement) {
    ctx.body = new SuccessModel(announcement)
  } else {
    ctx.body = new ErrorModel(10006, `Can't get a announcement by id`)
    }

    
})

router.post('/', async function (ctx, next) {
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
