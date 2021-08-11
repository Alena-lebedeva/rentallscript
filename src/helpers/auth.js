import jwt from 'jsonwebtoken';
import { auth } from '../config';

export async function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, auth.jwt.secret, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

export default {
    verifyJWTToken
}
