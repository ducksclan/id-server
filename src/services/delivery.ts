import { createTransport } from 'nodemailer';
import { config } from '..';

export default class Delivery {
    async sendVerificationCode(to: string, code: string) {
        const transporter = createTransport(config.mailOptions);
        const appeal = to.split('@')[0];

        await transporter.sendMail({
            from: config.mailFrom,
            to,
            subject: 'Account verification for ducksclan.ru',
            text:
                `Dear ${appeal}!\n\n` +
                `It looks like you signed up on ducksclan.ru.\n` +
                `Your verification code is ${code}.\n\n` +
                `Thanks,\nThe Ducksclan Support`,
        });
    }
}
