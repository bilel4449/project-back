const express=require('express')
const { register, login, auth, edit, getall, getOneMedecin  } = require('../controllers/user.controller')
const { registerRules,validator } = require('../middlewares/validator');
const verifyAuth = require('../middlewares/verifyAuth');
const router=express.Router()
router.post('/register',registerRules(),validator,register);
router.post('/login',login);
router.get('/auth',verifyAuth,auth);
router.put('/edit/:id',edit);
router.get('/getall',getall);
router.get('/getOneMedecin/:_id',getOneMedecin);


module.exports=router