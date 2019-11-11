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
});

router.get('/api/v1/redirects',async (req,res)=>{
    let [dberr,myDirections] = await _p(Direction.findAll({
        where:{
            'user_id':req.user.id
        },
        limit:10
    }));
    if(dberr) return next(dberr);
    return res.json(myDirections.map(d=>{return {hash:d.hash,destination:d.destination,id:d.id,created_at:d.createdAt}}));
});
module.exports = router;