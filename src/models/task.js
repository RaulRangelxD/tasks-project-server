import db from '../config/database.js'

export const getAllTasksModel = async (req, res) => {
  const result = await db.execute(`SELECT * FROM tasks`)
  return result
}

export const getAllTasksByStatusModel = async (status, groupId) => {
  const result = await db.execute({
    sql: `SELECT * FROM tasks WHERE status = :status AND groupId = :groupId`,
    args: { status, groupId },
  })

  return result
}

export const getTasksByIdModel = async (id) => {
  const result = await db.execute({ sql: `SELECT * FROM tasks WHERE id = :id`, args: { id } })
  return result
}

export const getTasksByUserIdModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM tasks WHERE userId = :userId`, args: { userId } })
  return result
}

export const getTasksByAuthModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM tasks WHERE userId = :userId`, args: { userId } })
  return result
}

export const createTaskModel = async (groupId, title, description, status) => {
  const result = await db.execute({
    sql: `INSERT INTO tasks (groupId, title, description, status) VALUES (:groupId, :title, :description, :status)`,
    args: { groupId, title, description, status: 'pending' },
  })
  return result
}

export const updateTaskModel = async (title, description, status, id) => {
  const result = await db.execute({
    sql: `UPDATE tasks SET title = :title, description = :description, status = :status WHERE id = :id`,
    args: { title, description, status, id },
  })
  return result
}

export const updateTaskStatusModel = async (status, id) => {
  const result = await db.execute({
    sql: `UPDATE tasks SET status = :status WHERE id = :id`,
    args: { status, id },
  })
  return result
}

export const deleteTaskModel = async (id) => {
  const result = await db.execute({
    sql: `DELETE FROM tasks WHERE id = :id`,
    args: { id },
  })
  return result
}
