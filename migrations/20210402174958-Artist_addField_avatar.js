'use strict';

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
        
        queryInterface.addColumn("artist", "avatar", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
        queryInterface.addColumn("artist", "description", {
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
        queryInterface.removeColumn("artist", "avatar"),
      ]);
    } catch (error) {
      console.log(error);
    }
  }
};
