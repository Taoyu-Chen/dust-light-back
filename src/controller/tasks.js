/**
 * @description task controller
 * @author Taoyu Chen
 */

const { Task, User } = require('../models/index')

// get all task list
async function getAllTaskList() {
    const taskList = await Task.find().sort({ updatedAt: -1 }) // 按更新时间倒序
    return taskList
}

// get all bidderable task list
async function getAllBidderableTaskList() {
    const taskList = await Task.find({"isCanceled" : false, "status" : 0 }).sort({ updatedAt: -1 }) // 按更新时间倒序
    return taskList
}

// get task by id
async function getTaskById(id) {
    const task = await Task.findById(id)
    return task
}

/**
 * get task business people
 * @param {String} username business people username
 */
async function getTaskByBPUsername(username) {
    const task = await Task.find({bpUsername: username})
    return task
}

/**
 * get task the designer is doing
 * @param {String} username business people username
 */
async function getTaskByFDUsername(username) {
    const task = await Task.findOne({fdUsername: username, status: 1, isCanceled: false})
    return task
}

// create a task
async function createTask(bpUsername, data = {}) {
    const task = await Task.create({ bpUsername,...data})
    return task
}

// update a task
async function updateTask(id, data = {}) {
    const task = await Task.findOneAndUpdate(
        { _id: id}, // Query conditions
        { data }, 
        {
            new: true // Return the latest data after the update, the default is false Return the data before the update
        }
    )
    return task
}

/**
 * cancel task
 * @param {String} id task name
 */
async function cancelTask(id) {
    const newTask = await Task.findOneAndUpdate({ _id: id },
{"$set" : {"isCanceled" : true}})
    return newTask
}

/**
 * select task freelancer designer
 * @param {String} fdUsername freelancer designer username
 * @param {String} id task id
 */
async function selectTaskFD(fdUsername ,id) {
    const newTask = await Task.findOneAndUpdate({ _id: id } ,
{"$set" : { 
    "status" : 1, "fdUsername" : fdUsername}})
    return newTask
}

/**
 * delete task freelancer designer
 * @param {String} fdUsername freelancer designer username
 * @param {String} id task id
 */
async function deleteTaskFD(fdUsername, id) {
    const task = await Task.findOne({ _id: id })
    for (let i = 0; i < task.biddingList.length; i++){
        if (task.biddingList[i].bidder_username == fdUsername) {
            task.biddingList.splice(i, 1)
        }
    }
    const newTask = await task.save()
    return newTask
}
/**
 * submit task works
 * @param {String} id task id
 * @param {String} description task submit description
 */
async function submitTask(id, description) {
    const newTask = await Task.findOneAndUpdate({ _id: id },
        {
            "$set": {
                "status": 2,
                "work.uploader_description": description
            }
        })
    return newTask
}

/**
 * return task works
 * @param {String} id task id
 */
async function returnTask(id) {
    const newTask = await Task.findOneAndUpdate({ _id: id, status: 3 },
        {
            "$set": {
                "status": 1,
            }
        })
    return newTask
}

/**
 * accept task works
 * @param {String} id task id
 */
async function acceptTask(id) {
    const newTask = await Task.findOneAndUpdate({ _id: id, status: 3},
{"$set" : {"status" : 3}})
    return newTask
}

/**
 * bid task
 * @param {String} id task id
 * @param {String} fdUsername freelancer designer name
 */
async function bidTask(fdUsername, id) {
    const task = await Task.findOne({ status: 0, _id: id })
    const user = await User.findOne({ username: fdUsername })
    const bidder = {
        bidder_username: user.username
    }
    task.biddingList.push(bidder)
    const saveTask = await task.save()
    return saveTask
}

module.exports = {
    getTaskById,
    getAllTaskList,
    getAllBidderableTaskList,
    createTask,
    updateTask,
    getTaskByBPUsername,
    getTaskByFDUsername,
    cancelTask,
    bidTask,
    returnTask,
    acceptTask,
    submitTask,
    selectTaskFD,
    deleteTaskFD
}


