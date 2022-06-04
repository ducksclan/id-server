import { ErrorMiddleware, handleError } from '@ducksclan/wrapper-express';
import Delivery from '../services/delivery';

export default function errorHandler(): ErrorMiddleware {
    return (error, request, response, next) => {
        let result = handleError(error);

        if (result.status >= 500) {
            console.log('error handling result: %o', result);
            result.debug &&
                new Delivery().sendErrorAlert(result.debug).catch(console.log);
        }

        response.status(result.status).json({
            message: result.message,
        });
    };
}
