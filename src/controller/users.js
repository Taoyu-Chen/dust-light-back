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
 * @param {String} username
 */
async function lock(username) {
    const newUser = await User.updateOne({username},
{"$set" : {"isLock" : true}})
    return newUser
}

/**
 * lock user
 * @param {String} username
 */
async function unlock(username) {
    const newUser = await User.updateOne({username},
{"$set" : {"isLock" : false}})
    return newUser
}

module.exports = {
    login,
    register,
    lock,
    unlock
}

