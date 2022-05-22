import { Database } from '@ducksclan/database';
import Config from './config';

export const db = new Database(new Config().databaseOptions);

main().catch(console.log);

async function main() {
    await db.initialize();
    await db.synchronize();
}
