const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db/db");

// Cors
const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware

// Models

// Controllers
const buoyController = require("./controllers/buoy");
app.use("/buoy", buoyController);

app.listen(PORT, () => {
  console.log("Swelter Backend: Now listening on port ", PORT);
});
