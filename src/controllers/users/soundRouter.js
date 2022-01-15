const express = require("express");
const { findAllSound } = require("../../services/soundService");
const { fail } = require("../../helpers/response");
const { verifyToken } = require("../../helpers/token");
const { omit } = require("lodash");
const { listDetailCategory } = require("../../services/soundCategoryService");
const router = express.Router();

//=====================CREATE======================//
// router.post('/create', async (req, res) => {
//   try {
//     const { body } = req
//     const decode = verifyToken(req.headers.token)
//     body.user_id = decode.id
//     const input = omit(body, ['status', 'approved', 'active'])
//     const create = await addSong(input)
//     res.json(create)
//   } catch (error) {
//     res.json(fail('error', error.message))
//   }
// })

//=====================GET LIST======================//
router.get("/", async (req, res) => {
  try {
    const { query } = req;
    try {
      const decode = verifyToken(req.headers.token);
      query.user_id = decode.id;
    } catch (error) {}

    const input = omit(query, ["limit", "page"]);
    const read = await findAllSound(
      input,
      parseInt(req.query.limit) || 50,
      parseInt(req.query.page) || 1
    );
    res.json(read);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

//=====================GET ONE======================//
// router.post('/read-one', async (req, res) => {
//   try {
//     const readOne = await findOneSong(req.body)
//     res.json(readOne)
//   } catch (error) {
//     res.json(fail('error', error.message))
//   }
// })

module.exports = router;
