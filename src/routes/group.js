import { Router } from 'express';
import { getAllGroups, getGroupsByAuth, createGroup, updateGroup, deleteGroup } from '../controllers/group.js';

const router = Router();

router.get('/', getAllGroups);
router.get('/auth', getGroupsByAuth);

router.post('/', createGroup);

router.patch('/update/:id', updateGroup);

router.delete('/delete/:id', deleteGroup);

export default router;
