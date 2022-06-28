import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponentComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: "company",
    component: DemoComponentComponent
  },
  {
    path:"employee",
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
