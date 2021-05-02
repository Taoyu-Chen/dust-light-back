/**
 * @description announcement controller
 * @author Taoyu Chen
 */

const { Announcement } = require('../models/index')


// get announcement list
async function getAnnouncementList() {
    const announcementList = await Announcement.find().sort({ updatedAt: -1 }) // 按更新时间倒序
    return announcementList
}

// get announcement by id
async function getAnnouncementById(id) {
    const announcement = await Announcement.findById(id)
    return announcement
}

// create a announcement
async function createAnnouncement(data = {}) {
    const announcement = await Announcement.create(data)
    return announcement
}

// update a announcement
async function updateAnnouncement(id, data = {}) {
    const address = await Announcement.findOneAndUpdate(
        { _id: id}, // Query conditions
        { data }, 
        {
            new: true // Return the latest data after the update, the default is false Return the data before the update
        }
    )
    return address
}

module.exports = {
    getAnnouncementById,
    getAnnouncementList,
    createAnnouncement,
    updateAnnouncement
}
