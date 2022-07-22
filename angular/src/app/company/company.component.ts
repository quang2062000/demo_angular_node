import { Component, OnInit } from '@angular/core';
import { DemoService } from '../services/demo.service';

export interface ICompany{
  id:String,
  name: String,
  address: String,
  numberOfEmployees:number,
  creationDate:String,
  textSearch:String,
  limit:number,
  activePage: number,
  arrayIdEmployeeCheckbox: any
}
@Component({
  selector: 'app-demo-component',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class DemoComponentComponent implements OnInit {

  management: ICompany = {
    id:"",
    name:"",
    address:"",
    numberOfEmployees:null,
    creationDate:"",
    textSearch:"",
    limit:5,
    activePage:1,
    arrayIdEmployeeCheckbox :[]
  }
  listCompany !: any
  totalPage !:any
  skip:any
  activePage :number
  id_Employee !: any
  ///employesss
  listEmployees !: any
  listEmployeesNotCompany :any
  idEmployeeNotCompany: any
  token:any
  
  constructor(private api:DemoService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.handleGet(this.management.activePage)
  }
  handleGet(activePage:number) :void{
    let data = {
      textSearch:this.management.textSearch,
      limit: this.management.limit,
      activePage: activePage
    }
    console.log(data,"dataaa");
    this.api.getCompany(data)
      .subscribe((res)=>{
        this.listCompany = res.data
        this.totalPage = res.totalPage
        this.skip = res.skip
        this.activePage = res.activePage
        this.management.textSearch =""
        console.log(this.listCompany,this.totalPage,this.skip,"listDataaaaa"); 
      })
  }
  handleAdd() :void{
    let data = {
      name: this.management.name,
      address:this.management.address,
      numberOfEmployees: this.management.numberOfEmployees,
      creationDate: this.management.creationDate
    }
    this.api.addCompany(data)
      .subscribe(res=>{
        this.handleGet(this.management.activePage)
        window.location.reload()
      })
  }
  handleDelete(id:string):void{
    let data ={
      id: id
    }
    this.api.deleteCompany(data)
      .subscribe(res=>{
        this.handleGet(this.management.activePage)
      })
  }

  handleDeleteEmployeeInCompany(id:string){
    let data = {
      id:id
    }
    this.api.deleteEmployeeInCompany(data)
    .subscribe(res=>{
      this.handleGetEmployee();
    })
  }
  handleChoose(data:any):void{
    this.management.id = data.id,
    this.management.name = data.name,
    this.management.address= data.address,
    this.management.numberOfEmployees= data.numberOfEmployees,
    this.management.creationDate = data.creationDate;
    this.handleGetEmployee();
  }
  handleUpdate():void{
    let data = {
      id: this.management.id,
      name: this.management.name,
      address: this.management.address,
      numberOfEmployees:this.management.numberOfEmployees,
      creationDate:this.management.creationDate
    }
    this.api.updateCompany(data)
      .subscribe(res=>{
        alert("update thanh cong")
        this.handleGet(this.management.activePage)
      })
  }
  handleReset(data:any):void{
    this.management.id = data.id,
    this.management.name = data.name,
    this.management.address= data.address,
    this.management.numberOfEmployees= data.numberOfEmployees,
    this.management.creationDate = data.creationDate
    this.listEmployees = null
  }

  ///employessss
  handleGetEmployee():void{
    let data = {
      id: this.management.id
  }
  this.api.getEmployeeInCompany(data)
    .subscribe(res=>{
      console.log(res,"res employess ben company");
      this.listEmployees = res.data
    })
  }

  getAllEmployeeNotCompany():void{
    this.api.getAllEmployeeNotCompany()
    .subscribe(res=>{
      console.log(res,"res employess not company");
      this.listEmployeesNotCompany = res.data
    })
  }

  handleSetIdEmployee(id:string):void{
    let data ={
      id: id
    }
    
    this.management.arrayIdEmployeeCheckbox.push(data)
    console.log(this.management.arrayIdEmployeeCheckbox,"data luc check box");
   
  }
  handleAddEmployeeNotCompany():void{
    let data = {
      id : this.management.arrayIdEmployeeCheckbox,
      idCompany :this.management.id
    }
    console.log(data,"data truyen di");
    this.api.addEmployeeByarrayId(data)
    .subscribe(res=>{
      this.handleGet(this.management.activePage)
      this.getAllEmployeeNotCompany()
    })
  }

}
