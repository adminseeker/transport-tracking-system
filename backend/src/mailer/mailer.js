const nodemailer = require("nodemailer");

var transporter =nodemailer.createTransport({
    service: "gmail",                           
    auth: {
      user: process.env.LOGIN_EMAIL,            
      pass: process.env.LOGIN_PASSWORD         
    }
  });
  
  var mailOptions = {
    from: process.env.LOGIN_EMAIL,               
    to: "",
    subject:"",
    text: "",
    html:""
  };

  const mailer = async (toEmail,text="",html="",subject="")=>{
    mailOptions.to=toEmail;
    mailOptions.text=text;
    mailOptions.html=html;
    mailOptions.subject=subject;
    await transporter.sendMail(mailOptions);
  }

  module.exports = mailer;