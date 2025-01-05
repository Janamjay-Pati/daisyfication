/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions/v2';  // Firebase Functions v6
import * as nodemailer from 'nodemailer';  // To send emails
import * as dotenv from 'dotenv';  // To load environment variables

dotenv.config();

// Nodemailer setup for sending emails (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// HTTP function that will be called by Cloud Scheduler
export const sendScheduledEmail = functions.https.onRequest(async (req, res) => {
  // Mail options (replace with your details)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient@example.com',  // Replace with actual recipient
    subject: 'Scheduled Email',
    text: 'This is an automatically sent email!',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).send('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});