export function transform(value: string, encoded: boolean) {
    if (encoded) {
        return btoa(value);
    } else {
        return atob(value);
    }
}
