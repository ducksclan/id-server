import Account from './account';
import RefreshToken from './refresh.token';
import AuthCode from './auth.code';
import VerificationCode from './verification.code';
import { EntitySchema, MixedList } from 'typeorm';

export { Account, RefreshToken, AuthCode, VerificationCode };

const entities: MixedList<string | Function | EntitySchema<any>> = [
    Account,
    RefreshToken,
    AuthCode,
    VerificationCode,
];

export default entities;
