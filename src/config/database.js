const mongoose = require('mongoose');
const config = require('./config');

async function connectDB() {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.log(error);
    }   
}

module.exports = { connectDB };