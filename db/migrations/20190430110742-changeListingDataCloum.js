'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListingData', 'cleaningPrice', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListingData', 'weeklyDiscount', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListingData', 'monthlyDiscount', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ListingData', 'basePrice'),
      queryInterface.removeColumn('ListingData', 'cleaningPrice'),
      queryInterface.removeColumn('ListingData', 'weeklyDiscount'),
      queryInterface.removeColumn('ListingData', 'monthlyDiscount'),
    ])
  }
};
