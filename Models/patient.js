const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PatientModel=new Schema({
    name:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
    },
    password:{
        type:String,
        require:true,
    },
    patientPhoto:{
        type:String,
        require:true
    },
    psychiatrist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Psychiatrist'
    }
});
module.exports=mongoose.model('Patients',PatientModel);