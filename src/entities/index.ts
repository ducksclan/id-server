import { EntitySchema, MixedList } from 'typeorm';
import Account from './account';
import RefreshToken from './refresh.token';
import AuthCode from './auth.code';

export { Account, RefreshToken, AuthCode };

const entities: MixedList<string | Function | EntitySchema<any>> = [
    Account,
    RefreshToken,
    AuthCode,
];

export default entities;
