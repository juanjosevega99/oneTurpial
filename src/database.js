const mysql = require('mysql')
const dbConfig = require('./config/config')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'database_oneturpial',
  insecureAuth: true
})

module.exports = connection