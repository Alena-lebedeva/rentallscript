'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Threads', 'messageUpdatedDate', {
        type: Sequelize.DATE,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Threads', 'messageUpdatedDate')
    ])
  }
};
