/**
 * @description contact controller
 * @author Taoyu Chen
 */

const { Contact } = require('../models/index')

// get contact list
async function getContactList(username) {
    const contact= await Contact.findOne({username}) // 按更新时间倒序
    return contact
}

// get contact by id
async function getContactById(id) {
    const announcement = await Contact.findById(id)
    return announcement
}

// create a contact
async function createContact(username, data = {}) {
    const contact = await Contact.findOne({ username })
    contact.contacts.push({ contact_username: data.contact_username, contact_telephone: data.contact_telephone })
    const saveContact = await contact.save()
    return saveContact
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

// delete a contact
async function deleteContact(username ,data = {}) {
    const contact = await Contact.findOne({ username })
    for (let i = 0; i < contact.contacts.length; i++){
        if (contact.contacts[i].contact_username == data.contact_username && contact.contacts[i].contact_telephone == data.contact_telephone) {
            contact.contacts.splice(i, 1)
        }
    }
    const deleteContact = await contact.save()
    return deleteContact
}

module.exports = {
    getContactById,
    getContactList,
    createContact,
    updateContact,
    deleteContact
}
