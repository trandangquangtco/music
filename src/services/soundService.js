//====================IMPORT CUSTOM====================//

const { response } = require("../helpers/response");
const sequelize = require("../config/applicationDb");
const Sound = require("../models/soundModel");

// Category.hasMany(SoundCategory, {
//   foreignKey: "id",
// });
// Sound.hasOne(SoundCategory, {
//   foreignKey: "sound_id",
// });
// SoundCategory.belongsTo(Category, {
//   foreignKey: "category_id",
// });
// SoundCategory.belongsTo(Sound, {
//   foreignKey: "id",
// });

// Category.hasOne(Category, {
//   foreignKey: "id",
// });
// Category.belongsTo(Category, {
//   foreignKey: "parent_id",
// });

//=====================REFERENCE=======================//

//=====================CREATE======================//
// const addSound = async (body) => {
//   try {
//     const create = await Sound.create(body);
//     return response("success", create);
//   } catch (error) {
//     throw error;
//   }
// };

//=====================GET LIST======================//
const findAllSound = async (body, limit, page) => {
  try {
    const join = `
    FROM sound s2
    join sound_category sc on sc.sound_id =s2.id 
    join category c2 on c2.id =sc.category_id 
    join category c3 on c3.id =c2.parent_id 
    left join like_sound ls on ls.sound_id = s2.id  ${
      body.user_id
        ? `and ls.user_id= ${body.user_id}`
        : `and ls.id=(SELECT MAX(ls2.id) FROM like_sound ls2 where ls2.sound_id=s2.id)`
    } 
    ${body.name ? `WHERE s2.name LIKE '%${body.name}%'` : ""}`;

    const count =
      (
        await sequelize.query(`SELECT COUNT(s2.id) as count` + join, {
          type: sequelize.QueryTypes.SELECT,
        })
      )[0]?.count || 0;

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
        ${join}
        LIMIT ${limit * (page - 1)}, ${limit};
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
    return response("success", { count, rows: findAll });
  } catch (error) {
    throw error;
  }
};

//=====================GET ONE======================//
// const findOneSound = async (body) => {
//   try {
//     const findOne = await Sound.findOne({
//       where: body,
//       include: [
//         {
//           model: User,
//           attributes: ["name", "avatar"],
//         },
//       ],
//     });
//     return response("success", findOne);
//   } catch (error) {
//     throw error;
//   }
// };

//=====================UPDATE======================//
// const updateSound = async (id, body) => {
//   try {
//     const update = await Sound.update(body, {
//       where: id,
//       returning: true,
//       plain: true,
//     });
//     return {
//       message: "success",
//       data: update,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

//=====================DELETE======================//
// const removeSound = async (body) => {
//   try {
//     const remove = await Sound.destroy({
//       where: body,
//     });
//     return {
//       message: "success",
//       data: remove,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

const incSoundCountLikes = async (id, status) => {
  try {
    let inc = "+ 1";
    if (!status) inc = "- 1";
    await Sound.update(
      { count_likes: sequelize.literal("count_likes " + inc) },
      { where: { id: id } }
    );
  } catch (error) {
    throw error;
  }
};

const incSoundCountViews=async(id)=>{
  try {
    const update= await Sound.update({count_views:sequelize.literal("count_views + 1")},{where:{id:id}})
    if(update[0]==0) throw Error("Sound does not exist!")
  } catch (error) {
    throw error
  }
}

module.exports = {
  //   addSound,
  findAllSound,
  incSoundCountLikes,
  incSoundCountViews
  //   findOneSound,
  //   updateSound,
  //   removeSound,
  //   randSound,
};
