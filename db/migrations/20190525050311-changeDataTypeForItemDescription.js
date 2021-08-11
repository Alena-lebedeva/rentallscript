'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ListSettings', 'itemDescription', {
        type: Sequelize.TEXT,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListSettings', 'itemDescription'),
    ])
  }
};
