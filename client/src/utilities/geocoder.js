// import React, { useState } from 'react';
// import Geocode from 'react-geocode';

// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
// Geocode.setApiKey('AIzaSyDoqVNH9-xDifgFalfWi5lCQ9n2B9WDETA');

// // Get latidude & longitude from address.
// export const geocoder = flights => {
//   const [state, setState] = useState({ location: [] });
//   const loc = [];

//   for (let i = 0; i < flights.length; i++) {
//     Geocode.fromAddress(`${flights[i].departure.arrivalAirportEnglish}`).then(
//       response => {
//         const { lat, lng } = response.results[0].geometry.location;

//         loc.push({
//           city: flights[i].departure.arrivalAirportEnglish,
//           lat: lat,
//           lon: lng
//         });

//         setState({ location: loc });
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }
// };
