import { Injectable } from '@nestjs/common';
import { mailerConfig } from '../config/mailer';
import * as nodemailer from 'nodemailer';
import { HistoryDTO } from '../modules/history/dto/history.dto';

@Injectable()
export class EmailMailer {
  private transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: mailerConfig.email.service,
      auth: {
        user: mailerConfig.email.user,
        pass: mailerConfig.email.password,
      },
    });
  }

  async sendRegistrationEmail(data: HistoryDTO): Promise<{ message: string }> {
    const mailOptions = {
      from: mailerConfig.email.user,
      to: data.email,
      subject: 'Registration Successful',
      html: `
      <html>
        <head>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              text-align: center;
            }
            h1 {
              color: #333333;
            }
           
            p{
              color: grey;
            }
            p b{
              font-size: 15px;
            }
          </style>
        </head>
        <body>
        <div  style="width: 100%; text-align: center;">
                     <img
              src="https://firebasestorage.googleapis.com/v0/b/projectshoes-cf747.appspot.com/o/673483.png?alt=media&token=fb222f9d-7894-4adb-80c8-10729ef5b496"
              alt=""
             style="width: 100px"
            />
          <h1>
          Thank you to the customer ${data.email} for the successful purchase!
          </h1>
        </div>
        <div style="padding-left: 250px">
          <p>Full Name: <b>${data.fullName}</b></p>
          <p>Email: ${data.email}</p>
          <p>Address: ${data.address}</p>
          <p>Phone: ${data.phone}</p>
          <p>Date: ${data.order_date}</p>
        </div>

        </body>
      </html>
    `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { message: error.message };
      // Bạn có thể xử lý lỗi tại đây hoặc đưa ra ngoài cho Middleware xử lý.
    }
  }
}
