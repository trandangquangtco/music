const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const PlaylistAdmin = sequelize.define(
  "playlistadmin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    kind: {
      type: DataTypes.STRING,
    },
    admin_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "playlistadmin",
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);

module.exports = PlaylistAdmin;
