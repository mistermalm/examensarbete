// Import Database Connection
const connectDB = require('./config/db');

// Import Cors
const cors = require('cors');

// Import Express
const express = require('express');

// Define Server App
const app = express();

// Connect to Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));
app.use(cors());

// Cors settings
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'x-auth-token');
// });

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/flights', require('./routes/api/flights'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/geocode', require('./routes/api/geocode'));

// Define Host Port. If No Port Is Given, 5000 Is Set As Default.
const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;
// Starting Server
app.listen(PORT, () =>
  console.log(`Server running in ${MODE} mode on port ${PORT}`)
);
