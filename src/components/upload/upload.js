const AWS = require("aws-sdk");
const fs = require("fs");
const express = require("express");
const uuid = require("uuid");
const multer = require("multer");
const path = require("path");
const mkdirp = require("mkdirp");

const router = express.Router();
// AWS.config.update({
//   region: 'ap-southeast-1',
//   accessKeyId: 'AKIA4VEH4KI5KQBMRNUN',
//   secretAccessKey: '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'
// });

const storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(path.join(__dirname, "../../../uploads/avatars/"))) {
      const made = mkdirp.sync(path.join(__dirname, "../../../uploads/avatars/"));
      console.log(`made directories, starting with ${made}`);
    }
    // fs.mkdirSync(path.join(__dirname, "../../../uploads/avatars/"), {
    //   recursive: true,
    // });
    cb(null, "./uploads/avatars/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageDisk });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  if (!req.file || !req.file.path)
    return res.json({ link: "", file: req.file });
  else
    return res.json({
      link: `${req.file.path}`,
    });
});

module.exports = router;
