const SoundCategory = require("../models/soundCategoryModel");
const Sound = require("../models/soundModel");
const Category = require("../models/categoryModel");
const { response } = require("../helpers/response");
const sequelize = require("../config/applicationDb");
const { Op } = require("sequelize");

Category.hasMany(SoundCategory, {
  foreignKey: "id",
});
Sound.hasMany(SoundCategory, {
  foreignKey: "id",
});
SoundCategory.belongsTo(Category, {
  foreignKey: "category_id",
});
SoundCategory.belongsTo(Sound, {
  foreignKey: "sound_id",
});

const listDetailCategory = async (category_id, query, limit = 10, page = 1) => {
  try {
    const categoryDetail = await sequelize.query(
      `SELECT s2.id as id,
              s2.name as name,
              s2.description as description,
              s2.content as content,
              s2.count_views as count_views,
              s2.count_likes as count_likes,
              s2.created_at as created_at,
              s2.updated_at as updated_at, 
              ${
                query.user_id
                  ? `IF (ls.user_id=${query.user_id} AND ls.active=true,true,false)`
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
        left join like_sound ls on ls.sound_id = s2.id ${
          query.user_id ? `and ls.user_id= ${query.user_id}` : `and ls.id=(SELECT MAX(ls2.id) FROM like_sound ls2 where ls2.sound_id=s2.id)`
        } 
        WHERE c2.id=${category_id} ${
        query.name ? `AND s2.name LIKE '%${query.name}%'` : ""
      }
        LIMIT ${limit * (page - 1)}, ${limit};
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return response("success", categoryDetail);
  } catch (error) {
    throw error;
  }
};

module.exports = { listDetailCategory };
