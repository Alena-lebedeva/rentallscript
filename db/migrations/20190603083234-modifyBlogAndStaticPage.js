'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("ALTER TABLE BlogDetails CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"),
      queryInterface.sequelize.query("ALTER TABLE StaticPage CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
     
    ])
  }
};
