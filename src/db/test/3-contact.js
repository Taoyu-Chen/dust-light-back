/**
 * @description test contact
 * @author Taoyu Chen
 */

const { Contact } = require('../../models/index')

!(async() => {
    // create
    // const c1 = new Contact({
    //     username: "Simon",
    //     contactTelephone: "1881124124",
    //     contactName: "Sarah"
    // })
    // c1.save() // Save to database
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
    const contactList = await Contact.find({ username: "Simon" }).sort({ _id: -1 }) // 按更新时间倒序
    console.log('contact list', contactList)

})()
