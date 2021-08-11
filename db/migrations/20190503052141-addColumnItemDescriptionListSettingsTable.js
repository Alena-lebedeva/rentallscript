'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ListSettings', 'itemDescription', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListSettings', 'itemDescription')
    ])
  }
};