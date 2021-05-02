/**
 * import data
 */

const { User, Announcement, Task, Contact } = require('../models/index')

!(async () => {
  // create user
  await User.create({
    username: 'admin',
    password: 'admin',
    type: 'Administer',
    email: 'admin@mail.wit.com',
    telephone: '18888888888'
  })
  await User.create({
    username: 'Lewis',
    password: '123456',
    type: 'Business People',
    email: 'ege@pharet.org',
    telephone: '172378358490'
  })
  await User.create({
    username: 'Zephania',
    password: '123456',
    type: 'Business People',
    email: 'aliquet.diam@dapibus.ca',
    telephone: '185148269833'
  })
  await User.create({
    username: 'Howard',
    password: '123456',
    type: 'Business People',
    email: 'soc@co.uk',
    telephone: '178824936202'
  })
  await User.create({
    username: 'Rana',
    password: '123456',
    type: 'Freelancer Designer',
    email: 'iacu@inter.edu',
    telephone: '138553359127'
  })
  await User.create({
    username: 'Walter',
    password: '123456',
    type: 'Freelancer Designer',
    email: 'libero.nec@egestas.net',
    telephone: '126888440637'
  })
  await User.create({
    username: 'Ronan',
    password: '123456',
    type: 'Freelancer Designer',
    email: 'Curabitur@aliq.org',
    telephone: '199772655482'
  })
  // create Contact
  await Contact.create({
    username: 'Lewis',
    contacts:
    [{
      contact_username: 'Rana',
      contact_telephone: '138553359127'
    },{
      contact_username: 'Howard',
      contact_telephone: '178824936202'
    }]
  })
  await Contact.create({
    username: 'Howard',
    contacts:
    [{
      contact_username: 'Rana',
      contact_telephone: '138553359127'
    }]
  })
  await Contact.create({
    username: 'Walter'
  })
  await Contact.create({
    username: 'Ronan'
  })
  await Contact.create({
    username: 'Zephania'
  })
  await Contact.create({
    username: 'Rana',
    contacts:
    [{
      contact_username: 'Howard',
      contact_telephone: '178824936202'
    }]
  })
  // create announcement
  await Announcement.create({
    title: 'Test software version 0.1 start',
    type: 'beta',
    text: 'I usually like to write some blogs to record the problems I encountered and the reasons for writing articles. I use the next-style hexo blog to write, which can accurately classify and add tags. Some blogs have records of only knowledge points, and I will set the inappropriate content as private later.'
  })
  await Announcement.create({
    title: 'Test software version 0.2 start',
    type: 'beta',
    text: 'This application is a brand new application for me. Many of the icons I need are difficult to find and cannot be easily applied. There are also some posters in the application that need to be designed by myself. I will make some by myself if time permits. Due to time constraints, the contents of the static part and the recommended part are copied and will be replaced in the future. For the last problem, I plan to adapt to different devices when the development reaches a certain level.'
  })
  await Announcement.create({
    title: 'Test software version 0.3 start',
    type: 'beta',
    text: 'The login and registration pages were developed, and the pictures on the image bed were used, but the login and registration verification were not developed. It is ready to be added after the development of the back-end login is completed. Added the inability to enter the login and registration pages after logging in, and the function development such as the homepage cannot be performed without logging in.'
  })
  await Announcement.create({
    title: 'Test software version 0.4 start',
    type: 'beta',
    text: 'The most difficult mobile design problem has been solved, and the next step is the front-end design. Because I learned React last semester, I am more proficient in data processing in React, but Vue is a new thing I learned, although it is very similar, but I am not proficient and need a period of practice.'
  })
  await Announcement.create({
    title: 'Test software version 0.5 start',
    type: 'beta',
    text: 'The application of swagger-ui to koa2 examples is not as many as expected. I encountered unexpected bugs and could not find a solution. Finally, I found the solution by watching the code of other predecessors on github. The development of vue has also encountered unexpected bugs, which will always take several hours or even more than half a day.'
  })
  // create task
  await Task.create({
    name: "Computer show poster",
    budget: 100,
    type: "Poster Design",
    deadline: "2021-9-5",
    bpUsername: 'Zephania',
    detail: 'Computex International was founded in 1981 as Asia’s largest ICT professional exhibition. The exhibition is located in the World Trade Center Exhibition Hall. The industries involved in the exhibition are the Internet of Things, wearable devices and cloud technologies and services.'
  })
  await Task.create({
    name: "Fashion technology logo",
    budget: 199,
    type: "Poster Design",
    deadline: "2021-6-8",
    bpUsername: 'Zephania',
    detail: 'We need an international brand image, preferably simple, innovative, active and flat. More importantly, it allows our brand to pay more attention to the feelings of the stakeholders instead of focusing only on the company ontological desires.'
  })
  await Task.create({
    name: "Fresh cloth poster",
    budget: 125,
    type: "Poster Design",
    deadline: "2021-7-9",
    bpUsername: 'Howard',
    detail: 'Computex International was founded in 1981 as Asia’s largest ICT professional exhibition. The exhibition is located in the World Trade Center Exhibition Hall. The industries involved in the exhibition are the Internet of Things, wearable devices and cloud technologies and services.'
  })
  

})()