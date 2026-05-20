import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
    try {
        let tokens = req.cookies.accesTokens || req.headers.authorizarion.split(" ")[1]

        if (!tokens) {
            return res.status(401).json({ message: "no tokens" })
        }
        const decoded = jwt.verify(tokens, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

