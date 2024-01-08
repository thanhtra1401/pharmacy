const nodemailer = require("nodemailer");
const sendEmail = async (email, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"nhathuoc" <foo@nhathuoc.com>', // sender address
    to: email, // list of receivers
    subject: "Thiết lập mật khẩu đăng nhập nhà thuốc", // Subject line
    html: html, // html body
  });
  return info;
};

export default sendEmail;
