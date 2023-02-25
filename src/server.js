const express = require("express")
const rosterRouter = require("./controllers/rosters/rosterRoutes.js")
const shiftRouter = require("./controllers/shifts/shiftRoutes")
const userRouter = require("./controllers/users/userRoutes")

const app = express()

const PORT = 5000

app.use(express.json())
app.use("/rosters", rosterRouter)
//app.use("/shifts", shiftRouter)
app.use("/users", userRouter)

app.get("/", (request, response) => {
    response.json({
        data: "sent"
    })
})

module.exports = {
    app,
    PORT
}