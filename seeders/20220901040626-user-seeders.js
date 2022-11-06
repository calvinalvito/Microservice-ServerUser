'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [
      {
        name: "Calvin",
        profession: "Admin Micro",
        role: "admin",
        email: "calvinalvito19@gmail.com",
        password: await bcrypt.hash('rahasia123', 10),
        created_at:new Date(),
        updated_at: new Date()
      },
      {
        name: "Alvito",
        profession: "Student",
        role: "student",
        email: "calvinalvito20@gmail.com",
        password: await bcrypt.hash('rahasia1234', 10),
        created_at:new Date(),
        updated_at: new Date()
      }
     ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
