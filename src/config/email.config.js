import nodeMailer from 'nodemailer';

import {customError} from '../errorHandler/errorHandler.middleware.js'

const sendEmail = async (receiver, otp)=>{
    const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adityabheke03@gmail.com',
            pass: 'agxxmshkwpmehjqg'
        }
    });

    const mailOptions = {
        from: 'Aditya Bheke <adityabheke03@gmail.com>',
        to: receiver,
        subject: 'OTP for Password reset',
        text: `OTP to reset your password for 'Postaway' is ${otp}`
    };

    try {
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.log(error);
        
        throw new customError(500, 'Error while sending email');
    }
}

export default sendEmail;