import { Account, VerificationCode } from '../entities';
import { AccountCreateBody } from '../interfaces/account.bodies';
import AbstractRepository from '../repositories/abstract.repository';
import AccountRepository from '../repositories/account.repository';
import validateEmail from '../validation/validate.email';
import validateUsername from '../validation/validate.username';
import Delivery from './delivery';

export default class AccountCreate extends AbstractRepository {
    async create(body: AccountCreateBody) {
        const repository = new AccountRepository(this.manager);

        // validation
        body.email = validateEmail(body.email);
        await repository.checkEmailUniqueness(body.email);

        if (body.username) {
            body.username = validateUsername(body.username);
            await repository.checkUsernameUniqueness(body.email);
        }

        // account creation
        let account = Account.init(body.email, body.username);
        let code = VerificationCode.init(account);

        account = await this.manager.save(account);
        code = await this.manager.save(code);

        // verification code sending
        const delivery = new Delivery();
        await delivery.sendVerificationCode(account.email, code.value);

        return account;
    }
}
