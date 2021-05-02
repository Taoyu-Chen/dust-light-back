/**
 * @description contact controller
 * @author Taoyu Chen
 */

const { User, Contact } = require('../models/index')

/**
 * Login
 * @param {String} username
 * @param {String} password
 * @param {String} type user type
 */
async function login(username, password, type) {
    const user = await User.findOne({ username, password, type })
    if (user != null) {
        // login successful
        return user
    }
    // login failed
    return false
}

/**
 * register user
 * @param {Object} userInfo user information
 */
async function register(userInfo = {}) {
    // 注意验证一下 username unique
    const newUser = await User.create(userInfo)
    const newContact = await Contact.create({username: userInfo.username})
    return newUser
}

/**
 * lock user
 * @param {String} id user id
 */
async function lock(id) {
    const newUser = await User.updateOne({_id: id},
{"$set" : {"isLock" : true}})
    return newUser
}

/**
 * unlock user
 * @param {String} id user id
 */
async function unlock(id) {
    const newUser = await User.updateOne({_id: id},
{"$set" : {"isLock" : false}})
    return newUser
}

async function getAllBPList() {
    const bpList = await User.find({ type: "Business People" })
    return  bpList
}

async function getAllFDList() {
    const fdList = await User.find({ type: "Freelancer Designer" })
    return  fdList
}

/**
 * delete user
 * @param {String} id user id
 */
async function deleteUser(id) {
    const deleteUser = await User.deleteOne({ _id: id })
    return  deleteUser 
}

module.exports = {
    login,
    register,
    lock,
    unlock,
    deleteUser,
    getAllBPList,
    getAllFDList
}

