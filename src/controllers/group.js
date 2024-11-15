import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { defaultResponse } from '../utils/defaultRes.js';

export const getAllGroups = async (req, res) => {
  try {
    const result = await db.execute(`SELECT * FROM groups`);
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows);
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving Groups');
  }
};

export const getGroupsByAuth = async (req, res) => {
  const token = req.cookies.auth;
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.id;

  try {
    const result = await db.execute({ sql: `SELECT * FROM groups WHERE userId = :userId`, args: { userId } });
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows);
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving Groups');
  }
};

export const createGroup = async (req, res) => {
  const token = req.cookies.auth;
  const decodedToken = jwt.decode(token);
  const userId = decodedToken.id;

  const { title } = req.body;
  try {
    const result = await db.execute({
      sql: `INSERT INTO groups (title, userId) VALUES (:title, :userId)`,
      args: { title, userId },
    });
    defaultResponse(res, 200, 'Group created successfully');
  } catch (e) {
    console.log('Error creating Group in database', e);
    defaultResponse(res, 500, 'Error creating Group');
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const result = await db.execute({
      sql: `UPDATE groups SET title = :title WHERE id = :id`,
      args: { title, id },
    });
    defaultResponse(res, 200, 'Group updated successfully');
  } catch (e) {
    console.log('Error updating Group in database', e);
    defaultResponse(res, 500, 'Error updating Group');
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: `DELETE FROM groups WHERE id = :id`,
      args: { id },
    });
    defaultResponse(res, 200, 'Group deleted successfully');
  } catch (e) {
    console.log('Error deleting Group in database', e);
    defaultResponse(res, 500, 'Error deleting Group');
  }
};
