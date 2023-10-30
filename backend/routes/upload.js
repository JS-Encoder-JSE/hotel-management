import express from 'express'
import multer from 'multer'
import path from 'path'
import { Router } from 'express';

const router = Router()

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: '../uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('image'); // 'image' should match the name attribute in your HTML form

// Define a route for handling image uploads
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({
      success: true,
      imageUrl: imageUrl
    });
  });
});



export default router