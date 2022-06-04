import { createTransport } from 'nodemailer';
import { config } from '..';

export default class Delivery {
    async sendAuthCode(to: string, code: string) {
        const transporter = createTransport(config.mailOptions);
        const appeal = to.split('@')[0];

        await transporter.sendMail({
            from: config.mailFrom,
            to,
            subject: 'Authentication for ducksclan.ru',
            text:
                `Dear, ${appeal}!\n\n` +
                `It looks like you are trying to sign in on ducksclan.ru.\n` +
                `Your authentication code is ${code}.\n\n` +
                `Thanks,\nThe Ducksclan Support`,
        });
    }
}
