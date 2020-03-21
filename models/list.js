var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
   todo: String,
   user:{
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
      }
   }
});

module.exports = mongoose.model("List", listSchema);