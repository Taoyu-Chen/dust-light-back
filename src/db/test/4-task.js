/**
 * @description test task
 * @author Taoyu Chen
 */

const { Task, User } = require('../../models/index')

!(async() => {
    // create
  try {
    const bpUsername = "Simon"
    const t1 = {
      name: "Car logo11",
      budget: 100,
      type: "logo",
      deadline: "2021-5-5",
    }
    const task = await Task.create({ bpUsername,...t1})
    console.log(task) 
  }
  catch (err) {
    console.log(err.message)
  }
    
    // Save to database
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
  // var u1 = new User({
  //   username: 'Simon2e',
  //   telephone: '188343412244',
  //   password: '123456',
  // });
  // const username = "nuistSimon"
  // const user = await User.findOne({ username: username })
  // const taskname = "Car logo"
  // const task = await Task.findOne({ name: taskname })
  // //console.log(u1)
  // task.biddingList.push(user)
  // const saveTask = await task.save()
  //console.log(saveTask)
    // Get the list of contact list
    // const contactList = await Contact.find({ username: "Simon" }).sort({ _id: -1 }) // 按更新时间倒序
    // console.log('contact list', contactList)

})()
