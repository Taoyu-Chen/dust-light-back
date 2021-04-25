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
    const task = await Task.find({fdUsername: username, status: 1})
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
 * @param {String} name task name
 */
async function cancelTask(name) {
    const newTask = await Task.updateOne({name},
{"$set" : {"isCanceled" : true}})
    return newTask
}

/**
 * select task freelancer designer
 * @param {String} fdUsername freelancer designer username
 * @param {String} name task name
 */
async function selectTaskFD(fdUsername ,name) {
    const newTask = await Task.updateOne({name},
{"$set" : { 
    "status" : 1, "fdUsername" : fdUsername}})
    return newTask
}

/**
 * submit task works
 * @param {String} name task name
 */
async function submitTask(name) {
    const newTask = await Task.updateOne({name},
{"$set" : {"status" : 2}})
    return newTask
}

/**
 * return task works
 * @param {String} name task name
 */
async function returnTask(name) {
    const newTask = await Task.updateOne({status: 3,name},
{"$set" : {"status" : 1}})
    return newTask
}

/**
 * accept task works
 * @param {String} name task name
 */
async function acceptTask(name) {
    const newTask = await Task.updateOne({status: 3,name},
{"$set" : {"status" : 3}})
    return newTask
}

/**
 * bid task
 * @param {String} name task name
 * @param {String} fdUsername freelancer designer name
 */
async function bidTask(fdUsername, name) {
    const task = await Task.findOne({ status: 0, name })
    const user = await User.findOne({ username: fdUsername })
    task.biddingList.push(user)
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
    selectTaskFD
}


