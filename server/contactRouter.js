const express = require('express');
const ContactModel = require('./models/Contact');

const contactRouter = express.Router();

contactRouter.post('/add', async (req, res) => {
    try {
        const { email, name, message } = req.body;
        const savedContact = await ContactModel.create({ email, name, message });
        res.status(201).json(savedContact);
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

contactRouter.get('/get', async (req, res) => {
    try {
      const contacts = await ContactModel.find();
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error getting contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = contactRouter;