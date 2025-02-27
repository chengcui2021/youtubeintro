// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import generateIntroRoutes from './routes/generateIntro';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration to allow requests from any origin
app.use(cors({
  origin: '*',  // This allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Adjust methods if needed
  allowedHeaders: ['Content-Type', 'Authorization']  // Adjust headers if needed
}));

app.use(bodyParser.json());

// Use route for intro generation
app.use('/api', generateIntroRoutes);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
