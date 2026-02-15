const cron = require("node-cron");
const Event = require("../models/Event");
const sendEmail = require("../config/emailConfig");

const startReminderJob = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking reminders...");

    const now = new Date();

    const events = await Event.find({
      reminderTime: { $lte: now },
      reminderSent: false,
    }).populate("user");

    for (let event of events) {
      await sendEmail(
        event.user.email,
        `Reminder: ${event.title}`,
        `Your event "${event.title}" by ${event.organization} is scheduled at ${event.eventDate}.
        
Registration Link: ${event.registrationLink}
Email Used: ${event.emailUsed}
Password Used: ${event.passwordUsed}`
      );

      event.reminderSent = true;
      await event.save();
    }
  });
};

module.exports = startReminderJob;
