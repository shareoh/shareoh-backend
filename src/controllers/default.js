//DEFAULT CONTROLLER

// create a router
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        res.send('Shareoh Backend API');
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

//export
module.exports = router;