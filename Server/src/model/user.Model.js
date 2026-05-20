import pool from "../config/db.js"
export const getUserByEmail = async (email) => {
    const result = await pool.query(`select * from users where email = $1`,
        [email]
    )
    return result.rows[0]
}

export const getUserById = async (id) => {
    const result = await pool.query(`select * from users where id = $1`,
        [id]
    )
    return result.rows[0]
}