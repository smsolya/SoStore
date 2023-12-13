const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    addressLine: String,
    city: String,
    zipCode: String,
    country: String,
    nameCard: String,
    numberCard: String
})

const OrderModel = mongoose.model("order", OrderSchema)
module.exports = OrderModel