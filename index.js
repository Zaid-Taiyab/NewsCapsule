const express = require('express');
const app = express();
const port = 6000;

// Middleware
app.use(express.json());

// Routes
app.use('/articles', require('./routes/articles'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
