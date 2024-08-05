import { logger } from "../middlewares/logger.middleware.js";

export class customError extends Error{
    constructor(statusCode, errorMessage){
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err, req, res, next)=>{
    if (err instanceof customError) {
        logger.error(`URL: ${req.url}, Error: {status: ${false}, errorCode: ${err.statusCode}, message: ${err.message}}`);
        res.status(err.statusCode).send({success: false, errorCode: err.statusCode, message: err.message});
    } else {
        logger.error(`URL: ${req.url}, Error: {name: ${err.name}, message: ${err.message}}`);
        res.status(500).send('Something went wrong!');
    }
}