const express = require("express");
const createError = require("http-errors");
const logEvents = require("../helpers/logEvents.js");
const { v4: uuid } = require("uuid");
require("dotenv").config();
const UPLOADED_FOLDER = "./" + process.env.UPLOADED_FOLDER;

let router = express.Router();
router.use("/auth", require("./authRouter"));
router.use("/user", require("./userRouter"));
router.use("/category", require("./categoryRouter"));
router.use("/order", require("./orderRouter"));
router.use("/orderDetail", require("./orderDetailRouter"));
router.use("/banner", require("./bannerRouter"));
router.use("/slider", require("./sliderRouter"));
router.use("/comment", require("./commentRouter"));
router.use("/product", require("./productRouter"));
router.use("/role", require("./roleRouter"));
router.use("/contact", require("./contactRouter"));

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    res.send("hello");
  });

  router.use((req, res, next) => {
    next(createError.NotFound("Not Found !"));
  });

  router.use((err, req, res, next) => {
    let contentLog = `idError:${uuid()} --- ${req.url} --- ${req.method} --- ${err.message
      }`;
    logEvents(contentLog);
    if (!err.status) {
      err["status"] = 500;
    }

    res.status(err.status).json({
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    });
  });

  app.get("/uploads/:folder/:fileName", function (req, res) {
    const filePath = UPLOADED_FOLDER + "/" + req.params.fileName;
    console.log(filePath);
    res.status(200).sendFile(req.params.fileName, {
      root: UPLOADED_FOLDER + `/${req.params.folder}`,
    });
  });

  return app.use("/api/v1", router);
};

module.exports = initWebRoutes;
