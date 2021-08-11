'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'Header',
        content: 'Header Content',
        image: null,
        name: 'header',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'Block1',
        content: 'Block content',
        image: null,
        name: 'block1',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('StaticInfoBlock', [{
        title: 'Block2',
        content: 'Block content',
        image: null,
        name: 'block2',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticInfoBlock', {
      name: {
        $in: ['header', 'block1']
      }
    })
  }
};
