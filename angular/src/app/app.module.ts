import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponentComponent } from './company/company.component';
import { EmployeeComponent } from './employee/employee.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthenComponent } from './authen/authen.component';
@NgModule({
  declarations: [
    AppComponent,
    DemoComponentComponent,
    EmployeeComponent,
    AuthenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
