const request = require("supertest")
const {app} = require("../src/server")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Roster = require('../src/models/roster')
const User = require('../src/models/user')

let userId
let token

beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URI)
    
    await User.deleteMany({})
    await Roster.deleteMany({}) 

    const user = await request(app)
    .post("/users")
    .send({
        firstName: "Olivia",
        lastName: "Tims",
        email: "olivia@email.com",
        password: await bcrypt.hash("olivia1234", 10),
        is_admin: true,
        phone: "0499222333",
        dob: "1994-02-21",
        unavailable: [
            {
                day: "Monday",
                start: "08:00",
                end: "18:00"
            }
        ]
    })
    token = user.body
    const decoded = jwt.verify(token, "secret")
    userId = decoded.id
})

afterAll(async () => {
    await request(app).delete(`/users/${userId}`)
    await mongoose.connection.close()
})

describe("Gets user", () => {
    it("gets all users names, email, phone and dob", async () => {
        const response = await request(app).get("/users")
        expect(response.statusCode).toBe(200)
        expect(response.body[0].firstName).toEqual("Olivia")
    })
})

describe("Gets a user by userId", () => {
    it("gets a user", async () => {
        const response = await request(app).get(`/users/${userId}`)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(200)
        expect(response.body.firstName).toEqual("Olivia")
        expect(response.body.unavailable[0].day).toEqual("Monday")
    })
    it("returns 'user doesn't exist' if user id isn't found", async () => {
        const response = await request(app).get("/users/63f884c73e1a037f129c5ecb")
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(404)
        expect(response.body.data).toEqual("User doesn't exist")
    })
})

describe("Gets user unavailabilities", () => {
    it("gets all users unavailabilities", async () => {
        const response = await request(app).get("/users/unavailabilities")
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(200)
        expect(response.body[0]._id).toEqual(userId)
    })
})

describe("Create a user", () => {
    it("creates a new user", async () => {
        const response = await request(app).post("/users")
        .set({ Authorization: `Bearer ${token}` })
        .send({
            firstName: "John",
            lastName: "Doe",
            email: "john@email.com",
            password: "john1234",
            is_admin: false,
            phone: "0411222333",
            dob: "1990-07-27",
            unavailable: [
                {
                    day: "Monday",
                    start: "08:00",
                    end: "18:00"
                }
            ]
        })    
        let johnsToken = response.body
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(johnsToken)
    })
    it("checks email is taken", async () => {
        const response = await request(app).post("/users")
        .set({ Authorization: `Bearer ${token}` })
        .send({
            firstName: "John",
            lastName: "Doe",
            email: "john@email.com",
            password: "john1234",
            is_admin: false,
            phone: "0411222333",
            dob: "1990-07-27",
            unavailable: [
                {
                    day: "Monday",
                    start: "08:00",
                    end: "18:00"
                }
            ]
        })
        expect(response.statusCode).toBe(400)
        expect(response.body.data).toEqual("Email already registered")
    })
})

describe("Deletes a user", () => {
    it("deletes a user with userId", async () => {
        const response = await request(app).delete(`/users/${userId}`)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(200)
        expect(response.body._id).toEqual(userId)
    })
    it("returns 'user doesn't exist' if user id isn't found", async () => {
        const response = await request(app).get("/users/63f884c73e1a037f129c5ecb")
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(404)
        expect(response.body.data).toEqual("User doesn't exist")
    })
})


/* describe("Gets a users shifts", () => {
    it("gets a users shift with userId", async () => {
        const response = await request(app).get(`/users/shifts/${userId}`)
        .set({ Authorization: `Bearer ${token}` })
        expect(response.statusCode).toBe(200)
    })
}) */