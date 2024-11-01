import Notification from '../models/NotificationSchema.mjs';
import { asyncHandler } from '../middleware/asyncHandler.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';

export const getNotifications = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId, isRead: false });

    res.status(200).json({
        success: true,
        data: notifications
    });
});

export const getNotificationStatus = asyncHandler(async (req, res, next) => {
    const { requestId } = req.params;  // Assuming requestId is passed in URL params

    console.log("Fetching notification status for requestId:", requestId);  // Debugging log

    const notification = await Notification.findById(requestId);

    if (!notification) {
        return next(new ErrorResponse('Notification not found for this request', 404));
    }

    // Return the current status of the notification
    res.status(200).json({
        success: true,
        data: {
            isAccepted: notification.status === 'approved',
            isDeclined: notification.status === 'declined',
            status: notification.status
        }
    });
});

export const markNotificationAsRead = asyncHandler(async (req, res, next) => {
    const { notificationId } = req.params;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
        return next(new ErrorResponse('Notification not found', 404));
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
        success: true,
        data: notification
    });
});