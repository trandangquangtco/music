const router = require("express").Router();
const { omit } = require("lodash");
const { fail, response } = require("../../helpers/response");
const { verifyToken } = require("../../helpers/token");

const { incSoundCountLikes } = require("../../services/soundService");
const {
  addLikeSound,
  findLike,
  findOneLikeSound,
  updateLikeSound,
} = require("../../services/likeSoundService");
const Joi = require("joi");
//=================LIKE + UNLIKE====================//
router.post("/like", async (req, res) => {
  try {
    const userId = verifyToken(req.headers.token);
    const schema = Joi.object({
      sound_id: Joi.number().required(),
    });
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error } = schema.validate(req.body, options);
    if (error) return res.status(400).json(error.details);
    const body = {
      user_id: userId.id,
      sound_id: req.body.sound_id,
    };
    const checkLikeExist = await findOneLikeSound(body);
    if (!checkLikeExist.data) {
      const create = await addLikeSound(body);
      await incSoundCountLikes(body.sound_id, 1);
      res.json(
        response("success", {
          id: create.data.sound_id,
          isLike: 1,
        })
      );
    } else {
      const input = {
        active: !checkLikeExist.data.active,
      };
      const update = await updateLikeSound(
        { id: checkLikeExist.data.id },
        input
      );
      await incSoundCountLikes(body.sound_id, input.active);
      res.json(
        response("success", {
          id: checkLikeExist.data.sound_id,
          isLike: checkLikeExist.data.active ? 0 : 1,
        })
      );
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

//=================GET LIST BY USER====================//
router.get("/read", async (req, res) => {
  try {
    const decode = verifyToken(req.headers.token);
    const { query } = req;
    query.user_id = decode.id;
    const input = omit(query, ["limit", "page"]);
    const readAll = await findLike(
      input,
      parseInt(query.limit) || 50,
      parseInt(query.page) || 1
    );
    res.json(readAll);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

module.exports = router;
