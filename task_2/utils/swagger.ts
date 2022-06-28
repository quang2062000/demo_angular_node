import companyRouteDoc from "../utils/companyDoc"
import employeeRouteDoc from "./employeeDoc"
const swaggerDocumation = {
    openapi:"3.0.0",
    info:{
        title:"Demo",
        version:"0.0.1",
        description: "This is a demo video",
    },
    servers:[
        {
            url:"http://localhost:3001",
            description: "Local dev",
        },
        {
            url:"http://production",
            description: "Production dev",
        },
    ],
    tags:[
        {
            name:"Company",
            description: "Company router",
        },
        {
            name:"Employee",
            description: "Employees router",
        },

    ],
    paths:{
        ...companyRouteDoc,
        ...employeeRouteDoc
    },
    
}

export default swaggerDocumation


