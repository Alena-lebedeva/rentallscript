'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Home Page Logo',
      name: 'homeLogo',
      value: null,
      type: 'site_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['homeLogo']
      }
    })
  }
};
