import { DataSourceOptions } from 'typeorm';
import { toNumber, Generator } from '@ducksclan/utils';
import entities from './entities';
import dotenv from 'dotenv';

export default class Config {
    constructor() {
        dotenv.config();
    }

    get databaseOptions(): DataSourceOptions {
        if (process.env.DB_TYPE === 'postgres') {
            return {
                type: process.env.DB_TYPE,
                host: process.env.DB_HOST || 'localhost',
                port: toNumber(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                entities,
            };
        }

        return {
            type: 'sqlite',
            database: process.env.DB_PATH || './database/id.database.sqlite',
            entities,
        };
    }

    get mailOptions() {
        return {
            service: process.env.MAIL_SERVICE,
            host: process.env.MAIL_HOST,
            port: toNumber(process.env.MAIL_PORT),
            secure:
                process.env.MAIL_SECURE === undefined
                    ? undefined
                    : process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        };
    }

    get cookieSecret(): string {
        return process.env.COOKIE_SECRET || Generator.sequence(30);
    }

    get port(): number {
        return toNumber(process.env.PORT) || 80;
    }

    get mailFrom(): string | undefined {
        return process.env.MAIL_FROM || process.env.MAIL_USER;
    }
}
