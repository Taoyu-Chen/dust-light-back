/**
 * User data operation
 */

const User = require('../../models/User')

!(async () => {
  // create a user
  // await User.create({
  //   username: 'Simon',
  //   password: '123456',
  //   type: 'administer',
  //   name: 'Taoyu Chen',
  //   phoneNumber: '18851962622'
  // })
  // create another user
  // await User.create({
  //   username: 'TLucy',
  //   password: 'zxcvbn',
  //   type: 'businessPeople',
  //   name: 'Lucy Tramp',
  //   phoneNumber: '154234563453'
  // })
  // login: find one user
  const simon = await User.findOne({
    username: 'Simon',
    password: '123456'
  })
  console.log('simon', simon)
})()