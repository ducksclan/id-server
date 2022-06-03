import { ApiError } from '@ducksclan/wrapper-express';
import { describe, it } from 'mocha';
import validateEmail from './validate.email';
import chai from 'chai';

const VALID_EMAIL = 'valid@email.io';
const EMAIL_WITHOUT_TLD = 'not_valid@email';
const EMAIL_WITHOUT_AT = 'not_valid_email.ru';

describe('validateEmail', () => {
    it('should throw ApiError when email is not specified', () => {
        // @ts-ignore
        chai.should().Throw(() => validateEmail(), ApiError);
    });

    it('should throw ApiError when email is empty string', () => {
        chai.should().Throw(() => validateEmail(''), ApiError);
    });

    it('should throw ApiError when email without at sign (@)', () => {
        chai.should().Throw(() => validateEmail(EMAIL_WITHOUT_AT), ApiError);
    });

    it('should throw ApiError when email without top level domain', () => {
        chai.should().Throw(() => validateEmail(EMAIL_WITHOUT_TLD), ApiError);
    });

    it('should pass when email is valid', () => {
        chai.should().not.Throw(() => validateEmail(VALID_EMAIL));
    });
});
