import AbstractRepository from './abstract.repository';
import { ClientError } from '@ducksclan/wrapper-express';
import { Account } from '../entities';

export default class AccountRepository extends AbstractRepository {
    async checkEmailUniqueness(email: string) {
        let account = await this.manager.findOneBy(Account, { email });

        if (account) {
            throw ClientError.Conflict('email is already occupied');
        }
    }

    async checkUsernameUniqueness(username: string) {
        let account = await this.manager.findOneBy(Account, { username });

        if (account) {
            throw ClientError.Conflict('username is already occupied');
        }
    }
}
