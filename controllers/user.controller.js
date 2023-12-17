const user = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const secret=process.env.secret;

exports.register=async(req,res)=>{
    const{fullName,lastName,email,password,age,adress,specialité,userRole}=req.body;
    const existantUser=await user.findOne({email});
    if(existantUser) res.status(406).json({msg:"user exist"})

    try {
        const newUser=new user({
            fullName,
            lastName,
            email,
            password,
            age,
            adress,
            specialité,
            userRole
        });
        let salt =await bcrypt.genSalt(10);
        let hash =await bcrypt.hash(password, salt);
        newUser.password=hash
        await newUser.save();
        const payload={
            id:newUser._id,
            fullName:newUser.fullName,
        };
         let token=jwt.sign(payload,secret)
         res.send({
            token,
            user:{
                id:newUser._id,
                fullName:newUser.fullName,
                lastName:newUser.lastName,
                age:newUser.age,
                email:newUser.email,
                adress:newUser.adress,
                userRole:newUser.userRole,

            }
         });
        // res.status(200).json(newMedecin);
        
    } catch (error) {
      res.status(500).json({msg:error.message})  
    }
};
exports.login=async(req,res)=>{
    const {email,password}=req.body;
        try {
            const User=await user.findOne({email});
            if(!User) return res.status(404).json({msg:'bad  cordonneés'});
            const isMatch=await bcrypt.compare(password,User.password);
            if(!isMatch)  return res.status(404).json({msg:'bad cordonneés'});
            const payload={
                id:User._id,
                fullName:User.fullName,
                userRole:User.userRole,

            };
             let token=jwt.sign(payload,secret)
             res.send({
                token,
                user:{
                    id:User._id,
                    fullName:User.fullName,
                    email:User.email,
                }
             });
        } catch (error) {
            res.status(500).json({msg:error.message})  
     
        }
    };
    exports.auth=(req,res)=>{
         res.send(req.User);
        };
        exports.edit=async(req,res)=>{

        try {
            const modifUser=await user.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
            res.send(modifUser)

        } catch (error) {
            res.status(500).json({msg:error.message})  
 
        }
};
exports.getall = async (req, res) => {
    try {
      const medecin = await user.find({userRole:'Medecin'})
      res.send(medecin);
    } catch (error) {
      res.status(500).json({errors: error.message});
    }
  };
  exports.getOneMedecin = async (req, res) => {
    try {
      const oneMedecin = await user.findById(req.params._id);
 
         res.status(201).send(oneMedecin)
        
    } catch (error) {
      res.status(501).json({ msg: error.message });
    }
  };
