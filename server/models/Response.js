const mongoose = require('mongoose')

const ResponseSchema = new mongoose.Schema({
    name: String,
    description: String,
    imagePath: String
})

const ResponseModel = mongoose.model("reviews", ResponseSchema)
module.exports = ResponseModel