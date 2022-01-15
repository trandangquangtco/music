const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Sound = sequelize.define(
  "sound",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    img_thumb: {
      type: DataTypes.TEXT,
    },
    img_banner: {
      type: DataTypes.TEXT,
    },
    sound_file: {
      type: DataTypes.TEXT,
    },
    sound_preview: {
      type: DataTypes.TEXT,
    },
    sound_url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    is_active: { type: DataTypes.TINYINT },
    count_views: { type: DataTypes.INTEGER, defaultValue: 0 },
    count_likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "sound", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Sound;
