export function jsonFormat(value: string | undefined): string {
    if (!value) {
        return '{}';
    }

    try {
        const options = JSON.parse(value);
        return JSON.stringify(options, null, 2);
    } catch (e) {
        console.error(e, value);
        return '{}';
    }
}
