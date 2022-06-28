const company = [{
    name: "Eledevo",
    address:"Hà nội",
    numberOfEmployees:100,
    creationDate:"20/06/2020"
}]
const listCompany = {
    tags:["Company"],
    description: "List Company",
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
                            company
                        }
                    }
                }
            }
        },
        400:{
            description:"Do not Get Company"
        }
    }
    
}

const createCompany ={
    tags:["Company"],
    description: "Create Company",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        name:{
                            type: "string",
                            example: "Eledevo",
                        },
                        address:{
                            type: "string",
                            example:"Ha Noi",
                        },
                        numberOfEmployees:{
                            type: "number",
                            example: 400,
                        },
                        creationDate:{
                            type: "string",
                            example: "20/06/2022"
                        },
                        id_Employee:{
                            type: "ObjectId",
                            example:[]
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
                        example:company[0]
                    }
                }
            }
        }
    }
}


const deleteCompany = {
    tags:["Company"],
    description: "Delete Company",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        id:{
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
            description:"Do not Delete Company"
        }
    }
}

const updateCompany={
    tags:["Company"],
    description: "Update Company",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        id:{
                            type: "string",
                            example: "62aadf6a6c2fe31fc7823937",
                        },
                        name:{
                            type: "string",
                            example: "Eledevo",
                        },
                        address:{
                            type: "string",
                            example:"Ha Noi",
                        },
                        numberOfEmployees:{
                            type: "number",
                            example: 400,
                        },
                        creationDate:{
                            type: "string",
                            example: "20/06/2022"
                        },
                        id_Employee:{
                            type: "ObjectId",
                            example:[]
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
const companyRouteDoc = {
    "/api/company?textSearch":{
        get: listCompany,
    },
    "/api/company":{
        post: createCompany,
        delete: deleteCompany,
        put: updateCompany
    }
}

export default companyRouteDoc