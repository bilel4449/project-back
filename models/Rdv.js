const mongoose=require('mongoose');
const schema=mongoose.Schema;
const rdvSchema=new schema({
    fullName:String,
    lastName:String,
    age:String,
    adress:String,
    email:String,
    date:String
   

});
module.exports=mongoose.model("Rdv",rdvSchema);