export function transform(value: string, encoded: boolean) {
    try {
        if (encoded) {
            return btoa(value);
        } else {
            return atob(value);
        }
    } catch (e) {
        return e.toString();
    }
}
