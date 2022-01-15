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
        queryInterface.addColumn("user", "address", { type: Sequelize.STRING }),
        queryInterface.addColumn("user", "phone", { type: Sequelize.TEXT }),
        queryInterface.addColumn("user", "fullName", {
          type: Sequelize.STRING,
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
        queryInterface.removeColumn("user", "address"),
        queryInterface.removeColumn("user", "phone"),
        queryInterface.removeColumn("user", "fullName"),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};
