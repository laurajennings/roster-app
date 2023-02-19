const express = require("express")
const {registerUser, loginUser, getUsers, deleteUser} = require("./userControllers")

const userRouter = express.Router()

userRouter.post("/register", async (request, response) => {
    const token = await registerUser ({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    })
    return response.json("user registered")
})

userRouter.post("/login", async (request, response) => {
    const token = await loginUser({
        email: request.body.email,
        password: request.body.password
    })
    return response.json(token)
})

userRouter.get("/", async (request, response) => {
    const users = await getUsers()
    response.json(users)
})

userRouter.delete("/:userId", async (request, response) => {
    const user = await deleteUser(request.params.userId)
    response.json(user)
})

module.exports = userRouter