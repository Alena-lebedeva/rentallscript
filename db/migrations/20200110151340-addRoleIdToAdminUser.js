'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('AdminUser', 'roleId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('AdminUser', 'roleId')
    ])
  }
};
