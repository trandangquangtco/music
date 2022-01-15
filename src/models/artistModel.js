const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Artist = sequelize.define(
  "artist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    genre: {
      type: DataTypes.STRING,
    },
    count_follow: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_music: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_video: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_album: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_transaction_music: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_transaction_video: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    count_transaction_album: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    income: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "artist", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Artist;
