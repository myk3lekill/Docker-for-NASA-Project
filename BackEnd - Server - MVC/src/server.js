const http = require('http');
const app = require('./app');
//const mongoose = require('mongoose');

require('dotenv').config();

const { loadPlanetsData } = require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

//MONGO_URL moved to mongo.js

const server = http.createServer(app);

//Event Emitters moved to mongo.js

async function startServer() {
    //Connect Mongo
    await mongoConnect(); //Connect MongoDB (mongoose.connect moved to mongo.js);

    await loadPlanetsData(); //Kepler Data from kepler_data.csv;

    await loadLaunchesData(); //SpaceX API Load Launches Data;

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });
}

startServer();



