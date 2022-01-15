//==================IMPORT=====================//
const Genre = require("../models/genreModel");
const { response } = require("../helpers/response");
const { Op } = require("sequelize");
const Song = require("../models/songModel");

Genre.hasMany(Song, {
  foreignKey: "id",
});
Song.belongsTo(Genre, { foreignKey: "genre_id" });
//=================CREATE====================//
const addGenre = async (body) => {
  try {
    const create = await Genre.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};

//=================GET LIST====================//

const findAllGenre = async (body, limit = 10, page = 1) => {
  try {
    const where = {};
    if (body.name) where.name = { [Op.like]: `%${body.name}%` };
    const findAll = await Genre.findAll({
      where: where,
      limit: limit,
      offset: limit * (page - 1),
    });
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

//=================GET ONE====================//

const findOneGenre = async (body) => {
  try {
    const findOne = await Genre.findOne({
      where: body,
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

//=================UPDATE====================//
const updateGenre = async (id, body) => {
  try {
    const update = await Genre.update(body, {
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
const removeGenre = async (body) => {
  try {
    const remove = await Genre.destroy({
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

const genresDetail = async (body) => {
  try {
    const detail = await Song.findAll({
      where: { genre_id: body.id },
      include: [
        {
          model: Genre,
        },
      ],
    });
    return {
      message: "success",
      data: detail,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addGenre,
  findAllGenre,
  findOneGenre,
  updateGenre,
  removeGenre,
  genresDetail,
};
