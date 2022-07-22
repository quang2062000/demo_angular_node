import { Request,Response,NextFunction } from "express";
import userModel from "../models/userModel";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const registration = async(req:Request,res:Response)=>{
    console.log(req,res);
    
    let user1: any = req.body.user
    let password:any = req.body.password
    console.log(req.body,"body");
    let check = await userModel.findOne({user:user1})
    let message:any
    let status:any
    let data:any
    let acc:any

    if(check){
        message =  "Tai khoan da ton tai"
    }
    else{   
        console.log("vo day");
        let pass = await bcrypt.hash(password,10)
        console.log("pass",pass,user1);

        data = await userModel.create({user:user1, password:pass,role:"admin"})
        console.log(data,"data");
        status ='dang ky thanh cong'
    }
    return{message,status,data}
}


const login = async(req:Request,res:Response)=>{
    let user = req.body.user
    let password = req.body.password
    let check = await userModel.findOne({user:user})
    let message:any
    let status:any
    let token:any
    let role:any
    if(check){
        let pass =await bcrypt.compare(password,check.password)
        if(pass){
            token = jwt.sign(
                {user:check.user ,role:check.role},
                process.env.TOKEN_KEY,
                {
                    expiresIn:'1h'
                }
            )
            
            role= check.role
            status = "dang nhap thanh cong"
        }
        else{
            message = "sai mat khau"
        }
    }
    else{
        message = "tai khoan chua duoc dang ki"
    }
    console.log(token,status,role,message,'token');
    return {status,message,token,role}
}
export default {registration,login}