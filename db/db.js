const mysql=require('mysql2');
const connection=mysql.createConnection({
    port:3306,
    host:"localhost",
    user:"root",
    password:"password",
    database:"customer"
})

connection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }else{
        console.log(err);
    }
})

module.exports=connection;