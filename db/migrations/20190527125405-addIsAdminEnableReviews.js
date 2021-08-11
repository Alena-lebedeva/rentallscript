'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reviews','isAdminEnable', {
        type: Sequelize.INTEGER,
        defaultValue: true
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reviews','isAdminEnable', {
        type: Sequelize.INTEGER,
        defaultValue: true
      }),
    ])
  }
};
