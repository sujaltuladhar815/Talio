const mongoose = require('mongoose');
const config = require('./config');

// Let the error propagate: the server entry point decides what to do
// (log + exit) instead of silently running without a database.
async function connectDB() {
    await mongoose.connect(config.MONGODB_URL);
    console.log('Connected to MongoDB');
}

module.exports = { connectDB };
