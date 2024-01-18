const joi = require("joi");
const { verifyHospital } = require("../utils/verifyHospital");
const { FALSE, ERROR } = require("../Constant");
const { checkHospital } = require("../Repository/hospital.repository");
const Psychiatrist=require('../Models/psychiatrist');
const { addDataToDb } = require("../Repository/psychiatrist.repository");
const RegisterPsychiatrist=async(req,res)=>{
    const{name,hospitalName}=req.body;
    const isValid=joi.object().keys({
        name:joi.string().required(),
        hospitalName:joi.string().required()
    }).validate(req.body);
    if(isValid.error){
        return res.status(422).send({
            status:422,
            message:"Validation error",
            data:isValid.error
        })
    }
    const isExistingHospital=await checkHospital(hospitalName);
    if(isExistingHospital===FALSE)
    {
        return res.status(404).send({
            status:404,
            message:"Hospital is not registed!Please add the hospital first"
        })
    }else if(isExistingHospital===ERROR){
        return res.status(500).send({
            status:500,
            message:"Database Error for finding existing Hospital"
        })
    }else{
        const psychiatristObj=new Psychiatrist({
            name,
            hospitalID:isExistingHospital.data._id
        });
        const response=await addDataToDb(psychiatristObj);
        if(response===ERROR)
        {
            return res.status(500).send({
                status:500,
                message:"Database Error for adding psychiatrist"
            }) 
        }else{
            return res.status(201).send({
                status:201,
                message:"Psychiatrist Added Successfully"
            })
        }
    }
};
module.exports={RegisterPsychiatrist};