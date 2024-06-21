const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const emailCredentials = require("../email.json");
const {
    clientId, clientSecret, refreshToken
} = emailCredentials;

const email = "buckshotfeedback@gmail.com";

const createTransporter = async () => {

    const oauth2Client = new OAuth2(
        clientId,
        clientSecret,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err);
                reject("Failed to create access token :(");
            }
            resolve(token);
        });
    });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: email,
            accessToken,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
        },
    });

    return transporter;
};

let emailTransporter;
const getTransporter = async () => {
    if (!emailTransporter) {
        emailTransporter = createTransporter();
    }
    return emailTransporter;
}

const sendVerificationEmail = async (email, code) => {

    let link = `https://buckshot.me/verify-email/${code}`;

    let transporter = await getTransporter();
    await transporter.sendMail({
        subject: "Buckshot: Verify Account",
        text: `Your buckshot account is almost ready to use! Please click the link below to verify your account. \n${link}`,
        html: `<h3>buckshot</h3><h4>verify your account</h4><p>Your buckshot account is almost ready to use! Please click the link below to verify your account.</p><br><br><a href="${link}">Verify!</a>`,
        to: email,
        from: "buckshotfeedback@gmail.com",
        replyTo: "buckshotfeedback@gmail.com"
      });

}

const sendForgotPasswordEmail = async (email, code) => {

    let link = `https://buckshot.me/reset-password/${code}`;
    
    let transporter = await getTransporter();
    await transporter.sendMail({
        subject: "Buckshot: Reset Password",
        text: `You requested to change your password. Please click the link below to change it. If you didn't request a password change, ignore this.\n${link}`,
        html: `<h3>buckshot</h3><h4>reset your password</h4><p>You requested to change your password. Click the link below to change it. If you didn't request a password change, ignore this.</p><br><br><a href="${link}">Change Password</a>`,
        to: email,
        from: "buckshotfeedback@gmail.com",
        replyTo: "buckshotfeedback@gmail.com"
      });

}

module.exports = {
    sendVerificationEmail,
    sendForgotPasswordEmail
};