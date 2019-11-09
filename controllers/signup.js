const router = require('express').Router();
const { check} = require('express-validator');
const {generate} = require('../src/utils/password');
const {User} = require('../src/utils/db');
const _p = require('../src/utils/promise_errors');
const  rejecInvalid = require('../middlewares/reject_invalid');

const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
];
router.post('/signup',signupValidator,rejecInvalid,async(req,res)=>{
    
    let chunks = generate(req.body.password);
    let password = `${chunks.salt}.${chunks.hash}`;

    let {name,email} = req.body;
    let [ucErr,userCreated] = await _p(User.create({
        name,email,password
    }));
    if (ucErr && !userCreated){
        return next(ucErr);
    
        }
        else{
            res.json({
                error:false,
                message:"User Created"
            });
        }
})


module.exports = router;