const LikeSound = require("../models/likeSoundModel");
const sequelize = require("../config/applicationDb");
const { response } = require("../helpers/response");
const Sound = require("../models/soundModel");

const addLikeSound = async (body) => {
  try {
    const create = await LikeSound.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};

const findAllLikeSound = async (body, limit, page) => {
  try {
    const findAll = await LikeSound.findAll({
      where: body,
      limit: limit,
      offset: limit * (page - 1),
    });
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

const findOneLikeSound = async (body) => {
  try {
    console.log(body);
    const findOne = await LikeSound.findOne({
      where: body,
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

const updateLikeSound = async (id, body) => {
  try {
    const update = await LikeSound.update(body, {
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

const removeLikeSound = async (body) => {
  try {
    const remove = await LikeSound.destroy({
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

const findLike = async (body, limit = 10, page = 1) => {
  try {
    const findAll = await sequelize.query(
      `SELECT s2.id as id,
              s2.name as name,
              s2.description as description,
              s2.content as content,
              s2.count_views as count_views,
              s2.count_likes as count_likes,
              s2.created_at as created_at,
              s2.updated_at as updated_at, 
              ${
                body.user_id
                  ? `IF (ls.user_id=${body.user_id} AND ls.active=true,true,false)`
                  : false
              } as isLike,
              CONCAT('uploads/image/',c3.name ,'/',c2.name ,'/',s2.img_thumb) as img_thumb,
              CONCAT('uploads/image/',c3.name ,'/',c2.name ,'/',s2.img_banner) as img_banner,
              CONCAT('uploads/sound/',c3.name ,'/',c2.name ,'/',s2.sound_file) as sound_file,
              CONCAT('uploads/sound/',c3.name ,'/',c2.name ,'/',s2.sound_preview) as sound_preview,
              CONCAT('uploads/sound/',c3.name ,'/',c2.name ,'/',s2.sound_url) as sound_url
        FROM sound s2
        join sound_category sc on sc.sound_id =s2.id 
        join category c2 on c2.id =sc.category_id 
        join category c3 on c3.id =c2.parent_id 
        join like_sound ls on ls.sound_id = s2.id and ls.user_id= ${
          body.user_id
        } and ls.active=true
        ${body.name ? `WHERE s2.name LIKE '%${body.name}%'` : ""}
        LIMIT ${limit * (page - 1)}, ${limit};
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return response("success", findAll);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addLikeSound,
  findAllLikeSound,
  findOneLikeSound,
  updateLikeSound,
  removeLikeSound,
  findLike,
};
