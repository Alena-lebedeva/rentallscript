import CryptoJS from 'crypto-js';
import { auth } from '../config';

export function encode(data) {
    if (data) {
        const encryptedData = CryptoJS.AES.encrypt(data, `${auth.jwt}`).toString();
        return encryptedData;
    } else {
        return null;
    };
};


export function decode(data) {
    if (data) {
        let bytes = CryptoJS.AES.decrypt(data, `${auth.jwt}`);
        let decodedData = bytes.toString(CryptoJS.enc.Utf8);
        return decodedData;
    } else {
        return null;
    };
};
