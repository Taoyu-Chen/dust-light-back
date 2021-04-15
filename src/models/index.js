/**
 * @description Model entrance
 * @author Taoyu Chen
 */

const User = require('./User')
const Task = require('./Task')
const Announcement = require('./Announcement')
const Contact = require('./Contact')

module.exports = {
  Task,
  Announcement,
  User,
  Contact
}