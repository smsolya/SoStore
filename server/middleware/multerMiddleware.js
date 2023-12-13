const multer = require('multer');
const path = require('path');

// Middleware для обробки файлів за допомогою Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Директорія для збереження файлів
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware.single('image'); 