const nodemailer = require("nodemailer");

// Replace with your Gmail address and app password
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS; // Your Gmail address
const APP_PASSWORD = process.env.APP_PASSWORD; // The app password you generated

async function sendMail(sendTo, confirmationURL) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Faraz Ahmad <${EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "Confirmation Email", // Subject line
      text: `Please click the link to confirm: ${confirmationURL}`, // plain text body
      html: `Please click the link to confirm: <a href="${confirmationURL}">${confirmationURL}</a>`, // html body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendNewClientContactMail(sendTo, contactData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Faraz Ahmad <${EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Client Contact Request 🎉", // Subject line
      text: `New Client | Name: ${contactData?.name}, Email: ${contactData?.email}, Message: ${contactData?.message} `, // plain text body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendNewClientMeetingMail(sendTo, meetingData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Faraz Ahmad <${EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Client Meeting Request 🤝🎉", // Subject line
      text: `New Clinet Meeting | Name: ${meetingData?.name}, Email: ${meetingData?.email}, Mode: ${meetingData?.mode}, Slot: ${meetingData?.slot}`, // plain text body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendMail,
  sendNewClientContactMail,
  sendNewClientMeetingMail,
};
