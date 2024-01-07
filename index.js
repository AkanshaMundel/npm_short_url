// //design a short url servies tht takes in a valid url and return a shrtened url 
// redricting the user to previously provide url

//also keep track of total visits/clicks on url //routes -> 
//routes are -> post/url generate a new url and return shrten url 
// get/id  redirects user to original url
// get/url/analytic/.id- retunr the clicks for the provided short id


const express = require('express');
const PORT = 8001;
const app = express();
const cookieParser = require('cookie-parser')

const { connectionMongoDb } = require('./connect')

const URL = require('./models/urls')
const path   = require('path')
const staticRoute = require('./routes/staticRouter')
const urlRoute = require("./routes/url")
const userRoute = require("./routes/user")
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")



//mongodb nmae //loacl path // and database naem 
connectionMongoDb("mongodb://127.0.0.1:27017/short-url").then(() => console.log("mongodb connected"))


//setting up the engines 

app.set("view engine","ejs");//ejs files arae generally htmls files we are telling server thth we using ejs 
app.set("views", path.resolve("./views")) //saying my all views arae locareee
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
// app.get("/api/test",async(req,res)=>{
//     const allUrls = await URL.find({})//getinng all urls 
//     return res.render('home',{urls : allUrls})
    
//  })

app.use(express.json()) //mandatory to use in above the route  json form 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

//now i want to access the /url route to get urs urls shorten u must have logined in 

app.use("/url",restrictToLoggedinUserOnly, urlRoute)
app.use("/user", userRoute)
app.use('/',checkAuth, staticRoute)

app.get("/url/:shortid", async (req, res) => {
    const shortId = req.params.shortid;
     console.log("shhh", shortId)
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {timeStamp:Date.now()}
        }
    }
    )
    // console.log("redirty entry",entry.redirectUrl);
    console.log("entryy", entry)
    res.redirect(entry.redirectUrl);

})

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})


//starting the server side rendering -> so we need to render the html 
//  app.get("/api/test",async(req,res)=>{
//     const allUrls = await URL.find({})//getinng all urls 
//     return res.send(`
//     <html>
//     <head></head>
//     <body>
//     <ol>
//     ${allUrls.map(url =>`<li>${url.shortId}- ${url.visitHistory.length}</li>`).join("")}
//     </ol>
//     </body>
//     </html>`)
//  })
// so we have engines which workks for us : templating engines  ejs pug hanglebars



//process of ejs -> install ejs , index m btna h tht it is ejs  26-7 then use res .render in statuc route
