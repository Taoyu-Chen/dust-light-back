const router = require('koa-router')()
const {
  getContactById,
  getContactList,
  createContact,
  deleteContact
} = require('../controller/contact')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

router.prefix('/api/contacts')

router.get('/', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const contact = await getContactList(username)
  if (contact) {
    ctx.body = new SuccessModel(contact)
  } else {
    ctx.body = new ErrorModel(10008, `Can't get contacts`)
  }
})

router.get('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const contact = await getContactById(id)
  if (contact) {
    ctx.body = new SuccessModel(contact)
  } else {
    ctx.body = new ErrorModel(10009, `Can't get a contact by id`)
  }
})

router.post('/', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body
  try {
    const newContact = await createContact(username, data)
    ctx.body = new SuccessModel(newContact)
  } catch (ex) {
    console.error(ex)
    // Return failure
    ctx.body = new ErrorModel(10010, `Create contact failed`)
  }
})

router.post('/delete', loginCheck, async function (ctx, next) {
  const userInfo = ctx.session.userInfo
  const username = userInfo.username
  const data = ctx.request.body
  try {
    const newContact = await deleteContact(username, data)
    ctx.body = new SuccessModel(newContact)
  } catch (ex) {
    console.error(ex)
    // Return failure
    ctx.body = new ErrorModel(10018, `Delete contact failed`)
  }
})

module.exports = router
