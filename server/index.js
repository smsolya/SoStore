const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./authRouter');
const reviewsRouter = require('./reviewsRouter');
const goodsRouter = require('./goodsRouter');
const orderRouter = require('./orderRouter');
const contactRouter = require('./contactRouter');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/goods', goodsRouter);
app.use('/contacts', contactRouter);
app.use('/add', orderRouter);


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://soStore:soStore@sostore.cvylfq2.mongodb.net/?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) { 
        console.log(e);
    }
};

start();