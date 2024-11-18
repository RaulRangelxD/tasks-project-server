import jwt from 'jsonwebtoken'
import { getAllGroupUsersModel, getGroupUsersByGroupIdModel, getGroupUsersByUserIdModel, getGroupUsersByAuthModel, createGroupUserModel, deleteGroupUserModel } from '../models/groupusers.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const getAllGroupUsers = async (req, res) => {
  try {
    const result = await getAllGroupUsersModel()
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Groups')
  }
}

export const getGroupUsersByGroupId = async (req, res) => {
  const { groupId } = req.params

  try {
    const result = await getGroupUsersByGroupIdModel(groupId)
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Groups')
  }
}

export const getGroupUsersByUserId = async (req, res) => {
  const { userId } = req.params

  try {
    const result = await getGroupUsersByUserIdModel(userId)
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Groups')
  }
}

export const getGroupUsersByAuth = async (req, res) => {
  const token = req.cookies.auth
  const decodedToken = jwt.decode(token)
  const userId = decodedToken.id

  try {
    const result = await getGroupUsersByAuthModel(userId)
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving Groups')
  }
}

export const createGroupUser = async (req, res) => {
  const { groupId, userId } = req.body
  try {
    const result = await createGroupUserModel(groupId, userId)
    defaultResponse(res, 200, 'Group created successfully')
  } catch (e) {
    console.log('Error creating Group in database', e)
    defaultResponse(res, 500, 'Error creating Group')
  }
}

export const deleteGroupUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteGroupUserModel(id)
    defaultResponse(res, 200, 'Group deleted successfully')
  } catch (e) {
    console.log('Error deleting Group in database', e)
    defaultResponse(res, 500, 'Error deleting Group')
  }
}
