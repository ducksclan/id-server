import AccountService from '../services/account.service';
import authorization from '../middlewares/authorization';
import { asyncMiddleware, TaggedLoclas } from '@ducksclan/wrapper-express';
import { CodeBody, LoginBody } from '../interfaces/account.bodies';
import { AuthoriziedLoacls } from '../middlewares/authorization';
import { TokenIssue } from '../services/jwt';
import { day } from '@ducksclan/utils';
import { Router } from 'express';
import { db } from '..';

const AccountRouter = Router()
    .get(
        '/',
        authorization(),
        asyncMiddleware<{}, AuthoriziedLoacls>(async (request, response) => {
            const service = new AccountService();
            const result = await service.get(response.locals.user_id);

            response.status(200).json({
                status: 200,
                payload: result,
            });
        })
    )
    .get(
        '/:id',
        // serverAuthorization(),
        asyncMiddleware<{}, AuthoriziedLoacls>(async (request, response) => {
            const service = new AccountService();
            const result = await service.get(request.params.id);

            response.status(200).json({
                status: 200,
                payload: result,
            });
        })
    )
    .post(
        '/login',
        asyncMiddleware<LoginBody, TaggedLoclas>(async (request, response) => {
            await db.transaction(async manager => {
                const service = new AccountService(manager);

                await service.login(
                    request.body.email,
                    response.locals.fingerprint
                );
            });

            response.status(200).json({
                status: 200,
                message: 'success, please check your email box',
            });
        })
    )
    .post(
        '/login/verify',
        asyncMiddleware<CodeBody, TaggedLoclas>(async (request, response) => {
            let pair = await db.transaction(async manager => {
                const service = new AccountService(manager);
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

            response.cookie('token', pair.refresh, {
                httpOnly: true,
                signed: true,
                maxAge: 7 * day('ms'),
            });
            response.status(200).json({
                status: 200,
                payload: pair.access,
            });
        })
    )
    .post(
        '/logout',
        asyncMiddleware(async (request, response) => {
            const service = new AccountService();
            await service.logout(response.locals.fingerprint);

            response.clearCookie('token');
            response.status(200).json({
                status: 200,
                message: 'success',
            });
        })
    );

export default AccountRouter;
