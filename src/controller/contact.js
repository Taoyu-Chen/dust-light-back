/**
 * @description contact controller
 * @author Taoyu Chen
 */

const { Contact } = require('../models/index')


// get contact list
async function getContactList(username) {
    const contactList = await Contact.find({username}).sort({ updatedAt: -1 }) // 按更新时间倒序
    return contactList
}

// get contact by id
async function getContactById(id) {
    const announcement = await Contact.findById(id)
    return announcement
}

// create a contact
async function createContact(username, data = {}) {
    const contact = await Contact.create({ username, ...data })
    return contact
}

// update a contact
async function updateContact(id, data = {}) {
    const contact = await Contact.findOneAndUpdate(
        { _id: id}, // Query conditions
        { data }, 
        {
            new: true // Return the latest data after the update, the default is false Return the data before the update
        }
    )
    return contact
}

module.exports = {
    getContactById,
    getContactList,
    createContact,
    updateContact
}
