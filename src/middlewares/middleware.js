const { fail } = require("../helpers/response");
const { findOneAdmin } = require("../services/adminService");
const { verifyToken } = require("../helpers/token");
const { findOneUser } = require("../services/userService");

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.json(fail("unAuthenticate", "token is required"));
    } else {
      const decode = verifyToken(token);
      const readOne = await findOneAdmin({ id: decode.id });
      if (!readOne.data) {
        res.status(401).json(fail("unAuthorized", "admin is required"));
      } else {
        if (token != readOne.data.token) {
          res.json(fail("InvalidLogin", "token is not match"));
        } else {
          next();
        }
      }
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      res.status(408).json(fail("TimeOutLogin", error.message, "fail"));
    } else {
      res.json(fail("error", error.message));
    }
  }
};

const checkLogin = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(500).json(fail("unAuthenticate", "token is required"));
    } else {
      const decode = verifyToken(token);
      const id = decode.id;
      const readOne = await findOneUser({ id: id });
      if (!readOne.data) {
        res.status(500).json(fail("InvalidToken", "token not found"));
      } else {
        if (token != readOne.data.token) {
          res.status(500).json(fail("InvalidLogin", "token is not match"));
        } else {
          next();
        }
      }
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      res.status(408).json(fail("TimeOutLogin", error.message, "fail"));
    } else {
      res.status(500).json(fail("error", error.message));
    }
  }
};

module.exports = { checkAdmin, checkLogin };
