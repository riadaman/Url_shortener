const crypto = require('crypto');

function getRandomsalt(){
    return crypto.randomBytes(8).toString('hex').slice(0,16);
}

function mix(password,salt){
    return crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
}

function generate(password){
    let salt =getRandomsalt()
    let hash =mix(password,salt);
    return {salt,hash}
}

function validate(password,hash,salt){
    let newHash = mix(password,salt);
    return newHash === hash;
}

module.exports = {
    validate,
    generate
}