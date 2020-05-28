const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
let magazines = [
    {
        magtitle: "Pandas",
        issueNumber: '200',
        pages: '150'
    },
    {
        magtitle: "L.A TIMES",
        issueNumber: '15',
        pages: '14'

    },
    {
        magtitle: "Fiddle and the Finch",
        issueNumber: '140',
        pages: '25',
    }
]
//router get
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "magazines"';
    //DB connection
    pool.query(queryText)
        .then((result) => {
            console.log("Result.rows:", result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log("error making query", err);
            res.sendStatus(500);
        });
    res.send(magazines);
})


//router post
router.post('/', (req, res) => {
    magazines.push(req.body);
    console.log('req.body', req.body);
    let magtitle = req.body.magtitle;
    let issueNumber = req.body.issueNumber;
    let pages = req.body.pages;

    let queryText = `
    INSERT INTO "magazines" ("magtitle", "issueNumber", "pages")
    VALUES($1, $2, $3)`;
    console.log("query is", queryText);
    pool.query(queryText, [magtitle, issueNumber, pages])
        .then((result) => {
            console.log("Roger doger");
            res.sendStatus(201);
        })
        .catch((err) => {
        console.log('error making post req', err);
        res.sendStatus(500);
    });
})

// router.post('/',
//we can use this route now.
module.exports = router;