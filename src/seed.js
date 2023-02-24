const mongoose = require("mongoose")
const Roster = require('./models/roster')
const User = require('./models/user')


mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2", async () => {
    const users = await User.create([
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@email.com",
            phone: "0411222333",
            dob: "1990-07-27",
            unavailable: [
                {
                    day: "Monday",
                    start: "08:00",
                    end: "18:00"
                },
                {
                    day: "Tuesday",
                    start: "14:00",
                    end: "18:00"
                }
            ]
        },
        {
            firstName: "Sally",
            lastName: "Jackson",
            email: "sally@email.com",
            phone: "0422222333",
            dob: "1999-08-18",
            unavailable: [
                {
                    day: "Saturday",
                    start: "15:00",
                    end: "18:00"
                },
                {
                    day: "Sunday",
                    start: "08:00",
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
            unavailable: [
                {
                    day: "Thursday",
                    start: "08:00",
                    end: "12:00"
                },
                {
                    day: "Friday",
                    start: "13:00",
                    end: "18:00"
                }
            ]
        },
        {
            firstName: "Taylor",
            lastName: "Jones",
            email: "taylor@email.com",
            phone: "0455222333",
            dob: "2006-09-12",
            unavailable: [
                {
                    day: "Wednesday",
                    start: "08:00",
                    end: "13:00"
                },
            ]
        },
        {
            firstName: "Tim",
            lastName: "King",
            email: "tim@email.com",
            phone: "0466222333",
            dob: "1995-02-14",
            unavailable: [
                {
                    day: "Monday",
                    start: "08:00",
                    end: "18:00"
                },
                {
                    day: "Thursday",
                    start: "08:00",
                    end: "10:00"
                }
            ]
        },
        {
            firstName: "Sarah",
            lastName: "Thomson",
            email: "sarah@email.com",
            phone: "0477222333",
            dob: "2002-03-08",
            unavailable: [
                {
                    day: "Tuesday",
                    start: "12:00",
                    end: "18:00"
                },
            ]
        },
        {
            firstName: "Daniel",
            lastName: "Ross",
            email: "daniel@email.com",
            phone: "0499222333",
            dob: "1998-06-18",
            unavailable: [
                {
                    day: "Thursday",
                    start: "08:00",
                    end: "12:00"
                },
                {
                    day: "Friday",
                    start: "13:00",
                    end: "18:00"
                },
                {
                    day: "Saturday",
                    start: "08:00",
                    end: "18:00"
                }
            ]
        },
    ])
    const rosters = await Roster.create([
        {
            start: "2023-02-24T08:00:00.000Z",
            end: "2023-02-24T18:00:00.000Z",
            shifts: [
                {
                    employee: users[0]._id,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T12:00:00.000Z",
                },
                {
                    employee: users[1]._id,
                    start: "2023-02-24T09:00:00.000Z",
                    end: "2023-02-24T13:00:00.000Z",
                },
                {
                    employee: users[3]._id,
                    start: "2023-02-24T11:00:00.000Z",
                    end: "2023-02-24T14:00:00.000Z",
                },
                {
                    employee: users[4]._id,
                    start: "2023-02-24T12:00:00.000Z",
                    end: "2023-02-24T16:00:00.000Z",
                },
                {
                    employee: users[5]._id,
                    start: "2023-02-24T13:00:00.000Z",
                    end: "2023-02-24T17:00:00.000Z",
                },
                {
                    employee: users[6]._id,
                    start: "2023-02-24T14:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
                {
                    employee: users[2]._id,
                    start: "2023-02-24T14:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
            ]
        },
        {
            start: "2023-02-25T08:00:00.000Z",
            end: "2023-02-25T18:00:00.000Z",
            shifts: [
                {
                    employee: users[0]._id,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T11:00:00.000Z",
                },
                {
                    employee: users[1]._id,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T12:00:00.000Z",
                },
                {
                    employee: users[3]._id,
                    start: "2023-02-24T09:00:00.000Z",
                    end: "2023-02-24T13:00:00.000Z",
                },
                {
                    employee: users[4]._id,
                    start: "2023-02-24T10:00:00.000Z",
                    end: "2023-02-24T15:00:00.000Z",
                },
                {
                    employee: users[5]._id,
                    start: "2023-02-24T12:00:00.000Z",
                    end: "2023-02-24T16:00:00.000Z",
                },
                {
                    employee: users[6]._id,
                    start: "2023-02-24T13:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
                {
                    employee: users[2]._id,
                    start: "2023-02-24T14:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
            ]
        },
        {
            start: "2023-02-26T08:00:00.000Z",
            end: "2023-02-26T18:00:00.000Z",
            shifts: [
                {
                    employee: users[0]._id,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T13:00:00.000Z",
                },
                {
                    employee: users[1]._id,
                    start: "2023-02-24T09:00:00.000Z",
                    end: "2023-02-24T14:00:00.000Z",
                },
                {
                    employee: users[2]._id,
                    start: "2023-02-24T10:00:00.000Z",
                    end: "2023-02-24T16:00:00.000Z",
                },
                {
                    employee: users[3]._id,
                    start: "2023-02-24T11:00:00.000Z",
                    end: "2023-02-24T16:00:00.000Z",
                },
                {
                    employee: users[4]._id,
                    start: "2023-02-24T12:00:00.000Z",
                    end: "2023-02-24T17:00:00.000Z",
                },
                {
                    employee: users[5]._id,
                    start: "2023-02-24T13:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
                {
                    employee: users[6]._id,
                    start: "2023-02-24T14:00:00.000Z",
                    end: "2023-02-24T18:00:00.000Z",
                },
            ]
        },
    ]) 

    console.log("Seeded")
    mongoose.connection.close()
})
