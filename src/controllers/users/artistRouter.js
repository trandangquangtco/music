//=================IMPORT====================//
const express = require("express");
const { omit } = require("lodash");
const { findOneArtist } = require("../../services/artistService");
const { fail } = require("../../helpers/response");
const { addArtist } = require("../../services/artistService");
const { hashPassword } = require("../../helpers/hashPassword");
const { verifyToken } = require("../../helpers/token");
const Joi = require("joi");
const router = express.Router();

//=================GET ONE====================//
router.post("/read-one", async (req, res) => {
  try {
    const readOne = await findOneArtist(req.body);
    res.json(readOne);
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

//=================CREATE====================//
router.post("/create", async (req, res) => {
  try {
    const schema = Joi.object({
      password: Joi.string().required(),
      "password-confirmation": Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      avatar: Joi.string(),
      description: Joi.string(),
    });
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error } = schema.validate(req.body, options);
    if (error) return res.status(400).json(error.details);
    if (req.body.password != req.body["password-confirmation"])
      return res
        .status(500)
        .json(
          fail("error", "Your password and confirmation password do not match")
        );
    const decode = verifyToken(req.headers.token);
    const body = {
      user_id: decode.id,
      genre: req.body.genres,
      name: req.body.name,
      email: req.body.email,
      password: hashPassword(req.body.password),
      country: req.body.country,
      avatar: req.body.avatar,
      description: req.body.description,
    };
    const create = await addArtist(body);
    res.json(create);
  } catch (error) {
    res
      .status(500)
      .json(fail("error", error.errors || error.message));
  }
});

//=================UPDATE====================//
router.post("/update", async (req, res) => {
  try {
    const { body } = req;
    if (!body.id) {
      res.json(fail("InvalidId", "Id must be fill"));
    }
    const readOne = await findOneArtist({ id: req.body.id });
    if (!readOne.data) {
      res.json(fail("IdNotFound", "Id is not exist"));
    } else {
      const input = {
        genre: body.genre,
      };
      await updateArtist({ id: body.id }, input);
      const readOne = await findOneArtist({ id: body.id });
      res.json(readOne);
    }
  } catch (error) {
    res.json(fail("error", error.message));
  }
});

module.exports = router;
