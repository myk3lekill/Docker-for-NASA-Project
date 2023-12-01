const { parse } = require('csv-parse');
const path = require('path');
const fs = require('fs');
const planets = require('./planets.mongo');

const results = [];
const habitablePlanets = [];

//Filter habitable planets based on NASA data
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && planet['koi_prad'] < 1.6;
}

//Use Promise to process the stream


function loadPlanetsData() {
//When we manage large amount of data is suggested to stream data with node using the stream capability of nodejs
return new Promise((resolve, reject) => { 
    fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv')) //ReadStrem read the raw data in our file as data buffer bytes
        .pipe(parse({ //pipe data from connect kepler_data.csv to parse method to store all data into an array or an object
            //Parameters of the parse method
            comment: '#',
            columns: true,
        }))
        .on('data', async(data) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
            results.push(data);
        })
        .on('error', (err) => {
            console.log(err);
            reject();
        })
        .on('end', async() => {
            const countPlanetsFound = (await getAllPlanets()).length
            // console.log(habitablePlanets.map((planet) => {
            //     return planet['kepler_name'];
            // }));
            console.log(`${countPlanetsFound} habitable planets found!`);
            console.log('done');
            resolve();
        });
    });
};

async function getAllPlanets() {
    //Array Method:
    //return habitablePlanets;
    //Mongo Method: return a list of planets from MongoDB
    return await planets.find({}, {
        '_id':0,
        '__v':0
    });
};

async function savePlanet(planet) {
    //Array Method:
    //habitablePlanets.push(data);
    //MongoDB Method:
    try {
    await planets.updateOne({ //Upsert instead of Create would avoid duplication at server launces.
        //We need to respect the requirements of the schema or we receive an error
        keplerName: planet.kepler_name, //only name is required by the Schema. //Insert kepler planet if it doesn't exist
    }, {
        keplerName: planet.kepler_name // Update kepler planet if it does already exist
    }, {
        upsert: true //enable the upsert functionalitiy
    });
    } catch (err) {
        console.error(`Could not save planet ${err}`)
    }
}

 module.exports = {
    loadPlanetsData,
    getAllPlanets,
 };