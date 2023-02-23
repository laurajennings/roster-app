const express = require("express")
const {registerUser, 
    //loginUser, 
getUsers, deleteUser} = require("./userControllers")

const userRouter = express.Router()

userRouter.post("/register", async (request, response) => {
    const user = await registerUser ({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phone: request.body.phone,
        dob: request.body.dob,
        availability: request.body.availability,
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

userRouter.delete("/:userId", async (request, response) => {
    const user = await deleteUser(request.params.userId)
    response.json(user)
})

module.exports = userRouter