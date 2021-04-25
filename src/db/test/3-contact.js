/**
 * @description test contact
 * @author Taoyu Chen
 */

const { Contact, User } = require('../../models/index')

!(async() => {
    // create
    const c1 = new Contact({
        username: "wit2008"
    })
    c1.save() // Save to database
    // const username = "SimonNuist"
    // const u1 = {
    //     username: 'nuistSimon4',
    //     telephone: "188122342356"
    // }
    // const user = await User.findOne(u1, {})
    // // console.log(user)
    // const contact = await Contact.findOne({ username: "SimonNuist3" })
    // console.log(contact)
    // if (contact) {
    //     contact.contacts.push({ contact_username: u1.username, contact_telephone: u1.telephone })
    //     const saveContacts = await contact.save()
    //     console.log(saveContacts)
    // }
    
    
    // create
    // const c2 = new Contact({
    //     username: "Simon",
    //     contactTelephone: "18234534124",
    //     contactName: "Lima"
    // })
    // c2.save()
    //  // create
    // const c3 = new Contact({
    //     username: "Simon",
    //     contactTelephone: "18812312456",
    //     contactName: "nuistSimon"
    // })
    // c3.save() 

    // Get the list of contact list
    // const contactList = await Contact.find({ username: "Simon" }).sort({ _id: -1 }) // 按更新时间倒序
    // console.log('contact list', contactList)

})()
