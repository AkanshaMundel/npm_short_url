const express = require('express')
const router = express.Router()
const {handleGenrateNewShortUrl,handleGetanalytic} = require('../controllers/url')

 router.post("/", handleGenrateNewShortUrl)

 router.get("/analytic/:shortid", handleGetanalytic)

 module.exports = router;
