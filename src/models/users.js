import db from '../config/database.js'

export const getAllUsersModel = async () => {
  const result = await db.execute(`SELECT * FROM users`)
  return result
}

export const getUserByIdModel = async (id) => {
  const result = await db.execute({ sql: `SELECT * FROM users WHERE id = :id`, args: { id } })
  return result
}

export const getUserByEmailModel = async (email) => {
  const result = await db.execute({ sql: `SELECT * FROM users WHERE email = :email`, args: { email } })
  return result
}

export const createUserModel = async (email, username, password) => {
  const result = await db.execute({
    sql: `INSERT INTO users (email, username, password) VALUES (:email, :username, :password)`,
    args: { email, username, password },
  })
  return result
}

export const updateUserModel = async (email, username, password, id) => {
  const result = await db.execute({
    sql: `UPDATE users SET email = :email, username = :username, password = :password WHERE id = :id`,
    args: { email, username, password, id },
  })
  return result
}

export const deleteUserModel = async (id) => {
  const result = await db.execute({
    sql: `DELETE FROM users WHERE id = :id`,
    args: { id },
  })
  return result
}
