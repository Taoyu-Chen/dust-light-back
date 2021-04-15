/**
 * User data operation
 */

const User = require('../../models/User')

!(async () => {
  // create a user
  // await User.create({
  //   username: 'nuistSimon',
  //   password: '123456',
  //   type: 'administer',
  //   email: '1828732378awd@163.com',
  //   telephone: '18812312456'
  // })
  // create another user
  // await User.create({
  //   username: 'Simon',
  //   password: '123456',
  //   type: 'administer',
  //   email: '1828732378awd@163.com',
  //   telephone: '18812312456'
  // })
  // create another user
  await User.create({
    username: 'Lisa',
    password: '123456',
    type: 'freelancerDesigner',
    email: '182wdadrdwd@163.com',
    telephone: '188343412244'
  })
  await User.create({
    username: 'David',
    password: '123456',
    type: 'businessPeople',
    email: '182823wadwrawd@163.com',
    telephone: '188112678678'
  })
  await User.create({
    username: 'Lima',
    password: '123456',
    type: 'businessPeople',
    email: '1warawdadw@163.com',
    telephone: '18234534124'
  })
  // login: find one user
  // const simon = await User.findOne({
  //   username: 'nuistSimon',
  //   password: '123456',
  //   type: 'administer'
  // })
  // console.log('simon', simon)
})()