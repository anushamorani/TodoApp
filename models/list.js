var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
   todo: String,
   status: {type:Boolean , default:false},
   user:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
      }
   }
});

module.exports = mongoose.model("List", listSchema);