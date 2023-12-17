const rdv = require("../models/Rdv")
const jwt=require('jsonwebtoken');
const config=require('config');
const secret=process.env.secret;
exports.register=async(req,res)=>{
    const{fullName,lastName,email,age,adress,date}=req.body;
    const existantRdv=await rdv.findOne({date});
    if(existantRdv) res.status(406).json({msg:"date exist"})

    try {
        const newRdv=new rdv({
            fullName,
            lastName,
            email,
        
            age,
            adress,
            date
        });
        await newRdv.save();
        const payload={
            id:newRdv._id,
            fullName:newRdv.fullName,
        };
         let token=jwt.sign(payload,secret)
         res.send({
            token,
           rdv:{
                id:newRdv._id,
                fullName:newRdv.fullName,
                lastName:newRdv.lastName,
                email:newRdv.email,
                adress:newRdv.adress,
                age:newRdv.age,
                date:newRdv.date,
                

            }
         });
        // res.status(200).json(newRdv);
        
    } catch (error) {
      res.status(500).json({msg:error.message})  
    }
};
exports.getallrdv = async (req, res) => {
    try {
      const rdvs= await rdv.find()
      res.send(rdvs);
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  };
  exports.deleterdv=async(req,res)=>{
    try {
    const deleterdv=await rdv.findByIdAndDelete(req.params._id);
    res.status(201).json({msg:"rdv deleted"})
      
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  }