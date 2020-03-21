var mongoose = require("mongoose");
var List = require("./models/list");
var User   = require("./models/user");
var passport = require("passport");

var data = [
    {
        username: "Hashimee@gmail.com",
        password: "123" 
    },
    {
        username: "zohairaa@gmail.com",
        password: "123" 
    },
    {
        username: "Haniaaa@yahoo.com",
        password: "123" 
    },
    {
        username: "Zulqarnainnn@hotmail.com",
        password: "123" 
    }
    
]
var lists = [
    {
        todo:"Wake Up"
    },
    {
        todo:"Eat Food"
    },
    {
        todo:"Code"
    },
    {
        todo:"Sleep"
    }
    
]

function seedDB(){
    data.forEach(function(seed){
        User.register(seed,seed.password,function(err, newUser){
            if(err){
                return console.log(err);
            }  
            console.log( "Created new User");
            // console.log(user);
            lists.forEach(function(list){
                var user={
                    id: newUser._id
                };
                var newTodo = {todo: list.todo, user:user};
                List.create(newTodo, function(err, newlyCreated){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Todo list added")
                    }
                });
            });
            
        });
    });
     
}

module.exports = seedDB;



