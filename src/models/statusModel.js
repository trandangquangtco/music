const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/applicationDb");

const Status = sequelize.define(
  "status",
  {
    name: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "Status", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Status;
