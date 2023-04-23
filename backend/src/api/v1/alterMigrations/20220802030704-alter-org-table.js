"use strict"

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.renameColumn("orgs", "LOGO_NAME", "LOGO_NAME_1")
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("orgs", "LOGO_NAME_1", "LOGO_NAME")
  },
}
