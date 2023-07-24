const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static('assets'));

// GET route for "/"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.get('/theme', (req, res) => {
    res.sendFile(__dirname + '/theme-change.html');
});

// GET route for "/app/timers"
app.get('/app/timers', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err){
            res.send('Oups, some trouble happened'+'\n\n'+err);
        }
        else {
            res.send(JSON.stringify(data));
        }
    });
});

// POST route for "/app/timers"
app.post('/app/timers', (req, res) => {
    res.send('This is the /app/timers POST route');
});

// Start the server
app.listen(PORT, '192.168.0.143', () => {
    console.log(`Server is running on http://192.168.0.143:${PORT}`);
});
