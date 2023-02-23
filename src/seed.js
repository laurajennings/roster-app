const mongoose = require("mongoose")
const Roster = require('./models/roster');
const Shift = require('./models/shift');
const User = require('./models/user');


mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", async () => {
    const users = await User.create([
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@email.com",
            phone: "0411222333",
            dob: "1990-07-27",
            availability: [
                {
                    day: "Monday",
                    start: "08:00",
                    end: "17:00"
                },
                {
                    day: "Tuesday",
                    start: "08:00",
                    end: "17:00"
                }
        ]
        },
        {
            firstName: "Sally",
            lastName: "Jackson",
            email: "sally@email.com",
            phone: "0422222333",
            dob: "1999-08-18",
            availability: [
                {
                    day: "Wednesday",
                    start: "09:00",
                    end: "20:00"
                },
                {
                    day: "Thursday",
                    start: "10:00",
                    end: "18:00"
                }
            ]
            },
            {
                firstName: "Jamie",
                lastName: "Sampson",
                email: "jamie@email.com",
                phone: "0433222333",
                dob: "2001-11-17",
                availability: [
                    {
                        day: "Friday",
                        start: "05:00",
                        end: "14:00"
                    },
                    {
                        day: "Saturday",
                        start: "07:00",
                        end: "16:00"
                    }
                ]
                }
    ])
    const rosters = await Roster.create([
        {
            startDate: "2023-02-19T14:00:00.000Z",
            shifts: [
                {
                    employee: users[0]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                },
                {
                    employee: users[1]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                }
            ]
        },
        {
            startDate: "2023-02-19T14:00:00.000Z",
            shifts: [
                {
                    employee: users[2]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                },
                {
                    employee: users[1]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                }
            ]
        },
        {
            startDate: "2023-02-19T14:00:00.000Z",
            shifts: [
                {
                    employee: users[0]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                },
                {
                    employee: users[2]._id,
                    start: "2023-02-12T23:00:00.000Z",
                    end: "2023-02-13T03:00:00.000Z",
                }
            ]
        }
    ]) 

    console.log("Seeded")
    mongoose.connection.close()
})
