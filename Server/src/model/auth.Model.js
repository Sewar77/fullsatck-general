import pool from "../config/db.js";

export const register = async (name, email, hashed_password) => {
    const result = await pool.query(`insert into users(name, email, hashed_password) 
        values($1, $2, $3) returning * `, [name, email, hashed_password])
    return result.rows[0]
}
