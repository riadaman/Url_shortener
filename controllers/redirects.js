const router = require('express').Router();
const {Direction} = require('../src/utils/db');
const _p = require('../src/utils/promise_errors');
const { check} = require('express-validator');
const  rejecInvalid = require('../middlewares/reject_invalid');

const entryValidator = [check('url').isURL()]
router.post('/api/v1/redirects',entryValidator,rejecInvalid, async(req,res,next)=>{
    let user_id = req.user.id;
    let destination = req.body.url;
    let timestamp = Date.now()/1000;

    let hash = parseInt(`${user_id}${timestamp}`).toString(32);
    let [cretErr,created] = await _p(Direction.create({
        user_id,destination,hash
    }));
    if(cretErr && !created){
        next(cretErr);
    }
    else{
        res.json({
            message:"Direction created succesfully",
            hash
        })
    }
})
module.exports = router;