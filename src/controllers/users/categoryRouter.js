const router = require("express").Router();
const { omit } = require("lodash");
const { fail, response } = require("../../helpers/response");
const { verifyToken } = require("../../helpers/token");

const {
  addLikeCategory,
  updateLikeCategory,
  findOne,
  incCategoryLikes
} = require("../../services/categoryService");

router.post("/like", async (req, res) => {
  try {
    const decode = verifyToken(req.headers.token);
    const category_id = req.body.category_id;
    if (!category_id)
      return res
        .status(400)
        .json(fail("error", "You need to send category_id"));
    const body = { user_id: decode.id, category_id };
    const checkExist = await findOne(body);
    if (!checkExist.data) {
      const create = await addLikeCategory(body);
      await incCategoryLikes(body.category_id, 1);
      res.json(
        response("success", {
          id: create.data.category_id,
          isLike: 1,
        })
      );
    } else {
      const input = {
        active: !checkExist.data.active,
      };
      await updateLikeCategory({ id: checkExist.data.id }, input);
      await incCategoryLikes(body.category_id, input.active);
      res.json(
        response("success", {
          id: checkExist.data.category_id,
          isLike: checkExist.data.active ? 0 : 1,
        })
      );
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

module.exports = router;
