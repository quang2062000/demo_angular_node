import mongoose, {Schema} from "mongoose"
const userModel:Schema = new Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum:['admin','user'],
        default: 'user'
    }
})

export default mongoose.model("userModel",userModel)