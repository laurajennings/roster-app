const express = require("express")
const mongoose = require("mongoose")
const employeeRouter = require("./controllers/employees/employeeRoutes.js")
const rosterRouter = require("./controllers/rosters/rosterRoutes.js")
const shiftRouter = require("./controllers/shifts/shiftRoutes")

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
app.use("/shifts", shiftRouter)

app.listen(PORT, () => {
    console.log("Server started")
    mongoose.set("strictQuery", false)
    mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", () => {
        console.log("DB Connected")
    })
})