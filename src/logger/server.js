const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());

// Function to get the current date and time in 'YYYY-MM-DD HH:MM:SS' format
const getCurrentDateTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


app.post('/log', (req, res) => {
  const message = req.body.message;

  if (message) {
    const currentDateTime = getCurrentDateTime();
    const logLine = `[${currentDateTime}] ${message}\n`;

    fs.appendFile('log.txt', logLine, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
        res.status(500).send('Error writing to log file');
      } else {
        console.log('Log message written:', logLine);
        res.status(200).send('Log message written');
      }
    });
  } else {
    res.status(400).send('Bad request: message is required');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
