const mongoose = require('mongoose')

//Mongoose Schema
const planetSchema = new mongoose.Schema({
    keplerName: {
        type: String,
        required: true
    }
});

// Connect planetsSchema with 'planets' collection
module.exports = mongoose.model('Planet', planetSchema);