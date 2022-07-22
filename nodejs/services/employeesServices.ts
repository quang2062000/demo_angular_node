import { Request,Response,NextFunction } from "express";
import companyModel from "../models/companyModel";
import employeesModel from "../models/employeesModel";

const getEmployees = async(req:Request,res:Response)=>{
    console.log(req.query,"queryyyyyyy");
    let textSearch = req.query.textSearch
    let activePage:any= req.query.activePage
    let limit:any =req.query.limit
    let skip = (activePage - 1)*limit
    let lengthData = await employeesModel.countDocuments({nameEmployee:{$regex:textSearch,$options:'i'}})
    let totalPage = Math.ceil(lengthData/limit)
    let getEmployees = await employeesModel.find({nameEmployee:{$regex:textSearch,$options:'i'}}).skip(skip).limit(limit)
    .populate({
        path:'id_Company',
        model: 'company'
    })
    let arrayTotalPage:any = []
    for(let i=1;i<=totalPage;i++){
        arrayTotalPage.push(i)
        
    }
    return {getEmployees,arrayTotalPage,activePage,skip}
}

const getAllEmployeeNotCompany = async(req:Request,res:Response)=>{
    let dataEmployee = await employeesModel.find({})
    let employeeNotCompany = []
    for(let i=0;i<dataEmployee.length;i++){
        if(dataEmployee[i].id_Company == null || dataEmployee[i].id_Company==""){
            employeeNotCompany.push(dataEmployee[i])
        }
    }
    return {employeeNotCompany}
}

const getCompanying = async(req:Request,res:Response)=>{
    let id = req.params.id
    let dataEmployee = await employeesModel.findById(id)
    let idCompany = dataEmployee.id_Company
    let arrayCompany =[]
        let dataCompany = await companyModel.findById(idCompany)
        arrayCompany.push(dataCompany)
    return {arrayCompany}
}
const getCompanyed = async(req:Request,res:Response)=>{
    let id = req.params.id
    console.log(id,"id nhan vien nhan dc");
    
    let dataEmployee = await employeesModel.findById(id)
    console.log(dataEmployee,"data nhan vien");
    
    let idCompanyOld = dataEmployee.id_CompanyOld
    console.log(idCompanyOld,"id cong ty da lam");
    
    let arrayCompany =[]
    for(let i=0;i<idCompanyOld.length;i++){
        let dataCompany = await companyModel.findById(idCompanyOld[i])
        arrayCompany.push(dataCompany)
    }
    console.log(arrayCompany,"mang nhan dc");
    return {arrayCompany}
}

const addEmployees = async(req:Request,res:Response)=>{
    let {nameEmployee,age,id_Company,id_CompanyOld} = req.body
    console.log(req.body,"boduyyy")
        let addEmployees = await employeesModel.create({nameEmployee,age,id_Company,id_CompanyOld})
        // if(id_Company != ""){
        //     let dataCompany = await companyModel.findById(id_Company)
        //     let arrayIdEmployees =[]
        //     arrayIdEmployees = dataCompany.id_Employee
        //     arrayIdEmployees.push(addEmployees._id)
        //     let updateCompany = await companyModel.findByIdAndUpdate(id_Company,{id_Employee: arrayIdEmployees},{new:true})
        // }
        return {msg: "Add employees thanh cong"}
}


const addEmployeesByarrayId = async(req:Request,res:Response)=>{
   let id = req.body.id
   let idCompany = req.body.idCompany
   // update lien ket cua company
   let dataCompany = await companyModel.findById(idCompany)
   console.log(dataCompany,"data company");
   let arrayIdEmployee = dataCompany.id_Employee
   for(let i=0;i<id.length;i++){
       arrayIdEmployee.push(id[i].id)
       console.log(arrayIdEmployee,"arrayIdEmployee 1");
   }
   let updateCompany = await companyModel.findByIdAndUpdate(idCompany,{id_Employee:arrayIdEmployee },{new:true})
   // update lien ket cac employee
   for(let i=0;i<id.length;i++){
    console.log(id[i].id,"id iiii");
       let dataEmployee = await employeesModel.findById(id[i].id)
       console.log(dataEmployee,"dataEmployee");
       let arrCompany =[]
       arrCompany = dataEmployee.id_Company
       console.log(arrCompany,"mang id company cua employee");
       arrCompany.push(idCompany)
       let updateEmployee = await employeesModel.findByIdAndUpdate(id[i].id,{id_Company:arrCompany},{new:true})
    }
    
   
   return {msg: "Them lien ket thanh cong"}
   
}
const updateEmployees = async(req:Request,res:Response)=>{
    let id = req.params.id
    let {nameEmployee,age,id_Company,id_CompanyOld} = req.body
    console.log(req.body,"bodyy");
    console.log(req.params,"id truyen sang");
    let updateEmployee = await employeesModel.findByIdAndUpdate(id,{nameEmployee:nameEmployee,age:age},{new:true})
        // let dataEmployee = await employeesModel.findById(idEmployee)
        // let dataCompany = await companyModel.findById(id_Company)
        // let arrayIdEmployee =dataCompany.id_Employee
        // arrayIdEmployee.push(idEmployee)
        // let updateCompany = await companyModel.findByIdAndUpdate(id_Company,{id_Employee:arrayIdEmployee},{new:true})
        // let arrayIdCompanyOld = dataEmployee.id_CompanyOld
        // arrayIdCompanyOld.push(dataEmployee.id_Company)
        // let updateEmployee = await employeesModel.findByIdAndUpdate(idEmployee,{nameEmployee,age,id_Company:id_Company,id_CompanyOld:arrayIdCompanyOld},{new:true})
        return "Update Employees thanh cong"
}

const deleteEmployeesInCompany = async(req:Request,res:Response)=>{
    let id_delete_employees = req.params.id
    console.log(req.params,"id truyen sang");
    let deleteEmployees = await employeesModel.findById(id_delete_employees)
    // if(deleteEmployees.id_Company){
        console.log("da vao if");
        let dataCompany = await companyModel.findById(deleteEmployees.id_Company)
        let arrayIdEmployee = dataCompany.id_Employee
        let index = arrayIdEmployee.indexOf(id_delete_employees)
        arrayIdEmployee.splice(index,1)
        let updateCompany = await companyModel.findByIdAndUpdate(deleteEmployees.id_Company,{id_Employee: arrayIdEmployee},{new:true})
        let arrayIdCompanyOld = deleteEmployees.id_CompanyOld
        arrayIdCompanyOld.push(dataCompany._id)
        console.log(arrayIdCompanyOld,"arrayIdCompanyOld");
        let updateEmployee = await employeesModel.findByIdAndUpdate(id_delete_employees,{id_Company:[],id_CompanyOld:arrayIdCompanyOld },{new:true})
    // }
    return {msg:"Delete Employess thanh cong"}
}

const deleteEmployee = async(req:Request,res:Response)=>{
    console.log(req.params,"id nhan dc ben node");
    
    let id = req.params.id
    let dataEmployee = await employeesModel.findByIdAndDelete(id)
    let arrIdCompany = dataEmployee.id_Company
    for(let i=0;i<arrIdCompany.length;i++){
        let dataCompany = await companyModel.findById(arrIdCompany[i])
        let arrIdEmployee = dataCompany.id_Employee
        let index = arrIdEmployee.indexOf(id)
        arrIdEmployee.splice(index,1)
        let updateCompany = await companyModel.findByIdAndUpdate(arrIdCompany[i],{id_Employee:arrIdEmployee},{new:true})
    }
    return {msg: "delete thanh cong"}
}
export default {getEmployees,addEmployees,
    updateEmployees,deleteEmployeesInCompany,
    getAllEmployeeNotCompany,addEmployeesByarrayId,
    deleteEmployee,getCompanying,getCompanyed}