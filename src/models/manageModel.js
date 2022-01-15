const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/applicationDb");

const Manage = sequelize.define(
  "manage",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artist_id: {
      type: DataTypes.INTEGER,
    },
    artist_profit: {
      type: DataTypes.INTEGER,
    },
    composer: {
      type: DataTypes.STRING,
    },
    composer_profit: {
      type: DataTypes.INTEGER,
    },
    lyricist: {
      type: DataTypes.STRING,
    },
    lyricist_profit: {
      type: DataTypes.INTEGER,
    },
    privacy: {
      type: DataTypes.STRING,
      defaultValue: "public",
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "manage", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Manage;
