import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DriverLicense',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false  // Unread by default
    },
    status: {
        type: String,
        enum: ["pending", "approved", "declined"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Notification', notificationSchema);