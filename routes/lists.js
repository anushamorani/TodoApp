var express = require("express");
var router  = express.Router();
var User = require("../models/user");
var List = require("../models/list");

//get list of todos
router.get("/",isLoggedIn, function(req, res){
    List.find({user: {id: req.user._id} }, function(err, allLists){
       if(err){
           res.redirect("/lists");
           console.log(err);
       } else {
          res.render("lists/index",{lists:allLists});
       }
    });
});

//create todo
router.post("/",isLoggedIn, function(req, res){
    var todo = req.body.todo;
    var user={
        id: req.user._id,
        username: req.user.username
    };
    var newTodo = {todo: todo, user:user};
    List.create(newTodo, function(err, newlyCreated){
        if(err){
            req.flash("error","Error! Todo not added");
        } else {
            req.flash("success","Todo added to List!");
            res.redirect("/lists");
        }
    });
});

//delete
router.delete("/:id",isLoggedIn,function(req,res){
    
    List.findByIdAndRemove(req.params.id, function(err,del)
    {
        if(err){
            req.flash("error","Something went wrong");
            res.redirect("/lists");
        }
        else
        {       
            req.flash("success","Deleted!");
            res.redirect("/lists");
            }
        });
        
    });




function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

