import mongoose,{Schema} from "mongoose";

const employeeModel:Schema=new Schema({
    nameEmployee:{type:String, required:true},
    age:{type:Number,required:true},
    id_Company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    }],
    id_CompanyOld:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'company'
    }]
})

export default mongoose.model('employees',employeeModel)