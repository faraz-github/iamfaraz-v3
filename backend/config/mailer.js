const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(sendTo, confirmationURL) {
    try {

        // Transport Setup
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "faraz01000110@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        // Mail Options
        const mailOptions = {
            from: "Faraz Ahmad <faraz01000110@gmail.com>",
            to: sendTo,
            subject: "Confirmation Email", // Subject line
            text: `Please click the link to confirm: ${confirmationURL}`, // plain text body
            html: `Please click the link to confirm: <a href="${confirmationURL}">${confirmationURL}</a>`, // html body 
        }

        const result = await transporter.sendMail(mailOptions);
        return result;

    } catch (error) {
        return error;
    }
}

module.exports = sendMail;