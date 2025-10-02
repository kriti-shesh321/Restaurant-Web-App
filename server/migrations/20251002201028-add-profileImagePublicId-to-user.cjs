'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('User', 'profileImagePublicId', {
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Cloudinary public_id for profile image'
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.removeColumn('User', 'profileImagePublicId');
  }
};