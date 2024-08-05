import jwt from "jsonwebtoken";
import { customError } from "../errorHandler/errorHandler.middleware.js";

const jwtAuth = (req, res, next)=>{
    // Passing token via cookie
    
    const {cookie} = req.headers;
        
    // if (!cookie) {
    //     throw new customError(401, 'Bad request Token not available');
    // }
    // const token = cookie.replace('jwtToken=','');
    
    // Passing token via authorization header
    const token = req.headers['authorization'] || req.cookies['jwtToken'];
    if (!token) {
        throw new customError(401, 'Bad request Token not available');
    }

    try {
        const payload = jwt.verify(token,'EpGbiLNDm5');
        req.userId = payload.userId;
        req.user = payload.user;
    } catch (error) {
        throw new customError(401, "Token expired");
    }
    next();
}

export default jwtAuth;