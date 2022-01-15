//====================IMPORT CUSTOM====================//
const Song = require("../models/songModel");
const { response } = require("../helpers/response");
const LikeSong = require("../models/likeSongModel");
const User = require("../models/userModel");
const { Op, Sequelize } = require("sequelize");

//=====================REFERENCE=======================//
User.hasMany(Song, {
  foreignKey: "id",
});
Song.belongsTo(User, {
  foreignKey: "user_id",
});

Song.hasMany(LikeSong, {
  foreignKey: "id",
});
LikeSong.belongsTo(Song, {
  foreignKey: "songId",
});

//=====================CREATE======================//
const addSong = async (body) => {
  try {
    const create = await Song.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};

//=====================GET LIST======================//
const findAllSong = async (body, limit, page) => {
  try {
    const where = {};
    if (body.name) where.name = { [Op.like]: `%${body.name}%` };
    const findAll = await Song.findAndCountAll({
      where: where,
      limit: limit,
      offset: limit * (page - 1),
      include: [
        {
          model: User,
          attributes: ["name", "avatar"],
        },
      ],
    });
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

//=====================GET ONE======================//
const findOneSong = async (body) => {
  try {
    const findOne = await Song.findOne({
      where: body,
      include: [
        {
          model: User,
          attributes: ["name", "avatar"],
        },
      ],
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

//=====================UPDATE======================//
const updateSong = async (id, body) => {
  try {
    const update = await Song.update(body, {
      where: id,
      returning: true,
      plain: true,
    });
    return {
      message: "success",
      data: update,
    };
  } catch (error) {
    throw error;
  }
};

//=====================DELETE======================//
const removeSong = async (body) => {
  try {
    const remove = await Song.destroy({
      where: body,
    });
    return {
      message: "success",
      data: remove,
    };
  } catch (error) {
    throw error;
  }
};

const randSong = async (body) => {
  try {
    const songs = await Song.findAll({
      where: body,
      order: Sequelize.literal('rand()'),
      limit: 10,
    });
    return {
      message: "success",
      data: songs,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addSong,
  findAllSong,
  findOneSong,
  updateSong,
  removeSong,
  randSong,
};
