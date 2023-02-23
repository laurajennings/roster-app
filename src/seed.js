const mongoose = require("mongoose")
const Roster = require('./models/roster');
const Shift = require('./models/shift');
const User = require('./models/user');


mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", async () => {
/*     const roster = await Roster.create({
        startDate: "2023-03-01"
    }) 
    const shift = await Shift.create({
        start: "2023-03-01T05:00:00",
        end: "2023-03-01T13:00:00",

    }) */
    const user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "john@email.com",
        phone: "0411222333",
        dob: "1990-07-27"
    })
    console.log("seeded")
    mongoose.connection.close()
})
