import {
    ExpiresInOptions,
    JsonWebToken,
    TokensPair,
} from '@ducksclan/wrapper-express';
import { Account, RefreshToken } from '../entities';
import AbstractRepository from '../repositories/abstract.repository';
import TokenPayload from '../interfaces/token.payload';

const jwt = new JsonWebToken<TokenPayload>();

const expiresIn: ExpiresInOptions = {
    access: '10m',
    refresh: '7d',
};

export default jwt;

export class TokenIssue extends AbstractRepository {
    async issue(
        account: Account,
        fingerprint: string,
        ip?: string
    ): Promise<TokensPair> {
        let payload: TokenPayload = {
            user_id: account.id,
            access_level: account.access_level,
        };

        let pair = jwt.generateTokensPair(payload, expiresIn);

        let refreshToken = RefreshToken.init(
            fingerprint,
            account,
            pair.refresh,
            ip
        );

        refreshToken = await this.manager.save(refreshToken);

        return pair;
    }
}
