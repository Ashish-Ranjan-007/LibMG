import express from "express"
import nodemailer from "nodemailer";
const app = express();


export default function mailer() {

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sussranjan007@gmail.com',
        pass: 'phunnlhvggdldmox'
    }
  });
  let  mailOptions = {
    from: 'sussranjan007@gmail.com',
    to: 'sussranjan007@gmail.com',
    subject: 'You issued a book from us',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
    
        .parent-container{
            max-width: 480px;
            padding: 10px;
            width: 80%;
            margin:  5% 30%;
    
        }
        a{
            text-decoration: none;
          
        }
    
    </style>
    
    
    <body>
        <div class= "parent-container">
        <p>Dear User</p>

        <p> Thank you for visiting [Library Name]. This email confirms that you have successfully borrowed the following book: </p>

        <ul>
        <li> Book Title: [Book Title]  </li>
        <li> Author: [Author Name]  </li>
        <li> Borrowed On: [Date of Borrowing]  </li>
        <li> Due Date: [Due Date]  </li>
        </ul>

      <p>Please ensure the book is returned by the due date to avoid any late fees. If you need to extend the borrowing period, you can do so by visiting our library or accessing your account online. </p>

        <p> If you have any questions or require further assistance, please do not hesitate to contact us.</p>

        <p> Happy reading!</p>

        <p> Best regards,</p>
          
        </div>  


        
    </body>
    </html>
`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send('email not sent')
    } else {
        console.log('Email sent: ' + info.response);
        res.send('email sent successfully')
    }
  });

}