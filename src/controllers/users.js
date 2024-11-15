import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { defaultResponse } from '../utils/defaultRes.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await db.execute(`SELECT * FROM users`);
    defaultResponse(res, 200, 'Users retrieved successfully', result.rows);
  } catch (e) {
    console.log('Error retrieving users from database', e);
    defaultResponse(res, 500, 'Error retrieving users');
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({ sql: `SELECT * FROM users WHERE id = :id`, args: { id } });
    defaultResponse(res, 200, 'User retrieved successfully', result.rows[0]);
  } catch (e) {
    console.log('Error retrieving user by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving user');
  }
};

export const getUserByEmail = async (req, res) => {
  const token = req.cookies.auth;
  const decodedToken = jwt.decode(token);

  try {
    const result = await db.execute({ sql: `SELECT * FROM users WHERE email = :email`, args: { email: decodedToken.email } });
    defaultResponse(res, 200, 'User retrieved successfully', result.rows[0]);
  } catch (e) {
    console.log('Error retrieving user by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving user');
  }
};

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const result = await db.execute({
      sql: `INSERT INTO users (email, username, password) VALUES (:email, :username, :password)`,
      args: { email, username, password },
    });
    defaultResponse(res, 200, 'User created successfully');
  } catch (e) {
    console.log('Error creating user in database', e);
    defaultResponse(res, 500, 'Error creating user');
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, username, password } = req.body;
  try {
    const result = await db.execute({
      sql: `UPDATE users SET email = :email, username = :username, password = :password WHERE id = :id`,
      args: { email, username, password, id },
    });
    defaultResponse(res, 200, 'User updated successfully');
  } catch (e) {
    console.log('Error updating user in database', e);
    defaultResponse(res, 500, 'Error updating user');
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: `DELETE FROM users WHERE id = :id`,
      args: { id },
    });
    defaultResponse(res, 200, 'User deleted successfully');
  } catch (e) {
    console.log('Error deleting user in database', e);
    defaultResponse(res, 500, 'Error deleting user');
  }
};
