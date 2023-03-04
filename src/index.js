const mongoose = require("mongoose")
const {app, PORT} = require("./server")

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.MONGO_URI, (err) => {
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