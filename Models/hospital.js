const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const HospitalSchema=new Schema({
hospitalName:{
    type:String,
    require:true
}
});
module.exports=mongoose.model('Hospitals',HospitalSchema);