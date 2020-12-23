export function transform(regularExpression: string | undefined, inputText: string | undefined): string {
    if (!regularExpression || !inputText) {
        return '';
    }

    try {
        const cleanedRegEx = cleanString(regularExpression);
        const regex = new RegExp(cleanedRegEx, 'g');
        return inputText.replaceAll(regex, replacer);
    } catch (e) {
        return e.toString();
    }
}

function replacer(match: string, capture: string): string {
    console.log(`match: ${match}, at position ${capture}`);
    return `<span>${match}</span>`;
}

function cleanString(regularExpression: string): string {
    if (!regularExpression) {
        return '';
    }

    let regex = regularExpression;
    if (regex.startsWith('/')) {
        regex = regex.substring(1);
    }

    if (regex.endsWith('/g')) {
        regex = regex.substr(0, regex.length - 2);
    }

    if (regex.endsWith('/')) {
        regex = regex.substr(0, regex.length - 1);
    }

    return regex;
}
