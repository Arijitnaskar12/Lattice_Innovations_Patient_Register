const express=require('express');
const { RegisterHospital, getHospitalDetails } = require('../Controllers/hospital.controllers');
const app=express();
app.post('/registerhospital',RegisterHospital);
app.get('/getHospitalDetails',getHospitalDetails);
module.exports=app;