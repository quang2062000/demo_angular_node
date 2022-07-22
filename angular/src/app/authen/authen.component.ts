import { Component, OnInit } from '@angular/core';
import { DemoService } from '../services/demo.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface IAuthen{
  user: String,
  password:String
}
@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.css']
})
export class AuthenComponent implements OnInit {
  management:IAuthen ={
    user:"",
    password:""
  }
  token :any
  constructor(private api:DemoService,public router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem("token")
    if(token){
      this.router.navigate(['/company'])
    }
  }
  handleRegistration():void{
    let data = {
      user : this.management.user,
      password: this.management.password
    }
    console.log(data,"data truyen di");
    
    this.api.registration(data)
    .subscribe(res=>{
      if(res.status != undefined){
        alert(res.status)
      }
      else{
        alert(res.message)
      }
    })
  }

  handleLogin():void{
    let data = {
      user : this.management.user,
      password: this.management.password
    }
    this.api.login(data)
    .subscribe(res=>{
      if(res.token != undefined){
        alert(res.status)
        window.location.reload()
      }
      else{
        alert(res.message)
      }
    })
  }
}
