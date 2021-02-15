
export function isBlank(str: string | undefined | null) {
    if (!str || str.trim().length === 0) {
        return true;
    }

    return false;
}

export function isNotBlank(str: string | undefined | null) {
    return !isBlank(str);
}
