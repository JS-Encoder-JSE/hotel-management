import express from 'express';
import multer from 'multer';
import path from 'path';
import { Router } from 'express';
import { fileURLToPath } from 'url';
import { checkToken } from '../middlewares/checkToken.js';

const router = Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).any();

// Define a route for handling image uploads
router.post('/upload', checkToken, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    
    res.status(200).json({
      success: true,
      imageUrls: imageUrls
    });
  });
});

router.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(path.join(path.dirname(fileURLToPath(import.meta.url)), '../uploads', filename));

  res.sendFile(filePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
});

export default router;
