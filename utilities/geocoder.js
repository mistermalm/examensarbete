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
