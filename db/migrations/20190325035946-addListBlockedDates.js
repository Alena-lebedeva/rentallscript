'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('ListBlockedDates', 'calendarStatus', {
        type: Sequelize.ENUM('available', 'blocked', 'reservation'),
      }),
      queryInterface.addColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.FLOAT,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListBlockedDates', 'calendarStatus'),
      queryInterface.removeColumn('ListBlockedDates', 'isSpecialPrice')
    ])
  }
};
