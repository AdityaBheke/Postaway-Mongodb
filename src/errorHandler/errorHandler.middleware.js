import { logger } from "../middlewares/logger.middleware.js";

export class customError extends Error{
    constructor(statusCode, errorMessage){
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err, req, res, next)=>{
    let error;
    if (err instanceof customError) {
        error = {status: false, errorCode: err.statusCode, message: err.message};
        logger.error(`URL: ${req.url}, Error: ${JSON.stringify(error)}`);
        res.status(err.statusCode).send(error);
    } else {
        error = err.message;
        logger.error(`URL: ${req.url}, Error: ${error}`);
        res.status(500).send('Something went wrong!');
    }
}