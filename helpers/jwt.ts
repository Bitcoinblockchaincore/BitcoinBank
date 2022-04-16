 import jwt, {VerifyErrors} from 'jsonwebtoken';
 import { v4 } from 'uuid';
 import { User } from '../interfaces/db';
 import dotenv from 'dotenv';
 dotenv.config();
 
 const TOKEN_SECRET: any = process.env.TOKEN_SECRET;
 
 export const signUser = (data: User) => {
     const token = jwt.sign(data, TOKEN_SECRET, {
         expiresIn: 1000 * 60 * 60 * 24 * 31,
         jwtid: v4()
     });
     return token;
 };
 
 export const verifyUser = (data: string, callback: Function) => {
     jwt.verify(data, TOKEN_SECRET, (err: VerifyErrors | null, res: any) => {
         if (err) return callback(err, false)
         else if (
             res?.exp > Date.now()
         ) {
             const err = {
                 status: 403,
                 message: 'Sorry aunthenticatiom error, try to log in again'
             }
 
             return callback(err, false);
         }
         return callback(false, res);
     });
 };