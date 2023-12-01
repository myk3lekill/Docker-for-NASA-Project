const express = require('express');

//Router requirements
const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');

//Router for of our API
const api = express.Router();

api.use('/planets', planetsRouter);//Middleware Function
api.use('/launches', launchesRouter);//Middleware Function

module.exports = api;
