const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const BuoyClass = require("../lib/Buoy");
const Buoy = require("../models/Buoy");
dayjs().format();

router.get("/", (req, res, next) => {
  try {

    // Harvest Buoy Monitoring
    const firstBuoy = new BuoyClass(
      "Harvest",
      "https://www.ndbc.noaa.gov/station_page.php?station=46218",
      [
        "#data > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(8)",
        "#data > table:nth-child(4) > tbody > tr:nth-child(4) > td:nth-child(8)",
      ]
    );

    setInterval(async () => {
      // every 30 mins, scrape the buoy and read the data.
      // if data is >15 DPD && the last notification sent was over 2 hours ago && the time window is satisfied
      // send push notification to subscribers of the buoy
      await firstBuoy.scrapeBuoy();
      if (
        firstBuoy.values.filter((val) => val > 15).length > 1 &&
        firstBuoy.lastNotification.isBefore(
          dayjs().subtract(firstBuoy.cooldown, "hour")
        )
      ) {
        firstBuoy.alert("It's FIRING!!");
      }
    }, 30 * 60 * 1000);

    res.status(200).json("Swelter Backend: The scrape service has initialized");
  } catch (e) {
    res.status(400).json("Swelter Backend: " + e);
});

module.exports = router;
