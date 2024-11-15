import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import { defaultResponse } from '../utils/defaultRes.js';

const JWT_SECRET = 'your-secret-key';
const JWT_EXPIRATION = '1h';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await db.execute({ sql: `SELECT * FROM users WHERE email = :email`, args: { email } });

  if (!result) {
    return defaultResponse(res, 401, 'User not found');
  }
  const isPasswordValid = password === result.rows[0].password ? true : false;
  if (!isPasswordValid) {
    return defaultResponse(res, 401, 'Incorrect credentials');
  }

  const token = jwt.sign({ id: result.rows[0].id, email: result.rows[0].email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

  res.cookie('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    maxAge: 60 * 60 * 1000,
  });

  return defaultResponse(res, 200, 'Authentication successful', { id: result.rows[0].id, email: result.rows[0].email });
};

export const logoutUser = async (req, res) => {
  res.clearCookie('auth');
  return defaultResponse(res, 200, 'Logout successful');
};

export const authToken = async (req, res) => {
  const token = req.cookies.auth;

  if (!token) {
    return defaultResponse(res, 401, 'Token not provided');
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return defaultResponse(res, 401, 'Invalid or expired token');
    }
    return defaultResponse(res, 200, 'Token is valid', decoded);
  });
};
