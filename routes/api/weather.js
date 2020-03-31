const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

// GET WEATHER
router.get('/:lat/:lon', (req, res) => {
  try {
    const lat = req.params.lat;
    const lon = req.params.lon;
    const unit = 'metric';
    const lang = 'se';
    const apikey = process.env.WEATHER_API_KEY;
    const options = {
      uri: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&APPID=${apikey}`,
      method: `GET`
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No weather found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
