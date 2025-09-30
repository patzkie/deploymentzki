import { transporter } from "../config/email.js";

const sendNotificationEmail = async (user, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email, // must be stored in your userModel
      subject: "🔔 Car Maintenance Notification",
      text: message,
      html: `<p>${message}</p>`, // optional, makes it look nicer
    });

    console.log(`📧 Email sent to ${user.email}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${user.email}:`, err);
  }
};

export default sendNotificationEmail;
