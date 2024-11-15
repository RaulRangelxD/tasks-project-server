import { Router } from 'express';
import { getAllTaskUsers, getTaskUsersByTaskId, getTaskUsersNoNotified, createTaskUser, updateTaskUserNotified, deleteTaskUser } from '../controllers/taskusers.js';

const router = Router();

router.get('/', getAllTaskUsers);
router.get('/task/:taskId', getTaskUsersByTaskId);
router.get('/notified/:userId', getTaskUsersNoNotified);

router.post('/', createTaskUser);

router.patch('/notified/:id', updateTaskUserNotified);

router.delete('/delete/:id', deleteTaskUser);

export default router;
