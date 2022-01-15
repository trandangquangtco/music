const Category = require("../models/categoryModel");
const { response } = require("../helpers/response");
const sequelize = require("../config/applicationDb");
const { Op } = require("sequelize");
const LikeCategory = require("../models/likeCategoryModel");
Category.hasMany(Category, {
  foreignKey: "parent_id",
});
Category.belongsTo(Category, { foreignKey: "id" });
const findAllCategory = async (name) => {
  try {
    const where = {};
    if (name)
      where[Op.or] = [
        { name: { [Op.like]: `%${name}%` } },
        {
          "$categories.name$": {
            [Op.like]: `%${name}%`,
          },
        },
      ];
    const categorys = await Category.findAll({
      attributes: {
        include: [
          [
            sequelize.fn(
              "CONCAT",
              "uploads/image/",
              sequelize.col("category.name"),
              "/",
              sequelize.col("category.img_thumb")
            ),
            "img_thumb",
          ],
          [
            sequelize.fn(
              "CONCAT",
              "uploads/image/",
              sequelize.col("category.name"),
              "/",
              sequelize.col("category.img_banner")
            ),
            "img_banner",
          ],
        ],
      },
      where,
      include: [
        {
          model: Category,
          required: true,
          attributes: {
            include: [
              [
                sequelize.fn(
                  "CONCAT",
                  "uploads/image/",
                  sequelize.col("category.name"),
                  "/",
                  sequelize.col("categories.name"),
                  "/",
                  sequelize.col("categories.img_thumb")
                ),
                "img_thumb",
              ],
              [
                sequelize.fn(
                  "CONCAT",
                  "uploads/image/",
                  sequelize.col("category.name"),
                  "/",
                  sequelize.col("categories.name"),
                  "/",
                  sequelize.col("categories.img_banner")
                ),
                "img_banner",
              ],
            ],
          },
        },
      ],
    });
    return response("success", categorys);
  } catch (error) {
    throw error;
  }
};
const addLikeCategory = async (body) => {
  try {
    const create = await LikeCategory.create(body);
    return response("success", create);
  } catch (error) {
    throw error;
  }
};
const updateLikeCategory = async (id, body) => {
  try {
    const update = await LikeCategory.update(body, {
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

const findOne = async (body) => {
  try {
    const findOne = await LikeCategory.findOne({
      where: body,
    });
    return response("success", findOne);
  } catch (error) {
    throw error;
  }
};

const incCategoryLikes = async (id, status) => {
  try {
    let inc = "+ 1";
    if (!status) inc = "- 1";
    await Category.update(
      { count_likes: sequelize.literal("count_likes" + inc) },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};

const findOneInfor = async (body) => {
  try {
    const findOne = await sequelize.query(
      `SELECT 
      c.id as id,
      c.name as name,
      c.count_likes as count_likes,
      c.count_views as count_views,
      CAST(COALESCE( SUM( s2.count_views ),0) as UNSIGNED) as  count_listens,
      c.created_at as created_at,
      c.updated_at as updated_at,
      c.category_type as category_type,
      c.is_active as is_active,
      c.parent_id as parent_id,
      c.content as content,
      c.description as description,
      CONCAT('uploads/image/' ,c2.name ,'/',c.name ,'/',c.img_thumb) as img_thumb,
      CONCAT('uploads/image/' ,c2.name ,'/',c.name ,'/',c.img_banner) as img_banner,
      ${
        body.user_id
          ? `IF (lc.user_id=${body.user_id} AND lc.active=true,true,false)`
          : false
      } as isLike
     FROM category c 
     join category c2 on c2.id = c.parent_id 
     left join like_category lc on lc.category_id = c.id ${
      body.user_id
        ? `and lc.user_id= ${body.user_id}`
        : `and lc.id=(SELECT MAX(lc2.id) FROM like_category lc2 where lc2.category_id=c.id)`
    } 
     left join sound_category sc on sc.category_id = c.id
     left join sound s2 on s2.id = sc.sound_id
     ${body.category_id ? `WHERE c.id = ${body.category_id}` : ""}
     `,
     { type: sequelize.QueryTypes.SELECT }
    );
    return findOne[0]
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllCategory,
  addLikeCategory,
  updateLikeCategory,
  findOne,
  incCategoryLikes,
  findOneInfor
};
