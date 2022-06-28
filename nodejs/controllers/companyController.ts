import { Request,Response,NextFunction } from "express";
import companyServices from "../services/companyServices";

const getCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const getCompany = await companyServices.getCompany(req,res);
        res.status(200).json({getCompany:getCompany.getCompany, arrayTotalPage:getCompany.arrayTotalPage,skip:getCompany.skip,activePage:getCompany.activePage})
    } catch (error) {
        res.send(error)
    }
}

const getEmployeeByIdCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const data = await companyServices.getEmployeeByIdCompany(req,res);
        res.status(200).json({data:data.arrayEmployees})
    } catch (error) {
        res.send(error)
    }
}
const addCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.body,"body");
        let addCompany = companyServices.addCompany(req,res)
        res.status(200).json({msg:"Add company thanh cong"})
    } catch (error) {
        res.send(error)
    }
}

const deleteCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        console.log(req.params.id,"id controller");
        let deleteCompany = companyServices.deleteCompany(req,res)
        res.status(200).json({msg:"Delete company thanh cong"})
    } catch (error) {
        res.send(error)
    }
}

const updateCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let updateCompany = companyServices.updateCompany(req,res)
        res.status(200).json({msg:"Update company thanh cong"})
    } catch (error) {
        res.send(error)
    }
}
export default {getCompany,addCompany,deleteCompany,updateCompany,getEmployeeByIdCompany}