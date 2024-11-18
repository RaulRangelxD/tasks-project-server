import db from '../config/database.js'

export const getAllTaskUsersModel = async (req, res) => {
  const result = await db.execute(`SELECT * FROM taskusers`)
  return result
}

export const getTaskUsersByTaskIdModel = async (taskId) => {
  const result = await db.execute({ sql: `SELECT * FROM taskUsers WHERE taskId = :taskId`, args: { taskId } })
  return result
}

export const getTaskUsersNoNotifiedModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM taskUsers WHERE userId = :userId AND notified = FALSE`, args: { userId } })
  return result
}

export const createTaskUserModel = async (taskId, userId) => {
  const result = await db.execute({
    sql: `INSERT INTO taskUsers (taskId, userId) VALUES (:taskId, :userId)`,
    args: { taskId, userId },
  })
  return result
}

export const updateTaskUserNotifiedModel = async (id) => {
  const result = await db.execute({ sql: `UPDATE taskUsers SET notified = TRUE WHERE id = :id`, args: { id } })
  return result
}

export const deleteTaskUserModel = async (id) => {
  const result = await db.execute({
    sql: `DELETE FROM taskUsers WHERE id = :id`,
    args: { id },
  })
  return result
}
