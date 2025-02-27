// src/services/excelService.ts

import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx'; // For parsing Excel files

// Helper function to parse audience retention data from multiple Excel files
export const parseAudienceRetentionData = () => {
  const excelFilesFolder = path.join(__dirname, '../uploads/excelFiles'); // Folder containing Excel files
  const excelFiles = fs.readdirSync(excelFilesFolder).filter(file => file.endsWith('.xlsx'));

  const audienceRetentionData = [];

  excelFiles.forEach(file => {
    const filePath = path.join(excelFilesFolder, file);
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Process data for each Excel file
    const fileData = data.map((row: any) => ({
      position: row['Video position (%)'],
      retention: row['Absolute audience retention (%)'],
      compared: row['Compared to other videos (%)'] || null,
      subscriptionStatus: row['Subscription status'] || null,
      viewerType: row['New and Returning Viewers'] || null,
      audienceType: row['Audience type'] || null
    }));

    audienceRetentionData.push(...fileData); // Combine data from all Excel files
  });

  return audienceRetentionData;
};
