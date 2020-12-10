import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import { sample, toString } from 'lodash';
import * as crypto from 'crypto';
const SECRET = 'VB32RDAMIOP5CVWSF8B00212WERTGB6Z';

export class Crypto {
    static sha512(message): string {
        return CryptoJS.SHA512(message).toString();
    }

    static sha256(message): string {
        return CryptoJS.SHA256(message).toString();
    }

    static sha1(message): string {
        return CryptoJS.SHA1(message).toString();
    }

    static md5(message): string {
        return CryptoJS.MD5(message).toString();
    }

    static hmac(
        message,
        secret = SECRET
    ): string {
        return CryptoJS.HmacSHA512(message, secret).toString();
    }

    static seededHash(seed: string): string {
        return CryptoJS.HmacSHA512(
            seed,
            (new Date().getTime() / 1000).toString()
        ).toString();
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static encrypt(data: object): string {
        const nonce = +sample(toString(moment().unix()).match(/.{1,3}/g));
        const token = CryptoJS.AES.encrypt(
            JSON.stringify({ ...data, nonce }),
            SECRET
        ).toString();
        return Buffer.from(token, 'utf8').toString('base64');
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static decrypt(input: string): object {
        const bytes = CryptoJS.AES.decrypt(
            Buffer.from(input, 'base64').toString(),
            SECRET
        );
        try {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            return {};
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static encryptWithKey(data: object, key: string): string {
        const token = CryptoJS.AES.encrypt(
            JSON.stringify({ ...data }),
            key
        ).toString();
        return Buffer.from(token, 'utf8').toString('base64');
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static decryptWithKey(input: string, key: string): object {
        const bytes = CryptoJS.AES.decrypt(
            Buffer.from(input, 'base64').toString(),
            key
        );
        try {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (e) {
            return {};
        }
    }

    static encryptFile(buffer) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(
            'aes-256-ctr',
            SECRET,
            iv
        );
        return Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    }

    static decryptFile(buffer) {
        const iv = buffer.slice(0, 16);
        buffer = buffer.slice(16);
        const decipher = crypto.createDecipheriv(
            'aes-256-ctr',
            SECRET,
            iv
        );
        return Buffer.concat([decipher.update(buffer), decipher.final()]);
    }

    static randomLiteral(filenameLength = 64): string {
        const whitelistedChars =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
        const seed = crypto.randomBytes(filenameLength);

        const result = new Array(filenameLength);
        let cursor = 0;
        for (let i = 0; i < filenameLength; i++) {
            cursor += seed[i];
            result[i] = whitelistedChars[cursor % whitelistedChars.length];
        }

        return result.join('');
    }

    static randomReferenceCode(length = 16): string {
        const whitelistedChars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        const seed = crypto.randomBytes(length);

        const result = new Array(length);
        let cursor = 0;
        for (let i = 0; i < length; i++) {
            cursor += seed[i];
            result[i] = whitelistedChars[cursor % whitelistedChars.length];
        }

        return result.join('');
    }

    /**
     * Used to generate reference code for external systems. By default - 13 digits only
     * @param length
     */
    static randomExternalReferenceCode(length = 13): string {
        const whitelistedChars = '1234567890';
        const seed = crypto.randomBytes(length);

        const result = new Array(length);
        let cursor = 0;
        for (let i = 0; i < length; i++) {
            cursor += seed[i];
            result[i] = whitelistedChars[cursor % whitelistedChars.length];
        }

        return result.join('');
    }
}
