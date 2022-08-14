const express=require('express');
const customerRouter = require('./routes/customer');
const app=express();
app.use(express.json());

const connection=require('./db/db.js');

app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use("/api/customer", customerRouter);

app.get('/',(req,res)=>{
    res.send("Hello");
});


app.use(function(req, res, next) {
    console.log("Middleware called")
    next();
});


app.listen('3000',()=>{
    console.log('Server started');
});