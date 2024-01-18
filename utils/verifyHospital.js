const { ERROR, TRUE } = require("../Constant");
const { checkHospital } = require("../Repository/hospital.repository");

const verifyHospital=async(hospitalName)=>{
try{
    const isFound=await checkHospital(hospitalName);
    console.log(isFound);
    if(isFound.data!=null)
    {
        return TRUE;
    }else{
        return isFound;
    }
}catch(e)
{
    console.log(e);
    return ERROR;
}
}
module.exports={verifyHospital};