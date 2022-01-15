const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
			unique:true
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
    description: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    parent_id: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.TINYINT },
    serial: { type: DataTypes.INTEGER },
    category_type: { type: DataTypes.STRING },
    count_views: { type: DataTypes.INTEGER, defaultValue: 0 },
    count_likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { tableName: "category", updatedAt: "updated_at", createdAt: "created_at" }
);

module.exports = Category;
