const { ERROR } = require("../Constant");
const Patient = require("../Models/patient");
const Psychiatrist = require("../Models/psychiatrist");
const { addDataToDbPatient } = require("../Repository/patient.repository");
const bcrypt=require('bcrypt');
const BCRYPT_SALTS=Number(process.env.BCRYPT_SALTS);
const Registerpatient=async(req,res)=>{
   const{name,address,email,phoneNumber,password,patientPhoto,psychiatristId}=req.body;
   if(!name||!address||!email||!phoneNumber||!password||!patientPhoto||!psychiatristId){
    return res.status(400).send({
        status:400,
        message:"All fields are required"
    })
   }
   if(address.length<10)
   {
    return res.status(400).send({
        status:400,
        message:"Address should be at least 10 characters"
    })
   }
   const emailRegexExp=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
   if(!emailRegexExp.test(email)){
    return res.status(400).send({
        status:400,
        message:"Invalid email format"
    })
   }
   const phoneRegexExp = /^\+[0-9]{1,3}\d{10}$/;
   if (!phoneRegexExp.test(phoneNumber)) {
     return res.status(400).json({ 
        status:400,
        message:'Invalid phone number format' 
    });
   }
   const passwordRegexExp =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
   if (!passwordRegexExp.test(password)) {
     return res.status(400).json({
        status:400,
       message:'Password must contain one uppercase character, one lowercase character, and one number. Min length: 8, Max length: 15',
     });
   }
   try{
    const isEmailExisting=await Patient.exists({email});
    if(isEmailExisting)
    {
        return res.status(400).json({ 
            status:400,
            message: 'Email already Exist!' 
        });
    }
   }catch(e)
   {
    console.log(e);
   }
   const hashPassword=await bcrypt.hash(password,BCRYPT_SALTS);
   try{
    const isPsychiatristExist=await Psychiatrist.exists({_id:psychiatristId}); 
        if (!isPsychiatristExist) {
        return res.status(404).json({ 
            status:404,
            message: 'Psychiatrist not found' 
        });
      }
      const patientObj=new Patient({
        name,
        address,
        email,
        phoneNumber,
        password:hashPassword,
        patientPhoto,
        psychiatrist:psychiatristId
      })
      const response=await addDataToDbPatient(patientObj);
        if(response===ERROR)
        {
            return res.status(500).send({
                status:500,
                message:"Database Error for adding patient"
            }) 
        }else{
            return res.status(201).send({
                status:201,
                message:"Patient Added Successfully"
            })
        }
   }catch(e){
    console.log(e);
   }
};  
module.exports={Registerpatient};