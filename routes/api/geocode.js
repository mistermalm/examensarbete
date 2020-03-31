const express = require('express');
const router = express.Router();
const geocoder = require('../../utilities/geocoder');
require('dotenv').config();

/**
 *  @route  GET api/geocode/:city
 *  @desc   Geocode City => Latitude Longitude
 *  @access Public
 */
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const loc = await geocoder.geocode(city);
    res.json(loc);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
