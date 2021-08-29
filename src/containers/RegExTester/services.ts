import regexParser from 'regex-parser';

export function transform(regularExpression: string | undefined, inputText: string | undefined): string {
    if (!regularExpression || !inputText) {
        return '';
    }

    const text = inputText.replaceAll('\n', '<br />')

    try {
        const regex = regexParser(regularExpression);
        if (regex.global) {
            return text.replaceAll(regex, replacer);
        } else {
            return text.replace(regex, replacer);
        }
    } catch (e) {
        return JSON.stringify(e);
    }
}

export function extract(regularExpression: string | undefined, inputText: string | undefined): string {
    const extratedItemsList = [];

    if (!regularExpression || !inputText) {
        return '';
    }

    try {
        const regex = regexParser(regularExpression);
        if (!regex.global) {
            return '';
        }

        let result;
        while ((result = regex.exec(inputText)) !== null) {
            extratedItemsList.push(result[0]);
        }

        // Log some stats
        const set = new Set(extratedItemsList);
        console.log(`Sorted set of unique ${set.size} entries:`, [...set].sort().join(', '));

        return extratedItemsList.join(', ');
    } catch (e) {
        return JSON.stringify(e);
    }
}

function replacer(match: string, capture: string): string {
    // console.log(`match: ${match}, at position ${capture}`);
    return `<span>${match}</span>`;
}
