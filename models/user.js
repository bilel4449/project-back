const mongoose=require('mongoose');
const schema=mongoose.Schema;
const userSchema=new schema({
    fullName:String,
    lastName:String,
    email:String,
    password:String,
    age:String,
    adress:String,
    specialité:String,
    userRole:{
        type:String,
        default:'Patient',
        roles:['Admin','Patient','Medecin']
    },

});
module.exports=mongoose.model("User",userSchema);