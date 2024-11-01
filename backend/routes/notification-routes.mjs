import express from 'express';
import { getNotifications, getNotificationStatus, markNotificationAsRead } from '../controllers/notification-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

const router = express.Router();

router.route('/').get(protect, getNotifications);
router.route('/:notificationId/read').put(protect, markNotificationAsRead);
router.route('/:requestId').get(getNotificationStatus);

export default router;