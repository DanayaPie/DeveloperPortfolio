const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 400 Error message
app.use(function (req, res) {
    res.status(400);
    return res.send(`404 Error: Resource not found`);
});

// Start the server
app.listen(port, () => {
    console.log(`Portfolio app listening at http://localhost:${port}`);
});