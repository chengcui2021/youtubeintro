// src/middleware/uploadMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Store files in 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Middleware to handle file uploads
export const uploadFiles = upload.fields([{ name: 'wordDocs', maxCount: 10 }, { name: 'excelFiles', maxCount: 5 }]);

// Middleware to validate the presence of Word docs and Excel files
// src/middleware/uploadMiddleware.ts

// Middleware to validate the presence of Word docs and Excel files
export const validateFiles = (req: Request, res: Response, next: NextFunction): void => {
  // Check if files are uploaded
  if (!req.files || !req.files['wordDocs'] || !req.files['excelFiles']) {
    // If files are missing, respond with a 400 error
    res.status(400).json({ error: 'Please upload Word documents and Excel files' });
    return;
  }

  // If everything is fine, pass control to the next middleware/handler
  next();
};

