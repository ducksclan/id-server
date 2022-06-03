import { asyncMiddleware, TaggedLoclas } from '@ducksclan/wrapper-express';
import { AccountCreateBody } from '../interfaces/account.bodies';
import { day } from '@ducksclan/utils';
import { Router } from 'express';
import { db } from '..';
import AccountCreate from '../services/account.create';
import TokenIssue from '../services/token.issue';

let options = {
    httpOnly: true,
    signed: true,
    maxAge: 30 * day('ms'),
};

const AccountRouter = Router().post(
    '/create',
    asyncMiddleware<AccountCreateBody, TaggedLoclas>(
        async (request, response) => {
            const pair = await db.transaction(async manager => {
                const service = new AccountCreate(manager);
                const account = await service.create(request.body);

                const tokenService = new TokenIssue(manager);
                const pair = await tokenService.issue(
                    account,
                    response.locals.fingerprint,
                    response.locals.ip
                );

                return pair;
            });

            response.cookie('token', pair.refresh, options);
            response.json({
                status: 201,
                message: 'succes',
                payload: pair.access,
            });
        }
    )
);

export default AccountRouter;
