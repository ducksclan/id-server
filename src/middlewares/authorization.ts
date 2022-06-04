import { TaggedLoclas } from '@ducksclan/wrapper-express';
import { Validation } from '@ducksclan/utils';
import {
    asyncMiddleware,
    ClientError,
    Middleware,
    Request,
} from '@ducksclan/wrapper-express';
import TokenPayload from '../interfaces/token.payload';
import jwt from '../services/jwt';

export interface AuthoriziedLoacls extends TokenPayload, TaggedLoclas {}

export default function authorization(): Middleware<any, AuthoriziedLoacls> {
    return asyncMiddleware(async (request, response, next) => {
        const payload = await TokenPayload.validate(
            jwt.verifyAccess(getToken(request))
        );

        response.locals.user_id = payload.user_id;
        response.locals.access_level = payload.access_level;

        next();
    });
}

function getToken(request: Request): string {
    let authorization = request.headers.authorization?.split(' ');

    if (!authorization) {
        throw ClientError.BadRequest('authorization header required');
    }

    let isMatch = authorization[0].match(/bearer/i);

    if (!isMatch) {
        throw ClientError.BadRequest('bearer token required');
    }

    return authorization[1];
}
