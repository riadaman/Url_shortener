const router = require('express').Router();
const {check,validationResult} = require('express-validator/check');
const {generate} = require('../src/utils/password');
const {User} = require('../src/utils/db');

const signupValidator = [
    check('name').exists(),
    check('email').isEmail(),
    check('password').isLength({min:5})
];
router.post('/signup',signupValidator,async(req,res)=>{
    const errors = (validationResult(req));
    if(!errors.isEmpty()){
        return res
            .status(422)
            .json({errors:errors.array()});
    }
})