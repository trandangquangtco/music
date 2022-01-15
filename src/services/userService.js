//=================IMPORT====================//
const User = require("../models/userModel");
const Artist = require("../models/artistModel");
const Playlist = require("../models/playlistModel");
const LikeSong = require("../models/likeSongModel");
const { response } = require("../helpers/response");

//=================REFERENCE====================//
User.hasMany(Artist, {
  foreignKey: "id",
});
Artist.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Playlist, {
  foreignKey: "id",
});
Playlist.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(LikeSong, {
  foreignKey: "id",
});
LikeSong.belongsTo(User, {
  foreignKey: "user_id",
});

//=================CREATE====================//
const addUser = async (body) => {
  try {
    const create = await User.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};

//=================GET LIST====================//
const findAllUser = async (body, limit, page) => {
  try {
    const findAll = await User.findAndCountAll({
      where: body,
      limit: limit,
      offset: limit * (page - 1),
      include: [{ model: Artist }, { model: Playlist }],
    });
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

//=================GET ONE====================//
const findOneUser = async (body) => {
  try {
    const findOne = await User.findOne({
      where: body,
      include: [{ model: Artist }, { model: Playlist }],
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

//=================LOGIN====================//
const LoginUserService = async (body) => {
  try {
    const findOne = await User.findOne({
      where: body,
      attributes: ["id", "password", "token", "email"],
    });
    return findOne;
  } catch (error) {
    throw error;
  }
};

//=================UPDATE====================//
const updateUser = async (id, body) => {
  try {
    const update = await User.update(body, {
      where: { id: id },
      returning: true,
    });
    return {
      message: "success",
      data: update,
    };
  } catch (error) {
    throw error;
  }
};

//=================DELETE====================//
const removeUser = async (body) => {
  try {
    const remove = await User.destroy({
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

//=================FIND BY email====================//
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    return {
      message: "success",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

const findUserByFB_id = async (fb_id) => {
  try {
    const user = await User.findOne({
      where: { fb_id: fb_id },
    });
    return {
      message: "success",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addUser,
  findAllUser,
  findOneUser,
  updateUser,
  removeUser,
  LoginUserService,
  findUserByEmail,
  findUserByFB_id
};
