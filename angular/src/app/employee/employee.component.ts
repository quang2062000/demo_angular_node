import { Component, OnInit } from '@angular/core';
import { DemoService } from '../services/demo.service';
export interface IEmployee{
  id:String,
  nameEmployee:String,
  age:number,
  textSearch:String,
  limit:number,
  activePage: number
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  management: IEmployee={
    id:"",
    nameEmployee: "",
    age:null,
    textSearch:"",
    limit:5,
    activePage:1
  }
  listEmployees !:any
  listCompany !: any
  companySelect :string = ""
  idCompany: string;

  totalPage :any
  skip:any

  companying:any
  companyed:any

  token:any
  AddCompany(IdCompany :string):void{
    if(!IdCompany){return;}
    this.companySelect = IdCompany;
    console.log(IdCompany);
    
  }
  constructor(private api: DemoService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.handleGetEmployee(this.management.activePage);
  }
  handleGetEmployee(activePage:number):void{
    let data = {
        textSearch :this.management.textSearch,
        activePage: activePage,
        limit: this.management.limit
    }
    console.log(data,"data truyen di");
    
    this.api.getEmployee(data)
      .subscribe(res=>{
        console.log(res,"data tra ve");
        this.listEmployees = res.data,
        this.totalPage = res.totalPage,
        this.skip = res.skip
      })
  }
  handleGetCompanying(){
    let data = {
      id: this.management.id
    }
    this.api.getCompanying(data)
    .subscribe(res=>{
      this.companying = res.arrayCompany
    })
  }
  handleGetCompanyed(){
    let data ={
      id: this.management.id
    }
    console.log(data,"data truyen di");
    this.api.getCompanyed(data)
    .subscribe(res=>{
      console.log(res.arrayCompany,"du lieu tra ve cong ty da tung lam");
      this.companyed = res.arrayCompany
    })
  }
  handleAdd(){
    let data = {
      nameEmployee: this.management.nameEmployee,
      age: this.management.age
    }
    this.api.addEmployee(data)
    .subscribe(res=>{
      this.handleGetEmployee(this.management.activePage)
    })
  }
  handleChooseData(data:any){
    this.management.id = data.id
    this.management.nameEmployee= data.nameEmployee
    this.management.age = data.age
    this.handleGetCompanying()
    this.handleGetCompanyed()
  }
  handleUpdateEmployee():void{
    let data = {
      id: this.management.id,
      nameEmployee: this.management.nameEmployee,
      age: this.management.age
    }
    this.api.updateEmployee(data)
    .subscribe(res=>{
      alert(res)
      this.handleGetEmployee(this.management.activePage)
    })
  }
  handleDeleteEmployee(id:string){
    let data ={
      id:id
    }
    this.api.deleteEmployee(data)
    .subscribe(res=>{
      this.handleGetEmployee(this.management.activePage)
    })
    
  }
}


