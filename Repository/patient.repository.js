const { TRUE, ERROR } = require("../Constant");

const addDataToDbPatient=async(patientObj)=>{
    try{
        await patientObj.save();
        return TRUE;
    }catch(e){
        console.log(e);
        return ERROR;
    }
}
module.exports={addDataToDbPatient};