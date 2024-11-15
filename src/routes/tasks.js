import { Router } from 'express';
import { getAllTasks, getAllTasksByStatus, getTasksById, getTasksByUserId, getTasksByAuth, createTask, updateTask, updateTaskStatus, deleteTask } from '../controllers/task.js';

const router = Router();

router.get('/', getAllTasks);
router.get('/status', getAllTasksByStatus);
router.get('/id/:id', getTasksById);
router.get('/userid/:userId', getTasksByUserId);
router.get('/auth', getTasksByAuth);

router.post('/', createTask);

router.patch('/update/:id', updateTask);
router.patch('/status/:id', updateTaskStatus);

router.delete('/delete/:id', deleteTask);

export default router;
