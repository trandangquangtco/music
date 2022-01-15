const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Album = sequelize.define(
  "album",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    kind: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    count_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_purchase: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_rates: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rates: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    author: {
      type: DataTypes.STRING,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "album", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Album;
