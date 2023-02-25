const request = require("supertest")
const {app} = require("../src/server")
const mongoose = require("mongoose")

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe("Server homepage", () => {
    it("shows data sent message", async () => {
        const response = await request(app).get("/")
        expect(response.statusCode).toBe(200)
        expect(response.text).toEqual(expect.stringContaining("sent"))
    })
})


