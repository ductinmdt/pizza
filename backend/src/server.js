const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./api/v1/routes/web.js");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

// use .env
require("dotenv").config();

// config
const corsConfig = {
  origin: true,
  credentials: true,
};

// Middleware
const app = express();
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(morgan("dev"));
app.use(cookieParser());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// )

// app.use(express.static(process.env.UPLOADED_FOLDER));
// config app
// app.use(bodyParser.json({ limit: '50mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// init routes
initWebRoutes(app);
//file retrieve

// declare PORT
let port = process.env.PORT || 5000;

// start server
app.listen(port, () => {
  //callback
  console.log("Server is runing on the port : " + port);
});
