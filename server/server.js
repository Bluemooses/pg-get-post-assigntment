const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Setup body parser - to translating request body into JSON
app.use( bodyParser.urlencoded({ extended: true }));
// app.use( bodyParser.json() );
app.use(express.static('server/public'));

// Requiring router bookstore
let bookstore = require('./routes/bookstore.router');
app.use('/bookstore', bookstore);

// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('Ok, reloading on port', PORT);
});

