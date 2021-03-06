const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const cors = require('koa2-cors');
const index = require('./routes/index');
const users = require('./routes/users');
const announcements = require('./routes/announcements')
const contacts = require('./routes/contacts')
const tasks = require('./routes/tasks')
const swagger = require('./swagger')  // 存放swagger.js的位置，可以自行配置，我放在了根目录
const koaSwagger = require('koa2-swagger-ui')

// error handler
onerror(app);

// cors config
app.use(cors({
  origin: 'http://localhost:8080', // Front
  credentials: true // Allow cookies across domains
}));

// session config
app.keys = ['Wd(&2d1@#！@2ASDd'];
app.use(session({
  // config cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(announcements.routes(), announcements.allowedMethods());
app.use(contacts.routes(), contacts.allowedMethods());
app.use(tasks.routes(), tasks.allowedMethods());

// swagger ui document config
app.use(swagger.routes(), swagger.allowedMethods())
app.use(koaSwagger({
  routePrefix: '/swagger', // swagger ui document access address
  swaggerOptions: {
    url: '/swagger.json', // example path to json
  }
}))

// error-handling
app.on('error', (err, ctx) => {;
  console.error('server error', err, ctx);
});

module.exports = app;
