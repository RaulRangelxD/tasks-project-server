import { Router } from 'express'
import { getAllGroupUsers, getGroupUsersByGroupId, getGroupUsersByUserId, getGroupUsersByAuth, createGroupUser, deleteGroupUser } from '../controllers/groupusers.js'

const router = Router()

router.get('/', getAllGroupUsers)
router.get('/group/:groupId', getGroupUsersByGroupId)
router.get('/user/:userId', getGroupUsersByUserId)
router.get('/auth', getGroupUsersByAuth)

router.post('/', createGroupUser)

router.delete('/delete/:id', deleteGroupUser)

export default router
