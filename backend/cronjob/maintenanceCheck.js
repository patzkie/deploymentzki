import cron from "node-cron";
import userModel from "../models/userModel.js";
import notificationModel from "../models/notificationModel.js";
import buildMessage from "../utils/buildMessage.js";
import sendNotificationEmail from "../utils/sendNotificationEmail.js";


// 0 0 * * *     */5 * * * *  * * * * *

cron.schedule("* * * * * ", async () => {
  console.log("⏰ Checking for overdue car tasks...");

  const today = new Date();

  // ✅ Only these fields are supposed to be dates
  const dateFields = [
    "orCr_Exp",
    "batt_date",
    "next_oil_change",
    "next_tire_replacement",
    "next_brake_service",
    "next_coolant_change",
    "next_transmission_service",
    "next_general_checkup"
  ];

  try {
    const users = await userModel.find();

    for (const user of users) {
      for (const [index, car] of user.cars.entries()) {
        for (const field of dateFields) {
          const value = car[field];

          // ⏳ check only if valid date and overdue
          if (value && !isNaN(Date.parse(value)) && new Date(value) < today) {
            const message = buildMessage(field, car);

            try {
             await notificationModel.updateOne(
                { userId: user._id, carId: car._id || index, field },
                { $setOnInsert: { message } },
                { upsert: true }               
              ); 
                
               // ✅ check if there is a notification that hasn't been emailed
 
              const notifs = await notificationModel.find({
                userId: user._id,
                carId: car._id || index,
                field,
                emailed: false,
              });

              for (const notif of notifs) {
                await sendNotificationEmail(user, notif.message);
                await notificationModel.updateOne(
                  { _id: notif._id },
                  { $set: { emailed: true } }
                );
                console.log(`📧 Email sent to ${user.email}`);
              }


              /**
               *  const notif = await notificationModel.findOne({
    userId: user._id,
    carId: car._id || index,
    field,
    emailed: false, // ⬅️ only pick those not emailed yet
  });

  if (notif) {
    await sendNotificationEmail(user, message);
    await notificationModel.updateOne(
      { _id: notif._id },
      { $set: { emailed: true } } // ⬅️ mark as emailed
    );
    console.log(`📧 Email sent to ${user.email}`);
  }
               */


              console.log(`🔔 Notification ensured: ${message}`);
            } catch (dupErr) {
              if (dupErr.code === 11000) {
                console.log(`⚠️ Duplicate skipped for ${field} of ${car.vehicle}`);
              } else {
                console.error("❌ Error saving notification:", dupErr);
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("❌ Error in cron job:", err);
  }
});
