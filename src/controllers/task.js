import jwt from 'jsonwebtoken'
import {
  getAllTasksModel,
  getAllTasksByStatusModel,
  getTasksByIdModel,
  getTasksByUserIdModel,
  getTasksByAuthModel,
  createTaskModel,
  updateTaskModel,
  updateTaskStatusModel,
  deleteTaskModel,
} from '../models/task.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const getAllTasks = async (req, res) => {
  try {
    const result = await getAllTasksModel()
    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving tasks from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const getAllTasksByStatus = async (req, res) => {
  const { status, groupId } = req.query
  try {
    const result = await getAllTasksByStatusModel(status, groupId)

    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.error('Error retrieving tasks by status from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const getTasksById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await getTasksByIdModel(id)
    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving tasks by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const getTasksByUserId = async (req, res) => {
  const { userId } = req.params
  try {
    const result = await getTasksByUserIdModel(userId)
    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving tasks by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const getTasksByAuth = async (req, res) => {
  const token = req.cookies.auth
  const decodedToken = jwt.decode(token)
  const userId = decodedToken.id

  try {
    const result = await getTasksByAuthModel(userId)
    defaultResponse(res, 200, 'Tasks retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving tasks by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving tasks')
  }
}

export const createTask = async (req, res) => {
  const { groupId, title, description } = req.body
  const status = 'pending'
  try {
    const result = await createTaskModel(groupId, title, description, status)
    defaultResponse(res, 200, 'Task created successfully')
  } catch (e) {
    console.log('Error creating task in database', e)
    defaultResponse(res, 500, 'Error creating task')
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, status } = req.body
  try {
    const result = await updateTaskModel(title, description, status, id)
    defaultResponse(res, 200, 'Task updated successfully')
  } catch (e) {
    console.log('Error updating task in database', e)
    defaultResponse(res, 500, 'Error updating task')
  }
}

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const result = await updateTaskStatusModel(status, id)
    defaultResponse(res, 200, 'Task updated successfully')
  } catch (e) {
    console.log('Error updating task in database', e)
    defaultResponse(res, 500, 'Error updating task')
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteTaskModel(id)
    defaultResponse(res, 200, 'Task deleted successfully')
  } catch (e) {
    console.log('Error deleting task in database', e)
    defaultResponse(res, 500, 'Error deleting task')
  }
}
