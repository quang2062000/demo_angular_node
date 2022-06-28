import express from 'express'
import controllerCompany from '../controllers/companyController'
import controllerEmployees from '../controllers/employeesController'
const apiRouter:express.Router = express.Router();

//get data company
apiRouter.get('/company',controllerCompany.getCompany)

//add data company
apiRouter.post('/company',controllerCompany.addCompany)

//delete data company
apiRouter.delete('/company/:id',controllerCompany.deleteCompany)

//update data company
apiRouter.put('/company/:id',controllerCompany.updateCompany)

//get data employees
apiRouter.get('/employees',controllerEmployees.getEmployees)

//add data employees
apiRouter.post('/employees',controllerEmployees.addEmployees)

//delete data employees trong company
apiRouter.delete('/employeesInCompany/:id',controllerEmployees.deleteEmployeesInCompany)

//update data employees
apiRouter.put('/employees/:id',controllerEmployees.updateEmployees)



// get employees by id company
apiRouter.get('/employeeInCompany',controllerCompany.getEmployeeByIdCompany)


//get all employee not company
apiRouter.get('/employeenotcompany',controllerEmployees.getAllEmployeeNotCompany)

// add lien ket cong ty cho nhan vien
apiRouter.post('/addEmployeesByarrayId',controllerEmployees.addEmployeesByarrayId)

//delete employeee
apiRouter.delete('/deleteEmployee/:id',controllerEmployees.deleteEmployee)

// get companying
apiRouter.get('/getCompanying/:id',controllerEmployees.getCompanying)

//get companyed
apiRouter.get('/getCompanyed/:id',controllerEmployees.getCompanyed)
export default apiRouter

