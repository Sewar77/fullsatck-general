import jwt from "jsonwebtoken";
import { register } from "../model/auth.Model.js";
import { getUserByEmail } from "../model/user.Model.js";
import bcrypt from "bcrypt";
import cookie from "cookie-parser"

export const registerController = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        const isExist = await getUserByEmail(email);
        if (isExist) {
            return res.status(400).json({ message: "Email already exit" });
        }
        const hashed_password = await bcrypt.hash(password, 10);
        const user = await register(name, email, hashed_password);
        return res.status(201).json({ message: "Registered Successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(req.body);

        const isExist = await getUserByEmail(email);
        if (!isExist) {
            return res.status(404).json({ message: "Could not fund user" });
        }
        console.log("user:", isExist);

        const isMatch = await bcrypt.compare(password, isExist.hashed_password);
        console.log(12);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Password or Email ar not correct" });
        }
        console.log(isMatch);

        const token = jwt.sign(
            {
                id: isExist.id,
                email: isExist.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        console.log(token);

        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
        });
        res.cookie(
            "user",
            {
                id: isExist.id,
                email: isExist.email,
            },
            {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
            }
        );
        return res
            .status(200)
            .json({
                message: "Login successfully", user: {
                    id: isExist.id,
                    email: isExist.email,
                    name: isExist.name,
                    role: isExist.role,
                    created_at: isExist.created_at
                },
            });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
