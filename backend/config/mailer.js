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
      text: `New Client | Name: ${contactData?.name}, Email: ${contactData?.email}, Message: ${contactData?.message}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Client Request 🎉</h2>
                </center>
                <hr />
                <h4>Name: ${contactData?.name}</h4>
                <h4>Email: ${contactData?.email}</h4>
                
                <h4>Message:</h4>
                <p style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                  ${contactData?.message}
                </p>
              </div>
            `, // html body
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
      text: `New Client Meeting | Name: ${meetingData?.name}, Email: ${meetingData?.email}, Mode: ${meetingData?.mode}, Slot: ${meetingData?.slot}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Meeting Request 🎉</h2>
                </center>
                <hr />
                <h4>Name: ${meetingData?.name}</h4>
                <h4>Email: ${meetingData?.email}</h4>
                <h4>Mode:</h4>
                <div style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9; text-align: center; font-size: 18px; font-weight: bold; color: #333;">
                  ${meetingData?.mode === 'chat' ? 'Chat 💬' :
                    meetingData?.mode === 'voice' ? 'Voice 📞' :
                    meetingData?.mode === 'video' ? 'Video 📽️' :
                    meetingData?.mode === 'in-person' ? 'In-Person 🤝' : 'Unknown Mode'}
                </div>
                
                <h4>Slot:</h4>
                  <div style="display: flex; justify-content: space-around; align-items: center; border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                    <div style="flex: 1; text-align: center; margin-right: 20px;">
                      <h4 style="margin: 0;">Date:</h4>
                      <p style="font-size: 18px; font-weight: bold; color: #333;">
                        ${meetingData?.slot.split(' ')[0]}
                      </p>
                    </div>
                    <div style="flex: 1; text-align: center;">
                      <h4 style="margin: 0;">Time:</h4>
                      <p style="font-size: 18px; font-weight: bold; color: #333;">
                        ${meetingData?.slot.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                  </div>
              </div>
            `, // html body
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
