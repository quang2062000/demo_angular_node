import { Request,Response,NextFunction } from "express";
import userServices from "../services/userServices";
const registration =async (req:Request,res:Response) => {
    try {
        let data = await userServices.registration(req,res)
        console.log(data,"dataaaa");
        res.send({message: data.message,status:data.status,data:data.data})
    } catch (error) {
        res.send(error)
    }
}

const login = async (req:Request,res:Response) => {
    try {
        let data = await userServices.login(req,res)
        if(data.token != undefined){
            res.send({status:data.status,token:data.token,role:data.role})
        }
        else {
            res.send({message:data.message})
        }
    } catch (error) {
        res.send(error)
    }
}
export default {registration,login}