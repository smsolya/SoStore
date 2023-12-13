const mongoose = require('mongoose')

const GoodsSchema = new mongoose.Schema({
    img: String,
    name: String,
    type: String,
    price: String
})

const GoodsModel = mongoose.model("goods", GoodsSchema)
module.exports = GoodsModel