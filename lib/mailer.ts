import nodemailer from "nodemailer";
import { getActiveSmtp } from "./get-smtp";


export async function sendMail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    const smtp = await getActiveSmtp();

    const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
            user: smtp.username,
            pass: smtp.password, // decrypted before use
        },
    });

    return transporter.sendMail({
        from: smtp.fromName
            ? `"${smtp.fromName}" <${smtp.fromEmail}>`
            : smtp.fromEmail,
        to,
        subject,
        html,
    });
}
