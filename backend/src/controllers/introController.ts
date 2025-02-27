import { Request, Response } from 'express';
import gptService from '../services/gptService';

const generateIntro = async (req: Request, res: Response) => {
  const { script } = req.body;

  // Log incoming request to verify data
  console.log('Received script:', script);

  if (!script) {
    console.error('No script provided in the request body');
    res.status(400).json({ error: 'No script provided' });
    return;
  }

  try {
    // Generate intro using GPT
    const intro = await gptService.generateIntro(script);

    // Return the generated intro
    res.json({ intro });
  } catch (error) {
    console.error('Error generating intro:', error);
    res.status(500).json({ error: 'Error generating intro' });
  }
};

export default { generateIntro };
