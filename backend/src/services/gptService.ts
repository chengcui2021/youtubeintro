// src/services/gptService.ts

import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { getRelevantWordDocContent } from './wordService';  // Named import
import { parseAudienceRetentionData } from './excelService'; // Named import

dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in the .env file
});

// Function to generate intro using GPT-3/4
const generateIntro = async (script: string) => {
  // Get relevant content from Word documents based on fuzzy similarity
  const wordDocContent = await getRelevantWordDocContent(script);

  // Read audience retention data from Excel files
  const audienceRetentionData = parseAudienceRetentionData();

  // Example: Choose the retention data from the first position to provide insights
  const highRetentionPoint = audienceRetentionData[0]?.retention > 90
    ? "This video has high retention at the beginning, so make the intro even more engaging."
    : "The retention drops after the first few seconds, so make sure to add a hook right away!";

  const subscriptionInsights = audienceRetentionData.filter(item => item.subscriptionStatus === 'Subscribed').map(item => item.retention);
  const subscriptionInsight = subscriptionInsights.length ? `Subscribed viewers have higher retention, so ensure the intro is tailored to retain them.` : "Focus on retaining both subscribers and non-subscribers.";

  const viewerTypeInsights = audienceRetentionData.filter(item => item.viewerType).map(item => `${item.viewerType} viewers tend to retain longer.`);
  const viewerTypeInsight = viewerTypeInsights.join(" ");

  // Create the prompt for GPT-3/4
  const prompt = `
    Create an engaging and catchy YouTube intro based on the following script:

    ${script}

    Here’s some related content from the Word documents:

    ${wordDocContent}

    Audience retention insight: ${highRetentionPoint}

    Subscription Insight: ${subscriptionInsight}

    Viewer Type Insight: ${viewerTypeInsight}

    The intro should be creative, intriguing, and capture the viewer's attention. It should be short, dynamic, and make the viewer want to watch more.
  `;

  try {
    // Call OpenAI API to generate the intro
    const response = await openai.chat.completions.create({
      model: 'gpt-4',  // Or 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    // Return the generated intro
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating intro:', error);
    throw new Error('Failed to generate intro.');
  }
};

export default { generateIntro };
