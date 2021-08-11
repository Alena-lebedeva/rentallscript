'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('User', 'userDeletedAt', {
      type: Sequelize.DATE,
      defaultValue: null
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('User', 'userDeletedAt')
  }
};