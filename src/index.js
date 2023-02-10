const express = require("express")

const app = express()

const PORT = 5000

app.get("/", (request, response) => {
    response.json({
        data: "Data Sent"
    })
})

app.get("/hello", (request, response) => {
    response.json({
        data: "Hello all"
    })
})

app.get("/hello2", (request, response) => {
    response.json({
        data: "Hello to all"
    })
})

app.listen(PORT, () => {
    console.log("Server started")
})