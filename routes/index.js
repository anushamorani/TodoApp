var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/",isNotLoggedIn, function(req, res){
    res.render("register");
});

// show register form
router.get("/register",isNotLoggedIn, function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register",isNotLoggedIn, function(req, res){
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            return res.redirect("register");
        }
               passport.authenticate("local")(req, res, function(){
                if(err){
                    req.flash("error",err.message);
                    return res.redirect("register");
                }
                else{
                    req.flash("success","Welcome To ARTBEAT " + user.username);
                    res.redirect("lists");
                }
            });
    });
            
});

//show login form
router.get("/login",isNotLoggedIn, function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login",isNotLoggedIn, passport.authenticate("local", 
    {
        successRedirect: "/lists",
        failureRedirect: "/login",
        failureFlash: 'Invalid username or password.',
        successFlash: 'Welcome!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","You logged out!");
   res.redirect("register");
});

//middleware

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("login");
}
function isNotLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect("register");
}


module.exports = router;