import jwt from 'jsonwebtoken';
import { customError } from "../../errorHandler/errorHandler.middleware.js";
import UserModel from "./user.model.js";
export default class UserController{
    signupUser(req, res){
        const {name, email, password} = req.body;
        const result = UserModel.signup(name, email, password);
        if (result.status) {
            res.status(201).send(result);
        } else {
            throw new customError(404, 'Unable to add user');
        }
    }
    signinUser(req, res){
        const {email, password} = req.body;
        const result = UserModel.signin(email, password);
        if (result.status) {
            const token = jwt.sign({userId:result.user.id},'EpGbiLNDm5',{expiresIn:'1h'});
            // res.cookie('jwtToken', token);
            result.token = token;
            res.status(200).send(result);
        } else {
            // res.cookie('jwtToken', '');
            throw new customError(401, 'Invalid credentials');
        }
    }
}