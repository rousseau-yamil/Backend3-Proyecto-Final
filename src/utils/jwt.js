// src/utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(user,'Coder2025JSIII',{expiresIn:'1h'})        

};
