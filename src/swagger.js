const router = require('koa-router')()
const swaggerJSDoc = require('swagger-jsdoc')
const path = require("path")

const swaggerDefinition = {
info: {
title: 'API',
version: '1.0.0',
description: 'API',
},
host: 'localhost:3000',
basePath: '/' // Base path (optional)
};
const options = {
swaggerDefinition,
apis: [path.join(__dirname,'./routes/*.js')], // The storage address of the annotated router
};
const swaggerSpec = swaggerJSDoc(options)
// Obtain the generated annotation file through router
router.get('/swagger.json', async function (ctx) {
ctx.set('Content-Type', 'application/json');
ctx.body = swaggerSpec;
})
module.exports = router