import mongoose,{Schema} from "mongoose";

const companyModel:Schema=new Schema({
    name:{type:String, required:true},
    address:{type:String,required:true},
    numberOfEmployees:{type:Number,required:true},
    creationDate:{type:String,required:true},
    id_Employee:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employees'
    }]
})

export default mongoose.model('company',companyModel)