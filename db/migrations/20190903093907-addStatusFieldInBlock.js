'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('StaticInfoBlock','isEnable', {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('StaticInfoBlock','isEnable', {
        type: Sequelize.STRING,
      }),
    ])
  }
};
