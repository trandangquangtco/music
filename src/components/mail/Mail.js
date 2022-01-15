const nodeMailer = require('nodemailer');
const config = require("../../config");

const adminEmail = config.ADMIN_EMAIL;
const adminPassword = config.ADMIN_EMAIL_PASS;

const mailHost = 'smtp.gmail.com';

const mailPort = 587;
const sendMail = (to, subject, htmlContent) => {
  
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // true for port 465
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });
  const options = {
    from: adminEmail, 
    to: to,
    subject: subject, 
    html: htmlContent 
  };
  return transporter.sendMail(options);
}
module.exports = {
  sendMail
}