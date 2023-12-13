const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String,
})

const ContactModel = mongoose.model("contact", ContactSchema)
module.exports = ContactModel