import { ClientError } from '@ducksclan/wrapper-express';
import { isNotEmpty, isString } from 'class-validator';

export default function validateUsername(username: unknown): string {
    if (!isNotEmpty(username)) {
        throw ClientError.BadRequest('username must not be empty');
    }

    if (!isString(username)) {
        throw ClientError.BadRequest('username must be a string');
    }

    username.trim();
    username.toLowerCase();

    if (username.length < 5) {
        throw ClientError.BadRequest(
            'username must be greater than or equal to 5 symbols'
        );
    }

    if (username.length > 20) {
        throw ClientError.BadRequest(
            'username must be less than or equal to 20 symbols'
        );
    }

    const firstIsLatin = /^[a-zA-Z].*$/;
    const allIsAlphanumeric = /^[a-zA-Z0-9_]*$/;

    if (!firstIsLatin.test(username)) {
        throw ClientError.BadRequest('username must start with a latin letter');
    }

    if (!allIsAlphanumeric.test(username)) {
        throw ClientError.BadRequest(
            'username must contain only latin letters, numbers and underscores'
        );
    }

    return username;
}
