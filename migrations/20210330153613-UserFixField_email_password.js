"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      return await Promise.all([
        queryInterface.changeColumn("user", "email", {
          type: Sequelize.STRING(50),
          allowNull: true,
        }),
        queryInterface.changeColumn("user", "password", {
          type: Sequelize.TEXT,
          allowNull: true,
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      return await Promise.all([
        queryInterface.changeColumn("user", "email", {
          type: Sequelize.STRING(50),
          allowNull: false,
        }),
        queryInterface.changeColumn("user", "password", {
          type: Sequelize.TEXT,
          allowNull: false,
        }),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};
