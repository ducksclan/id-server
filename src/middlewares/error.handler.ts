import { ErrorMiddleware, handleError } from '@ducksclan/wrapper-express';

export default function errorHandler(): ErrorMiddleware {
    return (error, request, response, next) => {
        let result = handleError(error);

        response.status(result.status).json({
            status: result.status,
            message: result.message,
        });
    };
}
