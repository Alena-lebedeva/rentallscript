'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods` SET `details`='Add your bank details' WHERE `id`='2';")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `PaymentMethods` SET `details`='Add your bank details' WHERE `id`='2';")
    ])
  }
};
