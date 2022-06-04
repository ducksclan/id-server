import { asyncMiddleware } from '@ducksclan/wrapper-express';
import { Router } from 'express';
import TokenPayload from '../interfaces/token.payload';
import jwt from '../services/jwt';

const TokenAccessRouter = Router()
    .get('/public-key', (request, response) => {
        response.status(200).send(jwt.publicKey);
    })
    .post(
        '/verify',
        asyncMiddleware<{ token: string }>(async (request, response) => {
            const payload = await TokenPayload.validate(
                jwt.verifyAccess(request.body.token)
            );

            response.status(200).json(payload);
        })
    );

export default TokenAccessRouter;
