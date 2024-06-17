// /**
//  *
//  * Run:
//  *
//  */
// const Mailjet = require('node-mailjet')
// const mailjet=new Mailjet(
//     {
//       apiKey:"b73a610644221fd0c140e36e9f4c7164",
//       apiSecret:"fb855a85c933bad16914e6da674aa7c4"
//     })
// module.exports = function(email,token,data,callback)
//   {
    
//     // console.log(email)
//     const request = mailjet.post('send', { version: 'v3.1' }).request({
//         Messages: [
//           {
//             From: {
//               Email: 'manishapanchal5591@gmail.com',
//               Name: 'E-Mart',
//             },
//             To: [
//               {
//                 Email: email,
//                 Name: 'We dont need',
//               },
//             ],
//             Subject: 'Mail from ChatApp',
//             TextPart: 'chat App',
//             HTMLPart:data,
//           },
//         ],
//       })
//       request
//         .then(result => {
//           console.log(result.body);
//           callback(null,result.body);
//         })
//         .catch(err => {
//           console.log(err);
//           callback(err,null);
//         })
//   }
 

/**
 *
 * Run:
 *
 */
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Assuming you want to use Gmail as your email service
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email address
    pass: process.env.NODEMAILER_PASSWORD // Your password
  }
});

module.exports = function(email, token, data, callback) {
  // Email options
  const mailOptions = {
    from: `"E-Mart" ${process.env.NODEMAILER_EMAIL}`,
    to: email,
    subject: 'Mail from ChatApp',
    text: 'Chat App', // Plain text body
    html: data // HTML body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      console.log('Email sent: ' + info.response);
      callback(null, info.response);
    }
  });
};
