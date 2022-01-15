//=================IMPORT====================//
const express = require("express");
const { signTokenLogin } = require("../../helpers/token");
const { fail, response } = require("../../helpers/response");
const {
  findUserByEmail,
  addUser,
  updateUser,
  findOneUser,
  findUserByFB_id,
} = require("../../services/userService");
const { checkPassword, hashPassword } = require("../../helpers/hashPassword");
const { sendMail } = require("../../components/mail/Mail");
const { addToken, findToken } = require("../../services/tokenService");
const router = express.Router();
const Joi = require("joi");
//=================GET ONE====================//
router.post("/login", async (req, res) => {
  try {
    const readOne = await findUserByEmail(req.body.email);
    if (!readOne.data) {
      res.status(500).json(fail("error", "Invalid email"));
    } else {
      if (!checkPassword(req.body.password, readOne.data.password)) {
        res.status(500).json(fail("error", "Wrong password"));
      } else {
        const token = signTokenLogin(readOne.data.toJSON());
        readOne.token = token;
        await updateUser(readOne.data.id, { token: token });
        res.json(readOne);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(fail("error", error.message));
  }
});

//=================CREATE BY GG====================//
router.post("/signin/gg", async (req, res) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().required().email(),
    });
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error } = schema.validate(req.body, options);
    if (error) return res.status(500).json(error.details);
    const { email, name, avatar } = req.body;
    const checkExist = await findOneUser({ email });
    const compareData = checkExist.data;
    if (compareData) {
      if (name != compareData.name || avatar != compareData.avatar) {
        await updateUser(compareData.id, { name, avatar });
      }
      const payload = {
        id: compareData.id,
        createdAt: Date.now(),
      };
      const token = signTokenLogin(payload);
      await updateUser(payload.id, { token: token });
      const user = await findUserByEmail(email);
      res.json(response("success", { user: user.data, token }));
    } else {
      const create = await addUser({ email, name, avatar });
      const payload = {
        id: create.data.id,
        createdAt: Date.now(),
      };
      const token = signTokenLogin(payload);
      await updateUser(payload.id, { token: token });
      const user = await findUserByEmail(email);
      res.json(response("success", { user: user.data, token }));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(fail("error", error.message));
  }
});

//=================CREATE BY FB====================//
router.post("/signin/fb", async (req, res) => {
  try {
    const { fb_id, name, avatar } = req.body;
    const checkExist = await findOneUser({ fb_id });
    const compareData = checkExist.data;

    if (compareData) {
      if (name != compareData.name || avatar != compareData.avatar) {
        await updateUser(compareData.id, { name, avatar });
      }
      const payload = {
        id: compareData.id,
        createdAt: Date.now(),
      };
      const token = signTokenLogin(payload);
      await updateUser(payload.id, { token: token });
      const user = await findUserByFB_id(fb_id);
      res.json(response("success", { user: user.data, token: token }));
    } else {
      const create = await addUser({ fb_id, name, avatar });
      const payload = {
        id: create.data.id,
        createdAt: Date.now(),
      };
      const token = signTokenLogin(payload);
      await updateUser(payload.id, { token: token });
      const user = await findUserByFB_id(fb_id);
      res.json(response("success", { user: user.data, token: token }));
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

//=================REGISTER====================//
router.post("/register", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email({allowUnicode:false}),
    });
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error } = schema.validate(req.body, options);
    if (error) return res.status(500).json(error.details);
    const readOne = await findUserByEmail(req.body.email);
    if (readOne.data) {
      res.status(500).json(fail("error", "Email exist"));
    } else {
      const passwordHashed = hashPassword(req.body.password);
      const { body } = req;
      body.password = passwordHashed;
      const create = await addUser(body);
      res.json(create);
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user.data) {
      res.status(500).json(fail("error", "Invalid email"));
    } else {
      const timeStr = new Date().getTime().toString();
      const code = timeStr.substring(timeStr.length - 4, timeStr.length);
      const token = await addToken({
        user_id: user.data.id,
        token: String(code),
      });
      sendMail(req.body.email, "Verification code from grafsound", code);
      res.json({ message: "Sent verification code to email" });
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

router.post("/forgot-password/confirm", async (req, res) => {
  try {
    const token = await findToken(req.body.token);
    if (!token.data) {
      res.status(500).json(fail("error", "Invalid confirmation code"));
    } else {
      res.json({
        message: "Verification successfully",
        userId: token.data.user_id,
      });
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

router.post("/forgot-password/new", async (req, res) => {
  try {
    const body = { password: hashPassword(req.body.password) };
    const updated = await updateUser(req.body.id, body);
    res.json({ message: "Update password successfully" });
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user.data)
      res.status(500).json(fail("error", "No valid users were found"));
    if (!checkPassword(req.body.password, user.data.password)) {
      res.status(500).json(fail("error", "Wrong password"));
    } else {
      const body = { password: hashPassword(req.body.newpass) };
      const token = signTokenLogin(user.data);
      user.token = token;
      await updateUser(user.data.id, { token: token, ...body });
      res.json(user);
    }
  } catch (error) {
    res.status(500).json(fail("error", error.message));
  }
});

module.exports = router;
