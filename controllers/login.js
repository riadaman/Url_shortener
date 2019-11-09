
const router = require('express').Router();
const {User} = require('../src/utils/db');
const _p = require('../src/utils/promise_errors');
const jwt = require('jsonwebtoken');
const { check} = require('express-validator');
const {validate} = require('../src/utils/password');
const {app_secret} = require('../src/config.json');
const  rejecInvalid = require('../middlewares/reject_invalid');
 

const loginValidator = [
    check('email').isEmail(),
    check('password').isLength({min:5})
];

router.post('/login',loginValidator,rejecInvalid,async(req,res)=>{
   
    let {password,email} = req.body;
    let [uer,user] = await _p(User.findOne({
        where:{
            email
        }
    }));
    if(!user && uer){
        return next(uer);
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
            next(new Error("Password Invalid"));
        }
    }
})
module.exports = router;