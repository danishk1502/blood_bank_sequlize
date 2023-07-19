const Sequelize = require("sequelize");


/* 
@Description : This is for database connection 
*/

const sequelize = new Sequelize(
    'blood_bank_db',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql',
     }

   );
   sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
    module.exports = sequelize;