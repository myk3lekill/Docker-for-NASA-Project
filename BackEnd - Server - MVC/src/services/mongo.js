const mongoose = require("mongoose");

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

//Event Emitter for mongodb connection once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
});
//Event Emitter for mongodb connection on error
mongoose.connection.on('error', (err) => {
    console.error(err);
});

//Create a mangoConnect function to export that calls mngoose.connect
async function mongoConnect() {
    await mongoose.connect(MONGO_URL); 
};

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}