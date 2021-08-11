'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `UserListingSteps` SET `step4`='completed' WHERE `step3`='completed';")
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `UserListingSteps` SET `step4`='completed' WHERE `step3`='completed';")
    ])
  }
};
