// src/utils/fileUtils.ts
import fs from 'fs';
import path from 'path';

export const cleanUpFiles = (files: Express.Multer.File[]) => {
  // Remove files from the 'uploads' folder after processing
  files.forEach((file) => {
    const filePath = path.join(__dirname, '../../uploads', file.filename);
    fs.unlinkSync(filePath);  // Synchronously remove file
  });
};
