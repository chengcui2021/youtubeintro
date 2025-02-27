// src/services/wordService.ts

import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';  // For reading Word documents
import similarity from 'string-similarity';  // String similarity library

// Helper function to read content from multiple Word documents
export const readAllWordDocsContent = async () => {
  const wordDocsFolder = path.join(__dirname, '../uploads/wordDocs'); // Folder containing Word documents
  const wordDocs = fs.readdirSync(wordDocsFolder).filter(file => file.endsWith('.docx'));

  const wordDocContents = [];

  for (const docFile of wordDocs) {
    try {
      const filePath = path.join(wordDocsFolder, docFile);
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      wordDocContents.push(result.value);
    } catch (error) {
      console.error(`Error reading Word document ${docFile}:`, error);
    }
  }

  return wordDocContents;
};

// Function to calculate similarity using string-similarity
export const calculateFuzzySimilarity = (text1: string, text2: string) => {
  // Using string-similarity to calculate similarity between the two texts
  const similarityScore = similarity.compareTwoStrings(text1, text2);  // Get similarity score between two strings
  return similarityScore; // Return the similarity score
};

// Helper function to find the most relevant content from multiple Word docs based on similarity
export const getRelevantWordDocContent = async (script: string) => {
  const wordDocContents = await readAllWordDocsContent(); // Get content from all Word docs

  const similarities = wordDocContents.map((content) => {
    const similarityScore = calculateFuzzySimilarity(script, content);
    return { content, similarityScore };
  });

  // Sort Word document content by similarity (highest first)
  const sortedContents = similarities.sort((a, b) => b.similarityScore - a.similarityScore);
  const relevantContent = sortedContents.slice(0, 3).map(item => item.content).join("\n"); // Top 3 relevant sections

  return relevantContent;
};
