import pool from "../config/db.js"
export const getUserByEmail = async (email) => {
    const result = await pool.query(`select name, email, role, created_at from users where email = $1`,
        [email]
    )
    return result.rows[0]
}