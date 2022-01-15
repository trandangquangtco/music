const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Playlistsong = sequelize.define(
  "playlistsong",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    playlistId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    updatedBy: {
      type: DataTypes.STRING,
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
  {
    tableName: "playlistsong",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = Playlistsong;
