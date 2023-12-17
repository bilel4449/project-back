const express=require('express')
const { register, getallrdv, deleterdv } = require('../controllers/rdv.controller')
const router=express.Router()
router.post('/register',register);
router.get('/getallrdv',getallrdv)
router.delete('/deleterdv/:_id',deleterdv)
module.exports=router