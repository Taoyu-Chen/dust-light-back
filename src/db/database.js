require('dotenv').config('./env')

const { DB_HOST, DB_NAME } =  process.env

module.exports = {

    host: DB_HOST,
    
    database: DB_NAME,

}