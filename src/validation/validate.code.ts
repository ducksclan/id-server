import { isNotEmpty, isString } from 'class-validator';
import { ClientError } from '@ducksclan/wrapper-express';

export default function validateCode(code: unknown): string {
    if (!isNotEmpty(code)) {
        throw ClientError.BadRequest('code must not be empty');
    }

    if (!isString(code)) {
        throw ClientError.BadRequest('code must be a string');
    }

    code.trim();

    return code;
}
