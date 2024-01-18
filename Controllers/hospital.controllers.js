const joi = require("joi");
const { verifyHospital } = require("../utils/verifyHospital");
const { TRUE, ERROR } = require("../Constant");
const { addToDataBase } = require("../Repository/hospital.repository");
const Hospital = require("../Models/hospital");
const Psychiatrist = require("../Models/psychiatrist");
const Patient = require("../Models/patient");

const RegisterHospital=async(req,res)=>{
    const {hospitalName}=req.body;
    const isValid=joi.object().keys({
        hospitalName:joi.string().required()
    }).validate(req.body);
    if(isValid.error){
        return res.status(422).send({
            status:422,
            message:"Validation error",
            data:isValid.error
        })
    }
    const isExistingHospital=await verifyHospital(hospitalName);
    if(isExistingHospital===TRUE)
    {
        return res.status(409).send({
            status:409,
            message:"Hospital is already exist in the Database"
        })
    }else if(isExistingHospital===ERROR){
        return res.status(500).send({
            status:500,
            message:"Database Error for finding existing Hospital"
        })
    }else{
        const hospitalObj=new Hospital({hospitalName});
        const response=await addToDataBase(hospitalObj);
        if(response==ERROR)
        {
            return res.status(500).send({
                status:500,
                message:"Database Error for adding hospital into database"
            })
        }else{
            return res.status(201).send({
                status:201,
                message:"Hospital Registered Successfully"
            });
        }
    }

};
const getHospitalDetails=async(req,res)=>{
    const{hospitalID}=req.body;
    try{
        const[hospital,psychiatrists]=await Promise.all([
            Hospital.findById(hospitalID),
            Psychiatrist.find({hospitalID})
        ]);
        if(!hospital)
        {
            return res.status(404).send({
                status:404,
                message:"Hospital not found"
            })
        }
        const psychiatristDetails=[];
        for(const psy of psychiatrists)
        {
            const patientsCount=await Patient.countDocuments({psychiatrist:psy._id})
            psychiatristDetails.push({
                id:psy._id,
                name:psy.name,
                patientsCount:patientsCount
            })
        }                    
        const totalPatientsCount=psychiatristDetails.reduce((total,psy)=>total+psy.patientsCount,0);
            return res.status(200).send({
                status:200,
                "Hospital Name": hospital.hospitalName,
                "Total Psychiatrist Count": psychiatrists.length,
                "Total Patients Count":totalPatientsCount,
                "Psychriatrist Details":psychiatristDetails,
            })
        }catch(e){
        console.log(e);
    }
};
module.exports={RegisterHospital,getHospitalDetails};