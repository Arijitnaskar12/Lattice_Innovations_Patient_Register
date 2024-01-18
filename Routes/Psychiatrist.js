const express=require('express');
const { RegisterPsychiatrist } = require('../Controllers/psychiatrist.controller');
const app=express();
app.post('/registerpsychiatrist',RegisterPsychiatrist);
module.exports=app;