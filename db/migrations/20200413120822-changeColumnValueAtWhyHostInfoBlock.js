'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('WhyHostInfoBlock', 'value', {
        type: Sequelize.TEXT,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('WhyHostInfoBlock', 'value', {
        type: Sequelize.TEXT,
      })
    ])
  }
};