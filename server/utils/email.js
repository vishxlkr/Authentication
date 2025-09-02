import nodemailer from "nodemailer";

const sendEmail = async (options) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
         user: "vishxlkr@gmail.com",
         pass: "gwjr jwdn xfwp yrrp",
      },
   });

   const mailOptions = {
      from: "Verify <vishxlkr@gmail.com>",
      to: options.email,
      subject: options.subject,
      text: options.message,
   };

   await transporter.sendMail(mailOptions);
};

export default sendEmail;
