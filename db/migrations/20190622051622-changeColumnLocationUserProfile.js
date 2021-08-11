'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('UserProfile', 'location', {
        type: Sequelize.TEXT,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('UserProfile', 'location', {
        type: Sequelize.TEXT,
      })
    ])
  }
};
