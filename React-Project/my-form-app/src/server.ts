// server.ts
import express, { Request, Response } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000; // You can choose any port

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies

// POST endpoint to handle form submissions
app.post('/submit-form', (req: Request, res: Response) => {
    const data = req.body;

    // Read the existing data from RegistrationData.json
    fs.readFile('RegistrationData.json', 'utf8', (err, fileData) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        // Parse existing data or initialize to an empty array
        const jsonData = fileData.length ? JSON.parse(fileData) : [];

        // Append new data to the existing array
        jsonData.push(data);

        // Write updated data back to the file
        fs.writeFile('RegistrationData.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.status(200).send('Data saved successfully');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
