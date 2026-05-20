import jwt from "jsonwebtoken"

export const generateAccessTokens = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
        , { expiresIn: "15m" }
    )
}

export const generateRefreshTokens = (user) => {
    return jwt.sign(
        {
            id: user.id,
        },
        process.env.REFRESH_SECRET
        , { expiresIn: "30d" }
    )
}
