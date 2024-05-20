
const fs = require('fs');
const path = require('path');

// Define the .env file path
const envFilePath = path.join(__dirname, '.env');

// Define the credentials
const envCredentials = `
DB_URI=mongodb://localhost:27017/sleep-tracker
PORT=3000
`;

// Write the credentials to the .env file
fs.writeFileSync(envFilePath, envCredentials, { encoding: 'utf8', flag: 'w' });

console.log('.env file created successfully with the provided credentials.');
