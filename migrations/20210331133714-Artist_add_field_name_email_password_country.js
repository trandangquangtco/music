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
        queryInterface.addColumn("artist", "name", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
        queryInterface.addColumn("artist", "email", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
        queryInterface.addColumn("artist", "password", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
        queryInterface.addColumn("artist", "country", {
          type: Sequelize.STRING,
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
        queryInterface.removeColumn("artist", "name"),
        queryInterface.removeColumn("artist", "email"),
        queryInterface.removeColumn("artist", "password"),
        queryInterface.removeColumn("artist", "country"),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
};
