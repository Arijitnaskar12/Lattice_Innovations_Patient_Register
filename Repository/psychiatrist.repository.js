const { TRUE, ERROR } = require("../Constant");

const addDataToDb=async(psychiatristObj)=>{
    try{
        await psychiatristObj.save();
        return TRUE;
    }catch(e){
        console.log(e);
        return ERROR;
    }
}
module.exports={addDataToDb};