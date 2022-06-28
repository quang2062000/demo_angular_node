import { Request,Response,NextFunction } from "express";
import companyModel from "../models/companyModel";
import employeesModel from "../models/employeesModel";
const getCompany = async(req:Request,res:Response)=>{
    let textSearch = (req.query.textSearch)? req.query.textSearch: ""; 
    let activePage:any= (req.query.activePage)? req.query.activePage: 1;
    let limit:any =(req.query.limit)? req.query.limit: 5;
    let skip = (activePage - 1)*limit
    let lengthData = await companyModel.countDocuments({name:{$regex: textSearch,$options:'i'}})
    let totalPage:any = Math.ceil(lengthData/limit)
    let getCompany = await companyModel.find({name:{$regex: textSearch,$options:'i'}}).skip(skip).limit(limit)
    .populate({path:'id_Employee',model: 'employees'})
    console.log(getCompany,"getCompany");
    
    let arrayTotalPage:any = []
    for(let i=1;i<=totalPage;i++){
        arrayTotalPage.push(i)
        
    }
    return {getCompany,arrayTotalPage,skip,activePage}
}


const getEmployeeByIdCompany = async(req:Request,res:Response)=>{
    let idCompany:any = req.query.id
    let dataCompany = await companyModel.findById(idCompany)
    let idEmployees = dataCompany.id_Employee
    console.log(idEmployees,"idEmployees");
    let arrayEmployees = []
    for(let i=0;i<idEmployees.length;i++){
        let dataEmployee = await employeesModel.findById(idEmployees[i])
        arrayEmployees.push(dataEmployee)
    }
    return {arrayEmployees}
}

const addCompany = async(req:Request,res:Response)=>{
    let {name,address,numberOfEmployees,creationDate, id_Employee} = req.body
    let addCompany = await companyModel.create({name,address,numberOfEmployees,creationDate})
    // let arrayIdEmployees =[]
    // let arrayIdCompanyOld =[]
    // for(let i =0;i<id_Employee.length;i++){
    //     arrayIdEmployees.push(id_Employee[i])
    //     let updateEmployee = await employeesModel.findByIdAndUpdate(id_Employee[i])
    //     arrayIdCompanyOld = updateEmployee.id_CompanyOld
    //     if(arrayIdCompanyOld){
    //         arrayIdCompanyOld.push(updateEmployee.id_Company)
    //         updateEmployee = await employeesModel.findByIdAndUpdate(id_Employee[i],{id_Company: addCompany._id,id_CompanyOld: arrayIdCompanyOld},{new:true})
    //     }
    // }
    // let updateCompany = await companyModel.findByIdAndUpdate(addCompany._id,{id_Employee: arrayIdEmployees},{new:true})
    return addCompany
}

const deleteCompany = async(req:Request,res:Response)=>{
    console.log(req.params,"idddddd servicessss");
    let id = req.params.id
    let deleteCompany = await companyModel.findByIdAndDelete(id)
    let arrIdEmployee = deleteCompany.id_Employee
    for(let i =0;i<arrIdEmployee.length;i++){
        let dataEmployee = await employeesModel.findByIdAndUpdate(arrIdEmployee[i],{id_Company: []})
    }
    return deleteCompany
}

const updateCompany = async(req:Request,res:Response)=>{
    let id = req.params.id
    let {name,address,numberOfEmployees,creationDate}=req.body
    console.log(id,req.body,"id vaf body");
    
    let updateCompany = await companyModel.findByIdAndUpdate(id,{name,address,numberOfEmployees,creationDate},{new:true})
    return updateCompany
}
export default {getCompany,addCompany,deleteCompany,updateCompany,getEmployeeByIdCompany}