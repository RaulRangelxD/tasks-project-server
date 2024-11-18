import db from '../config/database.js'

export const getAllGroupUsersModel = async () => {
  const result = await db.execute(`SELECT * FROM groupUsers`)
  return result
}

export const getGroupUsersByGroupIdModel = async (groupId) => {
  const result = await db.execute({ sql: `SELECT * FROM groupUsers WHERE groupId = :groupId`, args: { groupId } })
  return result
}

export const getGroupUsersByUserIdModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM groupUsers WHERE userId = :userId`, args: { userId } })
  return result
}

export const getGroupUsersByAuthModel = async (userId) => {
  const result = await db.execute({ sql: `SELECT * FROM groupUsers WHERE userId = :userId`, args: { userId } })
  return result
}

export const createGroupUserModel = async (groupId, userId) => {
  const result = await db.execute({
    sql: `INSERT INTO groupUsers (groupId, userId) VALUES (:groupId, :userId)`,
    args: { groupId, userId },
  })
  return result
}

export const deleteGroupUserModel = async (id) => {
  const result = await db.execute({
    sql: `DELETE FROM groupUsers WHERE userId = :id`,
    args: { id },
  })
  return result
}
