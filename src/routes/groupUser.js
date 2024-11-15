import { Router } from 'express';
import { getAllGroupUsers, getGroupUsersByGroupId, createGroupUser, deleteGroupUser } from '../controllers/groupusers.js';

const router = Router();

router.get('/', getAllGroupUsers);
router.get('/group/:groupId', getGroupUsersByGroupId);

router.post('/', createGroupUser);

router.delete('/delete/:id', deleteGroupUser);

export default router;
