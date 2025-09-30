import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  carId: { type: String, required: true }, // we’ll use car._id or index if cars don’t have ids
  field: { type: String, required: true }, // e.g., "next_oil_change"
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }, // for your notification page
   emailed: { type: Boolean, default: false } 
});

// Prevent duplicate notifications (userId + carId + field should be unique)
notificationSchema.index({ userId: 1, carId: 1, field: 1 }, { unique: true });

const notificationModel =
  mongoose.models.notification || mongoose.model("notification", notificationSchema);

export default notificationModel;
