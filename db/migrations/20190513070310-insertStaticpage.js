'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("INSERT INTO StaticPage (pageName, content, metaTitle, metaDescription, createdAt, updatedAt) VALUES ('About Us', '<p></p>','About Us','About Us', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) "),
      queryInterface.sequelize.query("INSERT INTO StaticPage (pageName, content, metaTitle, metaDescription, createdAt, updatedAt) VALUES ('Trust & Safety', '<p></p>','Trust & Safety','Trust & Safety', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) "),
      queryInterface.sequelize.query("INSERT INTO StaticPage (pageName, content, metaTitle, metaDescription, createdAt, updatedAt) VALUES ('Travel Credit', '<p></p>', 'Travel Credit', 'Travel Credit', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) "),
      queryInterface.sequelize.query("INSERT INTO StaticPage (pageName, content, metaTitle, metaDescription, createdAt, updatedAt) VALUES ('Terms & Privacy', '<p></p>', 'Terms & Privacy', 'Terms & Privacy', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()) "),

    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
    ])
  }
};