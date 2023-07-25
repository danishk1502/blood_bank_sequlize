const nodemailer = require('nodemailer');
const USER_MAIL = "nodetestmail4@gmail.com";
const USER_PASSWORD = "Node@123"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "nodetestmail4@gmail.com",
      pass: "node1234@"
    }
  });


  
const mailOptions =(receiverMail, msg)=>{
    mailData = {
        from: "nodetestmail4@gmail.com",
        to: receiverMail,
        subject: 'Notification',
        text: msg
      };

      transporter.sendMail(mailData, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent');
        }
      });

  } 


module.exports= mailOptions;
 