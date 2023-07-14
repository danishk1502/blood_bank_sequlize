const Sequelize = require("sequelize");


//***************************************Database Connection*************************************8 */

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