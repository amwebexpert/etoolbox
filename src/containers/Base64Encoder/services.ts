export function transform(value: string | undefined, encoded: boolean): string {
    if (!value) {
        return '';
    }

    try {
        if (encoded) {
            return btoa(value);
        } else {
            return atob(value);
        }
    } catch (e) {
        return JSON.stringify(e);
    }
}
