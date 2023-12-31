const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    try {
        console.log("Demo GET API Running")
        res.sendStatus(200)
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', (req, res) => {
    try {
        console.log("Demo POST API Running")
        res.sendStatus(200)
    } catch (error) {
        console.error('Error : ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
