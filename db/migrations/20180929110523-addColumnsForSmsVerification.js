'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Country', 'dialCode', {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.changeColumn('Country', 'createdAt', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      }),
      queryInterface.changeColumn('Country', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date()
      }),
      queryInterface.addColumn('UserProfile', 'country', {
        type: Sequelize.INTEGER(10),
        allowNull: true,
        defaultValue: 1
      }),
      queryInterface.addColumn('UserProfile', 'verificationCode', {
        type: Sequelize.INTEGER(6),
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn('UserProfile', 'countryCode', {
        type: Sequelize.STRING(15),
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn('UserVerifiedInfo', 'isPhoneVerified', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Country', 'dialCode'),
      queryInterface.removeColumn('UserProfile', 'country'),
      queryInterface.removeColumn('UserProfile', 'verificationCode'),
      queryInterface.removeColumn('UserProfile', 'countryCode'),
      queryInterface.removeColumn('UserVerifiedInfo', 'isPhoneVerified')
    ])
  }
};
