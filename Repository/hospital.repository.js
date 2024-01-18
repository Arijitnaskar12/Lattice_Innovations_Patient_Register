const { TRUE, FALSE, ERROR } = require('../Constant');
const Hospital=require('../Models/hospital');
const checkHospital=async(hospitalName)=>{
  const hospitalData={
    data:[],
    error:null
  }
  try{
    hospitalData.data=await Hospital.findOne({hospitalName});
    if(hospitalData.data!=null)
    {
      
        return hospitalData;
    }else if(hospitalData.data==null){
        return FALSE;
    }
  }catch(e){
    console.log(e);
    return ERROR;
  }
}
const addToDataBase=async(hospitalObj)=>{
try{
    await hospitalObj.save();
    return TRUE;
}catch(e){
  console.log(e);
  return ERROR;
}
}
module.exports={checkHospital,addToDataBase};