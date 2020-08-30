'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'salt', {
      type: Sequelize.STRING
    })

    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'salt')
    await queryInterface.removeColumn('Users', 'password')
  }
};
