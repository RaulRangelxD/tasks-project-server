import jwt from 'jsonwebtoken'
import { getAllUsersModel, getUserByIdModel, getUserByEmailModel, createUserModel, updateUserModel, deleteUserModel } from '../models/users.js'
import { defaultResponse } from '../utils/defaultRes.js'

export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersModel()
    defaultResponse(res, 200, 'Users retrieved successfully', result.rows)
  } catch (e) {
    console.log('Error retrieving users from database', e)
    defaultResponse(res, 500, 'Error retrieving users')
  }
}

export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const result = await getUserByIdModel(id)
    defaultResponse(res, 200, 'User retrieved successfully', result.rows[0])
  } catch (e) {
    console.log('Error retrieving user by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving user')
  }
}

export const getUserByEmail = async (req, res) => {
  const token = req.cookies.auth
  const decodedToken = jwt.decode(token)
  const email = decodedToken.email

  try {
    const result = await getUserByEmailModel(email)
    defaultResponse(res, 200, 'User retrieved successfully', result.rows[0])
  } catch (e) {
    console.log('Error retrieving user by ID from database', e)
    defaultResponse(res, 500, 'Error retrieving user')
  }
}

export const createUser = async (req, res) => {
  const { email, username, password } = req.body
  try {
    const result = await createUserModel(email, username, password)
    defaultResponse(res, 200, 'User created successfully')
  } catch (e) {
    console.log('Error creating user in database', e)
    defaultResponse(res, 500, 'Error creating user')
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { email, username, password } = req.body
  try {
    const result = await updateUserModel(email, username, password, id)
    defaultResponse(res, 200, 'User updated successfully')
  } catch (e) {
    console.log('Error updating user in database', e)
    defaultResponse(res, 500, 'Error updating user')
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteUserModel(id)
    defaultResponse(res, 200, 'User deleted successfully')
  } catch (e) {
    console.log('Error deleting user in database', e)
    defaultResponse(res, 500, 'Error deleting user')
  }
}
