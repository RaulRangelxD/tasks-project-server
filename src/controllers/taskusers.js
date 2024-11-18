import { getAllTaskUsersModel, getTaskUsersByTaskIdModel, getTaskUsersNoNotifiedModel, createTaskUserModel, updateTaskUserNotifiedModel, deleteTaskUserModel } from '../models/taskusers.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const getAllTaskUsers = async (req, res) => {
  try {
    const result = await getAllTaskUsersModel()
    defaultResponse(res, 200, 'Tasks Users retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Tasks Users by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Tasks Users')
  }
}

export const getTaskUsersByTaskId = async (req, res) => {
  const { taskId } = req.params

  try {
    const result = await getTaskUsersByTaskIdModel(taskId)
    defaultResponse(res, 200, 'Task users retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Task users by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Task users')
  }
}

export const getTaskUsersNoNotified = async (req, res) => {
  const { userId } = req.params

  try {
    const result = await getTaskUsersNoNotifiedModel(userId)
    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving tasks by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const createTaskUser = async (req, res) => {
  const { taskId, userId } = req.body
  try {
    const result = await createTaskUserModel(taskId, userId)
    defaultResponse(res, 200, 'Task user created successfully')
  } catch (e) {
    console.log('Error creating Task user in database', e)
    defaultResponse(res, 500, 'Error creating Task user')
  }
}

export const updateTaskUserNotified = async (req, res) => {
  const { id } = req.params
  try {
    const result = await updateTaskUserNotifiedModel(id)
    defaultResponse(res, 200, 'Task updated notified successfully')
    console.log(result)
  } catch (e) {
    console.log('Error updating notified tasks by ID from database', e)
    defaultResponse(res, 500, 'Error updating notified tasks')
  }
}

export const deleteTaskUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteTaskUserModel(id)
    defaultResponse(res, 200, 'Task user deleted successfully')
  } catch (e) {
    console.log('Error deleting Task user in database', e)
    defaultResponse(res, 500, 'Error deleting Task user')
  }
}
