'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: "email",
          name: 'email',
          value: "support@yourwebsite.com",
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Phone Number",
          name: 'phoneNumber',
          value: '+0 000 0000',
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Address",
          name: 'address',
          value: "New York, US",
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['mailId', 'phoneNumber', 'address']
        }
      })
    ])
  }
};
