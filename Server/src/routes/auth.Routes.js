import express from "express"
import { registerController } from "../controller/auth.Controller.js"
import { validate } from "../middleware/validate.Middleware.js"
import registerSchema from "../validation/auth.Validation.js"

const route = express.Router()

route.post('/auth/register', validate(registerSchema), registerController)


export default route