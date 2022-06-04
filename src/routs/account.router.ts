import { asyncMiddleware, TaggedLoclas } from '@ducksclan/wrapper-express';
import { CodeBody, LoginBody } from '../interfaces/account.bodies';
import { TokenIssue } from '../services/jwt';
import { day } from '@ducksclan/utils';
import { Router } from 'express';
import { db } from '..';
import AccountLogin from '../services/account.login';

let options = {
    httpOnly: true,
    signed: true,
    maxAge: 30 * day('ms'),
};

const AccountRouter = Router()
    .post(
        '/login',
        asyncMiddleware<LoginBody, TaggedLoclas>(async (request, response) => {
            await db.transaction(async manager => {
                const service = new AccountLogin(manager);

                await service.login(
                    request.body.email,
                    response.locals.fingerprint
                );
            });

            response.json({
                status: 201,
                message: 'success, please check your email box',
            });
        })
    )
    .post(
        '/login/verify',
        asyncMiddleware<CodeBody, TaggedLoclas>(async (request, response) => {
            let pair = await db.transaction(async manager => {
                const service = new AccountLogin(manager);
                const account = await service.verify(
                    request.body.code,
                    response.locals.fingerprint
                );

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
                message: 'success',
                payload: pair.access,
            });
        })
    );

export default AccountRouter;
