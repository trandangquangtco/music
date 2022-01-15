const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Song = sequelize.define(
  "song",
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
    user_id: {
      type: DataTypes.INTEGER,
    },
    song_file: {
      type: DataTypes.STRING,
    },
    img_thumb: {
      type: DataTypes.STRING,
    },
    img_banner: {
      type: DataTypes.STRING,
    },
    genre_id: {
      type: DataTypes.INTEGER,
    },
    album_id: {
      type: DataTypes.STRING,
    },
    count_likes: {
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
    author_name: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    recently_time: {
      type: DataTypes.DATE,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    kind: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "song", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Song;
