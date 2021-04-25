/**
 * @description Test announcement data
 * @author Taoyu Chen
 */

const { Announcement } = require('../../models/index')

!(async() => {
    // create
    // const a1 = new Announcement({
    //     title: "The first closed beta starts",
    //     type: "beta",
    //     text: "Text content"
    // })
    // a1.save() // Save to database
    // create
    // const a2 = new Announcement({
    //     title: "The second closed beta starts",
    //     type: "beta",
    //     text: "Text content2"
    // })
    // a2.save() // Save to database

    // Get the list of announcements
    const announcementList = await Announcement.find().sort({ updatedAt: -1 }) // 按更新时间倒序
    console.log('announcement list', announcementList)

    // 获取单个地址，根据 id 获取（以下两种写法都可以）
    //const announcement = await Announcement.findOne({ _id: '607407392b6f37900a8764b3' })
    // const announcement = await Announcement.findById('607407392b6f37900a8764b3')
    // console.log('announcement', announcement)

})()
