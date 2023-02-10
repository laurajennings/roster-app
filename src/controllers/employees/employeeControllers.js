const employees = [
    {
        firstName: "James",
        lastName: "Smith",
        email: "james.smith@gmail.com",
        age: "23"
    },
    {
        firstName: "Jameie",
        lastName: "Smithson",
        email: "james.smithson@gmail.com",
        age: "27"
    },
    {
        firstName: "Jamel",
        lastName: "Samson",
        email: "jamel@gmail.com",
        age: "21"
    }
]

function getEmployees() {
    return employees
}

function getEmployeeById(employeeId) {
    const employee = employees[employeeId]
    return employee
}

function createEmployee(employee) {
    const newEmployee = {
        id: 4,
        ...employee,
    }
    return newEmployee
}

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee
}