import cron from "node-cron";
import Note from "../models/note.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
  },
});


cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const notesToRemind = await Note.find({
      reminderAt: { $lte: now },
      reminderSent: false,
    }).populate("user", "email");

    for (const note of notesToRemind) {
      if (!note.user?.email) continue;

      
      await transporter.sendMail({
        from: process.env.email,
        to: note.user.email,
        subject: `Reminder: ${note.title}`,
        text: note.content,
      });

      
      note.reminderSent = true;
      await note.save();

      console.log(`Reminder sent for note: ${note.title}`);
    }
  } catch (error) {
    console.error("Error in reminder job:", error.message);
  }
});
