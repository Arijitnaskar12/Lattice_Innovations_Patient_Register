const express=require('express');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT||8080;
const db=require('./config/db');
const patientRouter=require('./Routes/Patient');
const psychiatristRouter=require('./Routes/Psychiatrist');
const hospitalRouter=require('./Routes/Hospital');
app.use(express.json());
app.use('/patient',patientRouter);
app.use('/psychiatrist',psychiatristRouter);
app.use('/hospital',hospitalRouter);
app.listen(PORT,()=>{
    console.log('Server is Running on the Port',PORT);
});