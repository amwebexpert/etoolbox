import jwt_decode from 'jwt-decode';

export function decode(value: string | undefined, header: boolean): string {
    if (!value) {
        return '';
    }

    try {
        const obj = jwt_decode(value, { header });
        return JSON.stringify(obj, null, 4);
    } catch (e) {
        return JSON.stringify(e);
    }
}
