const express = require("express")
const employeeRouter = express.Router()
const {getEmployees, getEmployeeById, createEmployee} = require("./employeeControllers")



employeeRouter.get("/", (request, response) => {
    const employees = getEmployees()
    response.json(employees)
})

employeeRouter.get("/:employeeId", (request, response) => {
    const employee = getEmployeeById(request.params.employeeId)
    if(!employee) {
        response.json({
        data: "Employee doesn't exist"
        }, 404)
    }
    response.json(employee)
})

employeeRouter.post("/", (request, response) => {
    const employee = createEmployee({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        age: request.body.age
    })
    response.json(employee)
})

module.exports = employeeRouter
