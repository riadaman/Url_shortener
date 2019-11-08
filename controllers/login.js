
const router = require('express').Router();
const {User} = require('../src/utils/db');
const _p = require('../src/utils/promise_errors');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const {validate} = require('../src/utils/password');
const {app_secret} = require('../src/config.json');


const loginValidator = [
    check('email').isEmail(),
    check('password').isLength({min:5})
];

router.post('/login',loginValidator, async(req,res)=>{
    const errors = (validationResult(req));
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors:errors.array()
        });
    }
    let {password,email} = req.body;
    let [uer,user] = await _p(User.findOne({
        where:{
            email
        }
    }));
    if(!user && uer){
        res.status(401).json({
            error:true,
            message:"User not found"
        });
    }
    else{
        let[salt,hash] = user.password.split(".");
        let {name,email,id} = user;
        let valid = validate(password,hash,salt);
        if(valid){
            let token = jwt.sign({id,name,email},app_secret);
            res.json({
                error:false,
                token,
                user:{
                    id,name,email
                }
            })
        }
        else{
            res.status(401).json({
                error:true,
                message:"password incorrect"
            });
        }
    }
})
module.exports = router;