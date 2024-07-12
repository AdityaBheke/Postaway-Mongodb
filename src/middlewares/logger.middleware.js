import winston from "winston";
import path from 'path';

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: path.resolve('public','logs','info.log'), level: 'info'}),
        new winston.transports.File({filename: path.resolve('public','logs','error.log'), level: 'error'})
    ]
});

export const loggerMiddleware = (req, res, next)=>{
    if (!req.url.includes('user')) {
        const logData = `TimeStamp: ${new Date().toString()}, URL: ${req.url}, Input Data: ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
}