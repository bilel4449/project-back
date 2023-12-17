const express=require('express');
const { check, validationResult } = require('express-validator');


exports.registerRules=()=>[
    check('fullName','champ obligatore').notEmpty(),
    check('lastName','champ obligatore').notEmpty(),
    check('email','champ obligatore').notEmpty(),
    check('email','email non valide').isEmail(),
    check('password','champ obligatore').notEmpty(),
    check('password','password non valide').isLength({min:6}),
    check('age','champ obligatore').notEmpty(),

    check('adress','champ obligatore').notEmpty(),
    // check('userRole','champ obligatore').notEmpty(),

];
exports.validator=(req,res,next)=>{
    const errors=validationResult(req);
    errors.isEmpty()? next():res.status(406).json({errors:errors.array()})
}