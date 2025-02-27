// src/routes/generateIntro.ts
import { Router } from 'express';
import { uploadFiles, validateFiles } from '../middleware/uploadMiddleware';
import introController from '../controllers/introController';

const router = Router();

// Route to generate intro
router.post('/generateIntro', introController.generateIntro);

export default router;
