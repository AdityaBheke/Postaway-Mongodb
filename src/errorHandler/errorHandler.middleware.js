export class customError extends Error{
    constructor(statusCode, errorMessage){
        super(errorMessage);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (err, req, res, next)=>{
    if (err instanceof customError) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send('Something went wrong!');
    }
}