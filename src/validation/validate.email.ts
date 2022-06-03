import { isEmail, isNotEmpty, isString } from 'class-validator';
import { ClientError } from '@ducksclan/wrapper-express';

export default function validateEmail(email: unknown): string {
    if (!isNotEmpty(email)) {
        throw ClientError.BadRequest('email must not be empty');
    }

    if (!isString(email)) {
        throw ClientError.BadRequest('email must be a string');
    }

    email.trim();

    if (!isEmail(email)) {
        throw ClientError.BadRequest('email must be valid');
    }

    return email;
}
