const request = require("supertest")
const {app} = require("../src/server")
const mongoose = require("mongoose")


const userId = "63f884c73e1a037f129c5ecb"

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("Gets user", () => {
    it("gets all users names, email, phone and dob", async () => {
        const response = await request(app).get("/users")
        expect(response.statusCode).toBe(200)
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

