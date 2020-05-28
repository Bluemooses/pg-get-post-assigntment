const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//starting us off with some books.
let bookstore = [
    {
        title: "You're a wizard 'Arry",
        author: "Hermoine Granger",
        published: '1998'
    },
    {
        title: 'This is not',
        author: 'a real',
        published: '1220'

    },
    {
        title: 'My computer',
        author: 'Broke',
        published: 'Tired'

    },
];

router.get('/', (req, res) => {
    //query DB
    let queryText = 'SELECT * FROM "bookstore"';
    pool.query(queryText)
        .then((result) => {
            //sendIt
            console.log("Result.rows", result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            //If we don't hit the DB let everyone know by sendIt 500
            console.log("error making query", err);
            res.sendStatus(500)
        })
    res.send(bookstore);
})


module.exports = router;