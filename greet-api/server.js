const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Use CORS
app.use(cors());

// API route
app.get('/api/greet', (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  res.json({ message: `Hello, ${name}! Welcome to Younglabs.` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
