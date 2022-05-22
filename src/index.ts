import { initialization, JsonWebToken } from '@ducksclan/wrapper-express';
import { Database } from '@ducksclan/database';
import TokenPayload from './interfaces/token.payload';
import Config from './config';

const config = new Config();

export const app = initialization(config.cookieSecret);
export const jwt = new JsonWebToken<TokenPayload>();
export const db = new Database(config.databaseOptions);

main().catch(console.log);

async function main() {
    await db.initialize();

    app.listen(config.port, listener);
}

function listener() {
    console.log('Server is listening on port %o...', config.port);
}
