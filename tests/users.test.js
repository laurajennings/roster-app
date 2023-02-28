const request = require("supertest")
const {app} = require("../src/server")
const mongoose = require("mongoose")

let userId

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")
    
    const response = await request(app)
    .post("/users")
    .send({
        firstName: "Olivia",
        lastName: "Tims",
        email: "olivia@email.com",
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
    userId = response.body._id
})

afterAll(async () => {
    await request(app).delete(`/users/${userId}`)
    await mongoose.connection.close()
})

describe("Gets user", () => {
    it("gets all users names, email, phone and dob", async () => {
        const response = await request(app).get("/users")
        expect(response.statusCode).toBe(200)
    })
})

describe("Gets a user by userId", () => {
    it("gets a user", async () => {
        const response = await request(app).get(`/users/${userId}`)
        expect(response.statusCode).toBe(200)
    })
    it("returns 'user doesn't exist' if user id isn't found", async () => {
        const response = await request(app).get("/users/63f884c73e1a037f129c5ecb")
        expect(response.statusCode).toBe(404)
    })
})

describe("Gets user unavailabilities", () => {
    it("gets all users unavailabilities", async () => {
        const response = await request(app).get("/users/unavailabilities")
        expect(response.statusCode).toBe(200)
    })
})

describe("Gets a users shifts", () => {
    it("gets a users shift with userId", async () => {
        const response = await request(app).get(`/users/shifts/${userId}`)
        expect(response.statusCode).toBe(200)
    })
})

describe("Create a user", () => {
    it("creates a new user", async () => {
        const response = await request(app).post("/users")
        .send({
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
                }
            ]
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.firstName).toEqual("John")
    })
})

describe("Deletes a user", () => {
    it("deletes a user with userId", async () => {
        const response = await request(app).delete(`/users/${userId}`)
        expect(response.statusCode).toBe(200)
    })
})

