'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('StaticPage', 'metaTitle', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('StaticPage', 'metaDescription', {
        type: Sequelize.TEXT
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('StaticPage', 'metaTitle'),
      queryInterface.removeColumn('StaticPage', 'metaDescription'),
    ])
  }
};