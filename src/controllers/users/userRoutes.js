const express = require("express")
const {getUsers,
    //getUserById,
    getUnavailabilities,
    getShifts,
    registerUser, 
    deleteUser
    //loginUser, 
    //getShiftsByUserId, 
} = require("./userControllers")

const userRouter = express.Router()

// Gets all users' names, email, phone and dob
userRouter.get("/", async (request, response) => {
    const users = await getUsers()
    response.json(users)
})

/* userRouter.get("/:userId", async (request, response) => {
    const user = await getUserById(request.params.userId)
    if(!user) {
        response.json({
        data: "User doesn't exist"
        }, 404)
    }
    response.json(user)
}) */

// Gets all users' unavailabilities
userRouter.get("/unavailabilities", async (request, response) => {
    const unavailabilities = await getUnavailabilities()
    response.json(unavailabilities)
})

// Gets a users shifts by userId
userRouter.get("/shifts/:userId", async (request, response) => {
/*     const user = await getUserById(request.params.userId)
    if(!user) {
        response.json({
        data: "User doesn't exist"
        }, 404) */
    const shifts = await getShifts(request.params.userId)
    response.json(shifts)
})

// Creates a new user
userRouter.post("/", async (request, response) => {
    const user = await registerUser ({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        dob: request.body.dob,
        unavailable: request.body.unavailable,
    })
    return response.json(user)
})

// Deletes a user with userId
userRouter.delete("/:userId", async (request, response) => {
    const user = await deleteUser(request.params.userId)
    response.json(user)
})

module.exports = userRouter

/* userRouter.post("/login", async (request, response) => {
    const token = await loginUser({
        email: request.body.email,
        password: request.body.password
    })
    return response.json(token)
}) */

/* userRouter.get("/:userId/shifts", async (request, response) => {
    const shifts = await getShiftsByUserId(request.params.userId)
    response.json(shifts)
}) */