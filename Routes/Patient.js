 const express=require('express');
const { Registerpatient } = require('../Controllers/patient.controllers');
 const app=express();

 app.post('/registerpatient',Registerpatient);
 module.exports=app;