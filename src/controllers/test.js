//TEST CONTROLLER

// create a router
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        res.send('This is a test route');
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
})

//export
module.exports = router;