const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use( bodyParser.urlencoded({ extended: true }));
// app.use( bodyParser.json() );
app.use(express.static('server/public'));

// Requiring router bookstore / magazine
let bookstore = require('./routes/bookstore.router');
let magazines = require('./routes/magazines.router');
app.use('/bookstore', bookstore);
app.use('/magazines', magazines);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('Ok, reloading on port', PORT);
});

