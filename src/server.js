const express = require("express")
const rosterRouter = require("./controllers/rosters/rosterRoutes.js")
const userRouter = require("./controllers/users/userRoutes")
const cors = require("cors")
const helmet = require("helmet")
require("dotenv").config()

const app = express()

app.use(helmet())

const corsOption = {
    origin: ["http://localhost:3000", "https://main--inspiring-gelato-aae7ec.netlify.app"],
    optionSuccessStatus: 200
}

app.use(cors(corsOption))

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use("/rosters", rosterRouter)
app.use("/users", userRouter)

app.use(function(error, request, response, next) {
    console.error(error)
    return response.status(500).send({message: "Something went wrong"})
})

app.get("/", (request, response) => {
    response.json({
        data: "sent"
    })
})

module.exports = {
    app,
    PORT
}