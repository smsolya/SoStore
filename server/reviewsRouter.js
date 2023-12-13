const express = require('express');
const uploadMiddleware = require('./middleware/multerMiddleware');
const ResponseModel = require('./models/Response');

const router = express.Router();

router.get('/getAllReviews', async (req, res) => {
    try {
      const allReviews = await ResponseModel.find();
  
      res.status(200).json(allReviews);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


router.post('/addReview', uploadMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newReview = new ResponseModel({
            name,
            description,
            imagePath
        });

        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
