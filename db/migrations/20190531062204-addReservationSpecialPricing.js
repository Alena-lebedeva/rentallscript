'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('ReservationSpecialPricing', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        listId: {
          type: Sequelize.INTEGER
        },
        reservationId: {
          type: Sequelize.INTEGER
        },
        blockedDates: {
          type: Sequelize.DATE,
          allowNull: false
        },
        isSpecialPrice: {
          type: Sequelize.FLOAT
        },       
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
