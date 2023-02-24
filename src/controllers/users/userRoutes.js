const express = require("express")
const {registerUser, getUnavailabilities, getShifts,
    //loginUser, 
getUsers, getShiftsByUserId, deleteUser} = require("./userControllers")

const userRouter = express.Router()

userRouter.post("/register", async (request, response) => {
    const user = await registerUser ({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        dob: request.body.dob,
        unavailable: request.body.unavailable,
    })
    console.log(user)
    return response.json("user registered")
})

/* userRouter.post("/login", async (request, response) => {
    const token = await loginUser({
        email: request.body.email,
        password: request.body.password
    })
    return response.json(token)
}) */

userRouter.get("/", async (request, response) => {
    const users = await getUsers()
    response.json(users)
})


userRouter.get("/unavailabilities", async (request, response) => {
    const unavailabilities = await getUnavailabilities()
    response.json(unavailabilities)
})

userRouter.get("/shifts/:userId", async (request, response) => {
    const shifts = await getShifts(request.params.userId)
    response.json(shifts)
})



userRouter.get("/:userId/shifts", async (request, response) => {
    const shifts = await getShiftsByUserId(request.params.userId)
    response.json(shifts)
})

userRouter.delete("/:userId", async (request, response) => {
    const user = await deleteUser(request.params.userId)
    response.json(user)
})

module.exports = userRouter