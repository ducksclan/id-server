import { ApiError } from '@ducksclan/wrapper-express';
import { describe, it } from 'mocha';
import validateUsername from './validate.username';
import chai from 'chai';

const _4_LATIN_LETTERS = 'lati';
const _5_LATIN_LETTERS = 'latin';
const _20_LATIN_LETTERS = 'latinLatinLatinLatin';
const _21_LATIN_LETTERS = 'latinLatinLatinLatinL';
const CYRILLIC_LETTERS = 'кириллица';
const FIRST_IS_NOT_LATIN = '_latin';
const VALID = 'agent_007';

describe('validateUsername', () => {
    it('should throw ApiError when username is not specified', () => {
        // @ts-ignore
        chai.should().Throw(() => validateUsername(), ApiError);
    });

    it('should throw ApiError when username is empty string', () => {
        chai.should().Throw(() => validateUsername(''), ApiError);
    });

    it('should throw ApiError when username has 4 latin letters', () => {
        chai.should().Throw(() => validateUsername(_4_LATIN_LETTERS), ApiError);
    });

    it('should throw ApiError when username has 21 latin letters', () => {
        chai.should().Throw(() => validateUsername(_21_LATIN_LETTERS), ApiError);
    });

    it('should pass when username has 5 latin letters', () => {
        chai.should().not.Throw(() => validateUsername(_5_LATIN_LETTERS));
    });

    it('should pass when username has 20 latin letters', () => {
        chai.should().not.Throw(() => validateUsername(_20_LATIN_LETTERS));
    });

    it('should throw ApiError when username is contain cyrillic letters', () => {
        chai.should().Throw(() => validateUsername(CYRILLIC_LETTERS), ApiError);
    });

    it('should throw ApiError when username is valid, but first letter is not latin letter', () => {
        chai.should().Throw(() => validateUsername(FIRST_IS_NOT_LATIN), ApiError);
    });

    it('should pass when username is valid, and contain numbers and underscores', () => {
        chai.should().not.Throw(() => validateUsername(VALID), ApiError);
    });
});
