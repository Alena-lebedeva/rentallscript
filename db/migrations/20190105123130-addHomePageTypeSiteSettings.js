'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [{
      title: 'Home Page Banner Layout',
      name: 'homePageType',
      value: '1',
      type: 'site_settings',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['homePageType']
      }
    })
  }
};
