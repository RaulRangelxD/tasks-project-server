import db from '../config/database.js'

export const getAllGroupsModel = async () => {
  const result = await db.execute(`SELECT * FROM groups`)
  return result
}

export const getGroupsByIdModel = async (id) => {
  const result = await db.execute({ sql: `SELECT * FROM groups WHERE id = :id`, args: { id } })
  return result
}

export const getGroupsByAuthModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM groups WHERE userId = :userId`, args: { userId } })
  return result
}

export const createGroupModel = async (title, userId) => {
  const result = await db.execute({
    sql: `INSERT INTO groups (title, userId) VALUES (:title, :userId)`,
    args: { title, userId },
  })
  return result
}

export const updateGroupModel = async (title, id) => {
  const result = await db.execute({
    sql: `UPDATE groups SET title = :title WHERE id = :id`,
    args: { title, id },
  })
  return result
}

export const deleteGroupModel = async (id) => {
  const result = await db.execute({
    sql: `DELETE FROM groups WHERE id = :id`,
    args: { id },
  })
  return result
}
