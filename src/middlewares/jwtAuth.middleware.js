import jwt from "jsonwebtoken";
import { customError } from "../errorHandler/errorHandler.middleware.js";

const jwtAuth = (req, res, next)=>{
    const cookie = req.headers.cookie;
    if (!cookie) {
        throw new customError(400, 'Bad request Token not available');
    }
    const token = cookie.replace('jwtToken=','');
    try {
        const payload = jwt.verify(token,'EpGbiLNDm5');
        req.userId = payload.userId;
    } catch (error) {
        throw new customError(400, error);
    }
    next();
}

export default jwtAuth;