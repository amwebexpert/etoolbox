export function transform(value: string | undefined, encoded: boolean): string {
    if (!value) {
        return '';
    }

    if (encoded) {
        return decodeURIComponent(value);
    } else {
        return encodeURIComponent(value);
    }
}
