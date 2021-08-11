'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('User', 'userBanStatus', {
      type: Sequelize.BOOLEAN,
      defaultValue: 0
    })
  },
  

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('User', 'userBanStatus')
  }
};
