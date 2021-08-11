'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BlogDetails', 'isPrivate', {
      type: Sequelize.BOOLEAN
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogDetails', 'isPrivate')
  }
};
