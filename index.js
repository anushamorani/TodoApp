var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    methodOverride= require("method-override"),
    LocalStrategy = require("passport-local"),
    List      = require("./models/list"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//seedDB()

//requring routes
var listRoutes    = require("./routes/lists"),
    indexRoutes      = require("./routes/index")

// Connect To Database
const mongoURI ="mongodb://morani.anusha:todo123@ds011314.mlab.com:11314/todoapp";

mongoose.connect(mongoURI);

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


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The todoapp Server Has Started!");
});