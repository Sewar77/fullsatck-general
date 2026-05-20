import { register } from "../model/auth.Model.js"
import { getUserByEmail } from "../model/user.Model.js"
import bcrypt from "bcrypt"

export const registerController = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    try {
        const isExit = await getUserByEmail(email)
        if (isExit) {
            return res.status(400).json({ message: "Email already exit" })
        }
        const hashed_password = await bcrypt.hash(password, 10)
        const user = await register(name, email, hashed_password)
        return res.status(201).json({ message: "Registered Successfully", user })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}







