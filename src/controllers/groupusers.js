import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { defaultResponse } from '../utils/defaultRes.js';

export const getAllGroupUsers = async (req, res) => {
  try {
    const result = await db.execute(`SELECT * FROM groupUsers`);
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows);
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving Groups');
  }
};

export const getGroupUsersByGroupId = async (req, res) => {
  const { groupId } = req.params;

  try {
    const result = await db.execute({ sql: `SELECT * FROM groupUsers WHERE groupId = :groupId`, args: { groupId } });
    defaultResponse(res, 200, 'Groups retrieved successfully', result.rows);
  } catch (e) {
    console.log('Error retrieving Groups by ID from database', e);
    defaultResponse(res, 500, 'Error retrieving Groups');
  }
};

export const createGroupUser = async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    const result = await db.execute({
      sql: `INSERT INTO groupUsers (groupId, userId) VALUES (:groupId, :userId)`,
      args: { groupId, userId },
    });
    defaultResponse(res, 200, 'Group created successfully');
  } catch (e) {
    console.log('Error creating Group in database', e);
    defaultResponse(res, 500, 'Error creating Group');
  }
};

export const deleteGroupUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: `DELETE FROM groupUsers WHERE userId = :id`,
      args: { id },
    });
    defaultResponse(res, 200, 'Group deleted successfully');
  } catch (e) {
    console.log('Error deleting Group in database', e);
    defaultResponse(res, 500, 'Error deleting Group');
  }
};
