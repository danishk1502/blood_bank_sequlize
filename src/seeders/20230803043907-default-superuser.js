const md5 = require('md5')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
    await queryInterface.bulkInsert('users', [{
      name: 'John',
      lname: 'Doe',
      username: 'johndoe123',
      password:md5('12345'),
      email:'john@doe.com',
      role:'superuser',
      state:'Delhi',
      distt :'Aligarh',
      user_status:'Active',
      created_by:'johndoe123',
      updated_by:'johndoe123',
      createdAt: new Date(),
      updatedAt : new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
