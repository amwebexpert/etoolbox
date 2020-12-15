export function transform(value: string, encoded: boolean) {
    if (encoded) {
        return decodeURIComponent(value);
    } else {
        return encodeURIComponent(value);
    }
}
