import { Account, AuthCode, RefreshToken } from '../entities';
import { AccountGetBody } from '../interfaces/account.bodies';
import { ClientError } from '@ducksclan/wrapper-express';
import validateEmail from '../validation/validate.email';
import validateCode from '../validation/validate.code';
import AccountRepository from '../repositories/account.repository';
import Delivery from './delivery';

export default class AccountService extends AccountRepository {
    async get(user_id: string): Promise<AccountGetBody> {
        let account = await this.findOne(user_id);

        if (account === null) {
            throw ClientError.NotFound('account not found');
        }

        return {
            user_id: account.id,
            email: account.email,
            created_at: account.created_at,
            verified_at: account.verified_at || null,
            user_status:
                account.access_level === 0
                    ? 'Not Verified'
                    : account.access_level === 1
                    ? 'Normal'
                    : account.access_level === 2
                    ? 'Admin'
                    : 'Super Admin',
        };
    }

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

        authCode.account.verified_at = new Date();
        authCode.account.access_level = 1;

        let account = await this.manager.save(authCode.account);

        return account;
    }

    async logout(fingerprint: string): Promise<void> {
        await this.manager.delete(RefreshToken, {
            id: fingerprint,
        });
    }
}
