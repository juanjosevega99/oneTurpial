const mysql = require('mysql')
const dbConfig = require('./src/config/config')

const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
})

module.exports = connection