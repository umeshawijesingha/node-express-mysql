const express = require('express');
const connection = require('../db/db.js');
const router = express.Router();
const schema=require('./validateSchema.js');

router.get('/', (req, res, next)=> {
   const sql="SELECT * FROM customers";
   connection.query(sql,(err,results)=>{
      if(err){
         res.status(400).send(err);
      }else{
         if(results.length==0){
            res.send("Customer not found");
         }else{
            res.send(results);
           
         }
        
      }
   });


  });

  router.get('/:id',(req,res,next)=>{
   const id=req.params.id;
   const sql="SELECT * FROM customers WHERE id=?";
   connection.query(sql,[id],(err,results,fields)=>{
      if(err){
         res.status(400).send(err);
      }else{
         if(results.length==0){
            res.send("Customer not found");
         }else{
            res.send(results);
           
          
         }
      }
   })
  });

  router.post('/add',(req,res,next)=>{

  
   const result=schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const {name,age}=req.body;
   
   sql="INSERT INTO customers (name,age) VALUES(?,?)";
   connection.query(sql,[name,age],(err,results)=>{
      if(err){
         res.send(err);
      }else{
         res.send("Customer added successfully");
      }
   })
   
  });

router.put('/update/:id',(req,res,next)=>{
   const id=parseInt(req.params.id);

   const result=schema.validate(req.body);
   if(result.error){
       res.status(400).send(result.error.details[0].message);
       return;
   }

   const {name,age}=req.body;
   const sql="UPDATE customers SET name=?,age=? WHERE id=?";

   connection.query(sql,[name,parseInt(age),id],(err,results)=>{
      if(err){
         res.send(err);
      }else{
         if(results.affectedRows==0){
            res.send("Customer not found");
         }else{
            res.send("Customer updated successfully");
         }
         
      }
   })
});


  router.delete('/delete/:id',(req,res,next)=>{
   const sql="DELETE FROM customers WHERE id=?";
   
   connection.query(sql,[req.params.id],(err,results)=>{
      if(err){
         res.send(err);
      }else{
         if(results.affectedRows==0){
            res.send("Customer not found");
         }else{
            res.send("Customer deleted successfully");
         }
         
      }
   })
  });
  
  module.exports = router;