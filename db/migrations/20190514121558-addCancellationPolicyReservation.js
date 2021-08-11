'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all([
    queryInterface.addColumn('Reservation','cancellationPolicy', {
      type: Sequelize.INTEGER,
    }),
  ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'cancellationPolicy'),
    ])
  }
};
