const express = require("express")
const employeeRouter = require("./controllers/employees/employeeRoutes")
const rosterRouter = require("./controllers/rosters/rosterRoutes")

const app = express()

const PORT = 5000

app.get("/", (request, response) => {
    response.json({
        data: "Data Sent"
    })
})

app.use(express.json())
app.use("/employees", employeeRouter)
app.use("/rosters", rosterRouter)

app.listen(PORT, () => {
    console.log("Server started")
})