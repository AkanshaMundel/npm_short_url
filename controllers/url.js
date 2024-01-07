const shortid = require('shortid')
const URL = require('../models/urls')

// const suid = new ShortUniqueId();

async function handleGenrateNewShortUrl(req, res) {
    const body = req.body;
    console.log("body", body)
    if (!body.url) return res.status(400).json({ error: "url is important" })
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url, //url is what we hittion on postman on body {"url":"....."}
        visitHistory: [],
        createdBy: req.user._id,// as user._id comming from middleware

    })
    return res.render("home", {
        id:shortId
    })
    // return res.json({ id: shortId });

}

async function handleGetanalytic(req, res){
    const shortId = req.params.shortid;
    console.log("shortid", shortId)
    const result =   await URL.findOne({shortId})
     return res.json({
        totalClicks: result.visitHistory.length,
        analytic: result.visitHistory
     })
}

module.exports = {handleGenrateNewShortUrl, handleGetanalytic}