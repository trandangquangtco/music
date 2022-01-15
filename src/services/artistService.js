//=================IMPORT====================//
const Artist = require("../models/artistModel");
const { response } = require("../helpers/response");
const User = require("../models/userModel");
const { Op } = require("sequelize");

//=================CREATE====================//
const addArtist = async (body) => {
  try {
    const find = await Artist.findOne({ where: { user_id: body.user_id } });
    if (find) throw new Error("Your account has created a Artist");
    const create = await Artist.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};

//=================GET LIST====================//
const findAllArtist = async (name) => {
  try {
    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    const findAll = await Artist.findAll({
      where: where,
      include: [{ model: User }],
    });
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

//=================GET ONE====================//
const findOneArtist = async (body) => {
  try {
    const findOne = await Artist.findOne({
      where: body,
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

//=================UPDATE====================//
const updateArtist = async (id, body) => {
  try {
    const update = await Artist.update(body, {
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

//=================DELETE====================//
const removeArtist = async (body) => {
  try {
    const remove = await Artist.destroy({
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

module.exports = {
  addArtist,
  findAllArtist,
  findOneArtist,
  updateArtist,
  removeArtist,
};
