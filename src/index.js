const express = require('express');
const bp = require('body-parser');
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const auth = require('../middlewares/auth');
const errh = require('../middlewares/error_handler');
const app = express();

//Middlewares
app.use(bp.json());
app.use('/api',auth);

//Routes
app.use(signup);
app.use(login);



app.use(errh);
const _port = process.env.PORT || 4000;
app.listen(_port,()=>{
    console.log(`application listening on port: ${_port}`)
});