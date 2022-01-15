//=================IMPORT MODULE====================//
const express = require("express");
const bodyParser = require("body-parser");
const { checkAdmin, checkLogin } = require("./src/middlewares/middleware");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("./src/models/index");

//=================IMPORT ROUTER ADMIN====================//
const adminRouter = require("./src/controllers/admin/adminRouter");
const authAdminRouter = require("./src/controllers/admin/authRouter");
const userAdminRouter = require("./src/controllers/admin/userRouter");
const artistAdminRouter = require("./src/controllers/admin/artistRouter");
const songAdminRouter = require("./src/controllers/admin/songAdminRouter");
const genreAdminRouter = require("./src/controllers/admin/genreRouter");
const kindAdminRouter = require("./src/controllers/admin/kindRouter");
const playlistAdmin = require("./src/controllers/admin/playlistAdminRouter");
const Playlistadminsong = require("./src/controllers/admin/playlistadminsongRouter");

//=================IMPORT ROUTER USER====================//
const userRouter = require("./src/controllers/users/userRouter");
const authRouter = require("./src/controllers/users/authRouter");
const songRouter = require("./src/controllers/users/songRouter");
const artistRouter = require("./src/controllers/users/artistRouter");
const uploadRouter = require("./src/components/upload/upload");
const listenRouter = require("./src/components/home/listenRouter");
const genreRouter = require("./src/controllers/admin/genreRouter");
const loginRouter = require("./src/components/login/loginRouter");
const albumRouter = require("./src/controllers/users/albumRouter");
const playlistRouter = require("./src/controllers/users/playlistRouter");
const playlistsongRouter = require("./src/controllers/users/playlistsongRouter");
const likeSongRouter = require("./src/controllers/users/likeSongRouter");
const likeSoundRouter = require("./src/controllers/users/likeSoundRouter");
const soundRouter = require("./src/controllers/users/soundRouter");
const categoryRouter=require("./src/controllers/users/categoryRouter")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
//No authen
app.use("/user-auth", authRouter);
app.use("/admin-auth", authAdminRouter);
app.use("/home", listenRouter);
app.use("/home", artistRouter);
app.use("/all-sound", soundRouter);
app.use(uploadRouter);
//Authen by Admin
app.use("/admin", checkAdmin, adminRouter);
app.use("/admin", userAdminRouter);
app.use("/admin/kind", kindAdminRouter);
app.use("/admin/genre", genreAdminRouter);
app.use("/admin/playlist", playlistAdmin);
app.use("/admin/playlist/list", Playlistadminsong);
app.use("/admin/artist", artistAdminRouter);
app.use("/admin/song", songAdminRouter);

//Authen by User
app.use("/user", checkLogin, userRouter);
app.use("/user/song", songRouter);
app.use("/user/artist", artistRouter);
app.use("/user/file", uploadRouter);
app.use("/user/album", albumRouter);
app.use("/user/playlist", playlistRouter);
app.use("/user/playlist/list", playlistsongRouter);
app.use("/user/likesong", likeSongRouter);
app.use("/user/like-sound", likeSoundRouter);
app.use("/user/like-category",categoryRouter)
app.use("/user/genre", genreRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`connect to ${process.env.PORT || 8000}`);
});
