import notificationModel from "../models/notificationModel.js";

// ✅ Get notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.body; // <-- read userId set by your auth middleware

    const notifications = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, notifications });
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// previous 
/*import notificationModel from "../models/notificationModel.js";

// ✅ Get all notifications for a specific user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await notificationModel
      .find({ userId })
      .sort({ createdAt: -1 }); // newest first

    res.json(notifications);
  } catch (err) {
    console.error("❌ Error fetching notifications:", err);
    res.status(500).json({ message: "Server error" });
  }
}; */
