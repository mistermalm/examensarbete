require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.ATLAS_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log(err.message);
        // Exit process with faliure
        process.exit(1);
    }
};

// Export connectDB function
module.exports = connectDB;
