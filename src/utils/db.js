const Sequelize = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE || "postgres://postgres:secret@localhost:5432/urls";
const db = new Sequelize(CONNECTION_STRING);

const User = db.define('users',{
    name: Sequelize.TEXT,
    email:{
        type:Sequelize.TEXT,
        unique:true
    },
    password:Sequelize.TEXT
});

const Direction = db.define('directions',{
    destination:Sequelize.TEXT,
    hash:Sequelize.TEXT
})
db.sync({force:true})
    .then(e=>{
        console.log("Database Synced")
    }).catch(e=>{
        console.log(e.messeage)
    });

module.exports = {
    db,
    User,
    Direction
}