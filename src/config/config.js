require('dotenv').config();

const db ={
  development: {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
    logging:false
  }
}

module.exports =db;
