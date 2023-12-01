const { getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model');//We have to Destructure launches from module.export object to run
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    //Pagination Management
    //console.log(req.query)
    const { skip, limit } = getPagination(req.query); //pass in the getPAgination func the query params and return skip and limit from the function sourde coede
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
};

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    //Validation for inputed data (from Postman)
    if (!launch.mission || !launch.rocket || !launch.launchDate || ! launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    launch.launchDate = new Date(launch.launchDate);//now launch date is a date object
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }
    await scheduleNewLaunch(launch);
    //console.log(launch);
    return res.status(201).json(launch);
};

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id); //Take id of req as a Number to avoid bug
    const existLaunch = await existsLaunchWithId(launchId);
    if(!existLaunch) {
    // If launch doesn't exist 404 error
    return res.status(404).json({
        error: 'Launch not found'
    });
    }

    // If launch does exist
    const aborted = await abortLaunchById(launchId);
    if(!aborted) {
        return res.status(400).json({
            errot:'Launch not Find'
        })
    }
    return res.status(200).json({
        ok: true,
    });

};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}