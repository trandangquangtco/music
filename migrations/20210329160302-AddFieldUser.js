"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */ try {
      return await Promise.all([
        queryInterface.addColumn("user", "dob", { type: Sequelize.DATE }),
        queryInterface.addColumn("user", "gender", { type: Sequelize.TEXT }),
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
    //  return await Promise.all([
    //   queryInterface.removeColumn('user', 'dob'),
    //   queryInterface.removeColumn('user', 'gender'),
    // ])
  },
};
