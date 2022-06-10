const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Buoy = require("../models/Buoy");

router.get("/", (req, res, next) => {
  try {
    setInterval(() => {
      console.log("this interval is goiiing now");
    }, 5 * 1000);
    res.status(200).json("Swelter Backend: The scrape service has initialized");
  } catch (e) {
    res.status(400).json("Swelter Backend: " + e);
  }
});

module.exports = router;
