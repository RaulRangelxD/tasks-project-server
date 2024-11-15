import { Router } from 'express';
import { loginUser, logoutUser, authToken } from '../controllers/auth.js';

const router = Router();

router.get('/authtoken', authToken);

router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
