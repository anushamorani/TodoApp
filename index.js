var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    methodOverride= require("method-override"),
    LocalStrategy = require("passport-local"),
    List      = require("./models/list"),
    User        = require("./models/user")
const config = require('./config/database');
const path = require("path");
const crypto = require("crypto");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//requring routes
var listRoutes    = require("./routes/lists"),
    indexRoutes      = require("./routes/index")

// Connect To Database
mongoose.connect(config.database,{ useNewUrlParser: true });

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "todo app",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/lists", listRoutes);


app.get("/", function(req, res){
    res.render("/register");
});

app.listen(3000, () => {
  console.log('Server started on port ');
});