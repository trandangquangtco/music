const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = require("../config/applicationDb");

const LikeSound = sequelize.define(
  "like_sound",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sound_id: {
      type: DataTypes.INTEGER,
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
    tableName: "like_sound",
    updatedAt: "updated_at",
    createdAt: "created_at",
    indexes: [{ unique: true, fields: ["user_id", "sound_id"] }],
  }
);

module.exports = LikeSound;
