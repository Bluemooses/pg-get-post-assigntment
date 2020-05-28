const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
let magazines = [
    {  
        title:  "Pandas",
        issueNumber: 212,
        pages: 500
    },
    {   title: "L.A TIMES",
        issueNumber: 15,
        pages: 14

    },
    {
        title: "Fiddle and the Finch",
        issueNumber: 140,
        pages: 25,
    }
]

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "magazines"';
    //DB connection
    pool.query(queryText)
        .then((result) =>{
            console.log("Result.rows:", result.rows);
            res.send(result.rows);
        })
        .catch((err) =>{
            console.log("error making query", err);
            res.sendStatus(500);
        });
        res.send(magazines);
})

// router.post('/',
//we can use this route now.
module.exports = router;