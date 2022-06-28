const employee =[
    {
        nameEmployee:"Ha Manh Quang",
        age: 23,
        id_Company:[],
        id_CompanyOld:[]
    }
]

const listEmployees = {
    tags:["Employee"],
    description: "List Employees",
    parameters:[
        {
            name:"textSearch",
            in:"query",
            description:"TextSearch là từ khóa tìm kiếm, nếu ô textSearch rỗng thì thành hàm GetFull",
            type: "string",
            example:""
        },
        {
            name:"activePage",
            in:"query",
            description:"ActivePage là trang hiện tại của phân trang",
            type: "string",
            example:""
        },
        {
            name:"limit",
            in:"query",
            description:"Limit là giới hạn số phần tử trong 1 trang của phân trang",
            type: "string",
            example:""
        },
    ],
    responses:{
        200:{
            description :"OKE",
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        example:{
                            count:1,
                            employee: employee
                        }
                    }
                }
            }
        }
    }
}

const createEmployees = {
    tags:["Employee"],
    description: "Create Employee",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        nameEmployee:{
                            type: "string",
                            example: "Manh Quang",
                        },
                        age:{
                            type: "number",
                            example:23,
                        },
                        id_Company:{
                            type: "ObjectId",
                            example: [],
                        },
                        id_CompanyOld:{
                            type: "ObjectId",
                            example: []
                        },
                    }
                }
            }
        }
    },
    responses:{
        200:{
            description :"OKE",
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        example:"Add success"
                    }
                }
            }
        }
    }
}


const deleteEmployees = {
    tags:["Employee"],
    description: "Delete Employee",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        id_delete_employees:{
                            type: "string",
                            example: "62aadf6a6c2fe31fc7823937",
                        }
                    }
                }
            }
        }
    },
    responses:{
        200:{
            description :"OKE",
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        example:"Delete success"
                    }
                }
            }
        },
        400:{
            description:"Do not Delete Employee"
        }
    }
}

const updateEmployees ={
    tags:["Employee"],
    description: "Update Employee",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        idEmployee:{
                            type: "string",
                            example: "62aadf6a6c2fe31fc7823937",
                        },
                        nameEmployee:{
                            type: "string",
                            example: "Eledevo",
                        },
                        age:{
                            type: "number",
                            example:23,
                        },
                        id_Company:{
                            type: "ObjectId",
                            example: [],
                        },
                        id_CompanyOld:{
                            type: "ObjectId",
                            example: []
                        },
                    }
                }
            }
        }
    },
    responses:{
        200:{
            description :"OKE",
            content:{
                "application/json":{
                    schema:{
                        type: "object",
                        example:"Update success"
                    }
                }
            }
        },
        400:{
            description:"Do not update Company"
        }
    }
}
const employeeRouteDoc = {
    "/api/employees?textSearch":{
        get: listEmployees,
    },
    "/api/employees":{
        post: createEmployees,
        delete: deleteEmployees,
        put: updateEmployees
    }
}

export default employeeRouteDoc