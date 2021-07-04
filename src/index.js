const express = require("express");
const method = require("method-override");
const cookies = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();

// App Server
app.set("port",process.env.PORT || 3000)
app.listen(app.get("port"),()=> console.log("server start http:localhost:"+app.get("port")))

// App View
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));

// App Access Public
app.use(express.static(path.resolve(__dirname,"../public")))

// App Middlewares
app.use(express.urlencoded({extended: false})); // add req.body
app.use(express.json());
app.use(method("_method"));
app.use(cookies()); // add req.cookies and res.cookie()
app.use(session({secret: 'digital', resave: false, saveUninitialized: true})) // add req.session
app.use(require("./middlewares/user")) // save user for views
app.use(require("./middlewares/styles")) // save user for views

// App Routes
app.use(require("./routes/main"))
app.use("/user",require("./routes/user"))