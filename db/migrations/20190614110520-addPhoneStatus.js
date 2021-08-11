'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Phone Number Status',
        name: 'phoneNumberStatus',
        value: '1',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['phoneNumberStatus']
        }
      })
    ])
  }
};
