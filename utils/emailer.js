require("dotenv").config();
const nodemailer = require("nodemailer");

const {
  SMTP_HOST,
  SMTP_PORT=587,
  SMTP_USERNAME ,
  SMTP_PASSWORD,
  SMTP_SECURE = null,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT == 465 ? true : SMTP_SECURE ?? false,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

const mailOptions = {
  from: "armajid11902@gmail.com",
  to: "armajid2002@gmail.com",
  subject: "test-socjobs",
  text: "HALO ADNAN",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
    // do something useful
  }
});
