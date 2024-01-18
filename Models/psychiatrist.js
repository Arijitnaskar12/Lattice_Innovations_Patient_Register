const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const PsychiatristModel=new Schema({
    name:{
        type:String,
        require:true
    },
    hospitalID:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    }
});
module.exports=mongoose.model('Psychiatrists',PsychiatristModel);