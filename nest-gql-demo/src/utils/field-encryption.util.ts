import { get, result } from 'lodash';
import { Crypto } from './crypto.util';

export class FieldEncryptionUtil {
    static encrypt(fieldName: string): (value: any) => void {
        return function (value) {
            const newValue = Crypto.encrypt({ value });
            this.setDataValue(fieldName, newValue);
        };
    }

    static decrypt(fieldName: string): () => string {
        return function () {
            const value = result(this.getDataValue(fieldName), 'toString', '');
            return get(Crypto.decrypt(value.toString()), 'value', '');
        };
    }

    static encryptString(value: string): string {
        return Crypto.encrypt({ value });
    }

    static decryptString(value: string): string {
        return get(Crypto.decrypt(value), 'value', '');
    }

    static encryptMeta(fieldName: string): (meta: any) => void {
        return function (meta: any) {
            const metaWithHashes = Object.getOwnPropertyNames(meta).reduce((acc, propertyName) => {
                const propertyValue = meta[propertyName];
                return {
                    ...acc,
                    [propertyName]: FieldEncryptionUtil.encryptString(propertyValue),
                    [`${propertyName}Hash`]: Crypto.hmac(propertyValue)
                };
            }, {});

            this.setDataValue(fieldName, metaWithHashes);
        };
    }

    static decryptMeta(fieldName: string): () => object {
        return function () {
            const metaWithHashes = this.getDataValue(fieldName);

            return Object.getOwnPropertyNames(metaWithHashes).reduce((acc, propertyName) => {
                const propertyValue = metaWithHashes[propertyName];
                return {
                    ...acc,
                    [propertyName]: propertyName.endsWith('Hash')
                        ? propertyValue
                        : FieldEncryptionUtil.decryptString(propertyValue)
                };
            }, {});
        };
    }
}
