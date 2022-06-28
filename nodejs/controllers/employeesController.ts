import { Request,Response,NextFunction } from "express";
import employeesServices from "../services/employeesServices";
const getEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data =await employeesServices.getEmployees(req,res)
        res.status(200).json({data:data.getEmployees,totalPage: data.arrayTotalPage,activePage: data.activePage,skip:data.skip})
    } catch (error) {
        res.send(error)
    }
}

const getAllEmployeeNotCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data = await employeesServices.getAllEmployeeNotCompany(req,res)
        res.status(200).json(data.employeeNotCompany)
    } catch (error) {
        res.send(error)
    }
}

const getCompanying = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data = await employeesServices.getCompanying(req,res)
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}

const getCompanyed = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data = await employeesServices.getCompanyed(req,res)
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}
const addEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let addEmployees = await employeesServices.addEmployees(req,res)
        console.log(addEmployees,"addEmployees");
        res.status(200).json(addEmployees.msg)
    } catch (error) {
        res.send(error)
    }
}

const addEmployeesByarrayId = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data = await employeesServices.addEmployeesByarrayId(req,res)
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}

const updateEmployees = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let updateEmployees = await employeesServices.updateEmployees(req,res)
        res.status(200).json(updateEmployees)
    } catch (error) {
        res.send(error)
    }
}

const deleteEmployeesInCompany = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let deleteEmployees = await employeesServices.deleteEmployeesInCompany(req,res)
        res.status(200).json(deleteEmployees.msg)
    } catch (error) {
        res.send(error)
    }
}

const deleteEmployee = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let data = await employeesServices.deleteEmployee(req,res)
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
}
export default {getEmployees,addEmployees,
    deleteEmployeesInCompany,updateEmployees,
    getAllEmployeeNotCompany,addEmployeesByarrayId,
    deleteEmployee,getCompanying,getCompanyed

}