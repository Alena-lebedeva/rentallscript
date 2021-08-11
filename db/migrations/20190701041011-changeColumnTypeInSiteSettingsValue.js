'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.sequelize.query("UPDATE SiteSettings SET createdAt = '2019-06-29 07:11:16' WHERE CAST(createdAt AS CHAR(20)) = '0000-00-00 00:00:00'"),
      await queryInterface.changeColumn('SiteSettings', 'value', {
        type: Sequelize.TEXT,
      })      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.sequelize.query("UPDATE SiteSettings SET createdAt = '2019-06-29 07:11:16' WHERE CAST(createdAt AS CHAR(20)) = '0000-00-00 00:00:00'"),
      await queryInterface.changeColumn('SiteSettings', 'value', {
        type: Sequelize.TEXT,
      })
    ])
  }
};
