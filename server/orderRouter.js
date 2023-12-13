const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const OrderModel = require('./models/Order');

router.use(bodyParser.json());

router.post('/orders', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      addressLine,
      city,
      zipCode,
      country,
      nameCard,
      numberCard
    } = req.body;

    const newOrder = new OrderModel({
      firstName,
      lastName,
      addressLine,
      city,
      zipCode, 
      country,
      nameCard,
      numberCard
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/orders', async (req, res) => {
    try {
      const allOrders = await OrderModel.find();
  
      res.status(200).json(allOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router; 
