import axios from 'axios';
import { GET_WEATHER, WEATHER_ERROR } from './types';

/** GET WEATHER */

export const getWeather = flights => async dispatch => {
  try {
    // console.log(flights);
    let arr = [];
    const forLoop = async () => {
      console.log('start');

      for (let i = 0; i < flights.length; i++) {
        const destinationAirport = flights[i].departure.arrivalAirportEnglish;
        // Split destination by space so that city only contains the actual city name
        const city = destinationAirport.split(' ');
        // console.log(city[0]);

        // Geocode city
        const loc = await axios.get(`api/geocode/${city[0]}`);
        //i assume the first response is the most relevant one.
        const lat = loc.data[0].latitude;
        const lon = loc.data[0].longitude;

        const res = await axios.get(`api/weather/${lat}/${lon}`);
        console.log(res.data);
        arr.push(res.data);
      }
      console.log('end');
    };

    forLoop();
    console.log(arr);
    // let count = 0;

    // let night = []; // 00:00-05:00
    // let morning = []; // 06:00-11:00
    // let midday = []; // 12:00-17:00
    // let evening = []; // 18:00-23:00
    // let stateArray = [];
    // const weatherList = res.data.list;

    // // Looping through weatherList
    // for (let i = 0; i < weatherList.length; i++) {
    //   count++;

    //   const weatherItem = weatherList[i];
    //   const date = new Date(weatherItem.dt_txt);
    //   const temperature = weatherItem.main.temp;
    //   const weather = weatherItem.weather[0].main;
    //   const weatherDesc = weatherItem.weather[0].description;

    //   // console.log(date);
    //   const pushWeatherObjectToArray = arr => {
    //     const weatherObject = { date, temperature, weather, weatherDesc };
    //     arr.push(weatherObject);
    //   };

    //   // 00:00-05:00
    //   if (date.getHours() >= 0 && date.getHours() <= 5) {
    //     pushWeatherObjectToArray(night);
    //   }
    //   // 06:00-11:00
    //   if (date.getHours() >= 6 && date.getHours() <= 11) {
    //     pushWeatherObjectToArray(morning);
    //   }
    //   // 12:00-17:00
    //   if (date.getHours() >= 12 && date.getHours() <= 17) {
    //     pushWeatherObjectToArray(midday);
    //   }
    //   // 18:00-23:00
    //   if (date.getHours() >= 18 && date.getHours() <= 23) {
    //     pushWeatherObjectToArray(evening);
    //   }

    //   // kolla att vi e på sista varvet i loopen...
    //   if (weatherList.length === count) {
    //     const destinationWeatherObject = {
    //       city,
    //       night,
    //       morning,
    //       midday,
    //       evening
    //     };

    //     stateArray.push(destinationWeatherObject);

    //     dispatch({
    //       type: GET_WEATHER,
    //       payload: stateArray
    //     });
    //   }
    // }
  } catch (err) {
    // if (err.response) {
    //   console.log(err.response.statusText + ' ' + err.response.status);
    // }
    //   dispatch({
    //     type: WEATHER_ERROR,
    //     payload: { msg: err.response.statusText, status: err.response.status }
    //   });
  }
};
