const router = require('koa-router')()
const {
  getContactById,
  getContactList,
  createContact,
  deleteContact
} = require('../controller/contact')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')

/**
 * @swagger
 * definitions:
 *   Contacts:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       username:
 *         type: string  
 *       contacts:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Contact"
 *   Contact:
 *     type: 'object'
 *     properties:
 *       _id:
 *         type: string
 *       contact_username:
 *         type: string
 *       contact_telephone:
 *         type: number
 */

router.prefix('/api/contacts')

/**
 * @swagger
 * /api/contacts: 
 *   get: 
 *     description: get current user contacts
 *     tags: [Contact]
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Contacts"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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

/**
 * @swagger
 * /api/contacts/{contactId}: 
 *   get: 
 *     description: get user contacts by id
 *     tags: [Contact]
 *     parameters:
 *       - name: contactId
 *         description: contact id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Contacts"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

router.get('/:id', loginCheck, async function (ctx, next) {
  const id = ctx.params.id // Get the dynamic parameters of the route
  const contact = await getContactById(id)
  if (contact) {
    ctx.body = new SuccessModel(contact)
  } else {
    ctx.body = new ErrorModel(10009, `Can't get a contact by id`)
  }
})

/**
 * @swagger
 * /api/contacts: 
 *   post: 
 *     description: add a contact
 *     tags: [Contact]
 *     parameters:
 *       - name: contact_username
 *         description: contact username
 *         in: formData
 *         required: true
 *         type: string 
 *       - name: contact_telephone
 *         description: contact telephone
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Ok
 *         schema: 
 *           $ref: "#/definitions/Contacts"
 *       '400':
 *         description: Request parameter error
 *       '404':
 *         description: Not found
 */

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
