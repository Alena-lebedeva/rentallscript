'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserListingSteps', 'step4', {
        type: Sequelize.ENUM('inactive', 'active', 'completed'),
        defaultValue: 'active',
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserListingSteps', 'step4', {}),
    ])
  }
};
