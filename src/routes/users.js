import { Router } from 'express';
import { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } from '../controllers/users.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/id/:id', getUserById);
router.get('/email', getUserByEmail);

router.post('/', createUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
