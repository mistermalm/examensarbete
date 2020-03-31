const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

/**
 *  @route  GET api/flights/departures/:airport
 *  @desc   Get departing flights by airport
 *  @access Public
 */
router.get('/departures/:airport/:date', (req, res) => {
  try {
    const airport = req.params.airport;
    const date = req.params.date;
    const accessKey = process.env.SWEDAVIA_ACCESS_KEY;
    const options = {
      uri: `https://api.swedavia.se/flightinfo/v2/query?filter=airport eq '${airport}' and scheduled eq '${date}' and flightType eq 'D'`,
      method: `GET`,
      headers: {
        Accept: 'application/json',
        'Ocp-Apim-Subscription-Key': accessKey
      }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No arrivals found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
