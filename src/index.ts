import { initialization, taggingMiddleware } from '@ducksclan/wrapper-express';
import { Database } from '@ducksclan/database';
import errorHandler from './middlewares/error.handler';
// import AccountRouter from './routs/account.router';
import Config from './config';

export const config = new Config();
export const db = new Database(config.databaseOptions);

const app = initialization(config.cookieSecret);

app.use(taggingMiddleware());
// app.use('/account', AccountRouter);
app.use(errorHandler());

main().catch(console.log);

async function main() {
    await db.initialize();

    app.listen(config.port, listener);
}

function listener() {
    console.log('Server is listening on port %o...', config.port);
}
