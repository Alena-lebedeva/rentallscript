'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Home Logo Height',
        name: 'homeLogoHeight',
        value: '0',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Home Logo Width',
        name: 'homeLogoWidth',
        value: '0',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['homeLogoHeight', 'homeLogoWidth']
      }
    })
  }
};
