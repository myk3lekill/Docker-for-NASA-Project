const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');
const { loadPlanetsData } = require('../../models/planets.model');

//Node API Version Control
const version = 'v1'

// describe('Test GET /launches', () => {
//     test('It should respond with 200 success', async () => {
//         const response = await request(app).get('/launches');
//         expect(response.statusCode).toBe(200);
//     });
// });

describe('Launches API', () => {
    beforeAll(async() => {
        await mongoConnect();
        await loadPlanetsData();
    });

    // afterAll(async() => {
    //     await mongoDisconnect()
    // });

    describe('Test GET /launches', () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app)
                .get(`/${version}/launches`)
                .expect('Content-Type', /json/)
                .expect(200);
        });
    });

    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'January 2, 2028'  
        }

        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f'
        }

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            target: 'Kepler-62 f',
            launchDate: 'zoot' 
        }

        test('It sholud respond with 201 created', async () => {
            const response = await request(app)
                .post(`/${version}/launches`)
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

                const requestDate = new Date(completeLaunchData.launchDate).valueOf();
                const responseDate = new Date(response.body.launchDate).valueOf();

                expect(responseDate).toBe(requestDate)

                expect(response.body).toMatchObject(launchDataWithoutDate)
        });

        //Error Cases
        //1. Missing Data
        test('It should catch missing required properties', async() => {
            const response = await request(app)
                .post(`/${version}/launches`)
                .send(launchDataWithoutDate) //try sending missing data
                .expect('Content-Type', /json/)
                .expect(400);

                expect(response.body).toStrictEqual({
                    error: "Missing required launch property",
                })
        });

        //2. Invalid Date Case
        test('It should catch invalid dates', async() => {
            const response = await request(app)
                .post(`/${version}/launches`)
                .send(launchDataWithInvalidDate) //try sending wrong data
                .expect('Content-Type', /json/)
                .expect(400);

                expect(response.body).toStrictEqual({
                    error: 'Invalid launch date'
                })
        });
    });

})

