import { body, validationResult, param } from "express-validator";
import { customError } from "../errorHandler/errorHandler.middleware.js";

// SignUp validator
export const signUpValidator = async (req, res, next)=>{
    const rules = [
        body('name').notEmpty().withMessage('Name should not be empty'),
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').notEmpty().withMessage('Password should not be empty')
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
// SignIn validator
export const signInValidator = async (req, res, next)=>{
    const rules = [
        body('email').isEmail().withMessage('Enter valid email'),
        body('password').notEmpty().withMessage('Password should not be empty')
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
// Create Post validator
export const createPostValidator = async(req, res, next)=>{
    const rules = [
        body('imageUrl').custom((value,{req})=>{
            if (!req.file) {
                throw new customError(400, 'File should not be empty');
            }else{
                return true;
            }
        })
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
// Get Post by Id validator
export const getPostByIdValidator = async (req, res, next)=>{
    const rules = [
        param('id').isInt({min:0}).withMessage('Invalid post id')
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
// Update Post validator
export const updatePostValidator = async (req, res, next)=>{
    const rules = [
        param('id').isInt({min:0}).withMessage('Invalid post id'),
        body('imageUrl').custom((value,{req})=>{
            if (!req.file) {
                throw new customError(400, 'File should not be empty');
            }else{
                return true;
            }
        })
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
// Delete post validator
export const deletePostValidator = async (req, res, next)=>{
    const rules = [
        param('id').isInt({min:0}).withMessage('Invalid post id')
    ];
    await Promise.all(rules.map(rule=>rule.run(req)));
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    }else{
        const errorArray = result.array().map(err=>err.msg);
        const errorString = errorArray.join(', ');
        next(new customError(400, errorString));
    }
}
