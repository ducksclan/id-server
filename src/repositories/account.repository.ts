import AbstractRepository from './abstract.repository';
import { ClientError } from '@ducksclan/wrapper-express';
import { Account, AuthCode } from '../entities';

export default class AccountRepository extends AbstractRepository {
    findOneByEmail(email: string): Promise<Account | null> {
        return this.manager.findOneBy(Account, { email });
    }

    findOne(id: string): Promise<Account | null> {
        return this.manager.findOneBy(Account, { id });
    }

    findOneCode(id: string): Promise<AuthCode | null> {
        return this.manager.findOneBy(AuthCode, { id });
    }

    async checkEmailUniqueness(email: string) {
        let account = await this.manager.findOneBy(Account, { email });

        if (account) {
            throw ClientError.Conflict('email is already occupied');
        }
    }
}
