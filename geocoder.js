const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

const provider = process.env.GEOCODER_PROVIDER;
const apiKey = process.env.GEOCODER_API_KEY;

const options = {
  provider,
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey, // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;


const express = require('express');
const router = express.Router();
const geocoder = require('../../utilities/geocoder');
require('dotenv').config();

// GET WEATHER
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
