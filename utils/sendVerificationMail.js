// importing nodemailer
import nodemailer from 'nodemailer';

export default async function sendVerificationMail(email, code, next) {
    const transpoter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSKEY
        }
    });
    try {
        const mailOptions = {
            from: process.env.MAIL_ID,
            to: email,
            subject: 'Verification code for password reset',
            html: `<p>Verify code for password reset:</p><h2 style="color:green">${code}</h2>
            <p>Regards,<br/>Dinesh Kumar S R</p>`
        }
        await transpoter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        next(error);
    }
}