const mongoose = require("mongoose")
const {app, PORT} = require("./server")

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    mongoose.set("strictQuery", false)
    mongoose.connect(
        "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", (err) => {
        if (err) console.log(err)
        else console.log("Database Connected")
    })
})

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`)
    } else {
        console.error(`An error occured:`, err)
    }
})


/* app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start server", err)
    } else {
        console.log("Server started")
        mongoose.set("strictQuery", false)
        mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", () => {
            console.log("DB Connected")
        })
    }
}) */