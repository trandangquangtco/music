const express = require("express");
const _ = require("lodash");
const { fail, response } = require("../../helpers/response");
const {
  findOneSong,
  findAllSong,
  randSong,
} = require("../../services/songService");
const { findAllGenre, genresDetail } = require("../../services/genreService");
const { findAllArtist } = require("../../services/artistService");
const { orderByService } = require("./homeService");
const {
  findAllCategory,
  findOneInfor,
} = require("../../services/categoryService");
const { listDetailCategory } = require("../../services/soundCategoryService");
const { incSoundCountViews } = require("../../services/soundService");
const router = express.Router();

const { verifyToken } = require("../../helpers/token");
router.post("/all-song", async (req, res) => {
  try {
    const { body } = req;
    const input = _.omit(body, ["limit", "page"]);
    const read = await findAllSong(
      input,
      parseInt(req.body.limit) || 50,
      parseInt(req.body.page) || 1
    );
    res.json(read);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/song-detail", async (req, res) => {
  try {
    const readOne = await findOneSong(req.body);
    res.json(readOne);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/song/sort", async (req, res) => {
  try {
    const { body } = req;
    if (!body.sort) {
      res
        .status(400)
        .json(fail("fail", "BadRequest", "sort field is required"));
    }
    const input = _.omit(body, ["sort", "limit", "page"]);
    const read = await orderByService(
      body.sort,
      input,
      parseInt(req.body.limit) || 50,
      parseInt(req.body.page) || 1
    );
    res.json(response("success", read, "OK", 200));
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/tracks", async (req, res) => {
  try {
    const { body } = req;
    const tracks = await randSong(body);
    res.json(tracks);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/new-realease", async (req, res) => {
  try {
    const { body } = req;
    const tracks = await randSong(body);
    res.json(tracks);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/recent-played", async (req, res) => {
  try {
    const { body } = req;
    const tracks = await randSong(body);
    res.json(tracks);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/genres-music", async (req, res) => {
  try {
    const { body } = req;
    const genres = await findAllGenre(body, body.limit, body.page);
    res.json(genres);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.post("/genres-detail", async (req, res) => {
  try {
    const { body } = req;
    const genres = await genresDetail(body);
    res.json(genres);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.get("/artists", async (req, res) => {
  try {
    const { name } = req.query;
    const artists = await findAllArtist(name);
    res.json(artists);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.get("/categorys", async (req, res) => {
  try {
    const name = req.query["name"];
    const category = await findAllCategory(name);
    res.json(category);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.get("/category-detail/:id", async (req, res) => {
  try {
    const id = req.params["id"];
    const query = {
      name: req.query["name"],
    };
    try {
      const decode = verifyToken(req.headers.token);
      query.user_id = decode.id;
    } catch (error) {}

    if (!id)
      return res.status(400).json(fail("error", "Need to send id of category"));

    const categoryDetail = await listDetailCategory(
      id,
      query,
      Number(req.query["limit"] || 10),
      Number(req.query["page"] || 1)
    );
    res.json(categoryDetail);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

router.get("/category/:id", async (req, res) => {
  try {
    let user_id = "";
    try {
      const decode = verifyToken(req.headers.token);
      user_id = decode.id;
    } catch (error) {}

    const category_id = req.params["id"];
    const query = { user_id: user_id, category_id };
    const category = await findOneInfor(query);
    res.json(response("success", category));
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

router.put("/sound/listen/:id", async (req, res) => {
  try {
    const sound_id = req.params["id"];
    await incSoundCountViews(sound_id);
    res.json(response("success", { id: sound_id }));
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

module.exports = router;
