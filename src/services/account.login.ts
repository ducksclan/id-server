import { Account, AuthCode } from '../entities';
import { ClientError } from '@ducksclan/wrapper-express';
import validateEmail from '../validation/validate.email';
import validateCode from '../validation/validate.code';
import AccountRepository from '../repositories/account.repository';
import Delivery from './delivery';

export default class AccountLogin extends AccountRepository {
    async login(email: string, fingerprint: string): Promise<Account> {
        // validating
        let validEmail = validateEmail(email);

        // account finding
        let account = await this.findOneByEmail(validEmail);

        // account creation
        if (account === null) {
            account = Account.init(validEmail);
            account = await this.manager.save(account);
        }

        // code creation
        let code = AuthCode.init(fingerprint, account);
        code = await this.manager.save(code);

        // code sending
        const delivery = new Delivery();
        await delivery.sendAuthCode(account.email, code.value);

        return account;
    }

    async verify(code: string, fingerprint: string): Promise<Account> {
        // validating
        let validCode = validateCode(code);

        // code entity finding
        let authCode = await this.findOneCode(fingerprint);

        if (authCode === null) {
            throw ClientError.NotFound('authentication code not found');
        }

        // comparsion
        if (authCode.value !== validCode) {
            throw ClientError.BadRequest('wrong code');
        }

        return authCode.account;
    }
}
