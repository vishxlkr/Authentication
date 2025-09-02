import nodemailer from "nodemailer";

// Use environment variables
const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // from .env
      port: process.env.EMAIL_PORT, // from .env
      secure: false, // true for 465, false for other ports like 587
      auth: {
         user: process.env.EMAIL_USER, // from .env
         pass: process.env.EMAIL_PASS, // from .env
      },
   });

   const mailOptions = {
      from: `Verify <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
   };

   await transporter.sendMail(mailOptions);
};

export default sendEmail;
