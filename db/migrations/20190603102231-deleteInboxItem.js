'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("DELETE FROM ThreadItems WHERE id=58;"),
      queryInterface.sequelize.query("DELETE FROM Threads WHERE id=18;"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  }
};
