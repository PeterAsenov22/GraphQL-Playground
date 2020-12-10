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
            const metaWithHashes = {};
            Object.getOwnPropertyNames(meta).forEach((propertyName: string) => {
                const propertyValue = meta[propertyName];
                metaWithHashes[propertyName] = FieldEncryptionUtil.encryptString(propertyValue);
                metaWithHashes[`${propertyName}Hash`] = Crypto.hmac(propertyValue);
            });

            this.setDataValue(fieldName, metaWithHashes);
        };
    }

    static decryptMeta(fieldName: string): () => object {
        return function () {
            const meta = {};
            const metaWithHashes = this.getDataValue(fieldName);

            Object.getOwnPropertyNames(metaWithHashes).forEach((propertyName: string) => {
                const propertyValue = metaWithHashes[propertyName];
                meta[propertyName] = propertyName.endsWith('Hash')
                    ? propertyValue
                    : FieldEncryptionUtil.decryptString(propertyValue);
            });

            return meta;
        };
    }
}
