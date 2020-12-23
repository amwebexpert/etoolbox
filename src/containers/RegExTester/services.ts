import regexParser from 'regex-parser';

export function transform(regularExpression: string | undefined, inputText: string | undefined): string {
    if (!regularExpression || !inputText) {
        return '';
    }

    try {
        const regex = regexParser(regularExpression);
        if (regex.global) {
            return inputText.replaceAll(regex, replacer);
        } else {
            return inputText.replace(regex, replacer);
        }
    } catch (e) {
        return e.toString();
    }
}

function replacer(match: string, capture: string): string {
    console.log(`match: ${match}, at position ${capture}`);
    return `<span>${match}</span>`;
}
