const request = require("supertest")
const {app} = require("../src/server")
const mongoose = require("mongoose")

const userId = "63f884c73e1a037f129c5ecb"
const start = "2023-02-24T08:00:00.000Z"
const end = "2023-02-24T18:00:00.000Z"
let rosterId

beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2")

    let roster = await request(app)
    .post("/rosters")
    .send({
        start: "2023-02-24T08:00:00.000Z",
        end: "2023-02-24T18:00:00.000Z",
        shifts: [
            {
                employee: userId,
                start: "2023-02-24T08:00:00.000Z",
                end: "2023-02-24T12:00:00.000Z",
            },
        ]
    })
    rosterId = roster.body._id
})

afterAll(async () => {
    await request(app).delete(`/rosters/${rosterId}`)
    await mongoose.connection.close()
})

describe("Gets rosters", () => {
    it("gets all rosters with shifts", async () => {
        const response = await request(app).get("/rosters")
        expect(response.statusCode).toBe(200)
    })
})

describe("Gets a roster by rosterId", () => {
    it("gets a roster with shifts", async () => {
        const response = await request(app).get(`/rosters/${rosterId}`)
        expect(response.statusCode).toBe(200)
    })
})

describe("Gets a roster by start date", () => {
    it("gets a roster by start date", async () => {
        const response = await request(app).get(`/rosters/date/${start}`)
        expect(response.statusCode).toBe(200)
    })
    it("returns 'roster doesn't exist' if roster id isn't found", async () => {
        const response = await request(app).get("/rosters/63f884c73e1a037f129c5ecb")
        expect(response.statusCode).toBe(404)
    })
})

describe("Gets upcoming rosters", () => {
    it("gets rosters with start dates after current date", async () => {
        const response = await request(app).get("/rosters/upcoming")
        expect(response.statusCode).toBe(200)
    })
})

describe("Gets previous rosters", () => {
    it("gets rosters with end dates after current date", async () => {
        const response = await request(app).get("/rosters/previous")
        expect(response.statusCode).toBe(200)
    })
})

describe("Create a roster", () => {
    it("creates a new roster and shifts", async () => {
        const response = await request(app).post("/rosters")
        .send({
            start: "2023-02-24T08:00:00.000Z",
            end: "2023-02-24T18:00:00.000Z",
            shifts: [
                {
                    employee: `${userId}`,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T12:00:00.000Z",
                },
            ]
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.start).toEqual("2023-02-24T08:00:00.000Z")
    })
})

describe("Updates a roster", () => {
    it("updates a new roster and shifts", async () => {
        const response = await request(app)
        .put(`/rosters/${rosterId}`)
        .send({
            start: "2023-02-25T08:00:00.000Z",
            end: "2023-02-25T18:00:00.000Z",
            shifts: [
                {
                    employee: `${userId}`,
                    start: "2023-02-24T08:00:00.000Z",
                    end: "2023-02-24T12:00:00.000Z",
                },
            ]
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.start).toEqual("2023-02-25T08:00:00.000Z")
    })
    it("returns 'roster doesn't exist' if roster id isn't found", async () => {
        const response = await request(app).get("/rosters/63f884c73e1a037f129c5ecb")
        expect(response.statusCode).toBe(404)
        expect(response.body.data).toEqual("Roster doesn't exist")
    })
})

describe("Deletes a roster", () => {
    it("deletes a roster with rosterId", async () => {
        const response = await request(app).delete(`/rosters/${rosterId}`)
        expect(response.statusCode).toBe(200)
    })
})
