import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }
  ////api company
  getCompany(data:any){
    return this.http.get<any>('http://localhost:3001/api/company/?textSearch='+data.textSearch+'&activePage='+data.activePage+'&limit='+data.limit)
    .pipe(map((res:any)=>{
      return {data:res.getCompany,totalPage:res.arrayTotalPage,skip:res.skip,activePage: res.activePage}
    }))
  }

  getEmployeeInCompany(data:any){
    return this.http.get<any>('http://localhost:3001/api/employeeInCompany/?id='+data.id)
    .pipe(map((res:any)=>{
      return {data:res.data}
    }))
  }

  addCompany(data:any){
    return this.http.post<any>('http://localhost:3001/api/company',data)
    .pipe(map((res:any)=>{
      return res.msg
    }))
  }
  deleteCompany(data:any){
    return this.http.delete<any>('http://localhost:3001/api/company/'+ data.id)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  updateCompany(data:any){
    return this.http.put<any>('http://localhost:3001/api/company/'+ data.id,{name:data.name,address: data.address,numberOfEmployees:data.numberOfEmployees,creationDate:data.creationDate})
    .pipe(map((res:any)=>{
      return res
    }))
  }

  ///api employees
  getEmployee(data:any){
    return this.http.get<any>('http://localhost:3001/api/employees/?textSearch='+data.textSearch+'&activePage='+data.activePage+'&limit='+data.limit)
    .pipe(map((res:any)=>{
      return {data :res.data,totalPage:res.totalPage,activePage:res.activePage,skip:res.skip}
    }))
  }

  getAllEmployeeNotCompany(){
    return this.http.get<any>('http://localhost:3001/api/employeenotcompany')
    .pipe(map((res:any)=>{
      console.log(res,"resss all employ tra ve ");
      return {data :res}
    }))
  }

  deleteEmployeeInCompany(data:any){
    return this.http.delete<any>('http://localhost:3001/api/employeesInCompany/'+ data.id)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  addEmployeeByarrayId(data:any){
    return this.http.post<any>('http://localhost:3001/api/addEmployeesByarrayId',{id:data.id,idCompany: data.idCompany})
    .pipe(map((res:any)=>{
      return res
    }))
  }
  addEmployee(data:any){
    console.log(data,"du lieu truyen sang ndoe");
    return this.http.post<any>('http://localhost:3001/api/employees',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  deleteEmployee(data:any){
    console.log(data,"du lieu truyen sang node");
    
    return this.http.delete<any>('http://localhost:3001/api/deleteEmployee/'+ data.id)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  updateEmployee(data:any){
    console.log(data,"data truyen sang node");
    return this.http.put<any>('http://localhost:3001/api/employees/'+ data.id,{nameEmployee:data.nameEmployee,age:data.age})
    .pipe(map((res:any)=>{
      return res
    }))
  }
  getCompanying(data:any){
    return this.http.get<any>('http://localhost:3001/api/getCompanying/'+data.id)
    .pipe(map((res:any)=>{
      console.log(res,"resss all employ tra ve ");
      return res
    }))
  }
  getCompanyed(data:any){
    return this.http.get<any>('http://localhost:3001/api/getCompanyed/'+data.id)
    .pipe(map((res:any)=>{
      console.log(res.arrayCompany,"resss all employ tra ve ");
      return res
    }))
  }

  /////
  registration(data:any){
    return this.http.post<any>('http://localhost:3001/api/registration',data)
    .pipe(map((res:any)=>{
      console.log(res.message,"dl tra ve");
      
      return {message:res.message,status:res.status,data:res.data}
    }))
  }
  login(data:any){
    return this.http.post<any>('http://localhost:3001/api/login',data)
    .pipe(map((res:any)=>{
      console.log(res,"Data tra vse");
      localStorage.setItem("token",res.token)
        localStorage.setItem("role",res.role)
      return {message:res.message,status:res.status,token:res.token,role:res.role}
    }))
  }
}
