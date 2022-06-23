const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const BuoyClass = require("../lib/Buoy");
const Buoy = require("../models/Buoy");

// get all
router.get("/", async (req, res, next) => {
  try {
    const allBuoys = await Buoy.find({});
    console.log(allBuoys);
    res.status(200).json(allBuoys);
  } catch (e) {
    res.status(400).json(e);
  }
});

//get one
router.get("/:id", async (req, res, next) => {
  try {
    const foundBuoy = await Buoy.findById(req.params.id);
    res.status(200).json(foundBuoy);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const createdBuoy = await Buoy.create(req.body);
    res.status(200).json(createdBuoy);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const updatedBuoy = await Buoy.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.status(200).json(updatedBuoy);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedBuoy = await Buoy.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBuoy);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
